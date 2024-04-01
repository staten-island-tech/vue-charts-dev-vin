<template>
  <div class="home-view">
    <router-link to="/blank-page" class="link">SAT Reading Avg</router-link> 
    <div class="cards-container">
      <div v-for="school in schools" :key="school.dbn" class="card">
        <h3>{{ school.school_name }}</h3>
        <p>DBN: {{ school.dbn }}</p>
        <p>SAT Takers: {{ school.num_of_sat_test_takers }}</p>
      </div>
    </div>
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
      chartData: null,
      schools: [] 
    }
  },
  async mounted() {
    try {
      const response = await fetch('https://data.cityofnewyork.us/resource/f9bf-2cp4.json')
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = await response.json()

      this.schools = data.map(item => ({
        school_name: item.school_name,
        dbn: item.dbn,
        num_of_sat_test_takers: item.num_of_sat_test_takers
      }))

      this.chartData = chartData;
      this.loaded = true;
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
  flex-wrap: wrap; 
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 200px;
}

h3 {
  margin-bottom: 5px;
}

.link {
  font-size: 25px; /* Increase font size */
}
</style>
