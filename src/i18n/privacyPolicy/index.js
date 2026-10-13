import PPMalmoen from './en/privacyPolicyMalmo'
import PPUCBMen from './en/privacyPolicyUCBM'
import PPTesten from './en/privacyPolicyTest'
import PPMalmosv from './sv/privacyPolicyMalmo'
import PPUCBMsv from './sv/privacyPolicyUCBM'
import PPTestsv from './sv/privacyPolicyTest'
import PPMalmoes from './es/privacyPolicyMalmo'
import PPUCBMes from './es/privacyPolicyUCBM'
import PPTestes from './es/privacyPolicyTest'
import PPMalmoit from './it/privacyPolicyMalmo'
import PPUCBMit from './it/privacyPolicyUCBM'
import PPTestit from './it/privacyPolicyTest'

export default {
  en: {
    privacyPolicyMalmo: PPMalmoen,
    privacyPolicyTest: PPTesten,
    privacyPolicyUCBM: PPUCBMen
  },
  sv: {
    privacyPolicyMalmo: PPMalmosv,
    privacyPolicyUCBM: PPUCBMsv,
    privacyPolicyTest: PPTestsv
  },
  es: {
    privacyPolicyUCBM: PPUCBMes,
    privacyPolicyMalmo: PPMalmoes,
    privacyPolicyTest: PPTestes
  },
  it: {
    privacyPolicyMalmo: PPMalmoit,
    privacyPolicyUCBM: PPUCBMit,
    privacyPolicyTest: PPTestit
  }
}
