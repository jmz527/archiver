const chai = require(`chai`)

const main_util = require(`../util/main_util`)
const file_util = require(`../util/file_util`)
const map_util = require(`../util/mapper_util`)


// MAIN UTIL LIBRARY
// =========================================================== //
describe(`Main utility library`, () => {

	it(`GenUUID returns a string`, () => {
		chai.expect(main_util.methods.genUUID()).to.be.a(`string`);
	})

	it(`GenUUID generates proper UUIDs`, () => {
		let regex, uuid
			regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
			uuid = main_util.methods.genUUID()

		chai.expect(regex.test(uuid)).to.be.true;
	})

	it(`_escapesString escapes single-quotes`, () => {
		let str = main_util.methods._escapeString(`This is a demo string with 'single-quotes'`)

		chai.assert.equal(str, `This is a demo string with \\\'single-quotes\\\'`)
	})

	it(`_escapesString escapes double-quotes`, () => {
		let str = main_util.methods._escapeString(`This is a demo string with "double-quotes"`)

		chai.assert.equal(str, `This is a demo string with \\"double-quotes\\"`)
	})

})


// FILE UTIL LIBRARY
// =========================================================== //
describe(`File utility library`, () => {

	it(`pather method returns proper paths`, () => {
		chai.expect(file_util.methods.pather([`..`, `test`], `index.test.js`)).to.be.a(`string`)
		chai.expect(file_util.methods.pather([`..`, `test`], `index.test`, `js`)).to.be.a(`string`)
		chai.expect(file_util.methods.pather(`../test`, `index.test.js`)).to.be.a(`string`)
		chai.expect(file_util.methods.pather(`../test`, `index.test`, `js`)).to.be.a(`string`)

		chai.expect(file_util.methods.pather([`..`, `test`], `index.test.js`)).to.equal(`../test/index.test.js`)
		chai.expect(file_util.methods.pather([`..`, `test`], `index.test`, `js`)).to.equal(`../test/index.test.js`)
		chai.expect(file_util.methods.pather(`../test`, `index.test.js`)).to.equal(`../test/index.test.js`)
		chai.expect(file_util.methods.pather(`../test`, `index.test`, `js`)).to.equal(`../test/index.test.js`)
	})


	it(`checkFor method properly checks`, () => {
		chai.expect(file_util.methods.checkFor(`test/index.test.js`)).to.be.true
		chai.expect(file_util.methods.checkFor(`test/not.a.test.js`)).to.be.false
	})


	it(`hasFiles method properly checks for files`, () => {
		chai.expect(file_util.methods.hasFiles(`test`)).to.be.true
		chai.expect(file_util.methods.hasFiles(`test/empty_dir`)).to.be.false
	})


	it(`hasDirs method properly checks for directories`, () => {
		chai.expect(file_util.methods.hasDirs(`test`)).to.be.true
		chai.expect(file_util.methods.hasDirs(`test/empty_dir`)).to.be.false
	})


	it(`getFiles method properly gets files`, () => {
		chai.expect(file_util.methods.getFiles(`test`)).to.be.a(`array`)
		chai.expect(file_util.methods.getFiles(`test`)).to.include.members([`index.test.js`])
		chai.expect(file_util.methods.getFiles(`test/empty_dir`)).to.include.members([])
	})


	it(`getDirs method properly gets directories`, () => {
		chai.expect(file_util.methods.getDirs(`test`)).to.be.a(`array`)
		chai.expect(file_util.methods.getDirs(`test`)).to.include.members(['empty_dir'])
		chai.expect(file_util.methods.getDirs(`test/empty_dir`)).to.include.members([])
	})

});


// MAPPER UTIL LIBRARY
// =========================================================== //
describe(`Mapper utility library`, () => {

	it(`spawnMDLS method returns properly`, () => {

		map_util.methods.spawnMDLS(`test/index.test.js`, (data) => {

			chai.expect(data).to.be.a(`object`)
			chai.expect(data).to.include({kMDItemFSName: `index.test.js`});
			chai.expect(data).to.include({kMDItemKind: `JavaScript script`});

		})

	})

});