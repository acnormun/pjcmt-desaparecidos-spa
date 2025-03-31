<template>
    <Doughnut :data="chartData" />
</template>

<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
defineProps<{ chartData: any }>()
</script>