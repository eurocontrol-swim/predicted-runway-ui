
const AppConfig = {};

AppConfig.baseUrl = process.env.VUE_APP_BASE_URL || '';

AppConfig.serverApi = {
  dev: {
    host: 'http://localhost:5000',
    baseUrl: `${AppConfig.baseUrl}/api/0.1`,
  },
};

/*
   [{
       icao: 'EHAM',
       name: ' Amsterdam Airport Schiphol',
       lat: 4.7638897896,
       lon: 52.3086013794,
       models: {
           runway_in_use: true,
           runway_config: true,
       },
   }]
*/
AppConfig.destinationAirports = [];

AppConfig.getAirportData = (airportIcao) => {
    const [airportData] = AppConfig.destinationAirports.filter((airport) => airport.icao === airportIcao)

    return airportData;
}

export { AppConfig as default };
