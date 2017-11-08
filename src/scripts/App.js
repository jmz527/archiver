import React, { Component } from 'react'
import DirTree from './DirTree'
// import treeDataOriginal from './treeData_original'
// import treeData from './treeData'
// import treeDataRbc from '../../data/rbc_mock_data'
import treeData from '../../data/World'

class App extends Component {
// Top lvl component of our React comp hierarchy

  constructor (props, context) {
    super(props, context)

    this.state = { treeData }

    // this.state = {
    //   showing: 'treeDataOriginal',
    //   trees: { treeDataOriginal, treeData, treeDataRbc }
    // }
  }

  render () {
    const { trees, showing } = this.state
    return (
      <div className='app'>
        <p>{ JSON.stringify(treeData) }</p>

{/*

        <div>
           <button onClick={() => this.setState({showing: 'treeDataOriginal' })}>treeDataOriginal</button>
           <button onClick={() => this.setState({showing: 'treeData' })}>treeData</button>
           <button onClick={() => this.setState({showing: 'treeDataRbc' })}>treeDataRbc</button>
        </div>



        <DirTree treeData={trees[showing]} />


        <p>{ JSON.stringify(trees[showing])}</p>


*/}


      </div>
    )
  }
}

export default App