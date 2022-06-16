<template>

  <AlertNotification
    :message="message"
    @close="onCloseAlert()"
  ></AlertNotification>

  <router-view></router-view>

  <ArrivalsRunwayPredictionForm></ArrivalsRunwayPredictionForm>
  <ArrivalsRunwayConfigPredictionForm></ArrivalsRunwayConfigPredictionForm>

  <ArrivalsRunwayPredictionStats></ArrivalsRunwayPredictionStats>
  <ArrivalsRunwayConfigPredictionStats></ArrivalsRunwayConfigPredictionStats>
</template>

<script>
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
  }),
  methods: {
    onCloseAlert() {
      this.message = '';
    },
  },
  created() {
    this.$emitter.on('pr-alert', (message) => {
      this.message = message;
    });
  }
};
</script>