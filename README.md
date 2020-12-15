# beurk
librairie generique visjs / D3 / cytoscape &lt;-> rdf / ldp ... pour simplifier les outils de visualisation

# demo
(https://scenaristeur.github.io/beurk/)[https://scenaristeur.github.io/beurk/]

# vis.js

```

// create an array with nodes
var nodes = new vis.DataSet([
  { id: 1, label: "Node 1" },
  { id: 2, label: "Node 2" },
  { id: 3, label: "Node 3" },
  { id: 4, label: "Node 4" },
  { id: 5, label: "Node 5" },
  ]);

  // create an array with edges
  var edges = new vis.DataSet([
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 3 },
    ]);

    // create a network
    var container = document.getElementById("mynetwork");
    var data = {
      nodes: nodes,
      edges: edges,
    };
    var options = {};
      var network = new vis.Network(container, data, options);

      ```

      # publish
      ```
      npm run git -- "message"
      ```


      # d3
      https://github.com/d3/d3-force/blob/master/README.md
      https://observablehq.com/@d3/force-directed-graph



      # tuto
      https://www.loginradius.com/blog/async/write-a-javascript-library-using-webpack-and-babel/

      https://bugfender.com/blog/how-to-create-an-npm-package/

      https://hackernoon.com/a-complete-workshop-build-your-es6-code-into-a-library-using-webpack-80295faeb833
