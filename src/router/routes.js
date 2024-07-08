const routes = [
  {
    path: '/',
    name: 'intro',
    component: () => import('@components/Intro.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
