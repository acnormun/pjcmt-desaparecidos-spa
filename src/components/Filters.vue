<template>
    <div class="bg-white p-4 mb-6 rounded shadow-md">
        <h2 class="text-lg font-semibold mb-4">Filtros</h2>

        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <input v-model="local.nome" type="text" placeholder="Buscar por nome"
                class="border border-gray-300 rounded px-3 py-2 w-full" />

            <select v-model="local.status" class="border border-gray-300 rounded px- py-2 w-full">
                <option value="">Todos os status</option>
                <option value="DESAPARECIDO">Desaparecido</option>
                <option value="LOCALIZADO">Localizado</option>
            </select>

            <select v-model="local.sexo" class="border border-gray-300 rounded px-3 py-2 w-full">
                <option value="">Todos os gêneros</option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMININO">Feminino</option>
            </select>

            <button @click="emit('update', { ...local })"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Aplicar
            </button>

            <button @click="limparFiltros"
                class="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100">
                Limpar
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const emit = defineEmits<{
    (e: 'update', filtros: Record<string, any>): void
}>()

const filtrosDefault = {
    nome: '',
    sexo: '',
    status: 'DESAPARECIDO',
    faixaIdadeInicial: 0,
    faixaIdadeFinal: 0
}

const local = reactive({ ...filtrosDefault })

const limparFiltros = () => {
    Object.assign(local, filtrosDefault)
    emit('update', { ...local })
}
</script>