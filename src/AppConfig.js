
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
    },
    {
        icao: 'LEMD',
        name: 'Madrid Barajas International Airport',
    },
    {
        icao: 'LFPO',
        name: 'Paris-Orly Airport',
    },
    {
        icao: 'LOWW',
        name: 'Vienna International Airport',
    },
]
AppConfig.getAirportData = (airportIcao) => {
    const [airportData] = AppConfig.destinationAirports.filter((airport) => airport.icao === airportIcao)

    return airportData;
}

export { AppConfig as default };
