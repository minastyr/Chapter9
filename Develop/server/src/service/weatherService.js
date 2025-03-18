import dotenv from 'dotenv';
dotenv.config();
//const apiKey = process.env.WEATHER_API_KEY;
const apiKey = '54a1826f6716bcdb5dca81a9e7de5676';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const baseCoordsUrl = 'http://api.openweathermap.org/geo/1.0/direct';
const tempUnits = 'imperial';

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
    constructor(city, date, icon, iconDescription, temperature, coordinates, windSpeed, humidity) {
        this.city = city;
        this.date = date;
        this.icon = icon;
        this.iconDescription = iconDescription;
        this.temperature = temperature;
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
        return this.temperature;
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

    setTemperature(temperature) {
        this.temperature = temperature;
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


// TODO: Define an interface for the Coordinates object
// TODO: Define a class for the Weather object
// TODO: Complete the WeatherService class
class WeatherService {

   async getCityStateCountryCoords(cityName, state, country) {
  
    console.log(`${baseCoordsUrl}?q=${cityName},${state},${country}&appid=${apiKey}`);
        const response = await fetch(`${baseCoordsUrl}?q=${cityName},${state},${country}&appid=${apiKey}`);
        const data = await response.json();
        console.log('Data:', data);
        const coordinates = new Coordinates(data[0].lat, data[0].lon); // Assuming data is an array
        console.log('Coordinates:', coordinates);
        return coordinates;
    }

    async getWeatherByCoordinates(latitude, longitude) {
        console.log(`${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
        const response = await fetch(`${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${tempUnits}`);
        const data = await response.json();

        const city = data.name;
        const date = new Date(data.dt * 1000);
        const icon = data.weather[0].icon;
        const iconDescription = data.weather[0].description;    
        const tempF = data.main.temp;
        const windSpeed = data.wind.speed;
        const humidity = data.main.humidity;

        const coordinates = new Coordinates(data.coord.lat, data.coord.lon);
        const weather = new Weather(city, date, icon, iconDescription, tempF, coordinates, windSpeed, humidity);
        return weather;
    }


}


export default new WeatherService();
