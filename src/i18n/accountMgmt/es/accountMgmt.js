'use strict'

export default {
  email: 'Email',
  emailRequiredError: 'Un email válido es requerido.',
  password: 'Contraseña',
  passwordRequiredError: 'Contrseña válida es requerido',
  confirmPassword: 'Confirmar Contraseña',
  confirmPasswordError: 'La contraseña debe coincidir',
  participantOnly: 'Puedes logearte solo como participante en este app!',
  register: 'Registar',
  deleteAccount: 'Eliminar Cuenta',
  deleteShort: 'Puedes eliminar permanentemente tu cuenta, Mobistudy nunca recopilará más datos a menos que crees una nueva cuenta. ',
  deleteWarning: 'Eliminar tu cuenta, eliminará todos los datos de forma permanente para todos los estudios. ¿Estás seguro de que quieres continuar?',
  login: {
    login: 'Iniciar Sesión',
    logout: 'Cerrar Sesión',
    logoutConfirmation: '¿Estás seguro que quiere cerrar la sesión?',
    logoutShort: ' Si te salea de la sesión de Mobistudy app ningún dato será registrado',
    lostpw: 'Contraseña perdida',
    noAcc: 'No tienes cuenta todavía. Registrate en 3 pasos',
    loginError: 'No puedes iniciar sesión',
    loginErrorCredentials: 'No puedes iniciar sesión, credenciales erróneos'
  },
  resetPassword: {
    resetPassword: 'Reestablecer contraseña',
    resetPasswordError: 'No se puede Reestablecer contraseña',
    newPassword: 'Nueva contraseña',
    resetPasswordShort: 'Para cambiar tu contraseña, recibirás un correo con un código de verificación, ingresa el código  en la siguiente pantalla y elije una nueva contraseña. ¡Advertencia! esto también cerrará la sesión',
    newPasswordExplanation: 'Si estás registrado en el sistema, deberías recibir un correo electrónico en breve. Copia/pega el código de su correo electrónico en este formulario. Si cambias tu contraseña en la página web de Mobistudy, toca cancelar e inicia la sesión con tu nueva contraseña',
    token: 'Código',
    tokenHint: 'Como lo recibiste en su correo electrónico.',
    tokenError: 'Un código es necesario',
    confirmPwd: 'Confirmar contraseña',
    pwdMustMatch: 'Las contraseñas no coinciden',
    changePassword: 'Cambio de contraseña',
    changePasswordError: 'No se puede cambiar la contraseña',
    passwordChanged: 'Nueva contraseña establecida',
    passwordChangedExplanation: 'Ahora puedes iniciar sesión con su nueva contraseña'
  },
  registration: {
    signUp: 'Registrarse',
    createAccount: 'Crear una cuenta',
    createProfile: 'Crear un perfil',
    privacyPolicy: 'Política de privacidad',
    registrationError: 'Registro fallido',
    registrationErrorUserExists: 'El usuario ya existe'
  },
  profile: {
    profile: 'Perfil',
    firstName: 'Nombre',
    firstNameError: 'Se requiere Nombre',
    surname: 'Apellido',
    surnameError: 'Se requiere Apellido',
    language: 'Idioma',
    languageError: 'Se requiere Idioma',
    languages: {
      en: 'Ingles',
      sv: 'Sueco',
      es: 'Español'
    },
    country: 'País',
    countryError: 'Se requiere el país',
    countries: {
      gb: 'Reino Unido',
      se: 'Suecia',
      es: 'España'
    },
    sex: 'Género',
    sexes: {
      male: 'Hombre',
      female: 'Mujer',
      other: 'Otros'
    },
    sexError: 'Por favor elije una opción',
    dateOfBirth: 'Fecha de nacimiento',
    dateOfBirthError: 'Se requiere fecha de nacimiento',
    weight: 'Peso (kg)',
    weightError: 'El peso tiene que ser un número positivo',
    height: 'Altura (cm)',
    heightError: 'La altura tiene que ser un número positivo',
    conditions: 'Condiciones crónicas o a largo plazo',
    conditionsSearch: 'Tipo de palabra para buscar una condición',
    conditionSearchError: 'No se encuentra ninguna enfermedad',
    noResults: 'Ningún resultado',
    medications: 'Medicaciones con uso a largo plazo',
    medicationSearchError: 'No se encuentra ninguna medicación',
    studiesSuggestions: 'Sugiereme nuevos estudios que se ajustan a mi perfil '
  }
}
