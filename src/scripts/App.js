import React, { Component } from 'react'

class App extends Component {
// Top lvl component of our React comp hierarchy

  constructor (props, context) {
    super(props, context)
  }

  render () {
    return (
      <div className='app'>
        <h1>Hello World!</h1>
      </div>
    )
  }
}

export default App
