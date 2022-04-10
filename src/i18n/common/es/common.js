export default {
  errors: {
    error: 'Error',
    generalError: 'La aplicación está experimentando un error inesperado, asegúrate de tener una conexión a Internet y vuelve a intentarlo',
    connectionError: 'No se puede contactar con el servidor',
    correctFields: 'Por favor, corrije los siguientes campos',
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
    about: 'Info',
    homeMenu: {
      dailyTasks: 'Tareas',
      dailyTasksAction: 'Ver próximas tareas',
      profile: 'Perfil',
      profileAction: 'Cambia tu perfil',
      studies: 'Estudios',
      studiesAction: 'Añade o cancela estudios',
      about: 'Info',
      aboutAction: 'Sobre Mobistudy'
    }
  },
  pin: {
    pinNotSetTitle: 'Tu teléfono no está protegido',
    pinNotSet: `Para que esta app funcione correctamente, tu teléfono debe estar protegido con un código PIN o equivalente.
     Por favor, configura un mecanismo de bloqueo y reinicia esta app.
     Ten en cuenta que configurar el código PIN y luego eliminarlo puedes dañar el almacenamiento seguro de la app y obligarlo a reiniciarla`,
    dbCorruptedTitle: '¡Oops!',
    dbCorrupted: `La eliminación de la protección con PIN inutiliza el almacenamiento seguro de la app.
     Por favor, vuelve a configurar la protección con PIN y reinicia la app`
  }
}
