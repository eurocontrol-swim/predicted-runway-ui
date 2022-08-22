<template>
  <div id="rpMap"></div>
</template>

<script>
import * as utils from "@/common/utils";
import L from 'leaflet';

export default {
  name: "ArrivalsRunwayPredictionMap",
  props: {
    result: Object,
  },
  data: () => ({
    map: null,
    markers: [],
    airplaneIconUrl: '/images/airplane.png',
  }),
  methods: {
    rotateRunwayMarkerIcons() {
      this.predictionOutput.features.forEach((feature) => {
        this.rotateFeatureMarkerIcon(feature);
      });
    },
    rotateFeatureMarkerIcon(feature) {
      const iconClassName = `marker-icon-${feature.properties.runway_name}`;
      const [iconElement] = window.document.getElementsByClassName(iconClassName);
      iconElement.style.setProperty('transform-origin', 'center');
      iconElement.style.transform += ` rotate(${feature.properties.true_bearing}deg)`;
    },
    createGeoJson(map) {
      return new L.geoJSON(
        this.predictionOutput, {
          style: (feature) => {
            return {
              color: '#f05a23',
              weight: 12,
              opacity: feature.properties.probability > 0.2 ? feature.properties.probability : 0.2,
            }
          },
          onEachFeature: (feature) => {
            const marker = this.markerFromFeature(feature).addTo(map);
            this.rotateFeatureMarkerIcon(feature);
            this.markers.push(marker);
          }
        }
      ).addTo(map);
    },
    markerFromFeature(feature) {
      const iconClassName = 'marker-icon-' + feature.properties.runway_name;
      const markerIcon =  new L.icon({
        iconUrl: this.airplaneIconUrl,
        iconSize: [40, 40],
        className: iconClassName,
      });

      const popupContent = `Runway: <strong>${feature.properties.runway_name}</strong> | Probability: <strong>${Math.round(feature.properties.probability * 100)}%</strong>`;
      const marker = new L.Marker(utils.reverseCoordinates(feature.geometry.coordinates[0]), {icon: markerIcon}).bindPopup(popupContent);

      marker.on('mouseover', () => {
          marker.openPopup();
      })

      return marker;
    },
    resultHasBeenUpdated(newResult, oldResult) {
      if (newResult === oldResult) {
        return false;
      }

      if (oldResult === null && newResult !== null) {
        return true;
      }

      return newResult !== null
             && (newResult.prediction_input.origin_icao !== oldResult.prediction_input.origin_icao
                 || newResult.prediction_input.timestamp !== oldResult.prediction_input.timestamp);
    },
    render() {
      if (this.geo) {
        this.markers.forEach((m) => m.remove());
        this.markers = [];
        this.geo.clearLayers();
      }

      this.geo = this.createGeoJson(this.map);
    },
    init() {
      const [airport] = this.$config.destinationAirports.filter((a) => a.icao === this.$route.params.destinationIcao);
      this.map = utils.initMap('rpMap', [airport.lat, airport.lon]);

      const self = this;
      this.map.on('zoomend', () => {
        self.rotateRunwayMarkerIcons();
      });
    },
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

      // this.init();

      this.render();
    },
  },
  mounted() {
    this.init();
  },
  unmounted() {
    this.map.off();
    this.map.remove();
  }
};
</script>

<style scoped>
  #rpMap {
    height: 700px;
  }
</style>