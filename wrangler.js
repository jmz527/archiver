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
	let newMap = { rootDir: map.rootDir, data: null, meta: map.meta };

	mainLoop(map.rootDir, map.data, (data) => { // console.log(data)

		newMap.data = data

		mainUtil.writeFile([__dirname, 'data'], 'deep_map', 'json', newMap);

	})

}


function mainLoop(thisDir, tree, callback) {
	// If dirs prop, files prop both exist, and both are not null
	if (tree.hasOwnProperty('dirs') && tree['dirs'] != null && tree.hasOwnProperty('files') && tree['files'] != null) {
		// resolve multiple promises
		Promise.all([dirLoop(thisDir, tree), fileLoop(thisDir, tree)]).then(() => { // console.log('ALL PROMISE SUCCESS!!!')

			callback(tree)

		})
	// If 
	} else if (tree.hasOwnProperty('dirs') && tree['dirs'] != null && (!tree.hasOwnProperty('files') || tree['files'] == null)) {

		callback(dirLoop(thisDir, tree))

	} else if (tree.hasOwnProperty('files') && tree['files'] != null && (!tree.hasOwnProperty('dirs') || tree['dirs'] == null)) {

		callback(fileLoop(thisDir, tree))

	} else {

		console.log(`ERROR: UNMAPPED DIR`)

	}

}

function dirLoop(parentDir, dirObj, callback) { // console.log(`this dir, ${parentDir}, has dirs.`)
	// create a dir arr for new dir formations
	let dirArr = [];
	// loop over the dirs
	for (dir in dirObj.dirs) {
		// call mainLoop to check dirs for files & sub dirs
		mainLoop(path.join(parentDir, dir), dirObj.dirs[dir], (newDir) => {
			// push to dirArr within callback
			dirArr.push(newDir)

		})

	}
	// return dirArr
	return dirArr
}

function fileLoop(parentDir, dirObj) { // console.log(`this dir, ${parentDir}, has files.`)

	return new Promise((success, err) => {
		// create a filesStats obj in dir
		dirObj['fileStats'] = {};

		for (var i = 0; i < dirObj.files.length; i++) {
			// local vars
			let fileName = dirObj.files[i];
			// combine the parent directory path and file name to get the relative path for the file
			thisPath = path.join(parentDir, fileName)
			// get the file system stats
			stats = mapUtil.fsStats(thisPath)
			// add these to the new fileStats dict
			dirObj.fileStats[fileName] = { relPath: thisPath, stats, meta: null }

			// now create a promise for the metadata
			mdStats = new Promise((resolve, reject) => {
				// spawn the metadata list command, and resolve promise within callback
				mapUtil.spawnMDLS(thisPath, (metaData) => {
					// then add metadata to the new fileStats dict
					dirObj.fileStats[fileName].meta = metaData

					resolve(dirObj)
				})

			})
			mdStats.then((dirObj) => {
				// If it's the last file, resolve outer promise
				if (i == dirObj.files.length) { success(dirObj) }

			})

		}

	})

}



wranglerInit(map)