import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/users'
        },
        {
            path: '/users',
            name: 'users',
            component: () => import('../views/UsersView.vue')
        },
        {
            path: '/users/:id',
            name: 'user',
            component: () => import('../views/UserView.vue')
        },
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/404.vue') },
    ]
})

export default router
