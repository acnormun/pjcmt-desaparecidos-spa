<template>
    <div class="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
        @click="$emit('click')">
        <img :src="desaparecido.foto" alt="Foto"
            class="w-[150px] h-[150px] object-cover mx-auto mt-4 rounded bg-gray-100" />

        <div class="p-4">
            <h2 class="text-lg font-semibold mb-1">{{ desaparecido.nome }}</h2>
            <p class="text-sm text-gray-700">Idade: {{ desaparecido.idade }}</p>
            <p class="text-sm text-gray-700">Sexo: {{ desaparecido.sexo }}</p>
            <p class="text-sm text-gray-700">
                Desaparecimento:
                <span class="text-gray-800 font-medium">
                    {{ formatarData(desaparecido.ultimaOcorrencia.dtDesaparecimento) }}
                </span>
            </p>
            <p class="text-sm text-gray-700">
                Local:
                <span class="text-gray-800 font-medium">
                    {{ desaparecido.ultimaOcorrencia.localDesaparecimentoConcat }}
                </span>
            </p>
            <p class="mt-2 text-xs font-medium inline-block px-2 py-1 rounded" :class="{
                'text-yellow-700 bg-yellow-100': !desaparecido.ultimaOcorrencia.dataLocalizacao,
                'text-green-700 bg-green-100': desaparecido.ultimaOcorrencia.dataLocalizacao
            }">
                {{ desaparecido.ultimaOcorrencia.dataLocalizacao ? 'Localizado' : 'Desaparecido' }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Desaparecido } from '../types/desaparecidos'

defineProps<{
    desaparecido: Desaparecido
}>()

const formatarData = (iso: string) =>
    new Date(iso).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
</script>