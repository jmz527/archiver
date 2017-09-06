const UTIL = require(`./file_util`)

switch(process.argv[2]) {
	case `checkFor`:
		UTIL.methods.checkFor(process.argv[3])
		break;
	case `hasFiles`:
		UTIL.methods.hasFiles(process.argv[3])
		break;
	case `hasDirs`:
		UTIL.methods.hasDirs(process.argv[3])
		break;
	case `getFiles`:
		UTIL.methods.getFiles(process.argv[3])
		break;
	case `getDirs`:
		UTIL.methods.getDirs(process.argv[3])
		break;
	case `beautify`:
		UTIL.methods.beautifyHTML(process.argv[3])
		break;
	case `minify`:
		UTIL.methods.minifyHTML(process.argv[3])
		break;
	default:
		console.log(`\x1b[31m%s\x1b[0m`, `${process.argv[2]} is not a proper command`)
		break;
}