import formTask from './tasks/form'
import smwtTask from './tasks/smwt'
import qcstTask from './tasks/qcst'
import miband3Task from './tasks/miband3'
import dataQueryTask from './tasks/dataQuery'
import po60Task from './tasks/po60'
import positionTask from './tasks/position'
import peakflowTask from './tasks/peakflow'
import fingerTappingTask from './tasks/tapping'
import tugtTask from './tasks/tugt'
import holdphoneTask from './tasks/holdphone'
import vocalizationTask from './tasks/vocalization'
import drawingTask from './tasks/drawing'

let studies = {
  studies: {
    newStudy: 'Nuevo estudio',
    insertInvitationCode: 'Copie el código de invitación aquí',
    newStudyAvailable: 'Nuevo estudio disponible',
    checkNewStusy: 'Ábrelo',
    newStudyInvite: '¡Estás invitado a un nuevo estudio!',
    newStudyExtraCriteria: 'Responde lo siguiente para saber si eres elegible',
    notEligible: 'No eres elegible para este estudio',
    noStudies: 'Actualmente no estás participando en ningún estudio',
    joinStudy: 'Unirse',
    discardStudy: 'Rechazar',
    discardStudyConfirm: '¿Estás segur@ de que quieres descartar este estudio?',
    privacyPolicy: 'Política de privacidad',
    activeStudies: 'Estudios activos',
    noActiveStudies: 'No se encontraron estudios activos',
    previousStudies: 'Estudios previos',
    studyCompletedHeadline: 'Has completado un estudio',
    studyCompletedText: 'Has completado todas las tareas del {studyname}.<br><br>Muchas gracias por todo !<br><br>Ten en cuenta que algunos estudios pueden requerir alguna acción adicional; consulta la descripción del estudio en el menú "Administrar estudios"',
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
      alwaysOnTasks: 'Tareas que están siempre disponibles',
      noMissedTasks: 'No hay tareas pendientes',
      instructionsNote: 'Lee atentamente las instrucciones. La precisión de la prueba depende de que las instrucciones se sigan lo más fielmente posible',
      capTestComplete: '¡Felicidades!',
      capTestCompleteSubtext: '¡Tarea completada!',
      taskCompleted: 'La tarea se completó y el resultado se envió al servidor. ¡Gracias!',
      due: 'Pendiente',
      daysAgo: 'ayer | hace {count} días',
      hoursAgo: 'hace 1 hora | hace {count} horas',
      minsAgo: 'hace 1 minuto | hace {count} minutos'
    },
    consent: {
      itemsExplanation: 'Puedes optar por aceptar o rechazar estas condiciones cuando lo desee',
      OSpermission: 'Esta tarea requiere que la app acceda a algunas funcionalidades en el teléfono',
      giveOSPermission: 'Dar permiso a esta app',
      OSPermissionGivenSeeking: 'Obteniendo el permiso',
      OSPermissionGiven: 'Permiso otorgado',
      OSPermissionNotGiven: 'No se pudo obtener el permiso',
      remindersConsent: 'Quiero recibir recordatorios sobre las tareas de este estudio',
      giveRemindersOSPermission: 'Permitir recordatorios',
      informedConsent: 'Consentimiento informado',
      consentExplanation: 'Consentir las siguientes condiciones para unirse al estudio. No tienes que dar tu consentimiento para todos, sin embargo, es posible que se requieran algunas condiciones para unirse al estudio. Algunas condiciones pueden requerir acceso a las funciones del teléfono',
      consentAll: 'Consentir todos',
      updateConsent: 'Actualizar consentimiento',
      consentUpdated: 'Consentimiento actualizado',
      joinStudy: 'Unirse al estudio',
      accepted: 'Te acabas de unir',
      contactReminder: 'Recuerda, si lo necesitas, siempre puedes comunicarte con los investigadores principales en:',
      withdraw: 'Retirar',
      withdrawalConfirm: '¿Estás seguro de que deseas retirarte de este estudio? En caso afirmativo, indique por qué'
    }
  }
}

studies.studies.tasks.form = formTask
studies.studies.tasks.smwt = smwtTask
studies.studies.tasks.qcst = qcstTask
studies.studies.tasks.miband3 = miband3Task
studies.studies.tasks.dataQuery = dataQueryTask
studies.studies.tasks.po60 = po60Task
studies.studies.tasks.position = positionTask
studies.studies.tasks.peakflow = peakflowTask
studies.studies.tasks.fingerTapping = fingerTappingTask
studies.studies.tasks.tugt = tugtTask
studies.studies.tasks.holdPhone = holdphoneTask
studies.studies.tasks.vocalization = vocalizationTask
studies.studies.tasks.drawing = drawingTask

export default studies
