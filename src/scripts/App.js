import React, { Component } from 'react'
import DirTree from './DirTree'

class App extends Component {
// Top lvl component of our React comp hierarchy

  constructor (props, context) {
    super(props, context)

    this.state = {
      treeData: [
        {
          "name": "Root",
          "children": [
            {
              "name": "Level 1 - A",
              "children": [
                {
                  "name": "Level 2 - A",
                },
                {
                  "name": "Level 2 - B",
                }
              ]
            },
            {
              "name": "Level 1 - B",
            }
          ]
        }
      ]
    }
  }

  render () {
    return (
      <div className='app'>
        <DirTree treeData={this.state.treeData} />
      </div>
    )
  }
}

export default App