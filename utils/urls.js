const GetK = (rawStr) => {
  return rawStr.replace(/http:\/\/kg.artsdata.ca\/resource\//g, "");
}
const GetGraph = (rawStr) => {
  return rawStr.replace(/http:\/\/kg.artsdata.ca\//g, "").replace(/culture-creates\/footlight\//g, "");
}


const EncodeHTMLEntities = (rawStr) => {
  
  if (rawStr && (typeof rawStr === 'string' || rawStr instanceof String)) {
    return rawStr.replace(/[\u00A0-\u9999<>\&]/g, (i) => `&#${i.charCodeAt(0)};`);
  } else {
    return "no string"
  }
}

const DisplayK = (kuri) => {
  let knum = GetK(kuri);
  return `<a href=http://artsdata-satellite-viewer.s3-website.ca-central-1.amazonaws.com/index.html?adid=${knum}><span class="badge bg-secondary rounded-pill">${knum}</span></a>`
}

const DisplayKList = (list) => {
  let html = '';
  if (list) {
     html += ' => ';
    list.forEach(K => {
      html += GetK(K.uri);
    })
  }
  return html;
}

const DisplayGraphList = (list) => {
  let html = '';
  if (Array.isArray(list)) {
     html += ' => ';
    list.forEach(graph => {
      html += GetGraph(graph.uri) + ", ";
    })
  }
  return html;
}

export {
  GetK,
  EncodeHTMLEntities, 
  DisplayK,
  DisplayKList,
  DisplayGraphList
}