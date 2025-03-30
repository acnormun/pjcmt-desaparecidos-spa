<template>
    <div class="p-4">
        Home View
    </div>
</template>

<script lang="ts" setup>
import { useDesaparecidosStore } from '../store/desaparecidos.store'
import { onMounted } from 'vue'
const desaparecidosStore = useDesaparecidosStore()

onMounted(() => {
    desaparecidosStore.getDesaparecidos()
})
</script>