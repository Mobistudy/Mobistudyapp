import DQ from './dataQuery'
import Form from './form'
import Miband3 from './miband3'
import smwt from './smwt'

import { mergeDeep } from '@shared/tools.js'

const validKeys = ['title', 'shortTitle', 'shortDescription']

// utility function to trim tasks data to only titles and short descriptions
function trimObject (obj, task) {
  const objClone = structuredClone(obj)
  Object.keys(objClone.en.tasks[task]).forEach((key) => validKeys.includes(key) || delete objClone.en.tasks[task][key])
  return objClone
}

const DQred = trimObject(DQ, 'dataQuery')
const Formred = trimObject(Form, 'form')
const Miband3red = trimObject(Miband3, 'miband3')

const allTitles = mergeDeep(DQred, Formred, Miband3red, smwt)

export default allTitles
