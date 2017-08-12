const path = require('path');
const mainUtil = require("./util/main_util.js");
const mapUtil = require("./util/mapper_util.js");


// GLOBAL VARIABLES
//----------------------------------//
var mapPath, map, thisPath, stats, mdStats;
	mapPath = process.argv[2] || './data/map.json';
	map = mainUtil.readFile(mapPath);

	// console.log(mapPath);
	// console.log(map);


// mother function
function wranglerInit(map) {

	// console.log(map.rootDir)
	// console.log(map.meta)

	mainLoop(map.rootDir, map.data, (newMap) => {
		mainUtil.writeFile([__dirname, 'data'], 'deep_map', 'json', newMap);
	})

}


function mainLoop(thisDir, tree, callback) {

	// console.log({thisDir})

	if (tree.hasOwnProperty('dirs') && tree['dirs'] != null) {
		dirLoop(thisDir, tree, (newTree) => { tree = newTree })
	}

	if (tree.hasOwnProperty('files') && tree['files'] != null) {
		fileLoop(thisDir, tree, (newTree) => { tree = newTree })
	}


	callback(tree)
}

function dirLoop(parentDir, dirObj, callback) { // console.log(`this dir, ${parentDir}, has dirs.`)

	for (dir in dirObj.dirs) {
		mainLoop(path.join(parentDir, dir), dirObj.dirs[dir], (tree) => { dirObj.dirs[dir] = tree })

	}

	callback(dirObj)
}

function fileLoop(parentDir, dirObj, callback) { // console.log(`this dir, ${parentDir}, has files.`)
	dirObj['fileStats'] = {};

	dirObj.files.forEach((file) => {
		// combine the parent directory path and file name to get the relative path for the file
		thisPath = path.join(parentDir, file)
		// get the file system stats
		stats = mapUtil.fsStats(thisPath)
		// add these to the new fileStats dict
		dirObj.fileStats[file] = { relPath: thisPath, stats }

		// now create a promise for the metadata
		mdStats = new Promise((resolve, reject) => {
			// spawn the metadata list command, and resolve promise within callback
			mapUtil.spawnMDLS(thisPath, (metaData) => { resolve(metaData) })

		})
		mdStats.then((data) => {
			// then add metadata to the new fileStats dict
			dirObj.fileStats[file]['meta'] = data
			// send it through the callback
			callback(dirObj);
		})

	})

}



wranglerInit(map)