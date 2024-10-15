import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';


// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  const cityName = req.body.cityName;

  if (!cityName) {
    return res.status(400).json({ error: 'City name is required' });
  }
  // TODO: GET weather data from city name
  try {
    const weatherData = await WeatherService.getWeatherForCity(cityName);
  
  // TODO: save city to search history
  await HistoryService.addCity(cityName);

  return res.status(200).json(weatherData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch weather data' });
  }

});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  try {
    const searchHistory = await HistoryService.getCities();
    return res.json(searchHistory);
  } catch (error) {
    console.error(error);
    return res.json({ error: 'Failed to fetch search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCity = await HistoryService.removeCity(id);
    res.status(200).json({ deletedCity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete city from search history' });
  }
});

export default router;
