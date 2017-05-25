var path = require('path');
var mainUtil = require("./util.js");


// GLOBAL VARIABLES
//----------------------------------//
var targetDir, mapper;
	targetDir = path.join(".", process.argv[2] || './for_testing');
	mapper = { // This is the main object that we will be using
		targetDir: targetDir,
		data: null,
		meta: { fileCount: 0, dirCount: 0, depth: 0 }
	};


// DIRECTORY ANALYSIS & MAPPING
//--------------------------------------------------------------------------//
// Top-level function that starts us off - maps a directory
function mapperInit(Mapr) {

	console.log(`//==================================//`);
	console.log(`Hello! Mapper process initiated! ^_^`);
	console.log(`Now mapping the "./${Mapr.targetDir}" directory.`);
	console.log(`//==================================//`);

	let dirExists = mainUtil.checkFor(['.'], Mapr.targetDir, '');
	let hasFiles = mainUtil.hasFiles(Mapr.targetDir);
	let hasDirs = mainUtil.hasDirs(Mapr.targetDir);

	console.log({ dirExists, hasFiles, hasDirs });

	// if (hasFiles || hasDirs) {
	// 	Mapr.data = {};
	// 	Mapr = mapDirectory(Mapr, Mapr.data, Mapr.targetDir);
	// } else if (!hasFiles && !hasDirs) {
	// 	console.log(`ERROR: the "./${Mapr.targetDir}" directory is empty.`);
	// }

	return Mapr;
}

function mapDirectory(Mapr, Obj, pathStr) {

	// console.log({pathStr});

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

// Maps the dirs within a given dir (defined by the pathStr) to the object
function directoryRoundup(Mapr, Obj, pathStr) {
	let dirPath, dirs = mainUtil.getDirs(pathStr);

	// console.log(`Directories within ${pathStr}: [${dirs}]`);
	// console.log(`//==================================//`);

	dirs.forEach(function(dir) {
		Obj.dirs[dir] = {};
		dirPath = path.join(pathStr, dir);

		Obj.dirs[dir] = mapDirectory(Mapr, Obj.dirs[dir], dirPath); // <-- Recursive function here
		Mapr.meta.dirCount++;

	})

	return Obj;
}

// Maps the files in a directory to our data object
function filesRoundup(Mapr, Obj, pathStr) {
	let name, files = mainUtil.getFiles(pathStr);

	// console.log(`Files within ${pathStr}: [${files}]`);
	// console.log(`//==================================//`);

	Obj.files = files;
	Mapr.meta.fileCount+=files.length;

	return Obj;
}


mapper.data = mapperInit(mapper);

console.log(mapper);

// mainUtil.writeFile(['.'], 'map', 'json', mapper);

console.log(`//==================================//`);



