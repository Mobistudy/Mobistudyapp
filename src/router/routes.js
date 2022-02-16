
const routes = [
  {
    path: '/',
    name: 'intro',
    component: () => import('pages/Intro.vue')
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
      { path: '/test', name: 'test', component: () => import('pages/home/Test.vue') }
    ]
  },
  {
    path: '/studies',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '/studies', name: 'studies', component: () => import('pages/home/Studies.vue') },
      { path: '/studies/studyConfig', name: 'studyConfig', component: () => import('pages/home/StudyConfig.vue'), props: true }
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
      { path: '/form', name: 'form', component: () => import('pages/tasks/form/Form.vue'), props: true },
      { path: '/formIntro', name: 'formIntro', component: () => import('pages/tasks/form/FormIntro'), props: true },

      { path: '/dataQueryIntro', name: 'dataQueryIntro', component: () => import('pages/tasks/dataQuery/DataQueryIntro'), props: true },
      { path: '/dataQuery', name: 'dataQuery', component: () => import('pages/tasks/dataQuery/DataQuery'), props: true },

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
      { path: '/notEnoughDataPage', name: 'notEnoughDataPage', component: () => import('pages/tasks/miband3/notEnoughDataPage.vue'), props: true },

      { path: '/po60Intro', name: 'po60Intro', component: () => import('pages/tasks/po60/PO60Intro.vue'), props: true },
      { path: '/po60Connect', name: 'po60Connect', component: () => import('pages/tasks/po60/PO60Connect.vue'), props: true },
      { path: '/po60Download', name: 'po60DataDownload', component: () => import('pages/tasks/po60/PO60Download.vue'), props: true },

      { path: '/positionIntro', name: 'positionIntro', component: () => import('pages/tasks/position/PositionIntro.vue'), props: true },
      { path: '/position', name: 'position', component: () => import('pages/tasks/position/Position.vue'), props: true },

      { path: '/peakFlowIntro', name: 'peakFlowIntro', component: () => import('pages/tasks/peakFlow/PeakFlowIntro.vue'), props: true },
      { path: '/peakFlowCalibrate', name: 'peakFlowCalibrate', component: () => import('pages/tasks/peakFlow/PeakFlowCalibrate.vue'), props: true },
      { path: '/peakFlow', name: 'peakFlow', component: () => import('pages/tasks/peakFlow/PeakFlow.vue'), props: true },
      { path: '/peakFlowSummary', name: 'peakFlowSummary', component: () => import('pages/tasks/peakFlow/PeakFlowSummary.vue'), props: true },
      { path: '/peakFlowReview', name: 'peakFlowReview', component: () => import('pages/tasks/peakFlow/PeakFlowReview.vue'), props: true },

      { path: '/fingerTappingIntro', name: 'fingerTappingIntro', component: () => import('pages/tasks/fingerTapping/tappingIntro.vue'), props: true },
      { path: '/fingerTapping', name: 'fingerTapping', component: () => import('pages/tasks/fingerTapping/tapping.vue'), props: true },
      { path: '/fingerTappingSummary', name: 'fingerTappingSummary', component: () => import('pages/tasks/fingerTapping/tappingSummary.vue'), props: true },

      { path: '/tugtIntro', name: 'tugtIntro', component: () => import('pages/tasks/tugt/tugtIntro.vue'), props: true },
      { path: '/tugt', name: 'tugt', component: () => import('pages/tasks/tugt/TUGT.vue'), props: true },
      { path: '/tugtSummary', name: 'tugtSummary', component: () => import('pages/tasks/tugt/TUGTSummary.vue'), props: true },
      { path: '/fingerTappingSummary', name: 'fingerTappingSummary', component: () => import('pages/tasks/fingerTapping/tappingSummary.vue'), props: true },

      { path: '/holdPhoneIntro', name: 'holdPhoneIntro', component: () => import('pages/tasks/holdPhone/holdPhoneIntro.vue'), props: true },
      { path: '/holdPhone', name: 'holdPhone', component: () => import('pages/tasks/holdPhone/holdPhone.vue'), props: true },
      { path: '/holdPhoneSummary', name: 'holdPhoneSummary', component: () => import('pages/tasks/holdPhone/holdPhoneSummary.vue'), props: true }
    ]
  },
  {
    path: '/about',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '/about', name: 'about', component: () => import('pages/about/About.vue') },
      { path: '/about/introduction', name: 'introduction', component: () => import('pages/about/Introduction.vue') },
      { path: '/about/privacyPolicy', name: 'aboutPrivacyPolicy', component: () => import('pages/about/AboutPrivacyPolicy.vue') },
      { path: '/about/acknowledgements', name: 'acknowledgements', component: () => import('pages/about/Acknowledgements'), props: { pathIndex: 6 } },
      { path: '/about/contact', name: 'contact', component: () => import('pages/about/Contact.vue') },
      { path: '/about/license', name: 'license', component: () => import('pages/about/License.vue') }
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
