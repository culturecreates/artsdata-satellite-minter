const BaseUrl = "http://localhost:3003"
//const BaseUrl = "https://api.artsdata.ca"
const MintUrl =`${BaseUrl}/mint`;
const QueryUrl = `${BaseUrl}/query`;
const LinkUrl = `${BaseUrl}/link`;
const ViewerUrl = "http://artsdata-satellite-viewer.s3-website.ca-central-1.amazonaws.com/index.html?adid=";
const PublisherAuthority = "https://graph.culturecreates.com/id/footlight";
//const PublisherAuthority = "https://graph.culturecreates.com/id/capacoa-admin";

export {
  MintUrl,
  QueryUrl,
  LinkUrl,
  ViewerUrl,
  PublisherAuthority
}