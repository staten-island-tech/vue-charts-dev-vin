<template>
  <div>
    <Line v-if="loaded" :data="chartData"></Line>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart } from 'chart.js/auto'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement
} from 'chart.js/auto'

Chart.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  LineElement
)

const chartData = ref(null)
const loaded = ref(false)

async function fetchData() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/f9bf-2cp4.json')
    const data = await response.json()
    const dbn = data.map((item) => item.dbn)
    const mathScores = data.map((item) => item.sat_math_avg_score)

    chartData.value = {
      labels: dbn,
      datasets: [
        {
          label: 'MATH SCORES',
          borderColor: 'red',
          data: mathScores
        },
      ]
    }

    loaded.value = true
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onBeforeMount(() => {
  fetchData()
})
</script>

<style scoped></style>