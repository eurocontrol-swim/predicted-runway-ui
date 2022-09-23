<template>
  <div>
    <input
      class="form-control airports-list"
      list="airportOptions"
      placeholder="Type to search..."
      :style="style"
      @input="$emit('selected-airport', getAirportDataByInput($event))"
      v-model="selectedAirportName"
    >
    <datalist id="airportOptions">
      <option
        v-for="airport in airports"
        :key="airport.icao"
        :value="airport.title"
      ></option>
    </datalist>
  </div>
</template>

<script>
export default {
  name: "AirportsDropdownList",
  props: {
    airports: Array,
    width: {
      type: String,
      required: false,
      default: null
    },
  },
  data: () => ({
    selectedAirportName: null,
  }),
  methods: {
    getAirportDataByInput(event) {
      return this.$config.getDestinationAirportByTitle(event.target.value);
    },
  },
  computed: {
    style() {
      if (!this.width) {
        return '';
      }
      return `width: ${this.width}`
    }
  }
};
</script>
