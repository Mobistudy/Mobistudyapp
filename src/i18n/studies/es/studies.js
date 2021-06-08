import smwtTask from './tasks/smwt'
import qcstTask from './tasks/qcst'
import miband3Task from './tasks/miband3'
import dataQueryTask from './tasks/dataQuery'
import po60Task from './tasks/po60'
import tappingTask from './tasks/tapping'

let studies = {
  studies: {
    newStudy: 'Nuevo estudio disponible',
    checkNewStusy: 'Revisión',
    newStudyInvite: 'Está invitado a un nuevo estudio!',
    newStudyExtraCriteria: 'Responda lo siguiente para saber si es elegible',
    notEligible: 'Usted no es elegible para este estudio',
    noStudies: 'Actualmente no está participando en ningún estudio.',
    joinStudy: 'Unirse',
    discardStudy: 'Rechazar',
    discardStudyConfirm: '¿Estás segura de que quieres descartar este estudio?',
    privacyPolicy: 'Política de privacidad',
    activeStudies: 'Estudios activos',
    noActiveStudies: 'No se encontraron estudios activos.',
    previousStudies: 'Estudios previos',
    studyCompletedHeadline: 'Ha completado un estudio',
    studyCompletedText: 'Ha completado todas las tareas del {studyname}.<br><br>muchas gracias por todo <br><br>Please, be aware that some studies may require some further action, check the study description in the "Manage Studies" menu.',
    principalInvestigators: ' Investigadores Principales',
    investigatorName: 'Nombre',
    institution: 'Institución',
    institutions: 'Instituciones involucradas',
    contact: 'Detalles de contacto',
    studyDetails: 'Detalles del estudio',
    studyTitle: 'Título del estudio',
    dataAccess: {
      anonymised: 'Esta institución accederá a sus datos de forma anónima',
      noAccess: 'Esta institución no accederá a sus datos',
      full: 'Esta institución accederá a sus datos',
      reason: 'Razón del acceso a los datos'
    },
    scheduling: {
      due: '¡Tarea de Mobistudy pendiente!',
      start: 'Seleccione aquí para comenzar la tarea'
    },
    tasks: {
      cancelTask: 'Esto terminará la tarea actual y será redirigido a la página de inicio. No se guardarán datos. ¿Realmente quieres salir?',
      noPendingTasks: 'No hay tareas pendientes',
      cancelTaskLabel: 'Cancelar',
      quitTaskLabel: 'Salir de la tarea',
      pendingTasks: 'Tareas pendientes de hoy',
      missedTasks: 'Tareas perdidas',
      alwaysOnTasks: 'Tareas que siempre están disponibles',
      noMissedTasks: 'No hay tareas pendientes',
      instructionsNote: 'Lea atentamente las instrucciones. La precisión de la prueba depende de que las instrucciones se sigan lo más fielmente posible..',
      capTestComplete: '¡Felicidades!',
      capTestCompleteSubtext: '¡Completaste la prueba!',
      taskCompleted: 'La tarea se completó y el resultado se envió al servidor. ¡Gracias!',
      form: {
        title: '{formname} formulario',
        shortDescription: 'Responde algunas preguntas',
        formCompleted: 'Formulario completado. Gracias.',
        freeTextExplanation: 'Escribe tu respuesta',
        removeAnswer: 'Eliminar respuesta',
        numberTooSmall: 'Demasiado pequeño',
        numberTooBig: 'Demasiado grande'
      }
    },
    consent: {
      itemsExplanation: 'Puede optar por aceptar o rechazar estas condiciones cuando lo desee',
      OSpermission: 'Esta tarea requiere que la aplicación acceda a algunas funcionalidades en el teléfono.',
      giveOSPermission: 'Dar permiso a esta aplicación',
      OSPermissionGiven: 'Permiso otorgado',
      OSPermissionNotGiven: 'No se pudo obtener el permiso',
      remindersConsent: 'Quiero recibir recordatorios sobre las tareas de este estudio.',
      giveRemindersOSPermission: 'Permitir recordatorios',
      informedConsent: 'Consentimiento informado',
      consentExplanation: 'Consentir las siguientes condiciones para unirse al estudio. No tiene que dar su consentimiento para todos, sin embargo, es posible que se requieran algunas condiciones para unirse al estudio. Algunas condiciones pueden reqerir acceso a las funciones del teléfono.',
      updateConsent: 'Actualizar consentimiento',
      consentUpdated: 'Consentimiento actualizado',
      joinStudy: 'Unirse al estudio',
      accepted: 'Te acabas de unir',
      contactReminder: 'Recuerde, si lo necesita, siempre puede comunicarse con los investigadores principales en:',
      withdraw: 'Retirar',
      withdrawalConfirm: '¿Está seguro de que desea retirarse de este estudio? En caso afirmativo, indique por qué'
    }
  }
}

studies.studies.tasks.smwt = smwtTask
studies.studies.tasks.qcst = qcstTask
studies.studies.tasks.miband3 = miband3Task
studies.studies.tasks.dataQuery = dataQueryTask
studies.studies.tasks.po60 = po60Task
studies.studies.tasks.tapping = tappingTask

export default studies
