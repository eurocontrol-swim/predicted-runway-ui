import L from "leaflet";
import _ from "lodash";

const initMap = (elementId, center_coordinates) => {
  const map = L.map(elementId);

  map.createPane('labels');

  // This pane is above markers but below popups
  map.getPane('labels').style.zIndex = 650;

  // Layers in this pane are non-interactive and do not obscure mouse/touch events
  map.getPane('labels').style.pointerEvents = 'none';

  const cartodbAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';

  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    attribution: cartodbAttribution,
  }).addTo(map);

  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
    attribution: cartodbAttribution,
    pane: 'labels',
  }).addTo(map);

  const mapCenter = center_coordinates;
  const mapZoom = 12;
  map.setView(mapCenter, mapZoom);

  return map;
};

const reverseCoordinates = (coordinates) => {
  return [coordinates[1], coordinates[0]];
};

const isEqual = (ob1, ob2) => {
  return _.isEqual(ob1, ob2);
};

export {
  initMap,
  reverseCoordinates,
  isEqual,
};