<template>

  <AlertNotification
    :message="message"
    @close="onCloseAlert()"
  ></AlertNotification>

  <div v-if="canShowCards" class="row row-cols-1">
    <div class="col">
      <div class="card text-center">
        <h5 class="card-header">
          {{ destinationAirport }}
        </h5>
        <div class="card-body">
          <h6>Make a new prediction or see the statistics of the models that are used to perform the predictions.</h6>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
          <p class="card-text">Runways in Use</p>
          <a data-bs-toggle="modal" href="#rpFormModal" class="btn btn-primary align-items-center menu-icon"><i class="bi-cpu menu-icon"></i><span>New prediction</span></a>
          <a data-bs-toggle="modal" href="#runwayModelStatsModal" class="btn btn-primary align-items-center menu-icon"><i class="bi-graph-up menu-icon"></i><span>Model statistics</span></a>

          </li>
          <li class="list-group-item">
          <p class="card-text mt-0">Runways' Configuration</p>
          <a data-bs-toggle="modal" href="#rcpFormModal" class="btn btn-primary align-items-center menu-icon"><i class="bi-cpu menu-icon"></i><span>New prediction</span></a>
          <a data-bs-toggle="modal" href="#runwayConfigModelStatsModal" class="btn btn-primary align-items-center menu-icon"><i class="bi-graph-up menu-icon"></i><span>Model statistics</span></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <router-view></router-view>

  <ArrivalsRunwayPredictionForm></ArrivalsRunwayPredictionForm>
  <ArrivalsRunwayConfigPredictionForm></ArrivalsRunwayConfigPredictionForm>

  <ArrivalsRunwayPredictionStats></ArrivalsRunwayPredictionStats>
  <ArrivalsRunwayConfigPredictionStats></ArrivalsRunwayConfigPredictionStats>
</template>

<script>
import * as utils from "@/common/utils";
import ArrivalsRunwayPredictionForm from '@/components/ArrivalsRunwayPredictionForm.vue';
import ArrivalsRunwayConfigPredictionForm from '@/components/ArrivalsRunwayConfigPredictionForm.vue';
import ArrivalsRunwayPredictionStats from "@/components/ArrivalsRunwayPredictionStats";
import ArrivalsRunwayConfigPredictionStats from "@/components/ArrivalsRunwayConfigPredictionStats";
import AlertNotification from "@/components/AlertNotification";

export default {
  name: "ArrivalsPage",
  components: {
    AlertNotification,
    ArrivalsRunwayPredictionForm,
    ArrivalsRunwayConfigPredictionForm,
    ArrivalsRunwayPredictionStats,
    ArrivalsRunwayConfigPredictionStats,
  },
  data: () => ({
    message: '',
  }),
  methods: {
    onCloseAlert() {
      this.message = '';
    },
  },
  computed: {
    canShowCards() {
      return utils.isEqual(this.$route.query, {});
    },
    destinationAirport() {
      const airportData = this.$config.getAirportData(this.$route.params.destinationIcao);

      return `${airportData.icao} | ${airportData.name}`;
    }
  },
  created() {
    this.$emitter.on('pr-alert', (message) => {
      this.message = message;
    });
  }
};
</script>