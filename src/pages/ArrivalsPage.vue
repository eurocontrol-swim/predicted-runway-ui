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
          <p class="card-text">Runway in Use</p>
          <a data-bs-toggle="modal" href="#rpFormModal" :class="runwayModelButtonClass"><i class="bi-cpu menu-icon"></i><span>New prediction</span></a>
          <a data-bs-toggle="modal" href="#runwayModelStatsModal" :class="runwayModelButtonClass"><i class="bi-graph-up menu-icon"></i><span>Model statistics</span></a>

          </li>
          <li class="list-group-item">
          <p class="card-text mt-0">Runway Configuration</p>
          <a data-bs-toggle="modal" href="#rcpFormModal" :class="runwayConfigModelButtonClass"><i class="bi-cpu menu-icon"></i><span>New prediction</span></a>
          <a data-bs-toggle="modal" href="#runwayConfigModelStatsModal" :class="runwayConfigModelButtonClass"><i class="bi-graph-up menu-icon"></i><span>Model statistics</span></a>
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
    airportData: null,
    modalButtonClass: 'btn btn-primary align-items-center menu-icon',
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
    },
    runwayModelButtonClass() {
      const extraClass = this.airportData.models.runway_in_use ? '' : ' disabled';

      return this.modalButtonClass + extraClass;
    },
    runwayConfigModelButtonClass() {
      const extraClass = this.airportData.models.runway_config ? '' : ' disabled';

      return this.modalButtonClass + extraClass;
    },
  },
  created() {
    this.airportData = this.$config.getAirportData(this.$route.params.destinationIcao);

    this.$emitter.on('pr-alert', (message) => {
      this.message = message;
    });
  }
};
</script>