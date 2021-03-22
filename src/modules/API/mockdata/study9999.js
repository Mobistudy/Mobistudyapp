export default {
  _key: '9999',
  publishedTS: '2021-01-09T09:30:32.492Z',
  invitationCode: '123456',
  generalities: {
    languages: ['en', 'sv'],
    title: {
      en: 'The Lindängen-COVID-19 tracking study',
      sv: 'CARL'
    },
    shortDescription: {
      en: 'Symptoms tracking of COVID19 symptoms in the Lindängen community.',
      sv: 'CARL'
    },
    longDescription: {
      en: `The aim of this study is to use your mobile phone to understand the spread of COVID19
      within the Lindängen neighbourhood in Malmö.

      Participants are asked to report their symptoms using their mobile phone and to measure
      heart rate, activity level and blood oxygen saturation levels daily for a month.

      The collected data will be used to understand how COVID-19 spreads among the community,
      what are the typical symptoms reported by patients and what indicators can be used, among
      physical activity, heart rate, blood oxygen saturation and symptoms to detect the onset
      of COVID-19 before the worsening of symptoms.
      `,
      sv: 'CARL'
    },
    startDate: '2021-01-01',
    endDate: '2021-12-31',
    principalInvestigators: [
      {
        name: 'Sergey Shleev',
        contact: 'sergey.shleev@mau.se',
        institution: 'University of Malmö'
      }
    ],
    institutions: [
      {
        name: 'University of Malmö',
        contact: 'Malmö, Sweden',
        dataAccess: 'full',
        reasonForDataAccess: {
          en: 'The data will be used to identify indicators for early detection of COVID19',
          sv: 'CARL'
        }
      }
    ]
  },
  inclusionCriteria: {
    minAge: 18,
    maxAge: 100,
    sex: [
      'female',
      'male',
      'other'
    ]
  },
  tasks: [
    {
      id: 1,
      type: 'form',
      scheduling: {
        startEvent: 'consent',
        startDelaySecs: 0,
        untilSecs: 2592000, // 1 month
        intervalType: 'd',
        interval: 1
      },
      formKey: '9999',
      formName: {
        en: 'COVID-19 Symptoms questionnaire',
        sv: 'CARL'
      }
    },
    {
      id: 2,
      type: 'miband3',
      scheduling: {
        startEvent: 'consent',
        startDelaySecs: 0,
        untilSecs: 2592000, // 1 month
        intervalType: 'd',
        interval: 1
      },
      hrInterval: 5
    },
    {
      id: 3,
      type: 'dataQuery',
      scheduling: {
        startEvent: 'consent',
        startDelaySecs: 0,
        untilSecs: 2592000, // 1 month
        intervalType: 'w',
        interval: 1
      },
      dataType: 'activity',
      aggregated: true,
      bucket: 'day'
    },
    {
      id: 4,
      type: 'po60',
      scheduling: {
        alwaysOn: true,
        startEvent: 'consent',
        startDelaySecs: 0,
        untilSecs: 2592000 // 1 month
      }
    }
  ],
  consent: {
    invitation: {
      en: `We would like to invite you to take part in this research study about understanding
      the spread of COVID19 within the Lindängen neighbourhood.
      
      In order to participate, you will have to be referred to this study by a health promoter working
      in the area and you will need to own a smartphone (either Android or iPhone).

      If you decide to join the study, you will be asked to download the free Mobistusy app on your phone
      to wear a "activity tracker" and atke measurements of the level of oxygen in your blood using a
      "pulseoximeter" (no blood samples are needed for this). Both the activity tracker and the 
      pulseoximeter will be given to you by the health promoter.
      Every day, for a month, you will be asked to report any COVID-19 related symptoms through the app,
      to measure your phisical activity and heart beats using the activity tracker and the phone
      and to measure the blood oxygen saturation using the pulseoximeter.

      The data collected by the app will be sent to the University of Malmö for analysis and will not be shared
      with anyone else except the research team at the University.

      The participation to this study is voluntary and you can withdraw at any moment.`,
      sv: 'CARL'
    },
    privacyPolicy: {
      en: `To conduct this study, we need to collect some data from you using the Mobistudy app.

      What personal data will be collected?
      
      - Your general profile information like email address, name, surname, date of birth, sex, country, 
      language, main health conditions, long-term treatments, weight and height. 
      These are needed to identify you and to create statistics about those who participate in this study.
      - Your participation in the study and the times you complete a task. These are needed to assess 
      your level of involvement into the study.
      - Technical information about access to the server (like logins). These are needed for security and auditing.
      
      Data collected within the tasks assigned in this study, concretely: 
      - Answers given to the COVID-19 symptoms questionnaire.
      - Your heart rate, activity level, steps and activity type collected by the MiBand3 activity tracker.
      - Activity detected by your phone.
      - Your blood oxygen saturation and heart rate measured by a pulseoximeter.
      
      These data are needed to fulfil the aims of the research. Specifically, we want to understand how the
      disease spreads, what symptoms are common among patients and if it is possible to identify a link
      between physical activity data, as collected by your phone and the activity tracker, with clinical
      symptoms, as collected by the questionnaire and the pulseoximeter.
      
      All these data will be stored on the Mobistudy servers, which are managed by the Malmö University 
      in Sweden. Your phone will keep your profile and data about your participation in the studies only.
      
      
      For how long will this data be kept?
      
      Your profile and participation in the study will be kept for as long as you will keep an account on Mobistudy.
      Data collected within the tasks assigned in this study will be kept on the Mobistudy servers until the 
      end of the study, on 2021-12-31.
      Technical logs will be deleted after 1 year they are produced.
      Researchers of Malmö University will keep the data for 5 years.
      
      
      Who will have access to this data?
      
      - Personnel from the Malmö University for technical maintenance and auditing (Malmö University is the processor of your personal information).
      - Malmö University, in order to analyse the data (Malmö University is also the controller of your personal information).
      
      What are my rights?
      
      - You can withdraw from this study whenever you want by accessing the “studies” section of this app. 
      The data you have produced so far within the study will be kept, but if you want them to be removed contact mobistudy@mau.se.
      - You can remove your account from Mobistudy by accessing the “profile” section of this app. 
      This will remove all your data collected by Mobistudy except the technical logs, which will be deleted after 1 year. Be aware that data already downloaded by institutions involved in this or past studies may still keep your data after you have removed your account. If you want these data to be deleted, please contact mobistudy@mau.se.
      - You can ask the processing of your data to be stopped or restricted (even without deleting your account). 
      In this case contact mobistudy@mau.se.
      - You can find out what has been registered about you and download the data in a machine-readable format by contacting mobistudy@mau.se.
      - You can ask errors in your data to be corrected. In this case write to mobistudy@mau.se.
      - If you have complaints that cannot be resolved with Malmö University you may submit these to Datainspektionen.
      
      For questions about how data is processed by each institution involved in the study please contact:
      - Malmö University, at: dataskyddsombud@mau.se`,
      sv: 'CARL'
    },
    taskItems: [
      {
        description: {
          en: 'I agree to share my answers to the COVID-19 Symptoms questionnaire every day.',
          sv: 'CARL'
        },
        taskId: 1
      },
      {
        description: {
          en: 'I agree to send the data collected by the activty tracker every day.',
          sv: 'CARL'
        },
        taskId: 2
      },
      {
        description: {
          en: 'I agree to send the data about my physical activity collected by my phone every week.',
          sv: 'CARL'
        },
        taskId: 3
      },
      {
        description: {
          en: 'I agree to send the readings of the pulseoximeter at least once a day.',
          sv: 'CARL'
        },
        taskId: 4
      }
    ]
  }
}
