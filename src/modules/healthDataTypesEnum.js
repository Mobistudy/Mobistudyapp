export default {
  values: [ 'steps', 'weight', 'height', 'activity', 'heart_rate', 'heart_rate_variability', 'calories', 'distance' ],
  toNativeType (v) {
    if (v === 'heart_rate_variability') return 'heart_rate.variability'
    return v
  },
  isIOSOnly (v) {
    if (v === 'heart_rate_variability') return true
    return false
  },
  isAndroidOnly (v) {
    return false
  }
}
