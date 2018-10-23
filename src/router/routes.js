
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AccountMgmt/Login.vue') },
      { path: '/login', component: () => import('pages/AccountMgmt/Login.vue') },
      { path: '/index', component: () => import('pages/Index.vue') },
      { path: '/tasker', component: () => import('pages/Main/Tasker.vue') },
      { path: '/about', component: () => import('pages/About.vue') },
      { path: '/profile', component: () => import('pages/Main/Profile.vue') },
      { path: '/studies', component: () => import('pages/Main/Studies.vue') }
    ]
  },
  {
    path: '/full',
    component: () => import('layouts/NoSidebar.vue'),
    children: [
      { path: '/register', component: () => import('pages/AccountMgmt/Register.vue') },
      { path: '/resetpw', component: () => import('pages/AccountMgmt/ResetPW.vue') },
      { path: '/changepw', component: () => import('pages/AccountMgmt/ChangePW.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
