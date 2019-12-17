
const routes = [
  {
    path: '/',
    component: () => import('pages/accountmgmt/Login.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/accountmgmt/Login.vue')
  },
  {
    path: '/resetpw',
    name: 'resetpw',
    component: () => import('pages/accountmgmt/ResetPW.vue')
  },
  {
    path: '/register_tc',
    name: 'register_tc',
    component: () => import('pages/accountmgmt/Reg_TermsAndConditions.vue')
  },
  {
    path: '/register_pp',
    name: 'register_pp',
    component: () => import('pages/accountmgmt/Reg_PrivacyPolicy.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('pages/accountmgmt/Reg_SignUp.vue')
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
