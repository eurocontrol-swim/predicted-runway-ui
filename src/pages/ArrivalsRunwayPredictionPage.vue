<template>
<div v-if="result" class="p-2">
        <div class="accordion" id="accordionExample">

              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                  >
                      <span>
                          <strong>Runway Prediction</strong> |
                          {{ result.prediction_input.origin_icao }}
                          <i class="bi-arrow-right"></i>
                          {{ result.prediction_input.destination_icao }}
                          | {{ datetimeFromTimestamp(result.prediction_input.timestamp) }}
                      </span>
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item" role="presentation">
                        <button class="nav-link" id="predictionInput-tab" data-bs-toggle="tab" data-bs-target="#predictionInput" type="button" role="tab" aria-controls="predictionInput" aria-selected="true">Prediction input</button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="predictionOutput-tab" data-bs-toggle="tab" data-bs-target="#predictionOutput" type="button" role="tab" aria-controls="predictionOutput" aria-selected="false">Prediction output</button>
                      </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                      <div class="tab-pane fade" id="predictionInput" role="tabpanel" aria-labelledby="predictionInput-tab">
                          <div class="table-responsive">

                            <table class="table table-sm">
                                <tbody>
                                  <tr>
                                    <td><strong>Origin airport ICAO</strong></td>
                                    <td>{{ result.prediction_input.origin_icao }}</td>
                                  </tr>
                                  <tr>
                                    <td><strong>Destination airport ICAO</strong></td>
                                    <td>{{ result.prediction_input.destination_icao }}</td>
                                  </tr>
                                  <tr>
                                    <td><strong>Date time</strong></td>
                                    <td>{{ datetimeFromTimestamp(result.prediction_input.timestamp) }}</td>
                                  </tr>
                                  <tr>
                                    <td><strong>Wind direction</strong></td>
                                        <td v-if="result.prediction_input.wind_input_source">
                                          {{ result.prediction_input.wind_direction }}&#176; ({{ result.prediction_input.wind_input_source }})
                                        </td>
                                        <td v-else>{{ result.prediction_input.wind_direction }}&#176;</td>
                                  </tr>
                                  <tr>
                                    <td><strong>Wind speed</strong></td>
                                        <td v-if="result.prediction_input.wind_input_source">
                                          {{ result.prediction_input.wind_speed }}kts ({{ result.prediction_input.wind_input_source }})
                                        </td>
                                        <td v-else>{{ result.prediction_input.wind_speed }}kts</td>
                                  </tr>
                                </tbody>
                              </table>
                          </div>

                      </div>
                      <div class="tab-pane fade show active" id="predictionOutput" role="tabpanel" aria-labelledby="predictionOutput-tab">
                          <div class="table-responsive">

                            <table class="table table-sm">
                                <thead>
                                  <tr>
                                    <th scope="col">Runway</th>
                                    <th scope="col">Probability</th>
                                  </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="feature in result.prediction_output.features.filter((f) => f.properties.probability > 0)" :key="feature">
                                        <td>{{ feature.properties.runway_name }}</td>
                                        <td>{{ (feature.properties.probability * 100).toFixed(0) }}%</td>
                                    </tr>
                                </tbody>
                              </table>
                          </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div class="p-2 map-area">
        <ArrivalsRunwayPredictionMap
          :result="result"
        ></ArrivalsRunwayPredictionMap>

      </div>
      <div>
      </div>


</template>

<script>
import * as api from "@/common/api";
import ErrorHandler from "@/mixins/ErrorHandler";
import ArrivalsRunwayPredictionMap from "@/components/ArrivalsRunwayPredictionMap";

export default {
  name: "ArrivalsRunwayPredictionPage",
  components: {
    ArrivalsRunwayPredictionMap,
  },
  mixins: [
    ErrorHandler,
  ],
  data: () => ({
    result: null,
    selectedRow: 0,
  }),
  methods: {
    getPredictionResult() {
      this.result = null;

      const input = {
        destinationIcao: this.$route.params.destinationIcao,
        originIcao: this.$route.query.origin_icao,
        timestamp: this.$route.query.timestamp,
        windDirection: this.$route.query.wind_direction,
        windSpeed: this.$route.query.wind_speed,
        windInputSource: this.$route.query.wind_input_source,
      }

      api.getRunwayPrediction(input)
        .then((res) => {
          this.result = res.data;
        })
        .catch((error) => {
          this.handleApiError({error})
        });
    },
    datetimeFromTimestamp(timestamp) {
      return new Date(timestamp * 1000).toUTCString().replace('GMT', 'UTC');
    },
  },
  computed: {
    path() {
      return this.$route.fullPath;
    },
  },
  watch: {
    path(val) {
      if (val.indexOf('runway-prediction') > -1) {
        this.getPredictionResult();
      }
    },
  },
  created() {
    this.getPredictionResult();
  }
};
</script>
