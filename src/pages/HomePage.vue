
<template>
  <div>
    <NavBar
      :key="$route.fullPath"
    ></NavBar>
    <main class="flex-shrink-0">
      <div class="container">
        <div v-if="canShowCards" class="row row-cols-1 mt-3">
          <div class="col">
            <div class="card text-center">
              <div class="card-body">
                <label for="airportsList" class="form-label">Choose a destination airport and predict runways of arrival flights:</label>
                <input
                  id="airportsList"
                  class="form-control"
                  list="airportsListOptions"
                  placeholder="Type to search..."
                  v-model="selectedAirportName"
                >
                <datalist id="airportsListOptions">
                  <option
                    v-for="airport in $config.destinationAirports"
                    :key="airport.icao"
                  >
                    {{ airport.name }}
                  </option>
                </datalist>
                <div class="row-cols-md-1">
                  <div>
                    <a :class="rpButtonClass"
                       data-bs-toggle="modal"
                       href="#rpFormModal"
                    >
                      <span class="ms-2">Predict runway in use</span>
                    </a>
                    <a :class="rcpButtonClass"
                       data-bs-toggle="modal"
                       href="#rcpFormModal"
                    >
                      <span class="ms-2">Predict runway configuration</span>
                    </a>
                  </div>
                  <div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <router-view></router-view>
      </div>
    </main>

    <ArrivalsRunwayPredictionForm
      :destinationIcao="selectedAirportICAO"
    ></ArrivalsRunwayPredictionForm>
    <ArrivalsRunwayConfigPredictionForm
      :destinationIcao="selectedAirportICAO"
    ></ArrivalsRunwayConfigPredictionForm>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import ArrivalsRunwayPredictionForm from '@/components/ArrivalsRunwayPredictionForm.vue';
import ArrivalsRunwayConfigPredictionForm from '@/components/ArrivalsRunwayConfigPredictionForm.vue';
import * as utils from "@/common/utils";

export default {
  name: 'HomePage',
  components: {
    NavBar,
    ArrivalsRunwayPredictionForm,
    ArrivalsRunwayConfigPredictionForm
  },
  data: () => ({
    selectedAirportName: null,
    buttonClass: 'btn btn-primary align-items-center menu-icon mt-3',
  }),
  methods: {
    buttonIsDisabled(type) {
      if (!this.selectedAirportName) {
        return true;
      }

      const airportData = this.$config.getAirportDataByName(this.selectedAirportName);

      if (!airportData) {
        return true;
      }

      return (type === 'rp' && !airportData.models.runway_in_use)
          || (type === 'rcp' && !airportData.models.runway_config);
    }
  },
  computed: {
    canShowCards() {
      return utils.isEqual(this.$route.params, {}) && utils.isEqual(this.$route.query, {});
    },
    rpButtonClass() {
      return this.buttonClass + (this.buttonIsDisabled('rp') ? ' disabled' : '');
    },
    rcpButtonClass() {
      return this.buttonClass + (this.buttonIsDisabled('rcp') ? ' disabled' : '');
    },
    selectedAirportICAO() {
      if (!this.selectedAirportName) {
        return;
      }
      const [airport] = this.$config.destinationAirports.filter(
          (airport) => airport.name === this.selectedAirportName
      );

      if (!airport) {
        return;
      }

      return airport.icao;
    }
  },
};
</script>
<style>
  .menu-icon {
    margin-right: 10px;
  }
</style>