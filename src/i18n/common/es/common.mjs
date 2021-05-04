export default {
  errors: {
    error: 'Error',
    generalError: 'La aplicación está experimentando un error inesperado, asegúrate de tener una conexión a Internet y vuelve a intentarlo',
    connectionError: 'No se puede contactar con el servidor',
    correctFields: 'Por favor, corrija los siguientes campos',
    invitationalStudyNotFound: 'No se encontró el estudio',
    invitationalStudyAlreadyAdded: 'Ya agregaste este estudio',
    invitationalStudyAlreadyParticipated: 'Ya has participado en este estudio'
  },
  common: {
    next: 'Siguiente',
    cancel: 'Cancelar',
    accept: 'Aceptar',
    reject: 'Rechazar',
    close: 'Cerrar',
    update: 'Actualizar',
    delete: 'Borrar',
    yes: 'Sí',
    no: 'No',
    info: 'Info',
    privacy: 'Privacidad',
    consent: 'Consentimiento',
    retry: 'Reintento',
    start: 'Comenzar',
    complete: 'Completar',
    send: 'Enviar',
    discard: 'Descartar',
    skip: 'Saltar',
    back: 'Atrás',
    introduction: 'Introdución',
    instructions: 'Instrucciones',
    prerequisites: 'Prerequisitos',
    warning: 'Alarma'
  },
  layouts: {
    consent: 'Nuevo estudio',
    home: 'Home',
    registration: 'Registar',
    task: 'Tarea',
    close: 'Cerrar',
    about: 'Sobre',
    homeMenu: {
      dailyTasks: 'Tareas',
      dailyTasksAction: 'Ver próximas tareas',
      profile: 'Perfil',
      profileAction: 'Cambia tu perfil',
      studies: 'Estudios',
      studiesAction: 'Añade o cancela estudios',
      about: 'Sobre',
      aboutAction: 'Sobre Mobistudy'
    }
  },
  pin: {
    pinNotSetTitle: 'Su teléfono no está protegido',
    pinNotSet: `Para que esta aplicación funcione correctamente, su teléfono debe estar protegido con un código PIN o equivalente.
     Por favor, configure un mecanismo de bloqueo y reinicie esta aplicación.
     Tenga en cuenta que configurar el código PIN y luego eliminarlo puede dañar el almacenamiento seguro de la aplicación y obligarlo a reiniciarla.`,
    dbCorruptedTitle: '¡Oops!',
    dbCorrupted: `La eliminación de la protección con pin inutiliza el almacenamiento seguro de la aplicación.
     Por favor, vuelva a configurar la protección con pin y reinicie la aplicación.`
  }
}
