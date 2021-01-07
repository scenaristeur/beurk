import snack from "./snack"

import { v4 as uuidv4 } from 'uuid';

function vis(data) {
  snack("building network")
  console.log("DATA",data)
  let dataset = {nodes:[], edges: []}
  data.objects.forEach((o) => {
    //  console.log("OBJECT",o.id)
    o.hasOwnProperty('pair:label') ? o.label = o['pair:label'] : o.label = o.id
    dataset.nodes.push(o)
    for (const [prop, node] of Object.entries(o)) {
      //  console.log(`${prop}: ${node}`);
      let n = {}
      var node_exist = dataset.nodes.filter(noeud => {
        return noeud.id === node.id
      })
      if (node_exist.length > 0){

        n = node_exist[0]
        //  console.log("exist",n)
      }else{
        n  = {id: uuidv4()}
        if(node.length > 30){
          n.label = node.substring(0,30)+'...'
          n.title = node
        }else{
          n.label = node
        }
        dataset.nodes.push(n)
      }
      let edge = {from:o.id, to: n.id, arrows: "to", label: prop}
      //  console.log(typeof node , edge)
      dataset.edges.push(edge)
    }
    
  });
  console.log("DS",dataset)
  return dataset
}



export default vis
