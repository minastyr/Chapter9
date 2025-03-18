import dotenv from "dotenv";
dotenv.config();
const apiKey = process.env.WEATHERAPIKEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/forecast";
const baseCoordsUrl = "http://api.openweathermap.org/geo/1.0/direct";
const tempUnits = "imperial";

class Coordinates {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  getLatitude() {
    return this.latitude;
  }

  getLongitude() {
    return this.longitude;
  }

  setLatitude(latitude) {
    this.latitude = latitude;
  }

  setLongitude(longitude) {
    this.longitude = longitude;
  }
}

class Weather {
  constructor(
    city,
    date,
    icon,
    iconDescription,
    tempF,
    coordinates,
    windSpeed,
    humidity
  ) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.coordinates = coordinates;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }

  getCity() {
    return this.city;
  }

  getDate() {
    return this.date;
  }

  getIcon() {
    return this.icon;
  }

  getIconDescription() {
    return this.iconDescription;
  }

  getTemperature() {
    return this.tempF;
  }

  getCoordinates() {
    return this.coordinates;
  }

  getWindSpeed() {
    return this.windSpeed;
  }

  getHumidity() {
    return this.humidity;
  }

  setCity(city) {
    this.city = city;
  }

  setTemperature(tempF) {
    this.temperature = tempF;
  }

  setCoordinates(coordinates) {
    this.coordinates = coordinates;
  }

  setWindSpeed(windSpeed) {
    this.windSpeed = windSpeed;
  }

  setHumidity(humidity) {
    this.humidity = humidity;
  }
}

class WeatherService {
  async getCityStateCountryCoords(cityName, state, country) {
    console.log(
      `${baseCoordsUrl}?q=${cityName},${state},${country}&appid=${apiKey}`
    );
    const response = await fetch(
      `${baseCoordsUrl}?q=${cityName},${state},${country}&appid=${apiKey}`
    );
    const data = await response.json();
    //console.log('Data:', data);
    const coordinates = new Coordinates(data[0].lat, data[0].lon); // Assuming data is an array
    //console.log('Coordinates:', coordinates);
    return coordinates;
  }

  async getWeatherByCoordinates(latitude, longitude) {
    const response = await fetch(
      `${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${tempUnits}`
    );
    const data = await response.json();
    //console.log('Data:', data);

    const dailyForecasts = {};
    data.list.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toLocaleDateString("en-US");
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = [];
      }
      dailyForecasts[date].push(entry);
    });

    const dailyWeatherArray = Object.keys(dailyForecasts).map((date) => {
      const dayEntries = dailyForecasts[date];
      const representativeEntry = dayEntries[0];
      return {
        date,
        city: data.city.name,
        icon: representativeEntry.weather[0].icon,
        iconDescription: representativeEntry.weather[0].description,
        tempF: representativeEntry.main.temp,
        windSpeed: representativeEntry.wind.speed,
        humidity: representativeEntry.main.humidity,
        coordinates: new Coordinates(data.city.coord.lat, data.city.coord.lon),
      };
    });

    //console.log('Daily Weather Array:', dailyWeatherArray[2]);
    return dailyWeatherArray;
  }
}

export default new WeatherService();
