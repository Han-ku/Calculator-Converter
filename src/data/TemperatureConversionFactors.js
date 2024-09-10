export const temperatureConversionFactors = {
    Fahrenheit: {
        Celsius: (tempF) => (tempF - 32) * (5 / 9),
        Kelvin: (tempF) => (tempF - 32) * (5 / 9) + 273.15 
    },
    Celsius: {
        Fahrenheit: (tempC) => (tempC * (9 / 5)) + 32,
        Kelvin: (tempC) => tempC + 273.15 
    },
    Kelvin: {
        Celsius: (tempK) => tempK - 273.15, 
        Fahrenheit: (tempK) => (tempK - 273.15) * (9 / 5) + 32 
    }
}