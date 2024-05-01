/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { tokens } from "../theme";
// Plotly
import Plot from "react-plotly.js";
// @mui
import { Box, Typography, Grid } from "@mui/material";
// Custom Components
import SimpleListMenu from "../components/Menu";
import FormDialog from "../components/FormDialog";
import UrlBaseFormDialog from "../components/UrlBaseFormDialog";
import TitleBox from "../components/TittleBox";
import DataRow from "../components/DataRow";

import { transformData } from "../utils/dataTransformations";
import { useDeviceData } from "../hooks/useDeviceData";

export const APP_STATUS = {
  INIT: "init",
  ERROR_URL: "error_url",
  PRE_DEVICES_LOADED: "pre_devices_loaded",
  DEVICES_LOADED: "devices_loaded",
  HISTORICAL_DATA_LOADED: "historical_data_loaded",
}

const Dashboard = () => {
  const [appStatus, setAppStatus] = useState(APP_STATUS.INIT);
  const [openDialogUrlBase, setOpenDialogUrlBase] = useState(false);
  const [urlBase, setUrlBase] = useState("10.42.0.1:8123");

  const colors = tokens("dark");
  const [deviceMac, setDeviceMac] = useState("");
  const { historicData, boxData } = useDeviceData(deviceMac, urlBase, appStatus, setAppStatus);

  const handleSetpointUpdate = (newSetpoint) => {
    boxData[2].value1 = `${newSetpoint}% RH`;
  };
  //  <-- URL base Change -->
  const handleDialogOpen = () => {
    setOpenDialogUrlBase(true);
  };
  const handleDialogClose = (newUrlbase) => {
    setOpenDialogUrlBase(false);
    if (newUrlbase) {
      setUrlBase(newUrlbase);
      setAppStatus(APP_STATUS.INIT)
    }
  };
  //  <--END URL base Change -->

  const handleDeviceSelect = (newDeviceMac) => {
    //  si es vacio, agrega mensaje diciendo, añade un device al backend
    setDeviceMac(newDeviceMac);
    setAppStatus(APP_STATUS.DEVICES_LOADED)
    console.log("data handleDeviceSelect:", newDeviceMac)
    console.log("app status handleDeviceSelect :", appStatus)
  };
  const transformedData = transformData(historicData);

  return (
    <Box
      //Esto es para cambiar el color del fondo
      paddingLeft={{ xs: '10px', sm: '20px' }}
      paddingRight={{ xs: '10px', sm: '20px' }}
      backgroundColor="#004751"
    >
      {/* {titleBox()} */}
      <TitleBox></TitleBox>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item xs={12} sm={8}>
          <SimpleListMenu
            urlBase={urlBase}
            onDeviceSelect={handleDeviceSelect}
            appStatus={appStatus}
            setAppStatus={setAppStatus}
            onError={handleDialogOpen}
          ></SimpleListMenu>
          <UrlBaseFormDialog
            open={openDialogUrlBase}
            onClose={handleDialogClose}
          />
        </Grid>
        <Grid item xs={12} sm={4} style={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            mt={{ xs: '10px', sm: '25px' }}
            p={{ xs: '0 15px', sm: '0 30px' }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box padding={{ xs: '10px', sm: '20px' }}  borderRadius="20px" backgroundColor="#fff">
              <FormDialog
                deviceMac={deviceMac}
                urlBase={urlBase}
                onSetpointUpdate={handleSetpointUpdate}
              ></FormDialog>
            </Box>
          </Box>

        </Grid>
      </Grid>
      {/* GRID & CHARTS */}
      {/* //! aqui cambiar por historic data from WS */}
      <DataRow colors={colors} data={boxData}></DataRow>
      {/* Box row 2 */}
      <Box
        borderRadius="20px"
        gridColumn="span 8"
        gridRow="span 2"
        backgroundColor="#fff"
      >
        <Box
          mt="25px"
          p="0 30px"
          display="flex "
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h5" fontWeight="bold" color="#000">
              Últimos Datos
            </Typography>
          </Box>
        </Box>
        <Box marginTop="20px" display="flex" justifyContent="center">
          {/* PLOT  */}

          {/* //! aqui cambiar por historic data from */}

          <Plot
            data={[
              {
                x: transformedData.x,
                y: transformedData.y,
                name: "Humedad Promedio",
                type: "scatter",
                mode: "lines+markers",
                marker: {
                  size: 6,
                  color: transformedData.color,
                },
                line: { shape: "spline" }
              },
              {
                x: transformedData.x,
                y: transformedData.z,
                name: "Temperatura",
                yaxis: "y2",
                type: "scatter",
                mode: "lines+markers",
                marker: {
                  size: 6,
                  color: "RGB(0, 190, 255)",
                },
                line: { shape: "spline" }
              },
            ]}
            layout={{
              plot_bgcolor: "#fff",
              paper_bgcolor: "#fff",
              xaxis: {
                title: "Tiempo", // Etiqueta del eje X
              },
              yaxis: {
                title: "Humedad Promedio", // Etiqueta del eje Y
                rangemode: "tozero",
              },
              yaxis2: {
                title: "Temperatura", // Etiqueta del eje y2
                overlaying: "y",
                rangemode: "tozero",
                side: "right", // Ubicar el eje y2 a la izquierda
              },
              font: {
                color: "#000",
              },
              name: "Humedad promedio",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
