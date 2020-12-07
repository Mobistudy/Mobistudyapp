/**
 * This provides an identifier for the activity type index recorded
 * by the Miband3
 * @param {index} index the activity type index
 */
export function getStringIdentifier (index) {
  switch (index) {
    case 1:
      return 'walk'
    case 6:
      return 'charging'
    case 17:
      return 'activity_high'
    case 112:
    case 122:
      return 'sleep'
    default:
      return 'unknown'
  }
}
