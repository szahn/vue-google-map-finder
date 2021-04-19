<template>
    <div class="spinner-container">
      <b-spinner variant="secondary"></b-spinner>        
    </div>
</template>

<script>
export default {
  name: "BusySpinner",
};
</script>

<style scoped>
    .spinner-container {
        position: absolute;
        right: 15px;
        top: 90px;
        z-index: 99;   
    }
</style>
