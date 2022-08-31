<template>
  <div>
    <label for="dateTimeRange" class="form-label">Arriving at</label>
    <input
        type="range"
        class="form-range"
        id="dateTimeRange"
        min="0"
        :max="maxTimeRange"
        :value="selectedTimeRange"
        @change="onDateTimeChange($event)"
    >
    <span><strong>{{ dateTimeText }}</strong></span>
  </div>
</template>

<script>

export default {
  name: "DateTimeRange",
  props: {
    startTimestamp: Number,
    endTimestamp: Number,
    preSelectedTimestamp: {
      type: Number,
      required: false,
    }
  },
  data: () => ({
    maxTimeRange: 0,
    selectedTimeRange: 0,
    dateTimeText: null,
  }),
  methods: {
    setMaxTimeRange(endTimestamp) {
      this.maxTimeRange = Math.floor(((endTimestamp - this.startTimestamp) / 3600));
    },
    setSelectedTimeRange(preSelectedTimestamp) {
      this.selectedTimeRange = Math.floor(((preSelectedTimestamp - this.startTimestamp) / 3600));
    },
    setDateTimeText(timestamp) {
      this.dateTimeText = this.formatDate(new Date(timestamp * 1000))
    },
    onDateTimeChange(event) {
      this.selectedTimeRange = event.target.value;
      const timestamp = this.startTimestamp + (3600 * this.selectedTimeRange);

      this.setDateTimeText(timestamp);
      this.$emit('datetime-change', timestamp);
    },
    formatDate(d) {
      return d.toUTCString().replace('GMT', 'UTC');
    },
    reset() {
      this.maxTimeRange = 0;
      this.selectedTimeRange = 0;
    },
  },
  watch: {
    endTimestamp(val) {
      if (val) {
        this.setMaxTimeRange(val);
        this.setSelectedTimeRange(this.startTimestamp);
        this.setDateTimeText(this.startTimestamp);
      }
    },
    preSelectedTimestamp(val) {
      if (val) {
        this.setSelectedTimeRange(val);
        this.setDateTimeText(val);
      }
    },
  },
  created() {
  }
};
</script>
