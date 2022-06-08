<template>

  <div class="modal fade" id="rpForm" aria-hidden="true" aria-labelledby="rpForm" tabindex="-1" ref="rpForm">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $route.params.destinationIcao }} | New Runway Prediction</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form>
          <div class="modal-body">
            <div class="form-group">
            <div class="mb-3">

              <label for="rpOriginAirportOptions" class="form-label">Departing from</label>
              <input autoComplete="off"
                     class="form-control"
                     list="rpOriginAirportOptions"
                     id="rpOriginIcaoListItem"
                     placeholder="Type to search"
                     v-model="originAirport"
                     @keyup="updateOriginAirports()"
                     required
              >
              <datalist id="rpOriginAirportOptions">
                <option
                    v-for="airport in airports"
                    :key="airport.icao"
                    :label="airport.title"
                    :value="airport.title"
                >
                </option>
              </datalist>
              <input id="rpOriginIcao" name="origin_icao" type="text" hidden required>
            </div>
            <div class="mb-3">
              <DateTimeRange
                key="runwayPredict"
                :endTimestamp="endTimestamp"
                @datetime-change="onDateTimeChange($event)"
              >
              </DateTimeRange>
            </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="mb-3">
                <a class="btn btn-primary" id="rpFormButton" @click="submitForm()">Predict</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import * as api from '@/common/api';
import {Modal} from 'bootstrap';
import DateTimeRange from '@/components/DateTimeRange.vue';

export default {
  name: "ArrivalsRunwayPredictionForm",
  components: {
    DateTimeRange,
  },
  data: () => ({
    airports: [],
    originAirport: null,
    timestamp: null,
    endTimestamp: null,
    predictionInput: null,
    modal: null,
  }),
  methods: {
    resetForm() {
      this.originAirport = null;
      this.timestamp = null;
      this.endTimestamp = null;
    },
    getLastTafEndTime(airportIcao) {
      api.getLastTafEndTime(airportIcao)
        .then((res) => {
          this.endTimestamp = res.data.end_timestamp;
        })
        .catch((error) => {
          console.log(error);
          // this.handleError({ error, defaultMessage: 'Failed to retrieve datasets.' });
        });
    },
    submitForm() {
      const data = {
        destinationIcao: this.$route.params.destinationIcao,
        originIcao: this.originIcao,
        timestamp: this.timestamp,
      };

      api.createRunwayPredictionInput(data)
        .then((res) => {
          this.predictionInput = res.data;
          this.modal.hide();
          this.$router.push({ name: 'ArrivalsRunwayPrediction', query: this.predictionInput})
        })
        .catch((error) => {
          console.error(error)
        })
    },
    onDateTimeChange(timestamp) {
      this.timestamp = timestamp;
    },
    updateOriginAirports() {
      if (this.originAirport.length < 3) {
        this.airports = [];
        return;
      }
      api.getAirportsData(this.originAirport)
        .then((res) => {
          this.airports = res.data;
        })
        .catch((error) => {
          console.log(error);
          // this.handleError({ error, defaultMessage: 'Failed to retrieve datasets.' });
        });
    },
  },
  computed: {
    originIcao() {
      if (!this.originAirport) {
        return '';
      }

      return this.originAirport.substring(0, 4);
    },
  },
  mounted() {
    this.modal = new Modal('#rpForm');

    const self = this;
    this.$refs.rpForm.addEventListener('show.bs.modal', function () {
      self.getLastTafEndTime(self.$route.params.destinationIcao);
    });
    this.$refs.rpForm.addEventListener('hide.bs.modal', function () {
      self.resetForm();
    });
  },
};
</script>

<style scoped>

</style>