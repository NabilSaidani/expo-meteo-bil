import { API_KEY, BASE_URL, GEO_URL, ENDPOINTS, UNITS, LANG } from './api';
import { WeatherData, ForecastData, CityData } from '../types/weather';

class WeatherService {
    private async fetchData<T>(url: string, endpoint: string, params: Record<string, string>): Promise<T> {
        const queryParams = new URLSearchParams({
            appid: API_KEY,
            units: UNITS.metric,
            lang: LANG,
            ...params,
        });

        try {
            const response = await fetch(`${url}${endpoint}?${queryParams}`);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || `Erreur API: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('Erreur API:', error);
            throw new Error(error instanceof Error ? error.message : 'Erreur lors de la requête API');
        }
    }

    async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
        return this.fetchData<WeatherData>(BASE_URL, ENDPOINTS.current, {
            lat: lat.toString(),
            lon: lon.toString(),
        });
    }

    async getForecast(lat: number, lon: number): Promise<ForecastData> {
        return this.fetchData<ForecastData>(BASE_URL, ENDPOINTS.forecast, {
            lat: lat.toString(),
            lon: lon.toString(),
        });
    }

    async searchCity(query: string): Promise<CityData[]> {
        if (!query.trim()) {
            return [];
        }
        return this.fetchData<CityData[]>(GEO_URL, ENDPOINTS.geocoding, {
            q: query,
            limit: '5',
        });
    }
}

export const weatherService = new WeatherService(); 