<template>

  <div class="modal fade" id="rcpForm" aria-hidden="true" aria-labelledby="rcpForm" tabindex="-1" ref="rcpForm">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $route.params.destinationIcao }} | New Runway Config Prediction</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form>
          <div class="modal-body">
            <div class="form-group">
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
  name: "ArrivalsRunwayConfigPredictionForm",
  components: {
    DateTimeRange,
  },
  data: () => ({
    timestamp: null,
    endTimestamp: null,
    modal: null,
  }),
  methods: {
    resetForm() {
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
        timestamp: this.timestamp,
      };

      api.createRunwayConfigPredictionInput(data)
        .then((res) => {
          this.predictionInput = res.data;
          this.modal.hide();
          this.$router.push({ name: 'ArrivalsRunwayConfigPrediction', query: this.predictionInput});
        })
        .catch((error) => {
          console.error(error)
        })
    },
    onDateTimeChange(timestamp) {
      this.timestamp = timestamp;
    },
  },
  mounted() {
    this.modal = new Modal('#rcpForm');

    const self = this;
    this.$refs.rcpForm.addEventListener('show.bs.modal', function () {
      self.getLastTafEndTime(self.$route.params.destinationIcao);
    });
    this.$refs.rcpForm.addEventListener('hide.bs.modal', function () {
      self.resetForm();
    });
  },
};
</script>

<style scoped>

</style>