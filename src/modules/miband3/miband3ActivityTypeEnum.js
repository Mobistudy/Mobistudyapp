/**
 * This provides an identifier for the activity type index recorded
 * by the Miband3
 * @param {index} index the activity type index
 */
export function getStringIdentifier (index) {
  switch (index) {
    case 1:
    case 16:
      return 'walk'
    case 3:
      return 'not_worn'
    case 6:
      return 'charging'
    case 80:
    case 90:
    case 89:
    case 91:
    case 92:
    case 96:
      return 'sedentary'
    case 98:
    case 82:
      return 'running'
    case 17:
      return 'activity_high'
    case 106:
    case 112:
    case 121:
    case 122:
    case 123:
      return 'sleep'
    default:
      return 'unknown'
  }
}
