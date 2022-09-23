
export default class Airport {
  constructor(object) {
    this.icao = object.icao;
    this.name = object.name;
    this.lat = object.lat;
    this.lon = object.lon;
    this.models = object.models;
    this.title = `${object.icao} | ${object.name}`;
  }
}
