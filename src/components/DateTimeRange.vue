<template>
  <div>
    <label for="dateTimeRange" class="form-label">Arriving at</label>
    <input type="range" class="form-range" min="0" :max="maxTimeRange" id="dateTimeRange" v-model="timeRange" @change="onDateTimeChange()">
    <span><strong>{{ dateTimeText }}</strong></span>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "DateTimeRange",
  props: {
    endTimestamp: Number,
  },
  data: () => ({
    maxTimeRange: 0,
    timeRange: 0,
    startTimestamp: null,
  }),
  methods: {
    handleForecastEndTime(endTimestamp) {
      const startDatetime = moment().utc();
      startDatetime.set('minutes', 0);
      startDatetime.set('seconds', 0);

      this.startTimestamp = startDatetime.unix();
      this.maxTimeRange = Math.floor(((endTimestamp - this.startTimestamp) / 3600));
    },
    onDateTimeChange() {
      this.$emit('datetime-change', this.timestamp);
    },
    formatDate(d) {
      return d.toUTCString().replace('GMT', 'UTC');
    },
    reset() {
      this.startTimestamp = null;
      this.maxTimeRange = 0;
      this.timeRange = 0;
    },
  },
  computed: {
    timestamp() {
      if (!this.startTimestamp) {
        return;
      }

      return this.startTimestamp + (3600 * this.timeRange);
    },
    dateTimeText() {
      if (!this.timestamp) {
        return;
      }
      const timestamp = this.startTimestamp + (3600 * this.timeRange)

      return this.formatDate(new Date(timestamp * 1000))
    },
  },
  watch: {
    startTimestamp(val) {
      if (val) {
        this.$emit('datetime-change', val);
      }
    },
    endTimestamp(val) {
      if (val) {
        this.handleForecastEndTime(val);
      } else {
        this.reset();
      }
    }
  }
};
</script>
