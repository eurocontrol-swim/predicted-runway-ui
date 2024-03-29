<template>
  <div class="modal fade" id="rpFormModal" aria-hidden="true" aria-labelledby="rpFormModal" tabindex="-1" ref="rpFormModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ getDestinationIcao() }} | Runway in Use | New prediction</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form class="needs-validation" ref="rpForm" novalidate>
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
                <div class="invalid-feedback">
                  Please choose an origin airport.
                </div>
                <datalist id="rpOriginAirportOptions">
                  <option
                      v-for="airport in airports"
                      :key="airport.icao"
                      :label="airport.title"
                      :value="airport.title"
                  >
                  </option>
                </datalist>
              </div>
              <div class="mb-3">
                <DateTimeRange
                  key="runwayPredict"
                  :startTimestamp="startTimestamp"
                  :endTimestamp="endTimestamp"
                  @datetime-change="onDateTimeChange($event)"
                >
                </DateTimeRange>
              </div>
            </div>
            <div class="mb-3" v-if="formErrorMessage">
              <ErrorMessage
                :message="formErrorMessage"
              ></ErrorMessage>
            </div>
          </div>
          <div class="modal-footer">
            <div class="mb-3">
                <a :class="submitButtonClass" id="rpFormModalButton" @click="submitForm()">Predict</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import {Modal} from 'bootstrap';
import * as api from '@/common/api';
import * as utils from "@/common/utils";
import ErrorHandler from '@/mixins/ErrorHandler.vue';
import RouteHandler from '@/mixins/RouteHandler.vue';
import DateTimeRange from '@/components/DateTimeRange.vue';
import ErrorMessage from "@/components/ErrorMessage";

export default {
  name: "ArrivalsRunwayPredictionForm",
  components: {
    ErrorMessage,
    DateTimeRange,
  },
  mixins: [
    ErrorHandler,
    RouteHandler
  ],
  props: {
    destinationIcao: String,
  },
  data: () => ({
    airports: [],
    originAirport: null,
    timestamp: null,
    startTimestamp: null,
    endTimestamp: null,
    modal: null,
    formErrorMessage: null,
  }),
  methods: {
    resetForm() {
      this.originAirport = null;
      this.timestamp = null;
      this.endTimestamp = null;
      this.formErrorMessage = null;
    },
    initTimestamps(airportIcao) {
      this.startTimestamp = utils.getCurrentUTCTimestamp();
      this.timestamp = this.startTimestamp;

      api.getLastTafEndTime(airportIcao)
        .then((res) => {
          this.endTimestamp = res.data.end_timestamp;
        })
        .catch((error) => {
          this.handleFormError({error});
        });
    },
    submitForm() {
      if (!this.$refs.rpForm.checkValidity()) {
        this.$refs.rpForm.classList.add('was-validated');
        return;
      }

      const data = {
        destinationIcao: this.getDestinationIcao(),
        originIcao: this.originIcao,
        timestamp: this.timestamp,
      };

      api.createRunwayPredictionInput(data)
        .then((res) => {
          const query = {
            origin_icao: res.data.origin_icao,
            timestamp: res.data.timestamp.toString(),
            wind_direction: res.data.wind_direction.toString(),
            wind_speed: res.data.wind_speed.toString(),
            wind_input_source: res.data.wind_input_source,
          };

          this.modal.hide();
          this.goToPage({
            name: 'ArrivalsRunwayPrediction',
            params: {destinationIcao: this.getDestinationIcao()},
            query
          });
        })
        .catch((error) => {
          this.handleFormError({error});
        })
    },
    onDateTimeChange(timestamp) {
      this.timestamp = timestamp;

      if (this.formErrorMessage) {
        this.formErrorMessage = null;
      }
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
        .catch(() => {
          this.formErrorMessage = 'No airports available at the moment. Please try again later.';
        });
    },
    handleFormError({error, defaultMessage = ''}) {
      if (this.isGenericError(error)) {
        this.handleApiError({error, defaultMessage});
        this.modal.hide();
      } else {
        this.formErrorMessage = error.response.data.detail;
      }
    },
    getDestinationIcao() {
      return this.$route.params.destinationIcao || this.destinationIcao;
    },
  },
  computed: {
    originIcao() {
      if (!this.originAirport) {
        return '';
      }

      return this.originAirport.substring(0, 4);
    },
    hasErrors() {
      return Boolean(this.formErrorMessage) || !this.originAirport;
    },
    submitButtonClass() {
      let _class = 'btn btn-primary';

      if (this.hasErrors) {
        _class = `${_class} disabled`;
      }

      return _class;
    }
  },
  mounted() {
    this.modal = new Modal('#rpFormModal');

    const self = this;
    this.$refs.rpFormModal.addEventListener('show.bs.modal', function () {
      self.initTimestamps(self.getDestinationIcao());
    });
    this.$refs.rpFormModal.addEventListener('hide.bs.modal', function () {
      self.resetForm();
    });
  },
};
</script>

<style scoped>

</style>