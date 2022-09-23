
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
                <AirportsDropdownList
                    :airports="$config.destinationAirports"
                    @selected-airport="onSelectedAirport($event)"
                    v-model="airportData"
                  >
                </AirportsDropdownList>
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
import AirportsDropdownList from "@/components/AirportsDropdownList";
import * as utils from "@/common/utils";

export default {
  name: 'HomePage',
  components: {
    NavBar,
    ArrivalsRunwayPredictionForm,
    ArrivalsRunwayConfigPredictionForm,
    AirportsDropdownList
  },
  data: () => ({
    selectedAirportName: null,
    selectedAirport: null,
    buttonClass: 'btn btn-primary align-items-center menu-icon mt-3',
  }),
  methods: {
    onSelectedAirport(airport) {
      this.selectedAirport = airport;
    },
    buttonIsDisabled(type) {
      if (!this.selectedAirport) {
        return true;
      }

      return (type === 'rp' && !this.selectedAirport.models.runway_in_use)
          || (type === 'rcp' && !this.selectedAirport.models.runway_config);
    },
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
      return this.selectedAirport ? this.selectedAirport.icao : null;
    }
  },
};
</script>
<style>
  .menu-icon {
    margin-right: 10px;
  }
</style>
