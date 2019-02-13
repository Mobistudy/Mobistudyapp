
const routes = [
  {
    path: '/',
    component: () => import('pages/AccountMgmt/Login.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/AccountMgmt/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('pages/AccountMgmt/Register.vue')
  },
  {
    path: '/resetpw',
    name: 'resetpw',
    component: () => import('pages/AccountMgmt/ResetPW.vue')
  },
  {
    path: '/changepw',
    component: () => import('pages/AccountMgmt/ChangePW.vue')
  },
  {
    path: '/home',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '/', name: 'home', component: () => import('pages/Home/Tasker.vue'), props: true },
      { path: '/tasker', name: 'tasker', component: () => import('pages/Home/Tasker.vue'), props: true },
      { path: '/about', name: 'about', component: () => import('pages/Home/About.vue') },
      { path: '/profile', name: 'profile', component: () => import('pages/Home/Profile.vue') },
      { path: '/studies', name: 'studies', component: () => import('pages/Home/Studies.vue') },
      { path: '/studyConfig', name: 'studyConfig', component: () => import('pages/Home/StudyConfig.vue'), props: true },
      { path: '/dev', component: () => import('pages/devControl.vue') },
      { path: '/thresholding', component: () => import('pages/Thresholding.vue') },
      { path: '/charting', component: () => import('pages/Charting.vue') }
    ]
  },
  {
    path: '/consent',
    component: () => import('layouts/ConsentLayout.vue'),
    children: [
      { path: '/invitation', name: 'invitation', component: () => import('pages/Consent/Invitation.vue'), props: true },
      { path: '/studyDetails', name: 'studyDetails', component: () => import('pages/Consent/StudyDetails.vue'), props: true },
      { path: '/privacyPolicy', name: 'privacyPolicy', component: () => import('pages/Consent/PrivacyPolicy.vue'), props: true },
      { path: '/consentItems', name: 'consentItems', component: () => import('pages/Consent/ConsentItems.vue'), props: true },
      { path: '/accepted', name: 'accepted', component: () => import('pages/Consent/Accepted.vue'), props: true }
    ]
  },
  {
    path: '/tasks',
    component: () => import('layouts/TaskLayout.vue'),
    children: [
      { path: '/form/:studyKey/:taskId/:formKey', name: 'form', component: () => import('pages/Home/Form.vue') },
      { path: '/dataQuery/:studyKey/:taskID', name: 'dataQuery', component: () => import('pages/Home/DataQuery') }
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
