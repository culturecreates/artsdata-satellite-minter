const GetK = (rawStr) => {
  return rawStr.replace(/http:\/\/kg.artsdata.ca\/resource\//g, "");
}

const EncodeHTMLEntities = (rawStr) => {
  if (rawStr) {
    return rawStr.replace(/[\u00A0-\u9999<>\&]/g, (i) => `&#${i.charCodeAt(0)};`);
  } else {
    return "no string"
  }
}

const DisplayK = (kuri) => {
  let knum = GetK(kuri);
  return `<a href=http://artsdata-satellite-viewer.s3-website.ca-central-1.amazonaws.com/index.html?adid=${knum}><span class="badge bg-secondary rounded-pill">${knum}</span></a>`
}

export {
  GetK,
  EncodeHTMLEntities, 
  DisplayK
}