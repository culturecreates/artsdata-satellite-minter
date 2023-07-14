import { DisplayList } from "./utils/bilingual-array.js";
import { DateFormat } from "./utils/date-format.js";
import { LinkUrl, MintUrl, PublisherAuthority } from  "./api.js";
import { EncodeHTMLEntities, DisplayK, DisplayKList, DisplayGraphList}  from  "./utils/urls.js";

class EventVignette extends HTMLElement {
  set entity(entity) {
    this.innerHTML = `
      <div  class="list-group">
        <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">${EncodeHTMLEntities(DisplayList(entity.name))}
            </div>
            <a href='${entity.uri}'>${entity.uri}</a>  
            <br>
            ${DateFormat(entity.startDate['@value'])}
            <br>
            ${entity.type}
            <br>
            ${DisplayList(entity.location)} 
          
            ${DisplaySimilarEvents(entity.missing, entity?.sameAs?.[0].uri, entity.type, entity.uri, entity.sameAs?.[0].uri)}
        
            ${
             !entity.sameAs
              ? ` <br> <form method="post" action="${MintUrl}" class="inline">
              <input type="hidden" name="classToMint" value="schema:${entity.type}">
              <input type="hidden" name="externalUri" value="${entity.uri}">
              <input type="hidden" name="publisher" value="${PublisherAuthority}">
              <button type="submit" class="btn btn-danger">Mint</button>
              </form> `
              : ""
            }
            ${
              entity.partOf
                ? ` <br>  Graphs: ${DisplayGraphList(entity.partOf)}`
                : ""
            }
          </div>
          ${
            entity?.sameAs?.[0].uri[0] ? DisplayK(entity.sameAs?.[0].uri) : ""
          }
        </div>
      </div>`;
  }
}

let DisplayEvent = (element) => {
  let html = '';
  html += `<div class="fw-bold">${EncodeHTMLEntities(DisplayList(element.name))}  ${DisplayKList(element.sameAs)}
  </div>
  <a href='${element.uri}'>${element.uri}</a>
  <br>
  ${element.startDate && DateFormat(element.startDate['@value'])} 
  `
  return html;
}

let DisplaySimilarEvents = (links, adUri, classToLink, entityUri, entitySameAs) => {
  let html = '';
  if (links) {
    if ( !Array.isArray(links) ) {
      links = new Array(links)
    } ;
    
      html += '<br>Matching day and place: <ul>';
      links.forEach(element => {
        html += `<li>`
       
       // html += JSON.stringify(element) ;
        html += DisplayEvent(element);
        if(adUri && element.uri &&  element.uri.split("/").at(-1)[0] != "K" &&  element.sameAs == null ) {
          html += `<form method="post" action="${LinkUrl}" class="inline">
            <input type="hidden" name="classToLink" value="schema:${classToLink}">
            <input type="hidden" name="externalUri" value="${element.uri}">
            <input type="hidden" name="adUri" value="${adUri}">
            <input type="hidden" name="publisher" value="${PublisherAuthority}">
            <button type="submit" class="btn btn-info">SameAs</button>
          </form>`
        } else if ( element.uri && element.uri.includes("kg.artsdata.ca/resource/K") &&  (entitySameAs == null) ) {
          html += `<form method="post" action="${LinkUrl}" class="inline">
            <input type="hidden" name="classToLink" value="schema:${classToLink}">
            <input type="hidden" name="externalUri" value="${entityUri}">
            <input type="hidden" name="adUri" value="${element.uri}">
            <input type="hidden" name="publisher" value="${PublisherAuthority}">
            <button type="submit" class="btn btn-info">Link</button>
          </form>`
        }
      });
      html += '</ul>';
  }
 return html;
}



customElements.define("event-vignette", EventVignette);
