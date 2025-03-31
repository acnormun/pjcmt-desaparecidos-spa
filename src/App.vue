<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <header class="bg-white shadow">
      <div class="max-w-screen-xl mx-auto px-4 py-4 flex items-center gap-4">
        <img :src="logo" alt="Logo" class="h-16">
        <div>
          <h1 class="text-2xl font-bold">Polícia Judiciária Civil</h1>
          <h2 class="text-sm text-gray-500">Estado de Mato Grosso</h2>
        </div>
      </div>
    </header>

    <main class="max-w-screen-xl mx-auto px-4 py-8">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import logo from '../public/pjc_logo.svg?url'
</script>

<style scoped></style>
