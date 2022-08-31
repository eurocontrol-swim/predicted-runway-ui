<script>

import _ from "lodash";

export default {
  name: 'RouteHandler',
  methods: {
    goToPage({name, params, query}) {
      params = params || {};
      query = query || {};

      const { name: currentName, params: currentParams, query: currentQuery } = this.$route;
      if (currentName === name && _.isEqual(currentParams, params) && _.isEqual(currentQuery, query)) {
        this.$router.go(0);
      } else {
        this.$router.push({ name, params, query});
      }
    },
  },
};
</script>
