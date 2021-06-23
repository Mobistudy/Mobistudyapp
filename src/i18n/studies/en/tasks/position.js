export default {
  title: 'Position',
  shortDescription: 'Send your current location',
  shortTitle: 'Position',
  OSpermissioniOS: 'This task requires the app to access the positioning system of your phone (like the GPS). Your location will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  OSpermissionAndroid: 'This task requires the app to access the positioning system of your phone (like the GPS). Your location will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  introductionSlides: [
    {
      title: 'Introduction',
      img: 'instructions/position-01.svg',
      description: 'This task consists of sending your current location using the phone. The task will also collect information about the environment you are in, like the weather or pollution levels.'
    },
    {
      title: 'Setup',
      img: 'instructions/position-02.svg',
      description: 'Make sure positioning (GPS) on your phone is turned ON before starting this task.'
    }
  ],
  connecting: 'Retrieving your position and environment',
  approxLocation: 'Approximate location',
  weather: 'Weather',
  temperature: 'Temperature',
  humidity: 'Humidity',
  clouds: 'Clouds',
  wind: 'Wind',
  airQuality: 'Air Quality',
  aqiscale: {
    l1: 'Good',
    l2: 'Fair',
    l3: 'Moderate',
    l4: 'Poor',
    l5: 'Very Poor'
  },
  allergens: {
    riskOfGrass: 'Risk of grass pollen',
    riskOfTree: 'Risk of tree pollen',
    riskOfWeed: 'Risk of weed pollen'
  }
}
