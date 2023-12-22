import { QueryUrl, MintUrl } from "../api.js";

window.getBulkList = async () => {
  let url = `${QueryUrl}?sparql=https://raw.githubusercontent.com/culturecreates/artsdata-planet-nac/main/src/sparql/batch-mint-events.sparql&format=json`;
  console.log(url);
  const res = await fetch(url);
  const json = await res.json();
  console.log(json);

  const main = document.querySelector("main");

  json.data.forEach((entity) => {
    const el = document.createElement("li");
    el.innerHTML = entity["@id"];
    main.appendChild(el);
  });
};

window.bulkMintAll = async () => {
  const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  const entities = document.getElementsByTagName("li");
  const entitiesArray = Array.from(entities)

  for (let i = 0; i < entitiesArray.length; i++) {
    await sleep(2000)
    console.log(entitiesArray[i])
    minter(entitiesArray[i].innerHTML); 
  }
};





const minter = async (uri) => {
  console.log(uri);
  let data = {
    classToMint: "schema:Event",
    externalUri: uri,
    publisher: "http://kg.artsdata.ca/resource/K1-1",
  };

  const res = await fetch(MintUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  console.log(json);
};
