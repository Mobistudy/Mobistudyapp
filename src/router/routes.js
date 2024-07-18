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
      { path: '/', name: 'home', component: () => import('@components/home/TaskerPage.vue'), props: true },
      { path: '/tasker', name: 'tasker', component: () => import('@components/home/TaskerPage.vue'), props: true },
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
  {
    path: '/tasks',
    component: () => import('@components/tasks/TaskLayout.vue'),
    children: [
      { path: '/form/:studyKey/:taskId/:formKey', name: 'form', component: () => import('@components/tasks/form/FormPage.vue'), props: true },
      { path: '/formIntro/:studyKey/:taskId/:formKey', name: 'formIntro', component: () => import('@components/tasks/form/FormIntroPage.vue'), props: true }

      // { path: '/dataQueryIntro', name: 'dataQueryIntro', component: () => import('pages/tasks/dataQuery/DataQueryIntro'), props: true },
      // { path: '/dataQuery', name: 'dataQuery', component: () => import('pages/tasks/dataQuery/DataQuery'), props: true },

      // { path: '/smwtIntro', name: 'smwtIntro', component: () => import('pages/tasks/smwt/SMWTIntro.vue'), props: true },
      // { path: '/smwt', name: 'smwt', component: () => import('pages/tasks/smwt/SMWT.vue'), props: true },
      // { path: '/smwtSummary', name: 'smwtSummary', component: () => import('pages/tasks/smwt/SMWTSummary.vue'), props: true },

      // { path: '/qcstIntro', name: 'qcstIntro', component: () => import('pages/tasks/qcst/QCSTIntro.vue'), props: true },
      // { path: '/qcst', name: 'qcst', component: () => import('pages/tasks/qcst/QCST.vue'), props: true },
      // { path: '/qcsthr', name: 'qcsthr', component: () => import('pages/tasks/qcst/QCSTHR.vue'), props: true },
      // { path: '/qcstSummary', name: 'qcstSummary', component: () => import('pages/tasks/qcst/QCSTSummary.vue'), props: true },

      // { path: '/miband3Intro', name: 'miband3Intro', component: () => import('pages/tasks/miband3/MiBand3Intro.vue'), props: true },
      // { path: '/miband3Connect', name: 'miband3Connect', component: () => import('pages/tasks/miband3/MiBand3Connect.vue'), props: true },
      // { path: '/miband3DataDownload', name: 'miband3DataDownload', component: () => import('pages/tasks/miband3/MiBand3DataDownload.vue'), props: true },
      // { path: '/notEnoughDataPage', name: 'notEnoughDataPage', component: () => import('pages/tasks/miband3/notEnoughDataPage.vue'), props: true },

      // { path: '/po60Intro', name: 'po60Intro', component: () => import('pages/tasks/po60/PO60Intro.vue'), props: true },
      // { path: '/po60Connect', name: 'po60Connect', component: () => import('pages/tasks/po60/PO60Connect.vue'), props: true },
      // { path: '/po60Download', name: 'po60DataDownload', component: () => import('pages/tasks/po60/PO60Download.vue'), props: true },

      // { path: '/positionIntro', name: 'positionIntro', component: () => import('pages/tasks/position/PositionIntro.vue'), props: true },
      // { path: '/position', name: 'position', component: () => import('pages/tasks/position/Position.vue'), props: true },

      // { path: '/peakFlowIntro', name: 'peakFlowIntro', component: () => import('pages/tasks/peakflow/PeakFlowIntro.vue'), props: true },
      // { path: '/peakFlowCalibrate', name: 'peakFlowCalibrate', component: () => import('pages/tasks/peakflow/PeakFlowCalibrate.vue'), props: true },
      // { path: '/peakFlow', name: 'peakFlow', component: () => import('pages/tasks/peakflow/PeakFlow.vue'), props: true },
      // { path: '/peakFlowSummary', name: 'peakFlowSummary', component: () => import('pages/tasks/peakflow/PeakFlowSummary.vue'), props: true },
      // { path: '/peakFlowReview', name: 'peakFlowReview', component: () => import('pages/tasks/peakflow/PeakFlowReview.vue'), props: true },

      // { path: '/fingerTappingIntro', name: 'fingerTappingIntro', component: () => import('pages/tasks/fingerTapping/TappingIntro.vue'), props: true },
      // { path: '/fingerTapping', name: 'fingerTapping', component: () => import('pages/tasks/fingerTapping/Tapping.vue'), props: true },
      // { path: '/fingerTappingSummary', name: 'fingerTappingSummary', component: () => import('pages/tasks/fingerTapping/tappingSummary.vue'), props: true },

      // { path: '/tugtIntro', name: 'tugtIntro', component: () => import('pages/tasks/tugt/TUGTIntro.vue'), props: true },
      // { path: '/tugt', name: 'tugt', component: () => import('pages/tasks/tugt/TUGT.vue'), props: true },
      // { path: '/tugtSummary', name: 'tugtSummary', component: () => import('pages/tasks/tugt/TUGTSummary.vue'), props: true },

      // { path: '/holdPhoneIntro', name: 'holdPhoneIntro', component: () => import('pages/tasks/holdPhone/holdPhoneIntro.vue'), props: true },
      // { path: '/holdPhone', name: 'holdPhone', component: () => import('pages/tasks/holdPhone/holdPhone.vue'), props: true },
      // { path: '/holdPhoneSummary', name: 'holdPhoneSummary', component: () => import('pages/tasks/holdPhone/holdPhoneSummary.vue'), props: true },

      // { path: '/vocalizationIntro', name: 'vocalizationIntro', component: () => import('pages/tasks/vocalization/vocalizationIntro.vue'), props: true },
      // { path: '/vocalization', name: 'vocalization', component: () => import('pages/tasks/vocalization/vocalization.vue'), props: true },
      // { path: '/vocalizationSummary', name: 'vocalizationSummary', component: () => import('pages/tasks/vocalization/vocalizationSummary.vue'), props: true },

      // { path: '/drawingIntro', name: 'drawingIntro', component: () => import('pages/tasks/drawing/drawingIntro.vue'), props: true },
      // { path: '/drawing', name: 'drawing', component: () => import('pages/tasks/drawing/drawing.vue'), props: true },
      // { path: '/drawingSummary', name: 'drawingSummary', component: () => import('pages/tasks/drawing/drawingSummary.vue'), props: true }
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
