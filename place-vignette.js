import { EncodeHTMLEntities, DisplayK }  from  "./utils/urls.js";
import { LinkUrl, MintUrl } from  "./api.js";
import "./utils/dereference-name.js";
import "./utils/rdf-link.js";

class PlaceVignette extends HTMLElement {
  set entity(entity) {
    this.innerHTML = `
      <div  class="list-group">
        <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">${EncodeHTMLEntities(
              truncate(entity.name.fr || entity.name.en)
            )}</div>
            <br> 
            <a href='${entity.uri}'>${entity.uri}</a>  
            <br>
          ${entity.type} 
          -  ${entity.postalCode}  
          - ${entity.streetAddress.fr || entity.streetAddress.en}
          - ${entity.addressLocality.fr || entity.addressLocality.en}
          <br>
          ${
            entity.samePostalCode
              ? ` <p>Same postal code: ${displayList(entity.samePostalCode)}</p>`
              : ""
          }
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
          <input type="hidden" name="publisher" value="https://graph.culturecreates.com/id/footlight">
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

function displayList(list) {
  let html = "<ol>";
  if (Array.isArray(list)) {
  list.forEach((item) => {
    html += `<li><dereference-name>${item.uri}</dereference-name>`;
  });
} else {
  html += `<li><dereference-name>${list.uri}</dereference-name>`;
}
html += `</ol>`;
 return html;
}

function encodeHTMLEntities(rawStr) {
  return rawStr.replace(/[\u00A0-\u9999<>\&]/g, (i) => `&#${i.charCodeAt(0)};`);
}

function getK(rawStr) {
  return rawStr.replace(/http:\/\/kg.artsdata.ca\/resource\//g, "");
}

const truncate = (input) =>
  input.length > 100 ? `${input.substring(0, 100)}...` : input;

customElements.define("place-vignette", PlaceVignette);
