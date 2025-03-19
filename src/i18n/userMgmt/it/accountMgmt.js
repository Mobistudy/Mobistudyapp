'use strict'

export default {
  email: 'Email',
  emailRequiredError: 'È richiesto un indirizzo email valido',
  password: 'Password',
  passwordRequiredError: 'La password è obbligatoria',
  confirmPassword: 'Conferma Password',
  confirmPasswordError: 'Le password devono coincidere',
  server: 'Istituzione',
  serverRequiredError: 'È necessario specificare un’istituzione',
  participantOnly: 'Puoi accedere a questa app solo come partecipante!',
  register: 'Registrati',
  deleteAccount: 'Elimina Account',
  deleteShort: "Puoi eliminare definitivamente il tuo account. Mobistudy non raccoglierà più alcun dato a meno che tu non crei un nuovo account.",
  deleteWarning: 'Eliminando il tuo account, tutti i dati verranno eliminati definitivamente per tutti gli studi. Sei sicuro di voler continuare?',
  login: {
    login: 'Accedi',
    logout: 'Esci',
    logoutConfirmation: 'Sei sicuro di voler uscire?',
    logoutShort: 'Se esci dall’app Mobistudy, non verranno raccolti ulteriori dati.',
    lostpw: 'Password dimenticata',
    noAcc: 'Non hai ancora un account? Registrati in 3 semplici passaggi!',
    loginError: 'Accesso non riuscito',
    loginErrorCredentials: 'Accesso non riuscito, credenziali errate.'
  },
  resetPassword: {
    resetPassword: 'Reimposta Password',
    resetPasswordError: 'Impossibile reimpostare la password',
    newPassword: 'Nuova password',
    resetPasswordShort: "Per cambiare la tua password riceverai una mail con un codice di verifica. Inserisci il codice nella schermata successiva e scegli una nuova password. Attenzione! Questo ti farà uscire dall’app.",
    newPasswordExplanation: 'Se sei registrato nel sistema, riceverai a breve una mail. Copia e incolla il codice ricevuto nella mail su questo modulo. Se cambi la password sulla pagina web di Mobistudy, premi annulla e accedi con la nuova password.',
    token: 'Codice',
    tokenHint: 'Come ricevuto via email.',
    tokenError: 'È richiesto un codice.',
    confirmPwd: 'Conferma Password',
    pwdMustMatch: 'Le password non coincidono',
    changePassword: 'Cambia Password',
    changePasswordError: 'Impossibile cambiare la password',
    passwordChanged: 'Nuova password impostata',
    passwordChangedExplanation: 'Ora puoi accedere con la tua nuova password.'
  },
  registration: {
    signUp: 'Iscriviti',
    createAccount: 'Crea Account',
    createProfile: 'Crea Profilo',
    privacyPolicy: 'Informativa sulla Privacy',
    registrationError: 'Registrazione fallita',
    registrationErrorUserExists: 'L’utente esiste già',
    registrationErrorWrongEmail: 'Impossibile verificare l’indirizzo email'
  },
  profile: {
    profile: 'Profilo',
    firstName: 'Nome',
    firstNameError: 'Il nome è obbligatorio.',
    surname: 'Cognome',
    surnameError: 'Il cognome è obbligatorio.',
    language: 'Lingua',
    languageError: 'La lingua è obbligatoria.',
    languages: {
      en: 'Inglese',
      sv: 'Svedese',
      es: 'Spagnolo'
    },
    country: 'Paese',
    countryError: 'Il paese è obbligatorio.',
    countries: {
      gb: 'Regno Unito',
      se: 'Svezia',
      es: 'Spagna'
    },
    sex: 'Sesso',
    sexes: {
      male: 'Maschio',
      female: 'Femmina',
      other: 'Altro'
    },
    sexError: 'Seleziona un’opzione.',
    dateOfBirth: 'Data di Nascita',
    dateOfBirthError: 'La data di nascita è obbligatoria',
    weight: 'Peso (kg)',
    weightError: 'Il peso deve essere un numero positivo',
    height: 'Altezza (cm)',
    heightError: 'L’altezza deve essere un numero positivo',
    conditions: 'Condizioni croniche',
    conditionsSearch: 'Scrivi una parola per cercare una condizione',
    conditionSearchError: 'Impossibile trovare la malattia',
    noResults: 'Nessun risultato',
    medications: 'Farmaci a lungo termine',
    medicationSearchError: 'Impossibile trovare il farmaco',
    studiesSuggestions: 'Suggerisci nuovi studi che corrispondono al mio profilo'
  }
}
