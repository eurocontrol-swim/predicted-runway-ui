<template>

  <div class="modal fade" id="rcpFormModal" aria-hidden="true" aria-labelledby="rcpFormModal" tabindex="-1" ref="rcpFormModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $route.params.destinationIcao }} | Runway Configuration | New prediction</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form>
          <div class="modal-body">
            <div class="form-group">
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
                <a :class="submitButtonClass" id="rpFormButton" @click="submitForm()">Predict</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import * as api from '@/common/api';
import ErrorHandler from '@/mixins/ErrorHandler.vue';
import ErrorMessage from "@/components/ErrorMessage";
import RouteHandler from '@/mixins/RouteHandler.vue';
import DateTimeRange from '@/components/DateTimeRange.vue';
import {Modal} from 'bootstrap';
import * as utils from "@/common/utils";

export default {
  name: "ArrivalsRunwayConfigPredictionForm",
  components: {
    ErrorMessage,
    DateTimeRange,
  },
  mixins: [
    ErrorHandler,
    RouteHandler,
  ],
  data: () => ({
    timestamp: null,
    startTimestamp: null,
    endTimestamp: null,
    modal: null,
    formErrorMessage: null,
  }),
  methods: {
    resetForm() {
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
      const data = {
        destinationIcao: this.$route.params.destinationIcao,
        timestamp: this.timestamp,
      };

      api.createRunwayConfigPredictionInput(data)
        .then((res) => {
          const query = {
            timestamp: res.data.timestamp.toString(),
            wind_direction: res.data.wind_direction.toString(),
            wind_speed: res.data.wind_speed.toString(),
            wind_input_source: res.data.wind_input_source,
          };

          this.modal.hide();
          this.goToPage({
            name: 'ArrivalsRunwayConfigPrediction',
            params: this.$route.params,
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
    handleFormError({error, defaultMessage = ''}) {
      if (this.isGenericError(error)) {
        this.handleApiError({error, defaultMessage});
        this.modal.hide();
      } else {
        this.formErrorMessage = error.response.data.detail;
      }
    },
  },
  computed: {
    hasErrors() {
      return Boolean(this.formErrorMessage);
    },
    submitButtonClass() {
      let _class = 'btn btn-primary';

      if (this.hasErrors) {
        _class = `${_class} disabled`;
      }

      return _class;
    },
  },
  mounted() {
    this.modal = new Modal('#rcpFormModal');

    const self = this;
    this.$refs.rcpFormModal.addEventListener('show.bs.modal', function () {
      self.initTimestamps(self.$route.params.destinationIcao);
    });
    this.$refs.rcpFormModal.addEventListener('hide.bs.modal', function () {
      self.resetForm();
    });
  },
};
</script>

<style scoped>

</style>