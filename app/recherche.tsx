import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { BarreRecherche } from './components/BarreRecherche';
import { CarteMeteo } from './components/CarteMeteo';
import { weatherService } from './utils/weatherService';
import { WeatherData, CityData } from './types/weather';

export default function Recherche() {
    const [searchResults, setSearchResults] = useState<CityData[]>([]);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (query: string) => {
        try {
            setLoading(true);
            setError(null);
            const results = await weatherService.searchCity(query);
            setSearchResults(results);
        } catch (err) {
            setError('Erreur lors de la recherche');
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
            setError('Erreur lors de la récupération de la météo');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
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
                    <CarteMeteo weather={weather} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        padding: 20,
        alignItems: 'center',
    },
    error: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    weatherContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
});
