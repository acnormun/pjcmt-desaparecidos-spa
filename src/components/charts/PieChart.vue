<template>
    <Pie :data="chartData" />
  </template>
  
  <script setup lang="ts">
  import { Pie } from 'vue-chartjs'
  defineProps<{ chartData: any }>()
  </script>
  