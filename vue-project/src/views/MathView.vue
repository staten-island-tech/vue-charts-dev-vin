<template>
    <div class="container">
      <router-link to="/" class="link">Home Page</router-link>
      <div v-if="loaded">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
      <div v-else>Loading...</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onBeforeMount } from 'vue'
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  const chartData = ref(null)
  const loaded = ref(false)
  let schoolNames = []
  
  async function fetchScores() {
    try {
      const response = await fetch('https://data.cityofnewyork.us/resource/f9bf-2cp4.json')
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
  
      const mathScores = data.map(item => item.sat_math_avg_score)
      const dbn = data.map(item => item.dbn)
      schoolNames = data.map(item => item.school_name)
  
      chartData.value = {
        labels: dbn,
        datasets: [{
          label: 'Math Scores',
          backgroundColor: 'blue',
          data: mathScores,
        }]
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
  })
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .link {
    margin-top: 20px;
    font-size: 25px;
  }
  </style>