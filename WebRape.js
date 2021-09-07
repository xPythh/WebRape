console.clear();

var vars = require("./Model/Variables.js");
var Render = require("./Model/Render.js");
var DepedenciesManager = require("./Model/DepedenciesManager.js");

// Make Modules Variables Globales
var term;
var request;
var fs;

(async () => {
	console.log(Render.Logo())
	await DepedenciesManager.Start(vars);
	await new Promise(r => setTimeout(r, 20));
	
	// Load Installed Depedencies
	term = require("terminal-kit").terminal;
	request = require("request");
	fs = require("fs");
	MainMenu();
})();

async function MainMenu()
{
	console.clear()
	var modules = await GetConfigs();
	await Render.MainMenu(term, modules);
	await MainMenu();
}


async function GetConfigs()
{
	var modules = fs.readdirSync(`./modules/`);
	var loadedModules = [];
	for (var newModuleName of modules)
	{
		try {
			var newModule = require(`./modules/${newModuleName}`);
			if (typeof newModule["config"] === 'undefined') {
				console.log(`${vars.red}[${vars.white}ERROR${vars.red}]${vars.white} Error When Loading module ${vars.red}${newModuleName.replace(".js", "")}${vars.white}`);
				console.log(`Module doesn't contains Config Variable.`);
				process.exit(0);
			} else if (typeof newModule["config"]["title"] === 'undefined') {
				console.log(`${vars.red}[${vars.white}ERROR${vars.red}]${vars.white} Error When Loading module ${vars.red}${newModuleName.replace(".js", "")}${vars.white}`);
				console.log(`Module doesn't have a Config Name`);
				process.exit(0);
			} else if (typeof newModule["config"]["version"] === 'undefined') {
				console.log(`${vars.red}[${vars.white}ERROR${vars.red}]${vars.white} Error When Loading module ${vars.red}${newModuleName.replace(".js", "")}${vars.white}`);
				console.log(`Module doesn't have a Config Version`);
				process.exit(0);
			}

			loadedModules.push({
				name: newModule["config"]["title"],
				version: newModule["config"]["version"],
				script: newModule
			});

		} catch (error) {
			console.log(`${vars.red}[${vars.white}ERROR${vars.red}]${vars.white} Error When Loading module ${vars.red}${newModuleName.replace(".js", "")}${vars.white}`);
			console.log(error)
			console.log(`${vars.red}[${vars.white}ERROR${vars.red}]${vars.white} Exitting.`);
			process.exit(0);
		}
		
	}
	return loadedModules;
}



// console.log(`${vars["red"]}hey${vars["white"]}`)