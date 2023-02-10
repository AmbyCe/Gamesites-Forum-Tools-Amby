let neededActivity = 0;
let acitivyLeft = null;
let activityColor = null;

const getThisPage = () => {
	const res = {
		type: null,
		playerId: null,
		site: null,
		section: null
	};

	const params = new URLSearchParams(location.search);
	res.type = params.get("mode") || "index";
	res.playerId = params.get("player");

	// We can use some cool new javascript trickery, but meh
	// res.site = sites_config.sites.filter(site => site.sections.filter(section => section.hlstats == thisBase));
	const thisBase = document.location.href.split('?')[0];
	for (let site of sites_config.sites) {
		for (let section of site.sections) {
			if (section.hlstats === thisBase) {
				res.site = site;
				res.section = section;
				break;
			}
		}
	}

	return res;
}

const doHistoryRow = (tr) => {
	if (!tr)
		return;

	const rowDate = new Date(tr.children[0].innerText);
	const rowServer = tr.children[3].innerText;
	const rowMap = tr.children[4].innerText;

	const rowServerEntry = thisPage.section.servers.find(el => el.name === rowServer);
	if (!rowServerEntry)
		doHistoryRow(tr.nextElementSibling);

	chrome.runtime.sendMessage(chrome.runtime.id, {
		action: 'GetGOTVRecord',
		gotvurl: rowServerEntry.demos,
		date: rowDate
	}, function(data, error) {
		let link = rowServerEntry.demos;
		let img = chrome.runtime.getURL("icons/clock.svg");

		// For cases where the map name is left empty in HLstats, try to match using date and server name only.
		// A difference of more than 3 hours is unlikely (and there'd be something wrong with it).
		if (!error && data && (data.map == rowMap || rowMap.length === 0) && Math.abs(rowDate - new Date(data.date)) < 180 * 60 * 1000) {
			link = data.demo;
			img = chrome.runtime.getURL("icons/download.png");
		}

		const td = document.createElement('td');
		const linkEl = document.createElement('a');
		linkEl.href = link;
		const imgEl = document.createElement('img');
		imgEl.src = img;
		imgEl.style.height = "1em";
		linkEl.insertBefore(imgEl, null);
		td.insertBefore(linkEl, null);
		td.style.textAlign = "center";
		tr.insertBefore(td, null);

		doHistoryRow(tr.nextElementSibling);
	});
}

const doPlayerHistory = () => {
	const table = document.querySelector("table.data-table");
	for (const tr of table.querySelectorAll("tr")) {
		if (tr.className === "data-table-head") {
			const td = document.createElement('td');
			td.className = "fSmall";
			td.innerHTML = "GOTV";
			tr.insertBefore(td, null);
		} else {
			doHistoryRow(tr);
			break;
		}
	}
}

const doPlayerInfo = (tries) => {
	const sidfield = document.querySelector("table.data-table > tbody > tr:nth-child(4) > td");
	// player info is loaded and inserted by AJAX and we cannot hook Tabs.updateTab from our extension
	if (!sidfield && (!tries || tries < 10)) {
		setTimeout(doPlayerInfo.bind(null, (tries + 1) || 0), 200);
		return;
	}
	
	const sidlink = sidfield.querySelector("a");
	const wrapper = document.createElement('span');
	sidlink.before(wrapper);
	wrapper.appendChild(sidlink);

	processSIDsInDocument(sidfield);
}

const getTimeFromSessionRow = (el, month) => {
	if (month !== undefined) {
		const elMonth = parseInt(el.children[0].innerText.trim().substring(5, 7), 10);
		if (elMonth !== month)
			return -1;
	}
	
	let time = 0;
	const matches = el.children[3].innerText.trim().match(/^(\d+)d\s(\d{2}):(\d{2}):(\d{2})h$/).splice(1, 4).map(str => parseInt(str, 10));
	time += matches[0] * 24 * 60 * 60; // days
	time += matches[1] * 60 * 60; // hours
	time += matches[2] * 60; // minutes
	time += matches[3]; // seconds
	return time;
}

const doPlayerSessions = () => {
	let activity = 0;
	const thisMonth = new Date().getMonth() + 1;
	const rows = document.querySelectorAll("table.data-table tr:not(.data-table-head)");
	for (const row of rows) {
		const seconds = getTimeFromSessionRow(row, thisMonth);
		console.log(row, seconds);
		if (seconds === -1) // we've reached the first record of some previous month
			break;

		activity += seconds;
	}
	
	const contEl = document.createElement('P');
	contEl.style.margin = '2em 0 -2em 3em';
	contEl.style.fontSize = '1.5em';

	// Left hours for activity process
	if (thisPage.section.name == "JailBreak" || thisPage.section.name == "ALL" || thisPage.section.name == "Jump") {
		neededActivity = 10;
	} else if (thisPage.section.name == "TTT") {
		neededActivity = 15;
	} else {
		neededAcitivty = 0;
	}

	if (neededActivity != 0) {
		contEl.innerHTML = `<ul><li>Celková aktivita za ${getMonthName(thisMonth)}: <strong>${formatSecondsToHours(activity)}</strong> <ul><li><em>Zbývá pro splnění ${thisPage.section.name} aktivity: <strong style="${activityColor}">${acitivyLeft}</strong></em></li></ul> </li></ul>`;
	} else {
		contEl.innerHTML = `<ul><li>Celková aktivita za ${getMonthName(thisMonth)}: <strong>${formatSecondsToHours(activity)}</strong></li></ul>`;
	}

	const heading = document.querySelector('.content .block .fHeading');
	heading.insertAdjacentElement('afterend', contEl);
}

// Get name of month in Czech from month number
function getMonthName(monthNumber) {
	const date = new Date();
	date.setMonth(monthNumber - 1);
  
	let monthNameCz = date.toLocaleString('cz-CZ', {
	  month: 'long',
	});

	let monthNameSk = date.toLocaleString('sk-SK', {
		month: 'long',
	  });
	return monthNameFormat(monthNameCz) + " (" + monthNameFormat(monthNameSk) + ")";
}

function monthNameFormat(monthName) {
	let processedMonthName;
	for (let i = 0; i < monthName.length; i++) {
		if (i == 0) {
			processedMonthName = monthName.charAt(i).toUpperCase();
		} else {
			processedMonthName += monthName.charAt(i).toLowerCase();
		}
	}
	return processedMonthName;
}

// Format time to readable format
const formatSecondsToHours = e => {
	const h = Math.floor(e / 3600).toString().padStart(2,'0'),
		  m = Math.floor(e % 3600 / 60).toString().padStart(2,'0'),
		  s = Math.floor(e % 60).toString().padStart(2,'0');
	
	if (neededActivity > h) {
		let leftMinutes = (60 - m);
		let leftSeconds = (60 - s);
		if (leftMinutes == 60) {
			leftMinutes = 0;
		}
		if (leftSeconds == 60) {
			leftSeconds = 0;
		}
		acitivyLeft = (neededActivity - h) + "h : " + leftMinutes + "m : " + leftSeconds + "s";
	} else {
		acitivyLeft = "Aktivita splněna!";
		activityColor = "color: #09b509";
	}
	return h + 'h : ' + m + 'm : ' + s + 's';
}

// Precache server names, so we can match IPs for GOTV with names from HLstats
const loadServerNames = (cb, section) => {
	section = section || thisPage.section;
	chrome.runtime.sendMessage(chrome.runtime.id, {
		action: 'GetServers',
		hlstats: section.hlstats,
		ips: section.servers.map(el => el.ip)
	}, function(data, error) {
		if (error || !data)
			return;

		for (const server of section.servers) {
			if (server.name)
				continue;

			const entry = data.find(el => el.ip === server.ip);
			if (entry)
				server.name = entry.name;
		}
		cb();
	});
}

const thisPage = getThisPage();
if (thisPage.type === "playerhistory") {
	loadServerNames(doPlayerHistory);
} else if (thisPage.type === "playerinfo") {
	doPlayerInfo();
} else if (thisPage.type === "playersessions") {
	doPlayerSessions();
}