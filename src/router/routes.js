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
  {
    path: '/resetpw',
    name: 'resetpw',
    component: () => import('@components/usermgmt/ResetPasswordPage.vue')
  },
  {
    path: '/changepw/:email',
    name: 'changepw',
    props: true,
    component: () => import('@components/usermgmt/ChangePasswordPage.vue')
  },
  {
    path: '/home',
    component: () => import('@components/home/HomeLayout.vue'),
    children: [
      { path: '/', name: 'home', component: () => import('@components/home/Tasker.vue'), props: true },
      { path: '/tasker', name: 'tasker', component: () => import('@components/home/Tasker.vue'), props: true },
      { path: '/profile', name: 'profile', component: () => import('@components/home/ProfileEditPage.vue') },
      { path: '/test', name: 'test', component: () => import('@components/home/TestPage.vue') }
    ]
  },
  {
    path: '/about',
    component: () => import('@components/home/HomeLayout.vue'),
    children: [
      { path: '/about', name: 'about', component: () => import('@components/about/AboutPage.vue') },
      { path: '/about/introduction', name: 'introduction', component: () => import('@components/about/IntroductionPage.vue') },
      { path: '/about/privacyPolicy', name: 'aboutPrivacyPolicy', component: () => import('@components/about/PrivacyPolicyPage.vue') },
      { path: '/about/acknowledgements', name: 'acknowledgements', component: () => import('@components/about/AcknowledgementsPage.vue') },
      { path: '/about/contact', name: 'contact', component: () => import('@components/about/ContactPage.vue') },
      { path: '/about/license', name: 'license', component: () => import('@components/about/LicensePage.vue') }
    ]
  },
  {
    path: '/studies',
    component: () => import('@components/home/HomeLayout.vue'),
    children: [
      { path: '/studies', name: 'studies', component: () => import('@components/home/StudiesPage.vue') },
      { path: '/studies/studyConfig', name: 'studyConfig', component: () => import('@components/home/StudyConfigPage.vue'), props: true }
    ]
  },
  {
    path: '/consent',
    component: () => import('@components/studies/consent/ConsentLayout.vue'),
    children: [
      { path: '/invitation', name: 'invitation', component: () => import('@components/studies/consent/InvitationPage.vue') },
      { path: '/studyDetails', name: 'studyDetails', component: () => import('@components/studies/consent/StudyDetailsPage.vue') },
      { path: '/privacyPolicy', name: 'privacyPolicy', component: () => import('@components/studies/consent/PrivacyPolicyPage.vue') },
      { path: '/consentItems', name: 'consentItems', component: () => import('@components/studies/consent/ConsentPage.vue') },
      { path: '/accepted', name: 'accepted', component: () => import('@components/studies/consent/AcceptedPage.vue') }
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
