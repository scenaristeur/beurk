import snack from "./snack"

async function load(source) {

  let result = {}
  switch(source.type) {
    case 'ldp':
    result = await ldp(source)
    break;
    case 'file':
    result = await file(source)
    break;
    case 'raw':
    result = await raw(source)
    break;
    case 'sparql':
    result = await sparql(source)
    break;
    default:
    console.warn("TODO ", source.type);
  }
  return result
}

async function ldp(source){

  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  var fetch_init = { method: 'GET',
  headers: headers,
  mode: 'cors',
  cache: 'default' };
  let result = {source: source, objects:[]}

  //await source.containers.forEach(async function(container) {
  for (const container of source.containers){
    let url = source.endpoint+container
    snack("loading "+url)
    await fetch(url, fetch_init)
    .then(response => response.json())
    .then(data => {
      //console.log("data",data)
      let items = data['ldp:contains']
      for (const item of items){
        //console.log(item)
        let i = {props:[]}
        for (const [key, value] of Object.entries(item)) {
          //console.log(`${key}: ${value}`);
          switch (key) {
            case '@id':
            i.id = value
            break;
            case '@type':
            i.type = value
            break;
            default:
            let e = {}
            e[key] = value
            //console.log(e)
            i.props.push(e)
          }
        }
        result.objects.push(i)
      }
    });
  }

  console.log("result end",result)
  return result
}
function file(source){
  console.log("file",source)
  return source
}
function raw(source){
  console.log("raw",source)
  return source
}
function sparql(source){
  console.log("sparql",source)
  return source
}

export default load
