<template>
  <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-dark" style="width: 100%">
    <div class="container">
      <a class="navbar-brand"  href="/">
        Predicted Runway
      </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li v-if="$route.params.destinationIcao"
                class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="airportMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {{ airportTitle }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="airportMenu">
                <li><h6 class="dropdown-header">Runway in Use</h6></li>
                <li><a :class="runwayDropdownItemClass" data-bs-toggle="modal" href="#rpFormModal"><i class="bi-cpu menu-icon"></i>New prediction</a></li>
                <li><a :class="runwayDropdownItemClass" data-bs-toggle="modal" data-bs-target="#runwayModelStatsModal" href="#rpStats"><i class="bi-graph-up menu-icon"></i>Model statistics</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><h6 class="dropdown-header">Runway Configuration</h6></li>
                <li><a :class="runwayConfigDropdownItemClass" data-bs-toggle="modal" href="#rcpFormModal"><i class="bi-cpu menu-icon"></i>New prediction</a></li>
                <li><a :class="runwayConfigDropdownItemClass" data-bs-toggle="modal" data-bs-target="#runwayConfigModelStatsModal" href="#rcpStats"><i class="bi-graph-up menu-icon"></i>Model statistics</a></li>
              </ul>
            </li>
          </ul>
        <div class="d-flex">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" id="optionsMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Options
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end dropdown-menu-dark"
                aria-labelledby="optionsMenu"
              >
                <li><h6 class="dropdown-header">Destination airports</h6></li>
                <li class="destination-airports-list-item">
                  <AirportsDropdownList
                    :airports="$config.destinationAirports"
                    width="auto"
                    @selected-airport="onSelectedAirport($event)"
                    v-model="airport"
                  >
                  </AirportsDropdownList>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li><h6 class="dropdown-header">Misc</h6></li>
                <li><a class="dropdown-item" target="_blank" :href="openApiUrl"><i class="bi-braces menu-icon"></i>API specifications</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import * as api from "@/common/api";
import AirportsDropdownList from "@/components/AirportsDropdownList";

export default {
  name: "NavBar",
  components: {
    AirportsDropdownList,
  },
  data: () => ({
    dropdownItemClass: 'dropdown-item',
    airport: null,
  }),
  methods: {
    onSelectedAirport(airport) {
      this.$router.push({ name: 'Arrivals', params: { destinationIcao: airport.icao } });
    },
  },
  computed: {
    airportTitle() {
      return this.$config.getDestinationAirportByIcao(this.$route.params.destinationIcao).title;
    },
    openApiUrl() {
      return api.getOpenApiUrl();
    },
    runwayDropdownItemClass() {
      const extraClass = this.airport && this.airport.models.runway_in_use ? '' : ' disabled';

      return this.dropdownItemClass + extraClass;
    },
    runwayConfigDropdownItemClass() {
      const extraClass = this.airport && this.airport.models.runway_config ? '' : ' disabled';

      return this.dropdownItemClass + extraClass;
    },
  },
  created() {
    if (this.$route.params.destinationIcao) {
      this.airport = this.$config.getDestinationAirportByIcao(this.$route.params.destinationIcao);
    }
  }
};
</script>

<style scoped>

  .material-symbols-outlined {
    font-variation-settings:
    'FILL' 0,
    'wght' 200,
    'GRAD' 0,
    'opsz' 48
  }

  .destination-airports-list-item {
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
