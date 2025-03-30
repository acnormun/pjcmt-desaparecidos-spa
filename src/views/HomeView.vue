<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Home View</h1>

        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Card v-for="desaparecido in lista" :key="desaparecido.id" :desaparecido="desaparecido" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useDesaparecidosStore } from '../store/desaparecidos.store'
import { onMounted, computed } from 'vue'
import Card from '../components/Card.vue'

const desaparecidosStore = useDesaparecidosStore()
const lista = computed(() => desaparecidosStore.lista)

onMounted(() => {
    desaparecidosStore.getDesaparecidos()
})
</script>