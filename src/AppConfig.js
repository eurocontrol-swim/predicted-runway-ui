
const AppConfig = {};

AppConfig.baseUrl = process.env.VUE_APP_BASE_URL || '';

AppConfig.serverApi = {
  dev: {
    host: 'http://localhost:5000',
    baseUrl: `${AppConfig.baseUrl}/api/0.1`,
  },
};

AppConfig.destinationAirports = [
    {
        icao: 'EHAM',
        name: ' Amsterdam Airport Schiphol',
        coordinates: [4.7638897896, 52.3086013794],
        models: {
            runway_in_use: true,
            runway_config: true,
        },
    },
    {
        icao: 'LFPB',
        name: 'Paris-Le Bourget Airport',
        coordinates: [2.4413900375, 48.9693984985],
        models: {
            runway_in_use: true,
            runway_config: false,
        },
    },
    {
        icao: 'LFPG',
        name: 'Charles de Gaulle International Airport',
        coordinates: [2.5499999523, 49.0127983093],
        models: {
            runway_in_use: true,
            runway_config: false,
        },
    },
    {
        icao: 'LFPO',
        name: 'Paris-Orly Airport',
        coordinates: [2.3594400883, 48.7252998352],
        models: {
            runway_in_use: true,
            runway_config: true,
        },
    },
    {
        icao: 'LOWW',
        name: 'Vienna International Airport',
        coordinates: [16.5697002411, 48.1102981567],
        models: {
            runway_in_use: true,
            runway_config: true,
        },
    },
    {
        icao: 'ESPA',
        name: 'Lulea Airport',
        coordinates: [22.1219997406, 65.543800354],
        models: {
            runway_in_use: true,
            runway_config: true,
        },
    },
    {
        icao: 'LIRF',
        name: 'Leonardo Da Vinci (Fiumicino) International Airport',
        coordinates: [12.2508001328, 41.8045005798],
        models: {
            runway_in_use: true,
            runway_config: false,
        },
    },
    {
        icao: 'LEMD',
        name: 'Madrid Barajas International Airport',
        coordinates: [-3.56676, 40.4936],
        models: {
            runway_in_use: true,
            runway_config: true,
        },
    },
    {
        icao: 'LEBL',
        name: 'Barcelona International Airport',
        coordinates: [2.0784599781, 41.2971000671],
        models: {
            runway_in_use: true,
            runway_config: false,
        },
    },
    {
        icao: 'LTFM',
        name: 'Instabul Airport',
        coordinates: [28.752, 41.275333],
        models: {
            runway_in_use: true,
            runway_config: false,
        },
    },
    {
        icao: 'EDDF',
        name: 'Frankfurt am Main International Airport',
        coordinates: [8.543129921, 50.0264015198],
        models: {
            runway_in_use: true,
            runway_config: false,
        },
    },
    {
        icao: 'EDDB',
        name: 'Berlin Brandenburg Airport',
        coordinates: [13.503333, 52.366667],
        models: {
            runway_in_use: true,
            runway_config: false,
        },
    },
]
AppConfig.getAirportData = (airportIcao) => {
    const [airportData] = AppConfig.destinationAirports.filter((airport) => airport.icao === airportIcao)

    return airportData;
}

export { AppConfig as default };
