import { Router } from "express";
const router = Router();
import { v4 as uuidv4 } from "uuid";

import WeatherService from "../../service/weatherService.js";
import HistoryService, { City } from "../../service/historyService.js";

router.post("/getWeather", async (req, res) => {
  const { cityName, state, country } = req.body;

  // Validate input
  if (!cityName?.trim() || !state?.trim() || !country?.trim()) {
    return res.status(400).json({
      error: "City name, state, and country are required and cannot be empty",
    });
  }

  try {
    // Get coordinates and weather data
    const coords = await WeatherService.getCityStateCountryCoords(
      cityName,
      state,
      country
    );
    const dailyWeatherArray = await WeatherService.getWeatherByCoordinates(
      coords.latitude,
      coords.longitude
    );

    // Save city to history
    const city = new City(
      uuidv4(),
      cityName,
      state,
      country,
      coords.latitude,
      coords.longitude
    );
    HistoryService.addCity(city);

    // Send weather data as response
    // res.json(weather);
    res.json({
      city: cityName,
      state,
      country,
      dailyWeather: dailyWeatherArray,
    });
  } catch (error) {
    console.error("Error in /api/weather/getWeather route:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.get("/history", async (req, res) => {
  try {
    const history = HistoryService.getHistory();
    res.json(history);
  } catch (error) {
    console.error("Error in /api/weather/history route:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.delete("/history/:id", (req, res) => {
  const { id } = req.params;
  const success = HistoryService.deleteCity(id);
  if (success) {
    res.status(200).json({ message: "City deleted successfully" });
  } else {
    res.status(404).json({ error: "City not found" });
  }
});

export default router;
