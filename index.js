const repl = require('repl')
const cp = require('child_process')
const r = repl.start({ prompt: '> ', eval: myEval, writer: myWriter })

console.log(`//==================================//`)
console.log(`Hello! Archiver initiated! ^_^`)
console.log(`What direcotry would you like to archive?`)

function myEval(cmd, context, filename, callback) {
	callback(null, cmd)
}

function myWriter(rootDir) {

	// mapDir(rootDir) // <-- This doesn't work. Don't know why.
	return rootDir.toUpperCase()
}



// function mapDir(rootDir) {
// 	console.log(`//==================================//`)
// 	console.log(`Now mapping the "${rootDir}" directory.`)
// 	cp.spawn(`node mapper.js ${rootDir}`)
// }

// function wrangleDir(mappedDir) {
// 	console.log(`//==================================//`)
// 	console.log(`Now wrangling the "${mappedDir}" directory.`)
// 	cp.spawn(`node wrangler.js ${mappedDir}`)
// }