
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
    path: '/changepw',
    component: () => import('pages/accountmgmt/ChangePW.vue')
  },
  {
    path: '/register',
    component: () => import('layouts/RegLayout.vue'),
    children: [
      { path: '/register_tc', name: 'register_tc', component: () => import('pages/accountmgmt/Reg_TermsAndConditions.vue') },
      { path: '/register_pp', name: 'register_pp', component: () => import('pages/accountmgmt/Reg_PrivacyPolicy.vue') },
      { path: '/register_profile', name: 'register_profile', component: () => import('pages/accountmgmt/Reg_Profile.vue') },
      { path: '/signup', name: 'signup', component: () => import('pages/accountmgmt/Reg_SignUp.vue') }
    ]
  },
  {
    path: '/home',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '/', name: 'home', component: () => import('pages/home/Tasker.vue'), props: true },
      { path: '/tasker', name: 'tasker', component: () => import('pages/home/Tasker.vue'), props: true },
      { path: '/profile', name: 'profile', component: () => import('pages/home/Profile.vue') },
      { path: '/studies', name: 'studies', component: () => import('pages/home/Studies.vue') },
      { path: '/about', name: 'about', component: () => import('pages/home/About.vue') },
      { path: '/studyConfig', name: 'studyConfig', component: () => import('pages/home/StudyConfig.vue'), props: true }
    ]
  },
  {
    path: '/consent',
    component: () => import('layouts/ConsentLayout.vue'),
    children: [
      { path: '/invitation', name: 'invitation', component: () => import('pages/consent/Invitation.vue'), props: true },
      { path: '/studyDetails', name: 'studyDetails', component: () => import('pages/consent/StudyDetails.vue'), props: true },
      { path: '/privacyPolicy', name: 'privacyPolicy', component: () => import('pages/consent/PrivacyPolicy.vue'), props: true },
      { path: '/consentItems', name: 'consentItems', component: () => import('pages/consent/ConsentItems.vue'), props: true },
      { path: '/accepted', name: 'accepted', component: () => import('pages/consent/Accepted.vue'), props: true }
    ]
  },
  {
    path: '/tasks',
    component: () => import('layouts/TaskLayout.vue'),
    children: [
      { path: '/form/:studyKey/:taskId/:formKey', name: 'form', component: () => import('pages/home/Form.vue') },
      { path: '/dataQuery/:studyKey/:taskID', name: 'dataQuery', component: () => import('pages/home/DataQuery') }
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
