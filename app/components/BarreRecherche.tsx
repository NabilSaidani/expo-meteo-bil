import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { CityData } from '../types/weather';

interface BarreRechercheProps {
    onSearch: (query: string) => void;
    onSelectCity: (city: CityData) => void;
    searchResults: CityData[];
}

export const BarreRecherche: React.FC<BarreRechercheProps> = ({
    onSearch,
    onSelectCity,
    searchResults
}) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Rechercher une ville..."
                    value={query}
                    onChangeText={setQuery}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity style={styles.button} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Rechercher</Text>
                </TouchableOpacity>
            </View>
            
            {searchResults.length > 0 && (
                <View style={styles.resultsContainer}>
                    {searchResults.map((city) => (
                        <TouchableOpacity
                        key={`${city.name}-${city.country}-${Math.random().toString(36).substr(2, 9)}`}
                            style={styles.resultItem}
                            onPress={() => onSelectCity(city)}
                        >
                            <Text style={styles.cityName}>{city.name}</Text>
                            <Text style={styles.countryName}>{city.country}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

export default BarreRecherche;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginLeft: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultsContainer: {
        marginTop: 10,
        backgroundColor: '#fff',
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
    resultItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    cityName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    countryName: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
}); 