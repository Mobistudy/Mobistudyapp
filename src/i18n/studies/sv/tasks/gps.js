export default {
  title: 'Weather / Location',
  shortDescription: 'Collect GPS location and local weather',
  shortTitle: 'Weather',
  description: 'We will use your GPS location to find out your local weather.',
  OSpermissioniOS: 'This task requires the app to access the positioning system of your phone (like the GPS). Your location will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  OSpermissionAndroid: 'This task requires the app to access the positioning system of your phone (like the GPS). Your location will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  introductionSlides: [
    {
      title: 'Instruction',
      img: 'instructions/6mwt_6.jpg',
      description: 'We will use your location to find out your local weather.'
    },
    {
      title: 'Setup',
      img: 'instructions/6mwt_6.jpg',
      description: 'Make sure the positioning (GPS) on your phone is turned ON before starting the test.'
    }
  ],
  signalCheck: 'Waiting for the GPS signal.',
  apiCalling: 'Waiting for weather information.',
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
