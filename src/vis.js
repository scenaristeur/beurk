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
        console.log("exist",n)
      }else{
        n  = {id: uuidv4()}
        if(node.length > 30){
          n.label = node.substring(0,30)+'...'
          n.title = node
        }else{
          n.label = node
        }
        n  = {id: uuidv4()}
        dataset.nodes.push(n)
      }
      let edge = {from:o.id, to: n.id, arrows: "to", label: prop}
      console.log(typeof node , edge)
      dataset.edges.push(edge)
    }


    // let n = {}
    // var node_exist = dataset.nodes.filter(noeud => {
    //   return noeud.id === o.id
    // })
    // if (node_exist.length > 0){
    //
    //   n = node_exist[0]
    //   console.log("exist")
    // }else{
    //   n = {id:o.id, type:o.type}
    //   console.log("create")
    //   dataset.nodes.push(n)
    // }
    // console.log("Node",n)
    console.log("DS",dataset)


    // o.props.forEach((k) => {
    //   console.log("##PROP",k)
    //   for (const [key, value] of Object.entries(k)) {
    //     //  console.log("###", typeof value, key, value)
    //     switch (typeof value) {
    //       case 'string':
    //       dataset = add(n, key, value, dataset)
    //       break;
    //       case 'object':
    //       //  console.log("value",value)
    //       if ( Array.isArray(value) ==  true){
    //         value.forEach((v) => {
    //           //      console.error(n, key,value)
    //           dataset = add(n, key, v, dataset)
    //         });
    //       }else{
    //         console.warn(n, key,value)
    //         dataset = add(n, key, value, dataset)
    //       }
    //
    //       break;
    //       default:
    //       console.error('todo',typeof value, value);
    //     }
    //   }
    // });
  });
  return dataset
}

function add(n, k, v, dataset){
  console.log("ADD",n,k,v)
  let node = {}
  node  = {id: uuidv4()}
  var node_exist = dataset.nodes.filter(noeud => {
    return noeud.id === v || noeud.label == v
  })
  if (node_exist.length > 0){
    node = node_exist[0]
    //  console.log("found",node)
  }else{
    //console.log('not found',v)
    if (typeof v == "string"){
      //console.log(v)
      let id = v.startsWith('http') ==  true ? v : uuidv4();
    }else{
      //  console.warn("TODO : must add ", v)
      //  let id = uuidv4()
    }

    if(v.length > 30){
      node.label = v.substring(0,30)+'...'
      node.title = v
    }else{
      node.label = v
    }
    console.log(node)
    dataset.nodes.push(node)

  }


  let edge = {from: n.id, to: node.id, label: k, arrows: "to"}
  dataset.edges.push(edge)
  switch (k) {
    case 'pair:label':
    case 'rdfs:label':
    case 'foaf:name':
    //  console.warn('todo',k,v);
    n.label = v
    break;
    default:

    let edge = {from: n.id, to: node.id, label: k, arrows: "to"}
    console.log(edge)
    var edge_exist = dataset.edges.filter(e => {
      return e.from === edge.from && e.to === edge.to && e.label === edge.label
    })
    console.log("Exist",edge_exist)
    if (edge_exist.length == 0){
      dataset.edges.push(edge)
    }
  }
  return dataset
}

export default vis
