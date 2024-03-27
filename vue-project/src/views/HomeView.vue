<script setup>
import { ref,  } from 'vue';
import {onBeforeMount} from 'vue';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const nyc = ref('')
async function api () {
  try {
  let fetchthing = await fetch ("https://data.cityofnewyork.us/resource/f9bf-2cp4.json")
  let putasjson = await fetchthing.json();
  nyc.value = putasjson;
  console.log(putasjson)
}  
catch (error) {
  console.log ("error", error)
}}
onBeforeMount(() =>{
    api("https://data.cityofnewyork.us/resource/f9bf-2cp4.json");
})

</script>


<template>
  <main>
  </main>
</template>
