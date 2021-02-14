'use strict'

import { mergeDeep } from '../modules/tools.mjs'
import about from './about/about'

import en from './en/en.mjs'
import sv from './sv/sv.mjs'

let messages = {
  'en': en,
  'sv': sv
}

messages = mergeDeep(messages, about)

export default messages
