export default {
  values: [ 'steps', 'weight', 'height', 'activity', 'heart_rate', 'heart_rate.variability', 'calories', 'distance' ],
  valueToString (v) {
    if (v === 'steps') return 'Steps'
    if (v === 'weight') return 'Weight'
    if (v === 'height') return 'Height'
    if (v === 'activity') return 'Activity'
    if (v === 'heart_rate') return 'Heart rate'
    if (v === 'heart_rate.variability') return 'Heart Rate Variability'
    if (v === 'calories') return 'Calories'
    if (v === 'distance') return 'Distance'
  },
  stringToValue (s) {
    if (s === 'Steps') return 'steps'
    if (s === 'Weight') return 'weight'
    if (s === 'Height') return 'height'
    if (s === 'Activity') return 'activity'
    if (s === 'Heart rate') return 'heart_rate'
    if (s === 'Heart Rate Variability') return 'heart_rate.variability'
    if (s === 'Calories') return 'calories'
    if (s === 'Distance') return 'distance'
  },
  isIOSOnly (v) {
    if (v === 'heart_rate.variability') return true
    return false
  },
  isAndroidOnly (v) {
    return false
  }
}
