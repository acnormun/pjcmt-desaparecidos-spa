<template>
    <div class="p-6 max-w-6xl mx-auto">
        <h1 class="text-2xl font-bold mb-6">Dashboard de Desaparecidos</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded shadow p-4">
                <h2 class="text-lg font-semibold mb-2">Desaparecimentos por mês</h2>
                <BarChart :chart-data="chartPorMes" />
            </div>

            <div class="bg-white rounded shadow p-4">
                <h2 class="text-lg font-semibold mb-2">Distribuição por região</h2>
                <PieChart :chart-data="chartPorRegiao" />
            </div>

            <div class="bg-white rounded shadow p-4">
                <h2 class="text-lg font-semibold mb-2">Distribuição por sexo</h2>
                <DoughnutChart :chart-data="chartPorSexo" />
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { useDesaparecidosStore } from '../store/desaparecidos.store'
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import BarChart from './charts/BarChart.vue'
import PieChart from './charts/PieChart.vue'
import DoughnutChart from './charts/DoughnutChart.vue'

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend)

const store = useDesaparecidosStore()

const chartPorMes = computed(() => {
    const contagem: Record<string, number> = {}

    store.acumulados.forEach((p: any) => {
        const data = new Date(p.ultimaOcorrencia?.dtDesaparecimento)
        if (!isNaN(data.getTime())) {
            const label = `${data.getFullYear()}/${(data.getMonth() + 1).toString().padStart(2, '0')}`
            contagem[label] = (contagem[label] || 0) + 1
        }
    })

    const labels = Object.keys(contagem).sort()
    const data = labels.map((l) => contagem[l])

    return {
        labels,
        datasets: [
            {
                label: 'Casos acumulados',
                data,
                backgroundColor: '#3b82f6'
            }
        ]
    }
})

const chartPorRegiao = computed(() => {
    const contagem: Record<string, number> = {}

    store.acumulados.forEach((p) => {
        const local = p.ultimaOcorrencia?.localDesaparecimentoConcat || 'Desconhecido'
        contagem[local] = (contagem[local] || 0) + 1
    })

    const labels = Object.keys(contagem)
    const data = labels.map((l) => contagem[l])

    return {
        labels,
        datasets: [
            {
                label: 'Casos acumulados',
                data,
                backgroundColor: labels.map(() => randomColor())
            }
        ]
    }
})

const chartPorSexo = computed(() => {
    const contagem = {
        MASCULINO: 0,
        FEMININO: 0,
        OUTRO: 0
    }

    store.acumulados.forEach((p: any) => {
        const sexo = p.sexo?.toUpperCase()
        if (sexo === 'MASCULINO') contagem.MASCULINO++
        else if (sexo === 'FEMININO') contagem.FEMININO++
        else contagem.OUTRO++
    })

    const labels = Object.keys(contagem)
    const data = labels.map((l) => contagem[l as keyof typeof contagem])

    return {
        labels,
        datasets: [
            {
                label: 'Casos acumulados',
                data,
                backgroundColor: ['#3b82f6', '#f43f5e', '#a3a3a3']
            }
        ]
    }
})

function randomColor() {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6']
    return colors[Math.floor(Math.random() * colors.length)]
}
</script>
