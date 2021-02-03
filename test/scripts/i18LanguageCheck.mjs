import languages from '../../src/i18n/index.mjs'

const languageNames = Object.keys(languages)
const languageContents = Object.values(languages)

const keys = new Map()

function traverse (lang, obj, path) {
  //   if (hasChild(obj) && !isString(obj)) console.log('Curr obj:', obj)

  Object.keys(obj).forEach(key => {
    if (isObject(obj) || isArray(obj)) {
      let newPath = path + '.' + key
      let langArray = keys.get(newPath)
      langArray = addToLanguages(langArray, lang)
      keys.set(newPath, langArray)
      traverse(lang, obj[key], newPath)
    }
  })
}

function addToLanguages (array, lang) {
  if (!array) {
    const langArray = []
    langArray.push(lang)
    array = langArray
  } else {
    array.push(lang)
  }
  return array
}

function hasChild (obj) {
  if (!obj) return
  return !!Object.keys(obj).length
}

function isArray (obj) {
  return Array.isArray(obj)
}

function isString (obj) {
  return (typeof obj === 'string' || obj instanceof String)
}

function isObject (obj) {
  return typeof obj === 'object' && obj !== null
}

function getInconsistencies () {
  let inconsistencies = []
  for (let i = 0; i < languageContents.length; i++) {
    const parentObject = languageContents[i]
    let langName = languageNames[i]
    traverse(langName, parentObject, '')
  }
  // Keys are populated, now count the amount of sv,en and other language values in each array and see if there are inconsistencies.
  for (const [key, languages] of keys.entries()) {
    const langAndLangCount = new Map()
    let maxLangCount = -1
    for (const lang of languageNames) {
      let langCount = languages.filter(l => l === lang).length
      if (langCount > maxLangCount) {
        maxLangCount = langCount
      }
      langAndLangCount.set(lang, langCount)
    }
    for (const [lang, langCount] of langAndLangCount.entries()) {
      if (langCount < maxLangCount) {
        let inconsistency = {
          value: key,
          langMissing: lang
        }
        inconsistencies.push(inconsistency)
      }
    }
  }
  return inconsistencies
}

console.log(getInconsistencies())
