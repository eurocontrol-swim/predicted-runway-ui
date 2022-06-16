<template>
  <div class="p-2">
    <div v-if="message.length > 0" :class="alertClass" role="alert" ref="alert" id="pr-alert">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg>
      <div>{{ message }}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </div>
</template>

<script>
import {Alert} from 'bootstrap';

export default {
  name: "AlertNotification",
  props: {
    type: {
      type: String,
      default: 'warning',
    },
    message: String,
    timeoutInSec: {
      type: Number,
      default: 5
    }
  },
  methods: {
  },
  computed: {
    alertClass() {
      return `alert alert-${this.type} alert-dismissible d-flex align-items-center fade show`
    },
  },
  watch: {
    '$refs.alert': function(val) {
      if (val !== undefined) {
        this.$refs.alert.addEventListener('closed.bs.alert', () => this.$emit('close'));
      }
    },
    message(val) {
      if (!val) {
        return;
      }

      setInterval(() => {
        const alert = new Alert("#pr-alert");
        alert.close();
      }, this.timeoutInSec * 1000);
    },
  },
}
</script>

<style scoped>

</style>