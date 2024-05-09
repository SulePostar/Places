export class Place {
  constructor(title, imageUrl, address, location) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.address = address;
    this.location = location; // { lat: ..., lng: ...}
    this.id = Math.floor(10000*Math.random()).toString();
  } 
}