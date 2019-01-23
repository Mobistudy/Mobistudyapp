
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
      { path: '/addStudy/:key', component: () => import('pages/Home/AddStudy.vue') },
      { path: '/dev', component: () => import('pages/devControl.vue') },
      { path: '/thresholding', component: () => import('pages/Thresholding.vue') },
      { path: '/charting', component: () => import('pages/Charting.vue') }
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
