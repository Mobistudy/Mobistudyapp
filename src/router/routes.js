
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
    path: '/changepw/:email',
    name: 'changepw',
    props: true,
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
      // { path: '/about', name: 'about', component: () => import('pages/home/About.vue') },
      { path: '/studyConfig', name: 'studyConfig', component: () => import('pages/home/StudyConfig.vue'), props: true },
      { path: '/test', name: 'test', component: () => import('pages/home/Test.vue') }
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
      { path: '/form', name: 'form', component: () => import('pages/tasks/Form.vue'), props: true },
      { path: '/dataQuery', name: 'dataQuery', component: () => import('pages/tasks/DataQuery'), props: true },
      { path: '/smwtIntro', name: 'smwtIntro', component: () => import('pages/tasks/smwt/SMWTIntro.vue'), props: true },
      { path: '/smwt', name: 'smwt', component: () => import('pages/tasks/smwt/SMWT.vue'), props: true },
      { path: '/smwtSummary', name: 'smwtSummary', component: () => import('pages/tasks/smwt/SMWTSummary.vue'), props: true },
      { path: '/qcstIntro', name: 'qcstIntro', component: () => import('pages/tasks/qcst/QCSTIntro.vue'), props: true },
      { path: '/qcst', name: 'qcst', component: () => import('pages/tasks/qcst/QCST.vue'), props: true },
      { path: '/qcsthr', name: 'qcsthr', component: () => import('pages/tasks/qcst/QCSTHR.vue'), props: true },
      { path: '/qcstSummary', name: 'qcstSummary', component: () => import('pages/tasks/qcst/QCSTSummary.vue'), props: true },
      { path: '/miband3Intro', name: 'miband3Intro', component: () => import('pages/tasks/miband3/MiBand3Intro.vue'), props: true },
      { path: '/miband3Connect', name: 'miband3Connect', component: () => import('pages/tasks/miband3/MiBand3Connect.vue'), props: true },
      { path: '/miband3DataDownload', name: 'miband3DataDownload', component: () => import('pages/tasks/miband3/MiBand3DataDownload.vue'), props: true },
      { path: '/notEnoughDataPage', name: 'notEnoughDataPage', component: () => import('pages/tasks/miband3/notEnoughDataPage.vue'), props: true }
    ]
  },
  {
    path: '/about',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '/about', name: 'about', component: () => import('pages/about/About.vue') },
      { path: '/acknowledgements', name: 'acknowledgements', component: () => import('pages/about/Acknowledgements') },
      { path: '/introduction', name: 'introduction', component: () => import('pages/about/Introduction.vue') },
      { path: '/aboutPrivacyPolicy', name: 'aboutPrivacyPolicy', component: () => import('pages/about/AboutPrivacyPolicy.vue') },
      { path: '/contact', name: 'contact', component: () => import('pages/about/Contact.vue') }
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
