const SB_CHAT = 2;
const SB_VOICE = 1;
const SB_CHAT_AND_VOICE = 3;
const SB_GAME = -1;

const sites_config = {
	sites: [
		{
			game: "CS:GO",
			serverListPage: "https://www.gamesites.cz/servery/cs-go/",
			forumPage: "https://www.gamesites.cz/forum/counter-strike-global-offensive-f49.html",
			forumSections: [49, 873],
			adminSections: [783],
			sections: [
				{
					name: "JailBreak",
					sourcebans: "https://banlist.gamesites.cz/csgo/jb/",
					hlstats: "http://hlstats.fakaheda.eu/hlxce_186497/hlstats.php",
					forumSections: [
						{ fid: 954, shortname: "PP" },
						{ fid: 1217, shortname: "AA" },
						{ fid: 983, shortname: "Aka" }
					],
					banIcons: new Map([
						[SB_VOICE, "icons/sourcebans_team.png"],
						[SB_CHAT, "icons/sourcebans_chat.png"],
						[SB_CHAT_AND_VOICE, "icons/sourcebans_chat.png"]
					]),
					servers: [
						{ ip: "217.11.249.84:27361", demos: "https://csgo.gamesites.cz/dema/index.php?server=JailBreak1" },
						{ ip: "217.11.249.84:27583", demos: "https://csgo.gamesites.cz/dema/index.php?server=JailBreak2" },
						{ ip: "217.11.249.79:27422", demos: "https://csgo.gamesites.cz/dema/index.php?server=JailBreak3" },
						{ ip: "81.0.217.175:27988", demos: "https://csgo.gamesites.cz/dema/index.php?server=JailBreak4" },
						{ ip: "217.11.249.78:27883", demos: "https://csgo.gamesites.cz/dema/index.php?server=JailBreak5" },
						{ ip: "217.11.249.79:27817", demos: "https://csgo.gamesites.cz/dema/index.php?server=JailBreak6" },
						{ ip: "82.208.17.102:27299", demos: "https://csgo.gamesites.cz/dema/index.php?server=JailBreak7" },
						{ ip: "217.11.249.93:27896", demos: "https://csgo.gamesites.cz/dema/index.php?server=JailBreak8" }
					],
					banOrder: [
						{ reason: "MultiFreekill", time: 2880, type: SB_VOICE },
						{ reason: "Neschopnost CT", time: 1440, type: SB_VOICE },
						{ reason: "Nadržování", time: 1440, type: SB_VOICE },
						{ reason: "Úmyslné kažení hry", time: 1440, type: SB_VOICE },
						{ reason: "Házení gun T", time: 1440, type: SB_VOICE },
						{ reason: "Freekill", time: 240, type: SB_VOICE },
						{ reason: "Nadávky střední", time: 120, type: SB_CHAT },
						{ reason: "Nadávky velké", time: 720, type: SB_CHAT },
						{ reason: "Nadávky neúnosné", time: 2880, type: SB_CHAT },
						{ reason: "Opakovaný spam", time: 720, type: SB_CHAT },
						{ reason: "Ghosting", time: 1440, type: SB_GAME },
						{ reason: "BunnyHop script", time: 10080, type: SB_GAME },
						{ reason: "MultiHack", time: 0, type: SB_GAME }
					]
				},
				{
					name: "ALL",
					sourcebans: "https://banlist.gamesites.cz/csgo/aim/",
					hlstats: "http://hlstats.fakaheda.eu/hlxce_187068/hlstats.php",
					forumSections: [
						{ fid: 976, shortname: "PP" }
					],
					servers: [
						{ ip: "82.208.17.50:27933", demos: "https://csgo.gamesites.cz/dema/index.php?server=1v1Arena" },
						{ ip: "82.208.17.101:27575", demos: "https://csgo.gamesites.cz/dema/index.php?server=1v1Arena2" },
						{ ip: "82.208.17.101:27372", demos: "https://csgo.gamesites.cz/dema/index.php?server=1v1Arena3" },
						{ ip: "217.11.249.79:27793", demos: "https://csgo.gamesites.cz/dema/index.php?server=SniperWar" },
						{ ip: "82.208.17.109:27273", demos: "https://csgo.gamesites.cz/dema/index.php?server=SniperWar2" },
						{ ip: "82.208.17.101:27355", demos: "https://csgo.gamesites.cz/dema/index.php?server=Dust2" },
						{ ip: "217.11.249.84:27473", demos: "https://csgo.gamesites.cz/dema/index.php?server=MirageOnly" },
						{ ip: "82.208.17.101:27062", demos: "https://csgo.gamesites.cz/dema/index.php?server=MirageOnly2" },
						{ ip: "81.0.217.178:27080", demos: "https://csgo.gamesites.cz/dema/index.php?server=Public" },
						{ ip: "217.11.249.84:27173", demos: "https://csgo.gamesites.cz/dema/index.php?server=PublicExtra" },
						{ ip: "82.208.17.49:27314", demos: "https://csgo.gamesites.cz/dema/index.php?server=PistolWar" },
						{ ip: "82.208.17.50:27378", demos: "https://csgo.gamesites.cz/dema/index.php?server=Retakes" },
						{ ip: "82.208.17.105:27466", demos: "https://csgo.gamesites.cz/dema/index.php?server=Retakes2" },

					],
					banOrder: [
						{ reason: "Nadávky střední", time: 120, type: SB_CHAT_AND_VOICE },
						{ reason: "Nadávky velké", time: 720, type: SB_CHAT_AND_VOICE },
						{ reason: "Nadávky neúnosné", time: 2880, type: SB_CHAT_AND_VOICE },
						{ reason: "BunnyHop script", time: 10080, type: SB_GAME },
						{ reason: "WallHack", time: 0, type: SB_GAME },
						{ reason: "AimBot", time: 0, type: SB_GAME },
						{ reason: "MultiHack", time: 0, type: SB_GAME }
					]
				},
				{
					name: "Jump",
					sourcebans: "https://banlist.gamesites.cz/csgo/jump/",
					hlstats: "http://hlstats.fakaheda.eu/hlxce_189275/hlstats.php",
					forumSections: [
						{ fid: 992, shortname: "PP" }
					],
					servers: [
						{ ip: "82.208.17.101:27240", demos: "https://csgo.gamesites.cz/dema/index.php?server=Bhop" },
						{ ip: "82.208.17.49:27175", demos: "https://csgo.gamesites.cz/dema/index.php?server=Minigames" },
						{ ip: "82.208.17.102:27112", demos: "https://csgo.gamesites.cz/dema/index.php?server=Surf" },
						{ ip: "82.208.17.105:27597", demos: "https://csgo.gamesites.cz/dema/index.php?server=SurfCombat" },
						{ ip: "82.208.17.49:27774", demos: "https://csgo.gamesites.cz/dema/index.php?server=SurfRPG" }
					],
					banOrder: [
						{ reason: "Nadávky střední", time: 120, type: SB_CHAT_AND_VOICE },
						{ reason: "Nadávky velké", time: 720, type: SB_CHAT_AND_VOICE },
						{ reason: "Nadávky neúnosné", time: 2880, type: SB_CHAT_AND_VOICE },
						{ reason: "WallHack", time: 0, type: SB_GAME },
						{ reason: "AimBot", time: 0, type: SB_GAME },
						{ reason: "MultiHack", time: 0, type: SB_GAME }
					]
				},
				{
					name: "TTT",
					sourcebans: "https://banlist.gamesites.cz/csgo/ttt/",
					hlstats: "http://hlstats.fakaheda.eu/hlxce_205007/hlstats.php",
					forumSections: [
						{ fid: 1105, shortname: "PP" },
						{ fid: 1216, shortname: "AA" }
					],
					servers: [
						{ ip: "217.11.249.84:27482", demos: "https://csgo.gamesites.cz/dema/index.php?server=TTT1" },
						{ ip: "81.0.217.179:27976", demos: "https://csgo.gamesites.cz/dema/index.php?server=TTT2" }
					],
					banOrder: [
						{ reason: "Nadávky střední", time: 120, type: SB_CHAT_AND_VOICE },
						{ reason: "Nadávky velké", time: 720, type: SB_CHAT_AND_VOICE },
						{ reason: "Nadávky neúnosné", time: 2880, type: SB_CHAT_AND_VOICE },
						{ reason: "Fake info", time: 30, type: SB_CHAT_AND_VOICE },
						{ reason: "Týmování", time: 120, type: SB_GAME, menuIcon: "TTT" },
						{ reason: "Zneužívání bloků", time: 180, type: SB_GAME, menuIcon: "TTT" },
						{ reason: "Random kill", time: 240, type: SB_GAME, menuIcon: "TTT" },
						{ reason: "Random hity", time: 240, type: SB_GAME, menuIcon: "TTT" },
						{ reason: "Baiting", time: 240, type: SB_GAME, menuIcon: "TTT" },
						{ reason: "Bugování pod mapu", time: 360, type: SB_GAME, menuIcon: "TTT" },
						{ reason: "Ghosting in-game", time: 2880, type: SB_GAME, menuIcon: "TTT" },
						{ reason: "Ghosting out of game", time: 10080, type: SB_GAME, menuIcon: "TTT" },
						{ reason: "BunnyHop script", time: 10080, type: SB_GAME },
						{ reason: "MultiHack", time: 0, type: SB_GAME }
					]
				}
			]
		}
	]
};
