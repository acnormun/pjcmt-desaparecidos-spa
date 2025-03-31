<template>
    <Bar :data="chartData" />
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
defineProps<{ chartData: any }>()
</script>