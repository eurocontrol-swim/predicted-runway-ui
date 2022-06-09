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
}) => axios.get(`/arrivals-runway-prediction-input?origin_icao=${originIcao}&destination_icao=${destinationIcao}&timestamp=${timestamp}`, config);

const createRunwayConfigPredictionInput = ({
  destinationIcao,
  timestamp
}) => axios.get(`/arrivals-runway-config-prediction-input?&destination_icao=${destinationIcao}&timestamp=${timestamp}`, config);

const getArrivalsRunwayStats = (destinationIcao) => axios.get(`/arrivals/${destinationIcao}/runway-prediction-stats`, config);

const getArrivalsRunwayConfigStats = (destinationIcao) => axios.get(`/arrivals/${destinationIcao}/runway-config-prediction-stats`, config);

// const createDataFeature = (data) => axios.post('/datafeatures/', data, config);
// const getDataFeatures = () => axios.get('/datafeatures/', config);
// const putDataFeature = (id, data) => axios.put(`/datafeatures/${id}`, data, config);
// const getDataFeatureViews = (id) => axios.get(`/datafeatures/${id}/views`, config);
// const getDataFeatureOutboundServices = (id) => axios.get(`/datafeatures/${id}/data_services_outbound`, config);
// const getDataViewFeatures = () => axios.get('/datafeatures/?view=true', config);
// const getDataFeature = (id) => axios.get(`/datafeatures/${id}`, config);
// const deleteDataFeature = (id) => axios.delete(`/datafeatures/${id}`, config);
//
// const getDatasets = () => axios.get('/datasets/', config);
// const getDataset = (id) => axios.get(`/datasets/${id}`, config);
// const deleteDataset = (id) => axios.delete(`/datasets/${id}`, config);
// const doanloadJSONDatafile = (id, index) => axios.get(`/datasets/${id}/datafiles/${index}/download_json`, config);
// const createDataset = (data) => axios.post('/datasets/', data, config);
// const getDatasetFeatures = (id) => axios.get(`/datasets/${id}/features`, config);
// const uploadDataFile = (id, data) => axios.post(`/datasets/${id}/upload_datafile`, data, config);
// const getDataViews = () => axios.get('/dataviews/', config);
// const createDataView = (data) => axios.post('/dataviews/', data, config);
// const updateDataView = (id, data) => axios.put(`/dataviews/${id}`, data, config);
// const getDataView = (id) => axios.get(`/dataviews/${id}`, config);
// const deleteDataView = (id) => axios.delete(`/dataviews/${id}`, config);
// const getDataViewResult = ({
//   id,
//   data,
//   offset = 0,
//   limit = 10,
// }) => axios.post(`/dataviews/${id}/result?offset=${offset}&limit=${limit}`, data, config);
// const getQueryJsonNodes = (data) => axios.post('/dataviews/query_json_nodes', data, config);
// const dataViewsQueryTest = ({ data, offset = 0, limit = 10 }) => axios.post(`/dataviews/test_query?offset=${offset}&limit=${limit}`, data, config);
//
// const getAppConfig = () => axios.get('/config/', config);
//
// const importDataSource = (data) => axios.post('/data_in/import/', data, config);
// const exportDataSource = (id) => {
//   const extraConfig = config;
//
//   extraConfig.responseType = 'blob';
//
//   return axios.get(`/data_in/${id}/export`, extraConfig);
// };
//
// const getDataServicesInbound = () => axios.get('/data_services_inbound/', config);
// const getDataServiceInbound = (id) => axios.get(`/data_services_inbound/${id}`, config);
// const putDataServiceInbound = (id, data) => axios.put(`/data_services_inbound/${id}`, data, config);
// const deleteDataServiceInbound = (id) => axios.delete(`/data_services_inbound/${id}`, config);
// const createDataServiceInbound = (data) => axios.post('/data_services_inbound/', data, config);
// const getDataServiceInboundFeatures = (id) => axios.get(`/data_services_inbound/${id}/features`, config);
// const startDataServiceInbound = (id, data) => axios.post(`/data_services_inbound/${id}/start`, data, config);
// const pauseDataServiceInbound = (id) => axios.post(`/data_services_inbound/${id}/pause`, {}, config);
//
// const getDataServicesOutbound = () => axios.get('/data_services_outbound/', config);
// const getDataServiceOutbound = (id) => axios.get(`/data_services_outbound/${id}`, config);
// const putDataServiceOutbound = (id, data) => axios.put(`/data_services_outbound/${id}`, data, config);
// const deleteDataServiceOutbound = (id) => axios.delete(`/data_services_outbound/${id}`, config);
// const createDataServiceOutbound = (data) => axios.post('/data_services_outbound/', data, config);
// const startDataServiceOutbound = (id, data) => axios.post(`/data_services_outbound/${id}/start`, data, config);
// const pauseDataServiceOutbound = (id) => axios.post(`/data_services_outbound/${id}/pause`, {}, config);
//
// const getAuxiliaryServices = () => axios.get('/auxiliary_services/', config);
//
// const getServiceBindingGroups = () => axios.get('/service_binding_groups/', config);
// const getServiceBindingGroup = (id) => axios.get(`/service_binding_groups/${id}`, config);
// const createServiceBindingGroup = (data) => axios.post('/service_binding_groups/', data, config);
// const getWsdlOperations = (id, wsdlName) => axios.get(`/service_binding_groups/${id}/wsdl_operations?wsdl_name=${wsdlName}`, config);
// const patchServiceBindingGroup = (id, data) => axios.patch(`/service_binding_groups/${id}`, data, config);
//
// const triggerServiceBinding = (data, triggerAsJson) => axios.post(`/service_bindings/trigger?as_json=${triggerAsJson.toString()}`, data, config);
//
// const exportDataset = (id) => {
//   const extraConfig = config;
//
//   extraConfig.responseType = 'blob';
//
//   return axios.get(`/data_in/${id}/export?type=dataset`, extraConfig);
// };
//
// const exportDataServiceInbound = (id) => {
//   const extraConfig = config;
//
//   extraConfig.responseType = 'blob';
//
//   return axios.get(`/data_in/${id}/export?type=data_service_inbound`, extraConfig);
// };
//
// const importDataIn = (data) => axios.post('/data_in/import/', data, config);

export {
  getAirportsData,
  getLastTafEndTime,
  createRunwayPredictionInput,
  createRunwayConfigPredictionInput,
  getArrivalsRunwayStats,
  getArrivalsRunwayConfigStats,
};
