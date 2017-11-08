const path = require(`path`)
const cp = require(`child_process`)
const file_util = require(`../util/file_util.js`)

// GLOBAL VARIABLES
// ----------------------------------//
var mapPath, map, rootPath, stats, metas, model = {}
    mapPath = process.argv[2]
    map = file_util.methods.readJSON(mapPath)
    rootPath = map.rootDir

// mother function
function modelInit (map) {
  console.log(`\x1b[35m%s\x1b[0m`, `//==================================//`)
  console.log(`\x1b[35m%s\x1b[0m`, `Hello! Modeling process initiated! ^_^`)
	// console.log(`\x1b[35m%s\x1b[0m`, `Now moving all files in the "${mapPath}" directory to the "${destination}" directory`)
	// console.log(`\x1b[35m%s\x1b[0m`, `This may take a while`)
  console.log(`\x1b[35m%s\x1b[0m`, `//==================================//`)

  mainLoop(map.rootDir, map.data)

	// console.log(map.meta.fileCount)

  for (key in model) {
    if (model[key] != map.meta.fileCount) {
      console.log(`outlier: ${key}`)

      delete model[key]
    }
  }

  console.log(model)
}

function mainLoop (thisDir, tree) {
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
    if (thisDir == map.rootDir) console.log(`\x1b[31m%s\x1b[0m`, `ERROR: EMPTY ROOT DIR (${thisDir})`)
	// If else, something went wrong
  } else { console.log(`\x1b[31m%s\x1b[0m`, `ERROR: UNMAPPED DIR (${thisDir})`) }
}

function dirLoop (parentDir, dirObj) { // console.log(`this dir, ${parentDir}, has dirs.`)
	// loop over the dirs
  for (dir in dirObj.dirs) {
		// call mainLoop to check dirs for files & sub dirs
    mainLoop(path.join(parentDir, dir), dirObj.dirs[dir])
  }
}

function fileLoop (parentDir, dirObj) { // console.log(`this dir, ${parentDir}, has files.`)
	// loop over the files
  for (var i = 0; i < dirObj.files.length; i++) {
		// local vars
    let fileName = dirObj.files[i]

    stats = dirObj.fileStats[fileName].stats
    metas = dirObj.fileStats[fileName].meta

    for (stat in stats) { // console.log({stat, value: stats[stat]})
      model[stat] = (model.hasOwnProperty(stat)) ? model[stat] + 1 : 1
    }

    for (met in metas) { // console.log({met, value: metas[met]})
      model[met] = (model.hasOwnProperty(met)) ? model[met] + 1 : 1
    }

    console.log(`\x1b[36m%s\x1b[0m`, fileName)
		// console.log(`\x1b[36m%s\x1b[0m`, dirObj.fileStats[fileName].stats)
		// console.log(`\x1b[36m%s\x1b[0m`, dirObj.fileStats[fileName].meta)
    console.log(`\x1b[36m%s\x1b[0m`, `//==================================//`)
  }
}

modelInit(map)
