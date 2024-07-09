/**
 * Reusable, useful functions
 */

// for deep merge, see https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge

/**
 * Tells if the variable is an object
 * @param {any} item - any value
 * @returns true if it's an object
 */
export function isObject (item) {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

const mergeDeep2 = function (target, source) {
  const output = Object.assign({}, target)
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) { Object.assign(output, { [key]: source[key] }) } else { output[key] = mergeDeep(target[key], source[key]) }
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }
  return output
}

/**
 * Merges 2 or more objects, recurrent over each property
 * @param  {...any} args objects to merge
 * @returns A merged object
 */
export function mergeDeep (...args) {
  if (args.length < 2) return null

  return args.reduce((acc, curr) => {
    return mergeDeep2(acc, curr)
  }, {})
}
