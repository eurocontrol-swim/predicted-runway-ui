<template>
  <div id="rcpMap" style="height: 700px"></div>
</template>

<script>
import * as utils from "@/common/utils";
import L from "leaflet";
import {reverseCoordinates} from "@/common/utils";

export default {
  name: "ArrivalsRunwayConfigPredictionMap",
  props: {
    result: Object,
    selectedConfigRowIndex: Number,
  },
  data: () => ({
    map: null,
    geo: null,
    markerGroups: [],
    airplaneIconUrl: '/images/airplane.png',
  }),
  methods: {
    getRunwayConfigElements(index) {
      return [
        this.geo.getLayers()[index],
        this.markerGroups[index],
      ];
    },
    showRunwayConfig(index) {
        const [layer, markers] = this.getRunwayConfigElements(index);
        layer.addTo(this.map);
        markers.forEach((m) => m.addTo(this.map));
        this.rotateRunwayConfigMarkerIcons(index, this.predictionOutput.features[index].properties.runways);
    },
    hideRunwayConfig(index) {
      const [layer, markers] = this.getRunwayConfigElements(index);
      layer.remove();
      markers.forEach((m) => m.remove());
    },
    updateDisplay() {
      const selectedConfigRowIndex = this.selectedConfigRowIndex === null ? 0 : this.selectedConfigRowIndex;

      for (let i = 0; i < this.geo.getLayers().length; i++) {
        const configMethod = i === selectedConfigRowIndex ? this.showRunwayConfig : this.hideRunwayConfig;
        configMethod(i);
      }
    },
    addAirplaneMarkers(index, feature) {
      const markers = [];
      for (let i = 0; i < feature.properties.runways.length; i++) {
        const iconClassName = `marker-icon-${index}-${feature.properties.runways[i].name}`;
        const markerIcon =  new L.icon({
          className: iconClassName,
          iconUrl: this.airplaneIconUrl,
          iconSize: [40, 40],
        });

        const runways = feature.properties.runways;
        const coordinates = reverseCoordinates(feature.geometry.coordinates[i][0]);
        const popupContent = `Runway: <strong>${runways[i].name}</strong> | Probability: <strong>${Math.round(feature.properties.probability * 100)}%</strong>`;

        const marker = new L.Marker(coordinates, {icon: markerIcon}).bindPopup(popupContent).addTo(this.map);
        marker.on('mouseover', () => {
          marker.openPopup();
        })
        markers.push(marker);
      }

      return markers;
    },
    rotateRunwayConfigMarkerIcons(index, runways) {
      runways.forEach((runway) => {
        const iconClassName = `marker-icon-${index}-${runway.name}`;
        const [iconElement] = window.document.getElementsByClassName(iconClassName);
        iconElement.style.setProperty('transform-origin', 'center');
        if (iconElement.style.transform.indexOf('rotate') === -1) {
            iconElement.style.transform += ` rotate(${runway.true_bearing}deg)`;
        }
      })
    },
    resultHasBeenUpdated(newResult, oldResult) {
      if (newResult === oldResult) {
        return false;
      }

      if (oldResult === null && newResult !== null) {
        return true;
      }

      return newResult !== null
             && (newResult.prediction_input.timestamp !== oldResult.prediction_input.timestamp);
    },
    render() {
      if (this.geo !== null) {
        this.markerGroups.forEach((g) => g.forEach((m) => m.remove()));
        this.markerGroups = [];
        this.geo.clearLayers();
      }

      this.geo = new L.geoJSON(
        this.predictionOutput, {
          style: (feature) => {
            return {
              color: '#f05a23',
              weight: 12,
              opacity: feature.properties.probability > 0.2 ? feature.properties.probability : 0.2,
            }
          },
        }
      ).addTo(this.map);

      for (let i = 0; i < this.predictionOutput.features.length; i++) {
        this.markerGroups.push(this.addAirplaneMarkers(i, this.predictionOutput.features[i]));
      }

      this.updateDisplay();
    },
    init() {
      const [airport] = this.$config.destinationAirports.filter((a) => a.icao === this.$route.params.destinationIcao);
      this.map = utils.initMap('rcpMap', [airport.lat, airport.lon]);

      const self = this;
      this.map.on('zoomend', () => {
        self.updateDisplay();
      });
    }
  },
  computed: {
    predictionOutput() {
      if (this.result === null) {
        return {features: []};
      }

      const output = Object.create(this.result.prediction_output);
      output.features = output.features.filter((f) => f.properties.probability > 0);

      return output;
    }
  },
  watch: {
    result(newResult, oldResult) {
      if (!this.resultHasBeenUpdated(newResult, oldResult)) {
        return;
      }
      this.render();
    },
    selectedConfigRowIndex() {
      this.updateDisplay();
    },
  },
  mounted() {
    this.init();
  },
  unmounted() {
    this.map.off();
    this.map.remove();
  }
}
</script>

<style scoped>
  #rcpMap {
    height: 700px;
  }
</style>