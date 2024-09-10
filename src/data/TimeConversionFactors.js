export const timeConversionFactors = {
    Seconds: {
        Minutes: (seconds) => seconds / 60,
        Hours: (seconds) => seconds / 3600,
        Days: (seconds) => seconds / 86400
    },
    Minutes: {
        Seconds: (minutes) => minutes * 60,
        Hours: (minutes) => minutes / 60,
        Days: (minutes) => minutes / 1440
    },
    Hours: {
        Seconds: (hours) => hours * 3600,
        Minutes: (hours) => hours * 60,
        Days: (hours) => hours / 24
    },
    Days: {
        Seconds: (days) => days * 86400,
        Minutes: (days) => days * 1440,
        Hours: (days) => days * 24
    }
}
