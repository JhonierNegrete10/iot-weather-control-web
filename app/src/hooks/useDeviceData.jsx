import { useState, useEffect } from "react";
import {
  fetchHistoricData,
  fetchAPIData,
  fetchSetPointData,
} from "../utils/api";
import useWebSocket from "./useWebSocket";
import { APP_STATUS } from "../pages/DasboardConstants";

const nData = 20;

export const useDeviceData = (deviceMac, urlBase, appStatus, setAppStatus) => {
  const [historicData, setHistoricData] = useState([]);
  const [boxData, setBoxData] = useState([]);
  const [error, setError] = useState(null);
  const updateBoxData = (data) => {
    if (data.length > 0) {
      let lastData = data[0];
      // console.log("lastData ", lastData);
      const formattedTemperature = parseFloat(lastData.temperature).toFixed(2);
      setBoxData([
        {
          subtitle1: "Valor sensado",
          value1: `${formattedTemperature} °C`,
          subtitle2: "Valor API",
          value2: lastData.apiTemperature ?`${lastData.apiTemperature} °C`: "",
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
    } catch (error) {
      console.error("Error fetchAPIData data:", error);
    }
    try {
      dataSetpoint = await fetchSetPointData(deviceMac, urlBase);
    } catch (error) {
      console.error("Error fetchSetPointData data:", error);
    }
    return {
      apiTemperature: dataApi?.temperature,
      setpoint: dataSetpoint?.setpoint,
    };
  };

  //
  const handleWebSocketMessage = async (newData) => {
    console.log("accepting  the message ", newData);

    const { apiTemperature, setpoint } = await fetchDataFromAPI();

    newData.apiTemperature = apiTemperature;
    newData.setpoint = setpoint;

    setHistoricData((prevData) => {
      if (prevData.length > nData) {
        prevData = prevData.slice(prevData.length - nData);
      }
      return [newData, ...prevData];
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
          if (data.length > nData) {
            data = data.slice(data.length - nData);
          }
          setHistoricData(data);

          setAppStatus(APP_STATUS.HISTORICAL_DATA_LOADED);

          // console.log("data In ", data.map((item, index) => (`id: ${item.id} - index: ${index}` )));
          await fetchDataFromAPI().then(({ apiTemperature, setpoint }) => {
            if (data.length > 0) {
              data[0].apiTemperature = apiTemperature;
              data[0].setpoint = setpoint;
              // console.log("data In ", data[0]);
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
