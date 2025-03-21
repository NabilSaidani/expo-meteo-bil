import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text, ScrollView } from "react-native";
import { WeatherCard } from "./components/CarteMeteo";
import { BarreRecherche } from "./components/BarreRecherche";
import { weatherService } from "./utils/weatherService";
import { WeatherData, CityData } from "./types/weather";
import * as Location from 'expo-location';

export default function Index() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<CityData[]>([]);

  useEffect(() => {
    fetchCurrentLocationWeather();
  }, []);

  const fetchCurrentLocationWeather = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission d\'accès à la localisation refusée');
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const weatherData = await weatherService.getCurrentWeather(
        location.coords.latitude,
        location.coords.longitude
      );
      setWeather(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la récupération de la météo');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const results = await weatherService.searchCity(query);
      setSearchResults(results);
      if (results.length === 0) {
        setError('Aucune ville trouvée');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la recherche');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCity = async (city: CityData) => {
    try {
      setLoading(true);
      setError(null);
      const weatherData = await weatherService.getCurrentWeather(city.lat, city.lon);
      setWeather(weatherData);
      setSearchResults([]); // Cache les résultats après la sélection
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la récupération de la météo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <BarreRecherche
        onSearch={handleSearch}
        onSelectCity={handleSelectCity}
        searchResults={searchResults}
      />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}

      {weather && (
        <View style={styles.weatherContainer}>
          <WeatherCard weather={weather} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  weatherContainer: {
    padding: 20,
    alignItems: 'center',
  },
});
