/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  fetchHistoricData,
  fetchAPIData,
  fetchSetPointData,
} from "../utils/api";
import useWebSocket from "./useWebSocket";
import { APP_STATUS } from "../pages/dashboard";

// refactorizar para darle un use estater a cada elemento del box data, modularizar cada subelemento

export const useDeviceData = (deviceMac, urlBase, appStatus, setAppStatus) => {
  const [historicData, setHistoricData] = useState([]);
  const [boxData, setBoxData] = useState([]);
  const [error, setError] = useState(null);

  const updateBoxData = (data) => {
    if (data.length > 0) {
      let lastData = data[data.length - 1];
      console.log("lastData ", lastData);
      setBoxData([
        {
          subtitle1: "Valor sensado",
          value1: `${lastData.temperature} °C`,
          subtitle2: "Valor API",
          value2: `${lastData.apiTemperature} °C`,
        },
        {
          subtitle1: "Sensor 1",
          value1: `${lastData.humidity_1}% RH`,
          subtitle2: "Sensor 2",
          value2: `${lastData.humidity_2}% RH`,
        },
        {
          subtitle1: "Set Point",
          value1: `${lastData.setpoint}% RH`,
          subtitle2: "Acción",
          value2: lastData.valve_status,
        },
      ]);
    }
  };
  //
  const fetchDataFromAPI = async () => {
    let dataApi = {};
    let dataSetpoint = {};
    try {
      dataApi = await fetchAPIData(urlBase);
      dataSetpoint = await fetchSetPointData(deviceMac, urlBase);

      return {
        apiTemperature: dataApi.temperature,
        setpoint: dataSetpoint.setpoint,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return {
        apiTemperature: dataApi?.temperature,
        setpoint: dataSetpoint?.setpoint,
      };
    }
  };

  //
  const handleWebSocketMessage = async (newData) => {
    console.log("accepting the message ", newData);

    const { apiTemperature, setpoint } = await fetchDataFromAPI();

    newData.apiTemperature = apiTemperature;
    newData.setpoint = setpoint;

    setHistoricData((prevData) => {
      if (prevData.length > 10) {
        prevData = prevData.slice(prevData.length - 10);
      }
      return [...prevData, newData];
    });

    updateBoxData([newData]);
  };



  useWebSocket(`ws://${urlBase}/data/ws/${deviceMac}`, handleWebSocketMessage, appStatus, setAppStatus);



  useEffect(() => {
    const fetchData = async () => {
      if (appStatus == "devices_loaded") {

        try {
          let data = await fetchHistoricData(deviceMac, urlBase);

          if (data.length == 0) {
            return null
          }
          if (data.length > 10) {
            data = data.slice(data.length - 10);
          }
          setHistoricData(data);

          setAppStatus(APP_STATUS.HISTORICAL_DATA_LOADED);

          await fetchDataFromAPI().then(({ apiTemperature, setpoint }) => {
            if (data.length > 0) {
              data[data.length - 1].apiTemperature = apiTemperature;
              data[data.length - 1].setpoint = setpoint;
              console.log("data In ", data[data.length - 1]);
            }
          });
          updateBoxData(data);

          console.log("app status post fecth hitoric data ", appStatus)
        } catch (error) {
          setError(error.message);
        }
      }
    };

    fetchData();
    console.log("app status post fecth post boxdata  ", appStatus)
  }, [deviceMac, urlBase]);

  return { historicData, boxData, error };
};

export default useDeviceData;
