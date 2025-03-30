import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/detalhe/:id',
        name: 'Detalhe',
        component: () => import('../views/DetailsView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
