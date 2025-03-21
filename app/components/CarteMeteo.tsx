import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
    weather: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.cityName}>{weather.name}</Text>
            <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
            <Image 
                source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
                style={styles.weatherIcon}
            />
            <Text style={styles.description}>{weather.weather[0].description}</Text>
            <View style={styles.detailsContainer}>
                <Text style={styles.detail}>Humidité: {weather.main.humidity}%</Text>
                <Text style={styles.detail}>Vent: {weather.wind.speed} km/h</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cityName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    temperature: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    weatherIcon: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        textTransform: 'capitalize',
        marginBottom: 15,
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    detail: {
        fontSize: 16,
        color: '#666',
    },
}); 