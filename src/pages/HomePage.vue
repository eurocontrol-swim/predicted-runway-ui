
<template>
  <div>
    <NavBar></NavBar>
    <main class="flex-shrink-0">
      <div class="container">
        <router-view
          :key="$route.path"
        ></router-view>
      </div>
    </main>

  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'HomePage',
  components: {
    NavBar,
  },
  data: () => ({
  }),
  methods: {
  },
  created() {
  },
};
</script>
