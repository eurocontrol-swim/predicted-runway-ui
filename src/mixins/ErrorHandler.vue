<script>

export default {
  name: 'ErrorHandler',
  methods: {
    handleApiError({ error, defaultMessage = '' }) {
      let message = '';
      if (error.response !== undefined && error.response.status !== undefined) {
        let description = defaultMessage || error.response.data.detail;
        if (error.response.status === 401) {
          description = 'Unauthorized access';
        }
        message = `Server error: ${description}`;
      } else if (error.message === 'Network Error') {
        message = error.message;
      } else {
        message = 'Error while processing server data.';
      }
      this.$emitter.emit('pr-alert', message);
    },
    isGenericError(error) {
      return error.response === undefined || error.response.status === 500;
    },
  },
};
</script>
