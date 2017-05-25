var mainUtil = require("./util.js");

// TODO: DIRECTORY ANALYSIS & MAPPING

console.log(`archiver mapper process initiated!`);
console.log(`mapping the ${process.argv[2]} directory`);

var targetDir = process.argv[2];

// This is the main object that we will be using
var mapper = { targetDir: targetDir, data: null };

// Top-level function that starts us off - maps a directory
function mapDirectory(Mapr) {
	Mapr.data = {};

	let hasFiles = mainUtil.hasFiles(Mapr.targetDir);
	let hasFolders = mainUtil.hasFolders(Mapr.targetDir);

	console.log({ hasFiles, hasFolders });

	// foldersRoundup(Mapr);
	// filesRoundup(Mapr);


	return Mapr;
}

// Maps the files in a directory to our data object
function filesRoundup(Mapr) {
	let name, files = mainUtil.getFiles(Mapr.targetDir);

	console.log(`files: ${files}`);

	// files.forEach(function(file) {
	// 	name = file.split('.')[0];

	// 	console.log(name);
	// 	// results[name] = mainUtil.readFile(['for_testing'], name, 'json');
	// })

	// mainUtil.writeFile(['.'], 'map', 'json', results);

	return Mapr;
}

// Maps the folders in a directory to our data object
function foldersRoundup(Mapr) {
	let name, folders = mainUtil.getFolders(Mapr.targetDir);

	console.log(`folders: ${folders}`);

	return Mapr;
}


mapDirectory(mapper);




