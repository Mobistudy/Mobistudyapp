'use strict'

import en from './en/en'
import ppEn from './en/privacyPolicy'
import tcEn from './en/termsAndConditions'

import sv from './sv/sv'

export default {
  'en': mergeDeep(en, ppEn, tcEn),
  'sv': sv
}

function isObject (item) {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

function mergeDeep (target, source) {
  let output = Object.assign({}, target)
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
