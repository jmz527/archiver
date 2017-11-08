const path = require(`path`)
const file_util = require(`../util/file_util.js`)

// GLOBAL VARIABLES
// ----------------------------------//
var mapper = { // This is the main object that we will be using
  rootDir: process.argv[2],
  data: null,
  meta: { fileCount: 0, dirCount: 0 }
}
console.log({ rootDir: process.argv[2], finalDir: process.argv[3] })

// DIRECTORY ANALYSIS & MAPPING
// --------------------------------------------------------------------------//
// Top-level function that starts us off - maps a directory
const mapperInit = (Mapr) => {
  let dirExists, hasFiles, hasDirs
      dirExists = file_util.methods.checkFor(Mapr.rootDir)
      hasFiles = file_util.methods.hasFiles(Mapr.rootDir)
      hasDirs = file_util.methods.hasDirs(Mapr.rootDir)
  // console.log({dirExists, hasFiles, hasDirs})

  if (dirExists && (hasFiles || hasDirs)) {
    console.log(`\x1b[35m%s\x1b[0m`, `//==================================//`)
    console.log(`\x1b[35m%s\x1b[0m`, `Hello! Mapper process initiated! ^_^`)
    console.log(`\x1b[35m%s\x1b[0m`, `Now mapping the "${Mapr.rootDir}" directory.`)
    console.log(`\x1b[35m%s\x1b[0m`, `//==================================//`)

    Mapr.data = {}
    Mapr = mapDirectory(Mapr, Mapr.data, Mapr.rootDir)
  } else if (!hasFiles && !hasDirs) {
    console.log(`\x1b[31m%s\x1b[0m`, `ERROR: the "${Mapr.rootDir}" directory is empty.`)
  }

  return Mapr
}

const mapDirectory = (Mapr, Obj, pathStr) => {
	// If the target dir has child dirs
  if (file_util.methods.hasDirs(pathStr)) {
    Obj[`dirs`] = [] // make an array for them and round them up
    Obj = directoryRoundup(Mapr, Obj, pathStr)
  } else if (!file_util.methods.hasDirs(pathStr)) { // Else, set to null
    Obj[`dirs`] = null
  }

	// If the target dir has Files
  if (file_util.methods.hasFiles(pathStr)) {
    Obj[`files`] = [] // make an array for them and round them up
    Obj = filesRoundup(Mapr, Obj, pathStr)
  } else if (!file_util.methods.hasFiles(pathStr)) { // Else, set to null
    Obj[`files`] = null
  }

  return Obj
}

// Maps the dirs within a given dir (defined by the pathStr) to the Obj
const directoryRoundup = (Mapr, Obj, pathStr) => {
  let dirPath, dirs = file_util.methods.getDirs(pathStr)

  dirs.forEach((dir) => {
    let dirObj = { name: dir }
    dirPath = path.join(pathStr, dir)

    Obj.dirs.push(mapDirectory(Mapr, dirObj, dirPath)) // <-- Recursive function here
    Mapr.meta.dirCount++
  })

  return Obj
}

// Maps the files in a directory to our data Obj
const filesRoundup = (Mapr, Obj, pathStr) => {
  let files = file_util.methods.getFiles(pathStr)

  Obj.files = files.filter((file) => (file != `.DS_Store`))
  Mapr.meta.fileCount += Obj.files.length

  return Obj
}

mapper.data = mapperInit(mapper)

file_util.methods.saveJSON(process.argv[3], mapper)

// console.log(`\x1b[35m%s\x1b[0m`, `//==================================//`)
