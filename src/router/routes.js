
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
      { path: '/studies', component: () => import('pages/Main/Studies.vue') },
      { path: '/dev', component: () => import('pages/devControl.vue') },
      { path: '/thresholding', component: () => import('pages/Thresholding.vue') },
      { path: '/charting', component: () => import('pages/Charting.vue') }
    ]
  },
  {
    path: '/full',
    component: () => import('layouts/NoSidebar.vue'),
    children: [
      { path: '/register', component: () => import('pages/AccountMgmt/Register.vue') },
      { path: '/resetpw', component: () => import('pages/AccountMgmt/ResetPW.vue') },
      { path: '/changepw', component: () => import('pages/AccountMgmt/ChangePW.vue') },
      { path: '/questionnaire/:key', component: () => import('pages/Main/Questionnaire.vue') },
      { path: '/addStudy/:key', component: () => import('pages/Main/AddStudy.vue') },
      { path: '/dataQuery/:studyKey/:taskID', component: () => import('pages/Main/DataQuery') }
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
