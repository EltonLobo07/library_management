import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/articles',
    name: 'Articles',
    component: () => import('@/pages/Articles.vue'),
  },
  {
    path: '/add-article',
    name: 'Add Article',
    component: () => import('@/pages/AddArticle.vue'),
  },
  {
    path: '/issued-articles',
    name: 'Issued Articles',
    component: () => import('@/pages/IssuedArticles.vue'),
  },
  {
    path: '/articles/:articleId',
    name: 'Article',
    component: () => import('@/pages/Article.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    name: 'Not Found',
    component: () => import('@/pages/NotFound.vue'),
  }
]

let router = createRouter({
  history: createWebHistory('/frontend'),
  routes,
})

export default router
