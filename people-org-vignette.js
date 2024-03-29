import { EncodeHTMLEntities, DisplayK }  from  "./utils/urls.js";
import { LinkUrl, MintUrl, PublisherAuthority } from  "./api.js";

class PeopleOrgVignette extends HTMLElement {
  set entity(entity) {
    this.innerHTML = `
      <div  class="list-group">
        <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">${EncodeHTMLEntities(
              truncate(entity?.name?.fr || entity?.name?.en || entity?.name?.["@none"] + " (missing lang)" || "")
            )}</div>
          ${entity.type}
          <br> 
          <a href='${entity.uri}'>${entity.uri}</a>  
          ${DisplaySimilarOrgs(entity.missing, entity?.sameAs?.[0].uri, entity.type)}
          
          ${
            entity.partOf
              ? ` <br>  Graphs: ${JSON.stringify(entity.partOf)}`
              : ""
          }
          ${
             !entity.sameAs
              ? `        <br> <form method="post" action="${MintUrl}" class="inline">
          <input type="hidden" name="classToMint" value="schema:${entity.type}">
          <input type="hidden" name="externalUri" value="${entity.uri}">
          <input type="hidden" name="publisher" value="${PublisherAuthority}">
          <button type="submit" class="btn btn-danger">Mint</button>
          </form>
`
              : ""
          }
         
        </div>
        <span class="badge bg-secondary rounded-pill">${
          entity?.sameAs?.[0].uri[0] ? DisplayK(entity.sameAs?.[0].uri) : ""
        }</span>
        </div>
      </div>`;
  }
}

function encodeHTMLEntities(rawStr) {
  return rawStr.replace(/[\u00A0-\u9999<>\&]/g, (i) => `&#${i.charCodeAt(0)};`);
}

function getK(rawStr) {
  return rawStr.replace(/http:\/\/kg.artsdata.ca\/resource\//g, "");
}

const truncate = (input) =>
  input.length > 100 ? `${input.substring(0, 100)}...` : input;


let DisplaySimilarOrgs = (links, adUri, classToLink) => {
  let html = '';
  if (links) {
    if ( !Array.isArray(links) ) {
      links = new Array(links)
    } ;
   
    html += '<br>  potential linked entities: <ul>';
    links.forEach(element => {
      html += `<li>`
      if (adUri &&  element.uri &&  element.uri.split("/").at(-1)[0] != "K" &&  element.sameAs == null ) {
        html += `<form method="post" action="${LinkUrl}" class="inline">
          <input type="hidden" name="classToLink" value="schema:${classToLink}">
          <input type="hidden" name="externalUri" value="${element.uri}">
          <input type="hidden" name="adUri" value="${adUri}">
          <input type="hidden" name="publisher" value="${PublisherAuthority}">
          <button type="submit" class="btn btn-info">Link ${element.uri.split("/").at(-1)} </button>
        </form>`
      }
     
    html +=  JSON.stringify(element)
    
   });
  html += '</ul>';
  }

return html;
}


customElements.define("people-org-vignette", PeopleOrgVignette);
