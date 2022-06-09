
<template>
  <div>
    <NavBar></NavBar>
    <main class="flex-shrink-0">
      <div class="container">
        <router-view></router-view>
      </div>
    </main>

    <AppFooter></AppFooter>
  </div>
</template>

<script>
// @ is an alias to /src
// import * as serverApi from '@/common/server-api';
// import EventBus from '@/common/event-bus';
import NavBar from '@/components/NavBar.vue';
import AppFooter from '@/components/AppFooter.vue';
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
  },
  data: () => ({
  }),
  methods: {
  },
  created() {
  },
};
</script>
