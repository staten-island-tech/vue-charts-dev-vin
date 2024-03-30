<template>
  <div class="pie-chart">
    <Pie :data="chartData" />
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'

export default {
  name: 'PieChart',
  extends: Pie,
  props: ['chartData'],
  mounted() {
    this.renderChart(this.chartData, { responsive: true, maintainAspectRatio: false })
  }
}
</script>

<style scoped>
.pie-chart {
  max-width: 600px;
  margin: 0 auto;
}
</style>
