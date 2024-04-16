import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {path: '/', component: () => import('../views/HomePage.vue')},
    {path: '/results', component: () => import('../views/ResultsPage.vue')},
    {path: '/details', component: () => import('../views/DetailPage.vue')},
    {path: '/add', component: () => import('../views/AddMoviePage.vue')}
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
