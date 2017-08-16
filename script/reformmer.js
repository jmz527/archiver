const path = require(`path`)
const cp = require(`child_process`)
const mainUtil = require(`../util/main_util.js`)


// GLOBAL VARIABLES
//----------------------------------//
var mapPath, map, rootPath, destination, thisPath
	mapPath = process.argv[2]
	map = mainUtil.readFile(mapPath)
	rootPath = map.rootDir
	destination = process.argv[3]


// mother function
function reformInit(map) {
	// let newMap = { rootDir: map.rootDir, data: null, meta: map.meta };

	console.log(`//==================================//`)
	console.log(`Hello! Reformation process initiated! ^_^`)
	console.log(`Now moving all files in the "${mapPath}" directory to the "${destination}" directory`)
	console.log(`This may take a while`)
	console.log(`//==================================//`)

	mainLoop(map.rootDir, map.data)
}


function mainLoop(thisDir, tree) {
	// If dirs prop, files prop both exist, and both are not null
	if (tree.hasOwnProperty(`dirs`) && tree[`dirs`] != null && tree.hasOwnProperty(`files`) && tree[`files`] != null) {

		dirLoop(thisDir, tree)

		fileLoop(thisDir, tree)

	// If dirs, but no files
	} else if (tree.hasOwnProperty(`dirs`) && tree[`dirs`] != null && (!tree.hasOwnProperty(`files`) || tree[`files`] == null)) {

		dirLoop(thisDir, tree)

	// If files, but no dirs
	} else if (tree.hasOwnProperty(`files`) && tree[`files`] != null && (!tree.hasOwnProperty(`dirs`) || tree[`dirs`] == null)) {

		fileLoop(thisDir, tree)

	// If neither files nor dirs
	} else if (tree.hasOwnProperty(`dirs`) && tree[`dirs`] == null && tree.hasOwnProperty(`files`) && tree[`files`] == null) {
		// Check if it's the root dir
		if (thisDir==map.rootDir) console.log(`ERROR: EMPTY ROOT DIR (${thisDir})`)
	// If else, something went wrong
	} else { console.log(`ERROR: UNMAPPED DIR (${thisDir})`) }

}

function dirLoop(parentDir, dirObj) { // console.log(`this dir, ${parentDir}, has dirs.`)
	// loop over the dirs
	for (dir in dirObj.dirs) {
		// call mainLoop to check dirs for files & sub dirs
		mainLoop(path.join(parentDir, dir), dirObj.dirs[dir])

	}
}

function fileLoop(parentDir, dirObj) { // console.log(`this dir, ${parentDir}, has files.`)
	// loop over the files
	for (var i = 0; i < dirObj.files.length; i++) {
		// local vars
		let fileName = dirObj.files[i];
		// combine the parent directory path and file name to get the relative path for the file
		thisPath = path.join(parentDir, fileName) // console.log(thisPath)

		cp.exec(`mv -v ${path.join(thisPath)} ${destination}/.`, (err, stdout, stderr) => {
			if (err) throw err

			console.log(stdout);
		});

	}

}


reformInit(map)