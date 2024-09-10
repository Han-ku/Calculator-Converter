export const lengthConversionFactors = {
    cm: {
        inch: 1 / 2.54,
        feet: 1 / 30.48,
        meter: 1 / 100,
        yard: 1 / 91.44,
        mile: 1 / 160934.4,
        kilometer: 1 / 100000,
        millimeter: 10,
        nauticalMile: 1 / 1852
    },
    inch: {
        cm: 2.54,
        feet: 1 / 12,
        meter: 0.0254,
        yard: 1 / 36,
        mile: 1 / 63360,
        kilometer: 0.0000254,
        millimeter: 25.4,
        nauticalMile: 1 / 72913.4
    },
    feet: {
        cm: 30.48,
        inch: 12,
        meter: 0.3048,
        yard: 1 / 3,
        mile: 1 / 5280,
        kilometer: 0.0003048,
        millimeter: 304.8,
        nauticalMile: 1 / 6076.12
    },
    meter: {
        cm: 100,
        inch: 39.3701,
        feet: 3.28084,
        yard: 1.09361,
        mile: 1 / 1609.34,
        kilometer: 0.001,
        millimeter: 1000,
        nauticalMile: 1 / 1852
    },
    yard: {
        cm: 91.44,
        inch: 36,
        feet: 3,
        meter: 0.9144,
        mile: 1 / 1760,
        kilometer: 0.0009144,
        millimeter: 914.4,
        nauticalMile: 1 / 2025.37
    },
    mile: {
        cm: 160934.4,
        inch: 63360,
        feet: 5280,
        meter: 1609.34,
        yard: 1760,
        kilometer: 1.60934,
        millimeter: 1.60934e6,
        nauticalMile: 1 / 1.15078
    },
    kilometer: {
        cm: 1e5,
        inch: 39370.1,
        feet: 3280.84,
        meter: 1000,
        yard: 1093.61,
        mile: 0.621371,
        millimeter: 1e6,
        nauticalMile: 0.539957
    },
    millimeter: {
        cm: 0.1,
        inch: 0.03937,
        feet: 0.003281,
        meter: 0.001,
        yard: 0.0010936,
        mile: 6.2137e-7,
        kilometer: 1e-6,
        nauticalMile: 5.3996e-7
    },
    nauticalMile: {
        cm: 185200,
        inch: 72913.4,
        feet: 6076.12,
        meter: 1852,
        yard: 2025.37,
        mile: 1.15078,
        kilometer: 1.852,
        millimeter: 1.852e5
    }
}