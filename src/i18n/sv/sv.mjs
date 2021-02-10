import { mergeDeep } from '../../modules/tools.mjs'
import acMgmtSv from './accountMgmt.mjs'
import studiesSv from './studies.mjs'
import privacyPolicyFull from './privacyPolicy'
import about from './about/about'

let sv = {
  errors: {
    error: 'Fel',
    generalError: 'Appen har upptäckt ett oförväntat fel, var god och se till att din internet anslutning är påslagen och försök sedan igen.',
    connectionError: 'Kan inte kontakta servern',
    correctFields: 'Var god rätta de indikierade fälten',
    invitationalStudyNotFound: 'Invit-studien kunde inte hittas.',
    invitationalStudyAlreadyAdded: 'Du har redan lagt till den här invit-studien.',
    invitationalStudyAlreadyParticipated: 'Du har redan deltagit i den här invit-studien.'
  },
  common: {
    next: 'Nästa',
    clear: 'Rensa svar',
    cancel: 'Avsluta',
    discard: 'Kassera',
    accept: 'Acceptera',
    reject: 'Kassera',
    close: 'Stäng',
    update: 'Uppdatera',
    delete: 'Ta bort',
    yes: 'Ja',
    no: 'Nej',
    info: 'Information',
    privacy: 'Integritet',
    consent: 'Samtycke',
    retry: 'Försök igen',
    start: 'Start',
    complete: 'Slutför',
    send: 'Skicka',
    skip: 'Skippa',
    back: 'Tillbaka',
    introduction: 'Introduktion',
    instructions: 'Instruktioner',
    prerequisites: 'Förutsättningar'
  },
  layouts: {
    consent: 'Ny studie',
    home: 'Mobistudy',
    registration: 'Registrera',
    task: 'Uppgift',
    close: 'Stäng',
    about: 'Om',
    homeMenu: {
      dailyTasks: 'Uppgifter',
      dailyTasksAction: 'Se kommande uppgifter',
      profile: 'Profil',
      profileAction: 'Redigera din profil',
      studies: 'Studier',
      studiesAction: 'Lägg till eller lämna studie',
      about: 'Om',
      aboutAction: 'Om Mobistudy'
    }
  },
  passwordCheck: {
    ok: 'Allt OK',
    tooShort: 'Lösenordet är för kort.',
    tooSimple: 'Lösenordet är för enkelt.',
    noEmail: 'Lösenordet kan inte innehålla en email.',
    minChars: 'Lösenordet måste innehålla minst {minLength} karaktärer.',
    maxChars: 'Lösenordet måste innehålla mindre än {maxLength} karaktärer.',
    noRepeat: 'Lösenordet får inte lov att innehålla en sekvens av tre upprepade karaktärer.',
    lowerCase: 'Lösenordet måste innehålla minst en liten bokstav.',
    upperCase: 'Lösenordet måste innehålla minst en stor bokstav.',
    number: 'Lösenordet måsta innehålla minst en siffra',
    specialChar: 'Lösenordet måste innehålla minst en speciell karaktär.',
    noKeysRow: 'Bokstäver på tangentbordet som är i rad är enkla att gissa.',
    noShortPattern: 'Korta tangentbordsmönster är enkla att gissa.',
    noRepeat2: 'Upprepande som till exempel "aaa" är enkla att gissa.',
    noRepeat3: 'Upprepande lsom "abcabcabc" är bara lite svårare att gissa än "abc".',
    noSequence: 'Sekvenser som abc eller 6543 är enkla att gissa.',
    noRecentYear: 'Nyligen inträffade årtal är enkla att gissa.',
    noDate: 'Datum är ofta enkla att gissa.',
    noTop10: 'Det här är ett top-10 enkelt lösenord att gissa.',
    noTop100: 'Det här är ett top-100 enkelt lösenord att gissa.',
    noCommonPwd: 'Det här är ett väldigt vanligt lösenord.',
    noCommonPwdSimilar: 'Det här är väldigt likt ett vanligt lösenord.',
    no1Word: 'Ett ord för sig själv är enkelt att gissa.',
    noNames: 'Namn och efternamn är enkla att gissa.'
  },
  healthDataTypes: {
    steps: 'steg',
    weight: 'vikt',
    height: 'längd',
    activity: 'aktivitet',
    heart_rate: 'hjärtfrekvens',
    heart_rate_variability: 'hjärtfrekvensvariabilitet',
    calories: 'kalorier',
    distance: 'distans'
  },
  pin: {
    pinNotSetTitle: 'Din telefon är inte skyddad med ett skärmlås',
    pinNotSet: 'För att appen ska fungera, måste din telefon vara skyddad med en pinkod eller ekvivalent skärmlås. Var god och konfigurera ett skärmlås och start om appen. Var medveten om att, sätta en pinkod eller annat skärmlås och sedan ta bort det kan få appen att sluta fungera. Om så händer måste du sätta ett skärmlås igen och starta om appen.',
    dbCorruptedTitle: 'Oops!',
    dbCorrupted: 'Om du tar bort pinkoden när appen är installerad fungerar inte Mobistudys säkra lagring i telefonen. Om så händer, var god och sätt tillbaka ett skärmlås och starta om appen.'
  },
  privacyPolicyFull
}

sv = mergeDeep(sv, acMgmtSv)
sv = mergeDeep(sv, studiesSv)
sv.about = about

export default sv
