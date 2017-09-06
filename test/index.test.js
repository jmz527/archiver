const chai = require(`chai`)

const file_util = require(`../util/file_util`)
const map_util = require(`../util/mapper_util`)


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