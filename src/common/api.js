/*
Copyright 2020 EUROCONTROL
==========================================

Redistribution and use in source and binary forms, with or without modification, are permitted
provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions
   and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of
   conditions and the following disclaimer in the documentation and/or other materials provided
   with the distribution.
3. Neither the name of the copyright holder nor the names of its contributors may be used to
   endorse or promote products derived from this software without specific prior written
   permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

==========================================

Editorial note: this license is an instance of the BSD license template as provided by the Open
Source Initiative: http://opensource.org/licenses/BSD-3-Clause

Details on EUROCONTROL: http://www.eurocontrol.int
*/

import axios from 'axios';
import AppConfig from '../AppConfig';

const isDev = Boolean(window.webpackHotUpdatepredicted_runway_ui);

const config = {
  baseURL: isDev
    ? `${AppConfig.serverApi.dev.host}${AppConfig.serverApi.dev.baseUrl}`
    : AppConfig.serverApi.dev.baseUrl,
};

const getAirportsData = (search) => axios.get(`/airports-data/${search}`, config);

const getLastTafEndTime = (airportIcao) => axios.get(`/latest-taf-end-time/${airportIcao}`, config);

const createRunwayPredictionInput = ({
  originIcao,
  destinationIcao,
  timestamp
}) => axios.get(`/arrivals/${destinationIcao}/runway-prediction-input?origin_icao=${originIcao}&timestamp=${timestamp}`, config);

const createRunwayConfigPredictionInput = ({
  destinationIcao,
  timestamp
}) => axios.get(`/arrivals/${destinationIcao}/runway-config-prediction-input?timestamp=${timestamp}`, config);

const getArrivalsRunwayStats = (destinationIcao) => axios.get(`/arrivals/${destinationIcao}/runway-prediction-stats`, config);

const getArrivalsRunwayConfigStats = (destinationIcao) => axios.get(`/arrivals/${destinationIcao}/runway-config-prediction-stats`, config);

const getRunwayPrediction = ({
  destinationIcao,
  originIcao,
  timestamp,
  windDirection,
  windSpeed,
  windInputSource
}) => axios.get(`/arrivals/${destinationIcao}/runway-prediction?origin_icao=${originIcao}
&timestamp=${timestamp}&wind_direction=${windDirection}&wind_speed=${windSpeed}
&wind_input_source=${windInputSource}`, config);

const getRunwayConfigPrediction = ({
  destinationIcao,
  timestamp,
  windDirection,
  windSpeed,
  windInputSource
}) => axios.get(`/arrivals/${destinationIcao}/runway-config-prediction?timestamp=${timestamp}
&wind_direction=${windDirection}&wind_speed=${windSpeed}
&wind_input_source=${windInputSource}`, config);

const getOpenApiUrl = () => {
  return `${config.baseURL}/ui/`;
}

export {
  getAirportsData,
  getLastTafEndTime,
  createRunwayPredictionInput,
  createRunwayConfigPredictionInput,
  getArrivalsRunwayStats,
  getArrivalsRunwayConfigStats,
  getRunwayPrediction,
  getRunwayConfigPrediction,
  getOpenApiUrl,
};
