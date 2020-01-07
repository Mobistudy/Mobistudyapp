
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
    path: '/register_profile',
    name: 'register_profile',
    component: () => import('pages/accountmgmt/Reg_Profile.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('pages/accountmgmt/Reg_SignUp.vue')
  },
  {
    path: '/changepw',
    component: () => import('pages/accountmgmt/ChangePW.vue')
  },
  {
    path: '/home',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '/', name: 'home', component: () => import('pages/home/Tasker.vue'), props: true },
      { path: '/tasker', name: 'tasker', component: () => import('pages/home/Tasker.vue'), props: true },
      { path: '/profile', name: 'profile', component: () => import('pages/home/Profile.vue') },
      { path: '/studies', name: 'studies', component: () => import('pages/home/Studies.vue') },
      { path: '/about', name: 'about', component: () => import('pages/home/About.vue') }
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
