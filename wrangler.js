const path = require(`path`)
const mainUtil = require(`./util/main_util.js`)
const mapUtil = require(`./util/mapper_util.js`)


// GLOBAL VARIABLES
//----------------------------------//
var mapPath, mapName, map, thisPath, stats, mdStats
	mapPath = process.argv[2] || `./data/map.json`
	mapName = path.basename(mapPath)
	map = mainUtil.readFile(mapPath)

// mother function
function wranglerInit(map) {
	let newMap = { rootDir: map.rootDir, data: null, meta: map.meta };

	console.log(`//==================================//`)
	console.log(`Hello! Data wrangling process initiated! ^_^`)
	console.log(`Now traversing the "${mapPath}" directory.`)
	console.log(`//==================================//`)


	mainLoop(map.rootDir, map.data, (data) => { // console.log(data)

		// TEMP SOLUTION: setTimeout allows for wrangling the data within small dir heirarchies
		// But this will not work for the deeper directories

		setTimeout(() => {
			// drape the new data with original meta
			newMap.data = data
			// write it to a new json file
			mainUtil.writeFile([__dirname, `data`], `deep_${mapName.split('.')[0]}`, `json`, newMap);

			console.log(`//==================================//`);

		}, 1000)


	})

}


function mainLoop(thisDir, tree, callback) {
	// If dirs prop, files prop both exist, and both are not null
	if (tree.hasOwnProperty(`dirs`) && tree[`dirs`] != null && tree.hasOwnProperty(`files`) && tree[`files`] != null) {
		// resolve multiple promises
		Promise.all([dirLoop(thisDir, tree), fileLoop(thisDir, tree)]).then(() => { callback(tree) })
	// If dirs, but no files
	} else if (tree.hasOwnProperty(`dirs`) && tree[`dirs`] != null && (!tree.hasOwnProperty(`files`) || tree[`files`] == null)) {
		// pipe arr of dirs returned from dirLoop to callback
		Promise.all(dirLoop(thisDir, tree)).then((dirArr) => { callback(dirArr) })
	// If files, but no dirs
	} else if (tree.hasOwnProperty(`files`) && tree[`files`] != null && (!tree.hasOwnProperty(`dirs`) || tree[`dirs`] == null)) {
		// pipe file promises from fileLoop straight to callback
		Promise.all([fileLoop(thisDir, tree)]).then((files) => { callback(files) })
	// If neither files nor dirs
	} else if (tree.hasOwnProperty(`dirs`) && tree[`dirs`] == null && tree.hasOwnProperty(`files`) && tree[`files`] == null) {
		// Check if it's the root dir
		if (thisDir==map.rootDir) console.log(`ERROR: EMPTY ROOT DIR (${thisDir})`)
	// If else, something went wrong
	} else { console.log(`ERROR: UNMAPPED DIR (${thisDir})`) }

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
		dirObj[`fileStats`] = {};

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
					// resolve inner promise
					resolve(dirObj)
				})

			})
			mdStats.then((dirObj) => {
				// If it`s the last file, resolve outer promise
				if (i == dirObj.files.length) { success(dirObj) }

			})

		}

	})

}


wranglerInit(map)