<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Missing Persons</h1>

        <div v-if="store.loading" class="text-center">Loading...</div>

        <div v-else class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Card v-for="person in list" :key="person.id" :desaparecido="person" />
        </div>

        <div class="flex justify-center gap-2 mt-6 flex-wrap">
            <button @click="goToPage(store.pagina - 1)" :disabled="store.pagina === 1"
                class="px-3 py-1 border rounded text-sm disabled:opacity-50">
                ←
            </button>

            <button v-for="page in getPaginationRange" :key="page" @click="typeof page === 'number' && goToPage(page-1)"
                class="px-3 py-1 border rounded text-sm" :class="{
                    'bg-blue-500 text-white font-semibold': page === store.pagina + 1,
                        'bg-white text-gray-700 hover:bg-gray-100': page !== store.pagina + 1 && page !== '...'
                }" :disabled="page === '...'">
                {{ page }}
            </button>

            <button @click="goToPage(store.pagina + 1)" :disabled="store.pagina === store.totalPaginas"
                class="px-3 py-1 border rounded text-sm disabled:opacity-50">
                →
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useDesaparecidosStore } from '../store/desaparecidos.store'
import Card from '../components/Card.vue'

const store = useDesaparecidosStore()
const list = computed(() => store.lista)

onMounted(() => {
    store.getDesaparecidos(0)
})

const goToPage = (page: number) => {
    if (page >= 0 && page <= store.totalPaginas && page !== store.pagina) {
        store.getDesaparecidos(page)
    }
}

const getPaginationRange = computed(() => {
    const total = store.totalPaginas
    const current = store.pagina
    const delta = 1
    const range: (number | string)[] = []
    const rangeWithDots: (number | string)[] = []
    let last: number | undefined

    for (let i = 1; i <= total; i++) {
        if (
            i === 1 ||
            i === total ||
            (i >= current - delta && i <= current + delta)
        ) {
            range.push(i)
        }
    }

    for (const page of range) {
        if (last !== undefined) {
            if (typeof page === 'number' && typeof last === 'number' && page - last === 2) {
                rangeWithDots.push(last + 1)
            } else if (typeof page === 'number' && typeof last === 'number' && page - last > 2) {
                rangeWithDots.push('...')
            }
        }
        rangeWithDots.push(page)
        last = page as number
    }

    return rangeWithDots
})
</script>