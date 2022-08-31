
<template>
  <div>
    <NavBar
      :key="$route.fullPath"
    ></NavBar>
    <main class="flex-shrink-0">
      <div class="container">

        <div>

        <div v-if="canShowCards" class="row row-cols-1 mt-3">
          <div class="col">
            <div class="card text-center">
              <h5 class="card-header">
                Destination airports
              </h5>
              <div class="card-body">
                <h6>Choose an airport and predict runways of arrival flights. </h6>
                <div class="row-cols-md-1">
                  <div v-for="airport in $config.destinationAirports"
                    :key="airport.icao"
                    class="col"
                  >
                    <a
                      @click="$router.push({ name: 'Arrivals', params: { destinationIcao: airport.icao } })"
                      class="btn btn-primary align-items-center menu-icon mt-3"
                    >
                      <span class="ms-2">{{ airport.icao }} | {{ airport.name }}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        <router-view
        ></router-view>
      </div>
    </main>

  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import * as utils from "@/common/utils";

export default {
  name: 'HomePage',
  components: {
    NavBar,
  },
  data: () => ({
  }),
  computed: {
    canShowCards() {
      return utils.isEqual(this.$route.params, {}) && utils.isEqual(this.$route.query, {});
    },
  },
};
</script>
<style>
  .menu-icon {
    margin-right: 10px;
  }
</style>