<template>
  <div class="home-view">
    <PieChart :chartData="chartData" v-if="loaded" />
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import PieChart from '@/components/PieChart.vue'

export default {
  name: 'HomeView',
  components: {
    PieChart
  },
  data() {
    return {
      loaded: false,
      chartData: null
    }
  },
  async mounted() {
    try {
      const response = await fetch('https://data.cityofnewyork.us/resource/f9bf-2cp4.json')
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = await response.json()

      const groupedData = {}
      data.forEach(item => {
        const ethnicity = item.race_ethnicity
        const score = parseInt(item.sat_critical_reading_avg_score) + parseInt(item.sat_math_avg_score) + parseInt(item.sat_writing_avg_score)
        if (!groupedData[ethnicity]) {
          groupedData[ethnicity] = 0
        }
        groupedData[ethnicity] += score
      })

      const labels = Object.keys(groupedData)
      const datasets = [{
        data: Object.values(groupedData),
        backgroundColor: labels.map(_ => '#' + Math.floor(Math.random()*16777215).toString(16)),
        label: 'SAT Scores'
      }]

      this.chartData = { labels, datasets }
      this.loaded = true
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
}
</script>

<style scoped>
.home-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
