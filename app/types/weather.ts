export interface WeatherData {
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    name: string;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
}

export interface ForecastData {
    list: Array<{
        dt: number;
        main: {
            temp: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            humidity: number;
        };
        weather: Array<{
            id: number;
            main: string;
            description: string;
            icon: string;
        }>;
        wind: {
            speed: number;
            deg: number;
        };
        clouds: {
            all: number;
        };
    }>;
    city: {
        id: number;
        name: string;
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
}

export interface CityData {
    name: string;
    local_names: {
        [key: string]: string;
    };
    lat: number;
    lon: number;
    country: string;
    state?: string;
} 