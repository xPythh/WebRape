exports.Logo = function()
{
  return ` \\ \\        / / | |   |  __ \\                 
  \\ \\  /\\  / /__| |__ | |__) |__ _ _ __   ___ 
   \\ \\/  \\/ / _ \\ '_ \\|  _  // _\\ | '_ \\ / _ \\
    \\  /\\  /  __/ |_) | | \\ \\ (_| | |_) |  __/
     \\/  \\/ \\___|_.__/|_|  \\_\\__,_| .__/ \\___|
                                  | |         
                                  |_|         `
}

exports.MainMenu = async function (term, modules)
{
	console.log(this.Logo());
	var menuContent = [];
	for (var newModule of modules)
		menuContent.push(newModule["name"])
	menuContent.push("Exit");

	term.cyan( 'Please choose what do you want to do.\n' ) ;
	var response =await term.singleColumnMenu( menuContent ).promise;
	await response;
	if (modules[response["selectedIndex"]])
		return await modules[response["selectedIndex"]]["script"]["Init"]();
	else {
		console.clear();
		term.red('Program will now close, thanks for using us !');
		process.exit(0);
	}
}