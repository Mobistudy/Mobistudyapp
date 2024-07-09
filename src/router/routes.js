const routes = [
  {
    path: '/',
    name: 'intro',
    component: () => import('@components/IntroPage.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@components/usermgmt/LoginPage.vue')
  },
  {
    path: '/register',
    component: () => import('@components/usermgmt/RegisterLayout.vue'),
    children: [
      { path: '/register_pp', name: 'register_pp', component: () => import('@components/usermgmt/PrivacyPolicyPage.vue') },
      { path: '/register_profile', name: 'register_profile', component: () => import('@components/usermgmt/ProfilePage.vue') },
      { path: '/signup', name: 'signup', component: () => import('@components/usermgmt/SignUpPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@components/ErrorNotFound.vue')
  }
]

export default routes
