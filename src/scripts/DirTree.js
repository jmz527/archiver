import * as d3 from "d3"
import React, { Component } from 'react'

class DirTree extends Component {
// D3 rendering of a file hierarchy

  constructor (props, context) {
    super(props, context)

    this.state = this.prepState(props)
    this.drawTree = this.drawTree.bind(this)
  }

  prepState({treeData={}}) {
    var margin = {top: 20, right: 120, bottom: 20, left: 120},
      width = 960 - margin.right - margin.left,
      height = 500 - margin.top - margin.bottom

    return { treeData, margin, width, height }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.prepState(nextProps))
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.data !== this.state.data
  }

  componentDidMount() {
    this.drawTree()
  }

  componentDidUpdate() {
    this.drawTree()
  }

  drawTree() {
    const { target } = this.refs
    const { treeData, height, width, margin } = this.state

    var i = 0, duration = 750, rootDir
    var tree = d3.layout.tree().size([height, width])
    var diagonal = d3.svg.diagonal().projection((d) => [d.y, d.x])

    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    rootDir = treeData.data
    rootDir.x0 = height / 2
    rootDir.y0 = 0
      
    update(rootDir)

    d3.select(self.frameElement).style("height", "500px")

    function update(source) {

      // Compute the new tree layout.
      var nodes = tree.nodes(rootDir).reverse(),
          links = tree.links(nodes)

      // Normalize for fixed-depth.
      nodes.forEach((d) => { d.y = d.depth * 180 })

      // Update the nodes…
      var node = svg.selectAll("g.node").data(nodes, (d) => d.id || (d.id = ++i))

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", (d) => "translate(" + source.y0 + "," + source.x0 + ")")
            .on("click", click)

          nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", (d) => d._children ? "#6495ED" : "#fff")

          nodeEnter.append("text")
            .attr("x", (d) => d.children || d._children ? -13 : 13)
            .attr("dy", ".35em")
            .attr("text-anchor", (d) => d.children || d._children ? "end" : "start")
            .text((d) => d.name)
            .style("fill-opacity", 1e-6)

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", (d) => "translate(" + d.y + "," + d.x + ")")

          nodeUpdate.select("circle")
            .attr("r", 10)
            .style("fill", (d) => d._children ? "#6495ED" : "#fff")

          nodeUpdate.select("text").style("fill-opacity", 1)

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", (d) => "translate(" + source.y + "," + source.x + ")")
            .remove()

          nodeExit.select("circle").attr("r", 1e-6)

          nodeExit.select("text").style("fill-opacity", 1e-6)

      // Update the links…
      var link = svg.selectAll("path.link").data(links, (d) => d.target.id)

          // Enter any new links at the parent's previous position.
          link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", (d) => {
              let o = {x: source.x0, y: source.y0}
              return diagonal({source: o, target: o})
            })

          // Transition links to their new position.
          link.transition()
            .duration(duration)
            .attr("d", diagonal)

          // Transition exiting nodes to the parent's new position.
          link.exit().transition()
            .duration(duration)
            .attr("d", (d) => {
              let o = {x: source.x, y: source.y}
              return diagonal({source: o, target: o})
            })
            .remove()

      // Stash the old positions for transition.
      nodes.forEach((d) => { d.x0 = d.x, d.y0 = d.y })
    }

    // Toggle children on click.
    function click(d) {
      if (d.children) {
        d._children = d.children, d.children = null
      } else {
        d.children = d._children, d._children = null
      }
      update(d)
    }

  }

  render () {
    return (
      <div className='dir-tree'>
        <h1>{this.props.treeData.rootDir}</h1>
        <div ref="target"></div>
      </div>
    )
  }
}

export default DirTree