<template>
  <div>

  </div>
</template>

<script>
 import { ref, onMounted } from "vue";
 const apidata = ref("")
 async function getApiData() {
  let res = await fetch ("https://data.cityofnewyork.us/resource/7z8d-msnt.json")
  let data = await res.json();
  apidata.value = data;
 }

 onMounted (() => {
  getApiData();
 });
</script>

<style scoped>

</style>