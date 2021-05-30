export default {
  title: 'Position',
  shortDescription: 'Collect your current location',
  shortTitle: 'Position',
  OSpermissioniOS: 'This task requires the app to access the positioning system of your phone (like the GPS). Your location will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  OSpermissionAndroid: 'This task requires the app to access the positioning system of your phone (like the GPS). Your location will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  introductionSlides: [
    {
      title: 'Introduction',
      img: 'instructions/6mwt_6.jpg',
      description: 'This task consists of collecting your current location using the phone. The task will also collect information about the environment you are in, like the weather or pollution levels.'
    },
    {
      title: 'Setup',
      img: 'instructions/6mwt_6.jpg',
      description: 'Make sure the positioning (GPS) on your phone is turned ON before starting this task.'
    }
  ],
  signalCheck: 'Waiting for the GPS signal.',
  apiCalling: 'Waiting for weather information.',
  apiCallError: 'You have reached the limit of weather calls today, but you may still complete the task by proceeding and sending your location',
  approxPostcode: 'Approximate postcode: ',
  approxLocation: 'Approximate location: ',
  weather: 'Weather: ',
  temperature: 'Temperature: ',
  humidity: 'Humidity: ',
  clouds: 'Clouds: ',
  wind: 'Wind: ',
  airQuality: 'Air Quality: ',
  aqiscale: {
    l1: 'Good',
    l2: 'Fair',
    l3: 'Moderate',
    l4: 'Poor',
    l5: 'Very Poor'
  }
}
