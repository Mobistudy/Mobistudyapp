const routes = [
  {
    path: '/',
    name: 'intro',
    component: () => import('@components/Intro.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@components/usermgmt/Login.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@components/ErrorNotFound.vue')
  }
]

export default routes
