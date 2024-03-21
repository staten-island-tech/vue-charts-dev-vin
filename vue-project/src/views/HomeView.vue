<script setup>
import { ref,  } from 'vue';
import {onBeforeMount} from 'vue';

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
    api();
})

</script>


<template>
  <main>
  </main>
</template>
