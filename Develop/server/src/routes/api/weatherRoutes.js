import { Router } from 'express';
const router = Router();
import { v4 as uuidv4 } from 'uuid';

import WeatherService from '../../service/weatherService.js';
import HistoryService, { City } from '../../service/historyService.js';

router.post('/getWeather', async (req, res) => {
    const { cityName, state, country } = req.body;

    // Validate input
    if (!cityName?.trim() || !state?.trim() || !country?.trim()) {
        return res.status(400).json({ error: 'City name, state, and country are required and cannot be empty' });
    }

    try {
        // Get coordinates and weather data
        const coords = await WeatherService.getCityStateCountryCoords(cityName, state, country);
        const weather = await WeatherService.getWeatherByCoordinates(coords.latitude, coords.longitude);

        // Save city to history
        const city = new City(uuidv4(), cityName); // Use UUID for unique ID
        HistoryService.addCity(city);

        // Send weather data as response
        res.json(weather);
    } catch (error) {
        console.error('Error in /api/weather/getWeather route:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

export default router;

