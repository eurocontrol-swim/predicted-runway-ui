
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
    },
    {
        icao: 'LEMD',
        name: 'Madrid Barajas International Airport',
        coordinates: [-3.56676, 40.4936],
    },
    {
        icao: 'LFPO',
        name: 'Paris-Orly Airport',
        coordinates: [2.3594400883, 48.7252998352],
    },
    {
        icao: 'LOWW',
        name: 'Vienna International Airport',
        coordinates: [16.5697002411, 48.1102981567],
    },
]
AppConfig.getAirportData = (airportIcao) => {
    const [airportData] = AppConfig.destinationAirports.filter((airport) => airport.icao === airportIcao)

    return airportData;
}

export { AppConfig as default };
