export default {
  weather: {
    location: 'Oxford',
    description: 'clear sky',
    icon: 'https://openweathermap.org/img/w/01d.png',
    temperature: 17.78000000000003,
    temperatureFeels: 17.470000000000027,
    temperatureMin: 15.140000000000043,
    temperatureMax: 20.30000000000001,
    pressure: 1016,
    humidity: 71,
    sunrise: '2021-06-01T03:52:23.000Z',
    sunset: '2021-06-01T20:13:46.000Z',
    clouds: 0,
    wind: {
      speed: 3.48,
      deg: 97,
      gust: 5.71
    }
  },
  pollution: {
    aqi: 2,
    components: {
      co: 183.58,
      no: 3.33,
      no2: 9.85,
      o3: 58.65,
      so2: 5.48,
      pm2_5: 12.48,
      pm10: 16,
      nh3: 2.63
    }
  },
  postcode: {
    postcode: 'OX1 4DS',
    county: 'Oxfordshire'
  },
  allergens: {
    pollen: {
      Count: {
        grass_pollen: 83,
        tree_pollen: 358,
        weed_pollen: 14
      },
      Risk: {
        grass_pollen: 'High',
        tree_pollen: 'High',
        weed_pollen: 'Low'
      }
    }
  }
}
