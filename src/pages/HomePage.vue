
<template>
  <div>
    <NavBar></NavBar>
    <main class="flex-shrink-0">
      <div class="container">
        <router-view></router-view>
      </div>
    </main>

    <AppFooter></AppFooter>

    <ArrivalsRunwayPredictionForm></ArrivalsRunwayPredictionForm>
    <ArrivalsRunwayConfigPredictionForm></ArrivalsRunwayConfigPredictionForm>
  </div>
</template>

<script>
// @ is an alias to /src
// import * as serverApi from '@/common/server-api';
// import EventBus from '@/common/event-bus';
import NavBar from '@/components/NavBar.vue';
import AppFooter from '@/components/AppFooter.vue';
import ArrivalsRunwayPredictionForm from '@/components/ArrivalsRunwayPredictionForm.vue';
import ArrivalsRunwayConfigPredictionForm from '@/components/ArrivalsRunwayConfigPredictionForm.vue';
// import ErrorHandler from '@/mixins/ErrorHandler.vue';
// import RouteHandler from '@/mixins/RouteHandler.vue';

export default {
  name: 'HomePage',
  mixins: [
    // ErrorHandler,
    // RouteHandler,
  ],
  components: {
    NavBar,
    AppFooter,
    ArrivalsRunwayPredictionForm,
    ArrivalsRunwayConfigPredictionForm,
  },
  data: () => ({
  }),
  methods: {
  },
  created() {
  },
};
</script>
