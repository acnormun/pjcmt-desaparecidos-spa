<template>
    <div class="p-4">
        <Filters @update="handleUpdateFilters" />

        <div v-if="store.loading" class="text-center py-10">Loading...</div>

        <div v-else class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Card v-for="person in list" :key="person.id" :desaparecido="person" @click="handleSelect(person)" />
        </div>

        <div class="flex justify-center gap-2 mt-6 flex-wrap">
            <button @click="goToPage(store.pagina - 1)" :disabled="store.pagina === 0"
                class="px-3 py-1 border rounded text-sm disabled:opacity-50">
                ←
            </button>

            <button v-for="page in getPaginationRange" :key="page"
                @click="typeof page === 'number' && goToPage(page - 1)" class="px-3 py-1 border rounded text-sm" :class="{
                    'bg-blue-500 text-white font-semibold': page === store.pagina + 1,
                    'bg-white text-gray-700 hover:bg-gray-100': page !== store.pagina + 1 && page !== '...'
                }" :disabled="page === '...'">
                {{ page }}
            </button>

            <button @click="goToPage(store.pagina + 1)" :disabled="store.pagina === store.totalPaginas - 1"
                class="px-3 py-1 border rounded text-sm disabled:opacity-50">
                →
            </button>
        </div>
        <Map :desaparecidos="list" />

        <footer class="text-center text-sm mt-6">
            <p>Desenvolvido por <a href="https://github.com/acnormun" target="_blank"
                    class="text-blue-500 hover:text-blue-700">Ana Clara Noronha</a></p>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useDesaparecidosStore } from '../store/desaparecidos.store'
import Card from '../components/Card.vue'
import Filters from '../components/Filters.vue'
import type { Desaparecido } from '../types/desaparecidos'
import { useRouter } from 'vue-router'
import Map from '../components/Map.vue'
const store = useDesaparecidosStore()
const list = computed(() => store.lista)
const router = useRouter()

onMounted(() => {
    store.getDesaparecidos(0)
})

const handleUpdateFilters = (filtros: Record<string, any>) => {
    store.setFiltros(filtros)
}

const goToPage = (page: number) => {
    if (page >= 0 && page < store.totalPaginas && page !== store.pagina) {
        store.getDesaparecidos(page)
    }
}

const getPaginationRange = computed(() => {
    const total = store.totalPaginas
    const current = store.pagina
    const range: (number | string)[] = []
    const rangeWithDots: (number | string)[] = []
    let last: number | undefined

    for (let i = 1; i <= total; i++) {
        if (i === 1 || i === total || (i >= current && i <= current + 2)) {
            range.push(i)
        }
    }

    for (const page of range) {
        if (last !== undefined && typeof page === 'number') {
            if (page - last === 2) {
                rangeWithDots.push(last + 1)
            } else if (page - last > 2) {
                rangeWithDots.push('...')
            }
        }
        rangeWithDots.push(page)
        last = page as number
    }

    return rangeWithDots
})

const handleSelect = (person: Desaparecido) => {
    store.setSelecionado(person)
    router.push('/detalhes')
}
</script>