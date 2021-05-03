'use strict'

export default {
  email: 'Email',
  emailRequiredError: 'Un email válido es requerido.',
  password: 'Contraseña',
  passwordRequiredError: 'Contrseña válida es requerido',
  confirmPassword: 'Confirmar Contraseña',
  confirmPasswordError: 'Contraseña debe coincidir',
  register: 'Registar',
  deleteAccount: 'Eliminar Cuenta',
  deleteShort: 'Puede eliminar permanentemente su cuenta, Mobistudy nunca recopilará más datos a menos que cree una nueva cuenta. ',
  deleteWarning: 'Eliminar su cuenta eliminará todos los datos de forma permanente para todos los estudios. ¿Estás seguro de que quieres continuar?',
  login: {
    login: 'Iniciar Sesión',
    logout: 'Cerrar Sesión',
    logoutConfirmation: 'Está seguro que quiere cerrar la sesión?',
    logoutShort: ' Si se sale de la sesión de Mobistudy App ningún dato será registrado.',
    lostpw: 'Contraseña perdida',
    noAcc: 'No tiene cuenta todavía. Registrese en 3 pasos.',
    loginError: 'No puede iniciar sesión',
    loginErrorCredentials: 'No puede iniciar sesión, credenciales erróneos.'
  },
  resetPassword: {
    resetPassword: 'Reestablecer contraseña',
    resetPasswordError: 'No se puede Reestablecer contraseña',
    newPassword: 'NuevaContraseña',
    resetPasswordShort: `Para cambiar su contraseña, recibirá un correo con un código de verificación, ingrese el código  en la siguiente pantalla y elija una nueva contraseña.¡Advertencia! esto también cerrará la sesión.`,
    newPasswordExplanation: `Si está registrado en el sistema, debería recibir un correo electrónico en breve. Copie / pegue el código de su correo electrónico en este formulario.Si cambia su contraseña en la página web de Mobistudy, toque cancelar e inicie sesión con su nueva contraseña.`,
    token: 'Código',
    tokenHint: 'Como se recibió en su correo electrónico.',
    tokenError: 'Un código es necesario.',
    confirmPwd: 'Confirmar Contraseña',
    pwdMustMatch: 'Las contrseñas no coinciden',
    changePassword: 'Cambio de Contraseña',
    changePasswordError: 'No se puede cambiar la contraseña',
    passwordChanged: 'Nueva contraseña establecida',
    passwordChangedExplanation: 'Ahora puede iniciar sesión con su nueva contraseña.'
  },
  registration: {
    signUp: 'Registrarse',
    createAccount: 'Crear una cuenta',
    createProfile: 'Crear un perfil',
    privacyPolicy: 'Política de Privacidad',
    registrationError: 'Registro Fallido',
    registrationErrorUserExists: 'El usuario ya existe'
  },
  profile: {
    profile: 'Perfil',
    firstName: 'Nombre',
    firstNameError: 'Se requiere Nombre.',
    surname: 'Apellido',
    surnameError: 'Se requiere Apellido.',
    language: 'Idioma',
    languageError: 'Se requiere Idioma.',
    languages: {
      en: 'Ingles',
      sv: 'Sueco',
      es: 'Español'
    },
    country: 'País',
    countryError: 'Se requiere el país.',
    countries: {
      gb: 'Reino Unido',
      se: 'Suecia',
      es: 'España'
    },
    sex: 'Género',
    sexes: {
      male: 'hombre',
      female: 'mujer',
      other: 'Otros'
    },
    sexError: 'Por favor elija una opción.',
    dateOfBirth: 'Fecha de Nacimiento',
    dateOfBirthError: 'Se requiere fecha de nacimiento',
    weight: 'Peso (kg)',
    weightError: 'El peso tiene que ser un número positivo',
    height: 'Altura (cm)',
    heightError: 'La altura tiene que ser un número positivo',
    conditions: 'Condiciones a largo plazo, por ejemplo cronicas',
    conditionsSearch: 'Tipo de palabra para buscar una condición',
    conditionSearchError: 'No se encuentra ninguna enfermedad',
    noResults: 'Ningun resultado',
    medications: 'Medicaciones para condiciones a largo plazo, por ejemplo insulina',
    medicationSearchError: 'No se encuentra ninguna medicación',
    studiesSuggestions: 'Sugiereme nuevos estudios que se ajustan a mi perfil '
  }
}
