<template>
      <div v-if="result" class="p-2">
        <div class="accordion" id="accordionExample">

              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#input-output-collapse"
                          aria-expanded="false"
                          aria-controls="input-output-collapse"
                  >
                      <span>
                          <strong>Runway Configuration Prediction</strong> |
                          {{ datetimeFromTimestamp(result.prediction_input.timestamp) }}
                      </span>
                  </button>
                </h2>
                <div id="input-output-collapse" class="accordion-collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
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

                            <table class="table table-sm table-hover">
                                <thead>
                                  <tr>
                                    <th scope="col">Runway Configuration</th>
                                    <th scope="col">Probability</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="(feature, index) in predictionOutput.features"
                                    :key="feature"
                                    :id="predictionResultRowId(index)"
                                    @click="onRunwayConfigClick(index)"
                                    :style="getRowStyle(index)"
                                  >
                                    <td>{{ feature.properties.runways.map((r) => r.name).join(", ") }}</td>
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
      <div class="p-2">
        <DateTimeRange
          :preSelectedTimestamp="selectedTimestamp"
          :startTimestamp="startTimestamp"
          :endTimestamp="endTimestamp"
          @datetime-change="onDateTimeChange($event)"
        >
        </DateTimeRange>
      </div>
      <div class="p-2 map-area">
        <ArrivalsRunwayConfigPredictionMap
          :selectedConfigRowIndex="selectedConfigRowIndex"
          :result="result"
        ></ArrivalsRunwayConfigPredictionMap>
      </div>
      <div>
      </div>
</template>

<script>
import * as api from "@/common/api";
import * as utils from "@/common/utils";
import ArrivalsRunwayConfigPredictionMap from "@/components/ArrivalsRunwayConfigPredictionMap";
import DateTimeRange from "@/components/DateTimeRange";
import ErrorHandler from "@/mixins/ErrorHandler";

export default {
  name: "ArrivalsRunwayConfigPredictionPage",
  components: {
    ArrivalsRunwayConfigPredictionMap,
    DateTimeRange,
  },
  mixins: [
    ErrorHandler,
  ],
  data: () => ({
    result: null,
    selectedConfigRowIndex: null,
    startTimestamp: null,
    endTimestamp: null,
    selectedTimestamp: null,
  }),
  methods: {
    getPredictionResult() {
      const input = {
        destinationIcao: this.$route.params.destinationIcao,
        timestamp: this.$route.query.timestamp,
        windDirection: this.$route.query.wind_direction,
        windSpeed: this.$route.query.wind_speed,
        windInputSource: this.$route.query.wind_input_source,
      }

      api.getRunwayConfigPrediction(input)
        .then((res) => {
          this.result = res.data;
          this.selectedTimestamp = parseInt(this.$route.query.timestamp);
        })
        .catch((error) => {
          this.handleApiError({error})
        });
    },
    datetimeFromTimestamp(timestamp) {
      return new Date(timestamp * 1000).toUTCString().replace('GMT', 'UTC');
    },
    onRunwayConfigClick(index) {
      this.selectedConfigRowIndex = index;

      for (let i = 0; i < this.predictionOutput.features.length; i++) {
        const row = window.document.getElementById(`runway-config-row-${i}`);
        const bgcolor = (i === this.selectedConfigRowIndex) ? '#e7f1ff' : '#ffffff';
        row.style.setProperty('background-color', bgcolor);
      }
    },
    predictionResultRowId(index) {
      return `runway-config-row-${index}`;
    },
    getRowStyle(index) {
      const bgcolor = index === 0 ? '#e7f1ff' : '#ffffff';
      return `background-color: ${bgcolor}`;
    },
    onDateTimeChange(timestamp) {
      this.selectedTimestamp = timestamp;
      this.getPrediction();
    },
    initTimestamps(airportIcao) {
      this.selectedTimestamp = parseInt(this.$route.query.timestamp);
      this.startTimestamp = utils.getCurrentUTCTimestamp();
      if (this.startTimestamp > this.selectedTimestamp) {
        this.startTimestamp = this.selectedTimestamp;
      }

      api.getLastTafEndTime(airportIcao)
        .then((res) => {
          this.endTimestamp = res.data.end_timestamp;
        })
        .catch((error) => {
          this.handleFormError({error});
        });
    },
    getPrediction() {
      const data = {
        destinationIcao: this.$route.params.destinationIcao,
        timestamp: this.selectedTimestamp,
      };

      api.createRunwayConfigPredictionInput(data)
        .then((res) => {
          const query = {
            timestamp: res.data.timestamp.toString(),
            wind_direction: res.data.wind_direction.toString(),
            wind_speed: res.data.wind_speed.toString(),
            wind_input_source: res.data.wind_input_source,
          };
          this.$router.push({ query });
        })
        .catch(() => {
          // this.handleApiError({error});
        })
    },
  },
  computed: {
    predictionOutput() {
      if (!this.result.prediction_output) {
        return [];
      }

      const output = Object.create(this.result.prediction_output);
      output.features = output.features.filter((f) => f.properties.probability > 0)

      return output
    },
    path() {
      return this.$route.fullPath;
    },
  },
  watch: {
    path(val) {
      if (val.indexOf('runway-config-prediction') > -1) {
        this.getPredictionResult();
      }
    },
  },
  created() {
    this.getPredictionResult();
    this.initTimestamps(this.$route.params.destinationIcao);
  }
};
</script>

<style scoped>

  .table-hover tbody tr:hover td {
    background-color: #e7f1ff;
    cursor: pointer;
  }

  #input-output-collapse {
    height: 400px;
  }
</style>