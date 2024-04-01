<template>
    <div class="container">
      <router-link to="/" class="link">Home Page</router-link>
      <Bar v-if="loaded" :data="chartData" :options="chartOptions"></Bar>
    </div>
  </template>
  
  <script setup>
  import { ref, onBeforeMount } from 'vue'
  import { Bar } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  } from 'chart.js'
  import { useRouter } from 'vue-router';
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  const chartData = ref(null)
  const loaded = ref(false)
  let schoolNames = []
  
  async function fetchScores() {
    try {
      const response = await fetch('https://data.cityofnewyork.us/resource/f9bf-2cp4.json')
      const data = await response.json()
  
      const elaScores = data.map(item => item.sat_critical_reading_avg_score)
      const dbn = data.map(item => item.dbn)
      schoolNames = data.map(item => item.school_name)
  
      chartData.value = {
        labels: dbn,
        datasets: [
          {
            label: 'ELA Scores',
            backgroundColor: 'blue',
            data: elaScores,
          }
        ]
      }
      loaded.value = true
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  
  onBeforeMount(() => {
    fetchScores()
  })
  
  const chartOptions = ref({
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            return `School: ${schoolNames[index]}`;
          }
        }
      }
    }
  });
  
  const router = useRouter();
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .link {
    margin-top: 20px; 
    font-size: 25px; /* Increase the font size */

  }
  </style>
  