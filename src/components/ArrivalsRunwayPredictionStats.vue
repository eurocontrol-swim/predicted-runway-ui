<template>
  <div class="modal fade" id="runwayModelStatsModal" tabindex="-1" aria-labelledby="runwayModelStatsModalLabel" aria-hidden="true" ref="rpStats">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="runwayModelStatsModalLabel">{{ $route.params.destinationIcao }} | Runway in Use | Model statistics</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
          <div v-if="error" class="modal-body">
            <ErrorMessage
              :message="error"
            ></ErrorMessage>
          </div>
          <div v-else-if="stats" class="modal-body">

            <div class="table-responsive">
              <table class="table table-sm caption-top stats-table">
                  <caption>General</caption>
                  <tbody>
                    <tr>
                      <td><strong>Algorithm</strong></td>
                      <td>Random Forest Classifier</td>
                    </tr>
                    <tr>
                      <td><strong>Estimators</strong></td>
                      <td>{{ stats.number_estimators }}</td>
                    </tr>
                    <tr>
                      <td><strong>Criterion</strong></td>
                      <td>{{ stats.criterion }}</td>
                    </tr>
                    <tr>
                      <td><strong>From date</strong></td>
                      <td>{{ stats.date_from }}</td>
                    </tr>
                    <tr>
                      <td><strong>To date</strong></td>
                      <td>{{ stats.date_to }}</td>
                    </tr>
                  </tbody>
                </table>
            </div>
            <div class="table-responsive">
              <table class="table table-sm caption-top metrics-table">
                  <caption>Features</caption>
                  <thead class="table-light">
                    <tr>
                        <th>Name</th>
                        <th>Importance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="[feature, value] in stats.features_importance"
                      :key="feature"
                    >
                      <td v-if="feature === 'wind_dir'">
                        <strong>Wind direction</strong>
                      </td>
                      <td v-else-if="feature === 'origin_angle'">
                        <strong>Origin/destination angle</strong>
                      </td>
                      <td v-else-if="feature === 'wind_speed'">
                        <strong>Wind speed</strong>
                      </td>
                      <td v-else-if="feature === 'hour'">
                        <strong>Hour of day</strong>
                      </td>
                      <td v-else-if="feature === 'is_summer_season'">
                        <strong>Is summer season</strong>
                      </td>
                      <td v-else-if="feature === 'is_workday'">
                        <strong>Is workday</strong>
                      </td>

                      <td>{{ (value * 100).toFixed(2) }}%</td>
                    </tr>
                  </tbody>
                </table>
            </div>
            <div class="table-responsive">
              <table class="table table-sm caption-top metrics-table">
                  <caption>Metrics</caption>
                  <thead class="table-light">
                    <tr>
                        <th>Name</th>
                        <th>Test with METAR</th>
                        <th>Test with TAF</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>F1 weighted</strong></td>
                      <td>{{ (stats.test_with_metar.f1_weighted * 100).toFixed(2) }}%</td>
                      <td>{{ (stats.test_with_taf.f1_weighted * 100).toFixed(2) }}%</td>
                    </tr>
                    <tr>
                      <td><strong>Balanced accuracy</strong></td>
                      <td>{{ (stats.test_with_metar.balanced_accuracy * 100).toFixed(2) }}%</td>
                      <td>{{ (stats.test_with_taf.balanced_accuracy * 100).toFixed(2) }}%</td>
                    </tr>
                    <tr>
                      <td><strong>Balanced accuracy over random</strong></td>
                      <td>{{ (stats.test_with_metar.balanced_accuracy_over_rand * 100).toFixed(2) }}%</td>
                      <td>{{ (stats.test_with_taf.balanced_accuracy_over_rand * 100).toFixed(2) }}%</td>
                    </tr>
                    <tr>
                      <td><strong>Accuracy</strong></td>
                      <td>{{ (stats.test_with_metar.accuracy * 100).toFixed(2) }}%</td>
                      <td>{{ (stats.test_with_taf.accuracy * 100).toFixed(2) }}%</td>
                    </tr>
                    <tr>
                      <td><strong>Recall weighted</strong></td>
                      <td>{{ (stats.test_with_metar.recall_weighted * 100).toFixed(2) }}%</td>
                      <td>{{ (stats.test_with_taf.recall_weighted * 100).toFixed(2) }}%</td>
                    </tr>
                    <tr>
                      <td><strong>Precision weighted</strong></td>
                      <td>{{ (stats.test_with_metar.precision_weighted * 100).toFixed(2) }}%</td>
                      <td>{{ (stats.test_with_taf.precision_weighted * 100).toFixed(2) }}%</td>
                    </tr>
                    <tr>
                      <td><strong>Top 2</strong></td>
                      <td>{{ (stats.test_with_metar.top_2 * 100).toFixed(2) }}%</td>
                      <td>{{ (stats.test_with_taf.top_2 * 100).toFixed(2) }}%</td>
                    </tr>
                    <tr>
                      <td><strong>ROC AUC</strong></td>
                      <td>{{ (stats.test_with_metar.roc_auc * 100).toFixed(2) }}%</td>
                      <td>{{ (stats.test_with_taf.roc_auc * 100).toFixed(2) }}%</td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import * as api from '@/common/api';
import ErrorHandler from '@/mixins/ErrorHandler.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default {
  name: "ArrivalsRunwayPredictionStats",
  components: {
    ErrorMessage,
  },
  mixins: [
    ErrorHandler,
  ],
  data: () => ({
    stats: null,
    error: null,
  }),
  methods: {
    getStats() {
      api.getArrivalsRunwayStats(this.$route.params.destinationIcao)
        .then((res) => {
          this.stats = res.data;
        })
        .catch(() => {
          this.error = 'Runway prediction statistics are not available at the moment. Please try again later.';
        });
    },
  },
  mounted() {
    const self = this;
    this.$refs.rpStats.addEventListener('show.bs.modal', function () {
      self.getStats();
    });
    this.$refs.rpStats.addEventListener('hide.bs.modal', function () {
      self.stats = null;
      self.error = null;
    });
  }
};
</script>

<style scoped>

  .stats-table {
      font-size: 0.9rem;
  }
</style>