<template>
  <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-dark" style="width: 100%">
    <div class="container">
      <a class="navbar-brand"  href="/">Predicted Runway</a>
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
                <li><a class="dropdown-item" data-bs-toggle="modal" href="#rpForm">New prediction</a></li>
                <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#runwayModelStatsModal" href="#rpStats">Show model statistics</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><h6 class="dropdown-header">Runways Configuration</h6></li>
                <li><a class="dropdown-item" data-bs-toggle="modal" href="#rcpForm">New prediction</a></li>
                <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#runwayConfigModelStatsModal" href="#rcpStats">Show model statistics</a></li>
              </ul>
            </li>
          </ul>
        <div class="d-flex">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="newPredictionMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Destination airport
              </a>
              <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="newPredictionMenu">
                <li v-for="airport in $config.destinationAirports"
                    :key="airport"
                    @click="$router.push({ name: 'Arrivals', params: { destinationIcao: airport.icao } })"
                >
                  <a class="dropdown-item" style="cursor: pointer">{{ airport.icao }} | {{ airport.name }}</a>
                </li>

<!--                  {% for airport in destination_airports %}-->
<!--                  {% endfor %}-->
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    getAirportName(airportIcao) {
      return this.$config.getAirportData(airportIcao)['name'];
    },
  },
  computed: {
    airportTitle() {
      const destinationIcao = this.$route.params.destinationIcao;

      if (!destinationIcao) {
        return '';
      }

      return `${destinationIcao} | ${this.getAirportName(destinationIcao)}`
    }
  }
}
</script>

<style scoped>

</style>