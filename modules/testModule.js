exports.config = {
	title: "Demo Module",
	version: 0.1,
};

// You NEED to use Async on all the programn else user will be prompted back to the menu.

exports.Init = async function(Render)
{
	console.clear();
	console.log(`Module Started !`);
	await new Promise(r => setTimeout(r, 2000));
}
