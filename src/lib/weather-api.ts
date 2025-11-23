// Weather API integration for Dubai using Open-Meteo

const DUBAI_COORDS = {
  latitude: 25.2048,
  longitude: 55.2708,
};

export interface WeatherData {
  temperature: number; // °C
  humidity: number; // %
  timestamp: string;
  feelsLike: number; // °C
  weatherCode: number;
}

/**
 * Fetch current weather data for Dubai from Open-Meteo API
 */
export async function fetchDubaiWeather(): Promise<WeatherData> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${DUBAI_COORDS.latitude}&longitude=${DUBAI_COORDS.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&timezone=Asia/Dubai`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      temperature: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      timestamp: data.current.time,
      feelsLike: data.current.apparent_temperature,
      weatherCode: data.current.weather_code,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    
    // Return fallback data for Dubai typical summer conditions
    return {
      temperature: 42,
      humidity: 65,
      timestamp: new Date().toISOString(),
      feelsLike: 48,
      weatherCode: 0,
    };
  }
}

/**
 * Get weather description from WMO weather code
 */
export function getWeatherDescription(code: number): string {
  const weatherCodes: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  
  return weatherCodes[code] || 'Unknown';
}
