/**
 * This provides an identifier for the activity type index recorded
 * by the Miband3
 * @param {index} index the activity type index
 */
export function getStringIdentifier (index) {
  switch (index) {
    case 1:
      return 'walk'
    default:
      return 'unknown'
  }
}
