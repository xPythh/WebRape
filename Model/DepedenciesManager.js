const util = require('util');
const exec = require('child_process').exec;

var modules = [ ]
exports.Start = async function(vars)
{
    for (var moduleName of modules)
    {
        console.log(`${vars.green}[${vars.white}Dep'Mgr${vars.green}]${vars.white} Checking for ${moduleName}`)
        try { 
            await require.resolve(moduleName);
            console.log(`${vars.green}[${vars.white}Dep'Mgr${vars.green}]${vars.white} ${moduleName} is installed.`)
        } catch(e) {
            console.log(`${vars.green}[${vars.white}Dep'Mgr${vars.green}]${vars.white} Installing ${moduleName}`);
            await execPromise(`npm i ${moduleName}`);
            console.log(`${vars.green}[${vars.white}Dep'Mgr${vars.green}]${vars.white} ${moduleName} is now installed.`)
        }
    }
}

exports.AddModule = async function(moduleName) { modules.push(moduleName); }

function execPromise(command) {
    return new Promise(function(resolve, reject) {
        exec(command, (error, stdout, stderr) => {
            if (error) { reject(error); return; }
            resolve(stdout.trim());
        });
    });
}