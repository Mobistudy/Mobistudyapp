import zxcvbn from 'zxcvbn'
import owasp from 'owasp-password-strength-test'

const config = {
  allowPassphrases: true,
  maxLength: 70,
  minLength: 8,
  minPhraseLength: 10,
  minOptionalTestsToPass: 3
}

owasp.config(config)

export let owaspConfig = config

// vuelidator validator with parameter (email)
// see https://vuelidate.js.org/#sub-extra-parameters
export function checkPwdStrength (email) {
  return (pwd) => {
    console.log('pwd strength ' + email + ' ' + pwd)
    if (!pwd) return false
    if (email) {
      // check if password includes name in email
      let i = email.indexOf('@')
      if (i > 0) {
        let userName = email.substring(0, i)
        if (pwd.toUpperCase().includes(userName.toUpperCase())) {
          return false
        }
      }
    }
    if (!owasp.test(pwd).strong) return false

    let strengthCheck = zxcvbn(pwd)
    if (strengthCheck.score < 2) return false

    return true
  }
}

function owasp2tokens (ow) {
  if (ow.indexOf('The password must be at least') !== -1) {
    return 'passwordCheck.minChars'
  }
  if (ow.indexOf('The password must be fewer than') !== -1) {
    return 'passwordCheck.maxChar'
  }
  if (ow.indexOf('The password may not contain sequences of three or more repeated characters.') !== -1) {
    return 'passwordCheck.noRepeat'
  }
  if (ow.indexOf('The password must contain at least one lowercase letter') !== -1) {
    return 'passwordCheck.lowerCase'
  }
  if (ow.indexOf('The password must contain at least one uppercase letter') !== -1) {
    return 'passwordCheck.upperCase'
  }
  if (ow.indexOf('The password must contain at least one number') !== -1) {
    return 'passwordCheck.number'
  }
  if (ow.indexOf('The password must contain at least one special character') !== -1) {
    return 'passwordCheck.specialChar'
  }
}

function zxcvbn2tokens (zx) {
  if (zx.indexOf('Straight rows of keys are easy to guess') !== -1) {
    return 'passwordCheck.noKeysRow'
  }
  if (zx.indexOf('Short keyboard patterns are easy to guess') !== -1) {
    return 'passwordCheck.noShortPattern'
  }
  if (zx.indexOf('Repeats like "aaa" are easy to guess') !== -1) {
    return 'passwordCheck.noRepeat2'
  }
  if (zx.indexOf('Repeats like "abcabcabc"') !== -1) {
    return 'passwordCheck.noRepeat3'
  }
  if (zx.indexOf('Sequences like abc or 6543 are easy to guess') !== -1) {
    return 'passwordCheck.noSequence'
  }
  if (zx.indexOf('Recent years are easy to guess') !== -1) {
    return 'passwordCheck.noRecentYear'
  }
  if (zx.indexOf('Dates are often easy to guess') !== -1) {
    return 'passwordCheck.noDate'
  }
  if (zx.indexOf('This is a top-10 common password') !== -1) {
    return 'passwordCheck.noTop10'
  }
  if (zx.indexOf('This is a top-100 common password') !== -1) {
    return 'passwordCheck.noTop100'
  }
  if (zx.indexOf('This is a very common password') !== -1) {
    return 'passwordCheck.noCommonPwd'
  }
  if (zx.indexOf('This is similar to a commonly used password') !== -1) {
    return 'passwordCheck.noCommonPwdSimilar'
  }
  if (zx.indexOf('A word by itself is easy to guess') !== -1) {
    return 'passwordCheck.no1Word'
  }
  if (zx.indexOf('Names and surnames by themselves are easy to guess') !== -1) {
    return 'passwordCheck.noNames'
  }
  if (zx.indexOf('Common names and surnames are easy to guess') !== -1) {
    return 'passwordCheck.noNames'
  }
}

export function pwdCheckError (email, pwd) {
  if (!pwd) return 'passwordCheck.tooShort'
  if (email) {
    // check if password includes name in email
    let i = email.indexOf('@')
    if (i > 0) {
      let userName = email.substring(0, i)
      if (pwd.toUpperCase().includes(userName.toUpperCase())) {
        return 'passwordCheck.noEmail'
      }
    }
  }
  let result = owasp.test(pwd)
  if (!result.strong) {
    return owasp2tokens(result.errors[0])
  } else {
    result = zxcvbn(pwd)
    if (result.feedback) {
      let mesg = 'passwordCheck.tooSimple'
      if (result.feedback.warning) mesg = zxcvbn2tokens(result.feedback.warning)
      // uncomment this code to show also suggestions
      // if (result.feedback.suggestions && result.feedback.suggestions.length) {
      //   mesg += '.\nSuggestion: ' + result.feedback.suggestions[0]
      // }
      return mesg
    } else return 'passwordCheck.ok'
  }
}
