<template>
  <router-view
  ></router-view>

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
export default {
  name: "ArrivalsPage",
  components: {
    ArrivalsRunwayPredictionForm,
    ArrivalsRunwayConfigPredictionForm,
    ArrivalsRunwayPredictionStats,
    ArrivalsRunwayConfigPredictionStats,
  },
}
</script>