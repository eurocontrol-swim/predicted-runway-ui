<template>
 <p><i class="bi bi-exclamation-triangle-fill"></i> {{ message }}</p>
</template>

<script>
export default {
  name: "ErrorMessage",
  props: {
    message: String,
  },
}
</script>

<style scoped>
 p {
   font-size: 0.9em;
   color: crimson;
 }
</style>