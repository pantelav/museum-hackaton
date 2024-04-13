import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'result',
        component: () => import('pages/results/ResultPage.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/results/AllCardsPage.vue'),
          },
          {
            path: ':id',
            component: () => import('pages/results/CardPage.vue'),
          },
        ],
      },
      { path: 'info', component: () => import('pages/results/ResultPage.vue') },
      { path: 'items', component: () => import('pages/ItemsPage.vue') },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
