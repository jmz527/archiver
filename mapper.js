var path = require('path');
var mainUtil = require("./util/main_util.js");


// GLOBAL VARIABLES
//----------------------------------//
var rootDir, finalDir, mapper;
	rootDir = path.join("./target_dirs/", process.argv[2] || '/testing_grounds');
	resultingFile = path.join("./data/", process.argv[3] || 'map');
	mapper = { // This is the main object that we will be using
		rootDir: rootDir,
		data: null,
		meta: { fileCount: 0, dirCount: 0, depth: 0 }
	};
	// console.log({rootDir, resultingFile});


// DIRECTORY ANALYSIS & MAPPING
//--------------------------------------------------------------------------//
// Top-level function that starts us off - maps a directory
function mapperInit(Mapr) {
	let dirExists, hasFiles, hasDirs;
		dirExists = mainUtil.checkFor(['.'], Mapr.rootDir, null);
		hasFiles = mainUtil.hasFiles(Mapr.rootDir);
		hasDirs = mainUtil.hasDirs(Mapr.rootDir);

	if (dirExists && (hasFiles || hasDirs)) {

		console.log(`//==================================//`);
		console.log(`Hello! Mapper process initiated! ^_^`);
		console.log(`Now mapping the "./${Mapr.rootDir}" directory.`);
		console.log(`//==================================//`);

		Mapr.data = {};
		Mapr.meta.depth++;
		Mapr = mapDirectory(Mapr, Mapr.data, Mapr.rootDir);

	} else if (!hasFiles && !hasDirs) {

		console.log(`ERROR: the "./${Mapr.rootDir}" directory is empty.`);
	}

	return Mapr;
}

function mapDirectory(Mapr, Obj, pathStr) {

	// If the target dir has child dirs
	if (mainUtil.hasDirs(pathStr)) {
		Obj['dirs'] = {}; // make a dictionary for them and round them up
		Mapr.meta.depth++;
		Obj = directoryRoundup(Mapr, Obj, pathStr);

	} else if (!mainUtil.hasDirs(pathStr)) { // Else, set to null
		Obj['dirs'] = null;
	}

	// If the target dir has Files
	if (mainUtil.hasFiles(pathStr)) {
		Obj['files'] = []; // make an array for them and round them up
		Obj = filesRoundup(Mapr, Obj, pathStr);

	} else if (!mainUtil.hasFiles(pathStr)) { // Else, set to null
		Obj['files'] = null;
	}

	return Obj;
}

// Maps the dirs within a given dir (defined by the pathStr) to the Obj
function directoryRoundup(Mapr, Obj, pathStr) {
	let dirPath, dirs = mainUtil.getDirs(pathStr);

	dirs.forEach(function(dir) {
		Obj.dirs[dir] = {};
		dirPath = path.join(pathStr, dir);

		Obj.dirs[dir] = mapDirectory(Mapr, Obj.dirs[dir], dirPath); // <-- Recursive function here
		Mapr.meta.dirCount++;

	})

	return Obj;
}

// Maps the files in a directory to our data Obj
function filesRoundup(Mapr, Obj, pathStr) {
	let files = mainUtil.getFiles(pathStr);

	Obj.files = files;
	Mapr.meta.fileCount+=files.length;

	return Obj;
}


mapper.data = mapperInit(mapper);

mainUtil.writeFile(['.'], resultingFile, 'json', mapper);

console.log(`//==================================//`);



