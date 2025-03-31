<template>
    <div class="mt-10">
        <h2 class="text-xl font-semibold mb-4">Mapa de Desaparecidos</h2>
        <div id="map" class="w-full h-[500px] rounded shadow border border-gray-300"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { formatarDataHora } from '../utils/date'
const props = defineProps<{
    desaparecidos: {
        nome: string
        idade: number
        ultimaOcorrencia: {
            localDesaparecimentoConcat: string
            dtDesaparecimento: string
        }
    }[]
}>()

let map: L.Map

const geocode = async (endereco: string): Promise<[number, number] | null> => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`
    const res = await fetch(url)
    const data = await res.json()
    if (data && data.length) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)]
    }
    return null
}

const renderMap = async () => {
    if (!map) {
        map = L.map('map').setView([-15.6, -56.1], 6)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap'
        }).addTo(map)
    }

    const usados = new Set<string>()

    for (const pessoa of props.desaparecidos) {
        const local = pessoa.ultimaOcorrencia?.localDesaparecimentoConcat
        const data = formatarDataHora(pessoa.ultimaOcorrencia?.dtDesaparecimento || '') || ''
        if (local && !usados.has(local)) {
            usados.add(local)
            const coord = await geocode(local)
            if (coord) {
                L.marker(coord).addTo(map).bindPopup(`
            <strong>${pessoa.nome}</strong><br>
            Idade: ${pessoa.idade}<br>
            Local: ${local},
            Data: ${data}
          `)
            }
        }
    }
}

onMounted(() => {
    renderMap()
})

watch(() => props.desaparecidos, () => {
    renderMap()
})
</script>