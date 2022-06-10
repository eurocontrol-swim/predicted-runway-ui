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
              <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="airportMenu">
                <li><h6 class="dropdown-header">Runways In Use</h6></li>
                <li><a class="dropdown-item" data-bs-toggle="modal" href="#rpForm"><i class="bi-cpu menu-icon"></i>New prediction</a></li>
                <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#runwayModelStatsModal" href="#rpStats"><i class="bi-graph-up menu-icon"></i>Model statistics</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><h6 class="dropdown-header">Runways Configuration</h6></li>
                <li><a class="dropdown-item" data-bs-toggle="modal" href="#rcpForm"><i class="bi-cpu menu-icon"></i>New prediction</a></li>
                <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#runwayConfigModelStatsModal" href="#rcpStats"><i class="bi-graph-up menu-icon"></i>Model statistics</a></li>
              </ul>
            </li>
          </ul>
        <div class="d-flex">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="newPredictionMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Options
              </a>
              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="newPredictionMenu">
                <li><h6 class="dropdown-header">Select destination airport</h6></li>
                <li id="select-airports">
                  <select class="form-select form-select-sm" aria-label="Default select example"
                        @change="airportSelected($event)">
                    <option value=""></option>
                    <option
                        v-for="airport in $config.destinationAirports"
                        :key="airport.icao"
                        :label="getAirportSelectLabel(airport)"
                        :value="airport.icao"
                    >
                    </option>
                  </select>
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

export default {
  name: "NavBar",
  methods: {
    getAirportName(airportIcao) {
      return this.$config.getAirportData(airportIcao)['name'];
    },
    getAirportSelectLabel(airport) {
      return `${airport.icao} | ${airport.name}`;
    },
    airportSelected(event) {
      const icao = event.target.value;
      this.$router.push({ name: 'Arrivals', params: { destinationIcao: icao } });
    },
  },
  computed: {
    airportTitle() {
      const destinationIcao = this.$route.params.destinationIcao;

      if (!destinationIcao) {
        return '';
      }

      return `${destinationIcao} | ${this.getAirportName(destinationIcao)}`
    },
    openApiUrl() {
      return api.getOpenApiUrl();
    },
  },
};
</script>

<style scoped>
  select {
    background-color: #566370;
    color: whitesmoke;
  }

  select > option {
    color: white;
  }
  .menu-icon {
    margin-right: 10px;
  }
  #select-airports {
    margin-left: 10px;
    margin-right: 10px;
  }

  .material-symbols-outlined {
    font-variation-settings:
    'FILL' 0,
    'wght' 200,
    'GRAD' 0,
    'opsz' 48
  }
</style>