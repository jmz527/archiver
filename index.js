var mainUtil = require("./util.js");

// TODO: DIRECTORY ANALYSIS & MAPPING

var targetDir = "./for_testing";

// This is the main object that we will be using
var mapper = {
	targetDir: targetDir,
	data: null
}

// Top-level function that starts us off - maps a directory
function mapDirectory(Mapr) {
	Mapr.data = {};

	filesRoundup(Mapr);


	return Mapr;
}

// Checks a directory for files, returns bool
// function hasFiles() {}

// Checks a directory for folders, returns bool
// function hasFolders() {}

// Maps the files in a directory to our data object
function filesRoundup(Mapr) {
	let name, files = mainUtil.getFiles(Mapr.targetDir);

	console.log(files);

	files.forEach(function(file) {
		name = file.split('.')[0];

		console.log(name);
		// results[name] = mainUtil.readFile(['for_testing'], name, 'json');
	})

	// mainUtil.writeFile(['.'], 'map', 'json', results);

	return Mapr;
}

// Maps the folders in a directory to our data object
// function foldersRoundup(Mapr) {
// 	return Mapr;
// }




mapDirectory(mapper);



// TODO: FILE ANALYSIS & TRACKING

// TODO: DIRECTORY REFORMATION

// TODO: DATABASE SETUP

// TODO: ARCHIVING PROCEDURES

// TODO: SEARCH, SORT, FILTERING DB QUERIES

// TODO: CATEGORIES & TAGGING

// TODO: PLAY COMMAND