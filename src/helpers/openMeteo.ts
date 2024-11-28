import { fetchWeatherApi } from 'openmeteo';
import moment from 'moment';
import "../polyfills/TextEncoding";
import axios from 'axios';

const formatDate = (dateString) => {
  return moment(dateString).format('DD MMM').toUpperCase();
};

  // Mapeo de códigos de clima a nombres
  const weatherCodeMap = {
    0: 'Despejado',
    1: 'Despejado (con nubes)',
    2: 'Nubes dispersas',
    3: 'Nublado',
    45: 'Neblina',
    48: 'Escarcha',
    51: 'Lluvia ligera',
    53: 'Lluvia moderada',
    55: 'Lluvia intensa',
    56: 'Lluvia congelada ligera',
    57: 'Lluvia congelada intensa',
    61: 'Lluvia y nieve ligera',
    63: 'Lluvia y nieve moderada',
    65: 'Lluvia y nieve intensa',
    66: 'Tormenta de lluvia congelada',
    67: 'Tormenta de lluvia y nieve',
    71: 'Nieve ligera',
    73: 'Nieve moderada',
    75: 'Nieve intensa',
    77: 'Granizo',
    80: 'Lluvias fuertes',
    81: 'Tormenta eléctrica ligera',
    82: 'Tormenta eléctrica intensa',
    85: 'Lluvia helada ligera',
    86: 'Lluvia helada intensa',
    95: 'Tormenta con lluvia',
    96: 'Tormenta con lluvia fuerte',
    99: 'Tormenta con nieve',
  };

  export const getWeatherCondition = (weatherCode) => {
    return weatherCodeMap[weatherCode] || 'Desconocido';
  };

interface WeatherData {
  daily: {
    time: Date[];
    weatherCode: Float32Array;
  };
}

interface IOpenMeteoIntance {
  latitude: number;
  longitude: number;
  forecast_days: number;
}

export const openMeteoIntance = async ({ latitude, longitude, forecast_days }: IOpenMeteoIntance) => {
  const params = {
    latitude,
    longitude,
    daily: 'weather_code',
    timezone: "auto",
    forecast_days,
  };

  let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code&timezone=auto&forecast_days=${forecast_days}`;
  const responses = await axios.get(url);

  const labels = responses.data.daily.time;
  const weatherCode = responses.data.daily.weather_code;

  return { labels, weatherCode };
};

export const formatOpenMeteoForMetric = (data:WeatherData) => {
  const labels = [];
  const weatherCode = [];

  for (let i = 0; i < data.daily.time.length; i++) {
    labels.push(formatDate(data.daily.time[i]));
    weatherCode.push(data.daily.weatherCode[i]);
  }

  return { labels, weatherCode };
};
