/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { tokens } from "../theme";

// Plotly
import Plot from "react-plotly.js";
// Components
import StatBox from "../components/StatBox";

// @mui
import { Box, useTheme, Typography } from "@mui/material";
// Icons @mui
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import OpacityIcon from "@mui/icons-material/Opacity";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import TimelineIcon from "@mui/icons-material/Timeline";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import SimpleListMenu from "../components/Menu";
import FormDialog from "../components/FormDialog";

import { transformData } from "../utils/dataTransformations";
import { useDeviceData } from "../hooks/useDeviceData";
import { postSetpoint } from "../utils/api";

const Dashboard = () => {
  const urlBase = "192.168.1.12:8123";

  const colors = tokens("dark");
  const [deviceMac, setDeviceMac] = useState("");
  const { historicData, boxData, error } = useDeviceData(deviceMac, urlBase);

  const handleSetpointUpdate = (newSetpoint) => {
    boxData[2].value1= `${newSetpoint}% RH`;
  };

  const handleDeviceSelect = (newDeviceMac) => {
    setDeviceMac(newDeviceMac);
  };
  const transformedData = transformData(historicData);

  return (
    <Box
      //Esto es para cambiar el color del fondo
      paddingLeft="20px"
      paddingRight="20px"
      backgroundColor="#004751"
    >
      {titleBox()}
      <Box
        display="flex"
        flexWrap="nowrap"
        flexDirection="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
      >
        <SimpleListMenu
          urlBase={urlBase}
          onDeviceSelect={handleDeviceSelect}
        ></SimpleListMenu>
        <Box
          mt="25px"
          p="0 30px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box padding="20px" borderRadius="20px" backgroundColor="#fff">
            <FormDialog
              deviceMac={deviceMac}
              urlBase={urlBase}
              onSetpointUpdate={handleSetpointUpdate}
            ></FormDialog>
          </Box>
        </Box>
      </Box>
      {/* GRID & CHARTS */}
      {/* //! aqui cambiar por historic data from WS */}
      {dataRow(colors, boxData)}

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
              Datos en tiempo real
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
                  size: 10,
                  color: transformedData.color,
                },
              },
              {
                x: transformedData.x,
                y: transformedData.z,
                name: "Temperatura",
                yaxis: "y2",
                type: "scatter",
                mode: "lines+markers",
                marker: {
                  size: 10,
                  color: "blue",
                },
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


function titleBox() {
  return (
    <Box display="flex" justifyContent="space-around" alignItems="center">
      <Typography
        className="title"
        variant="h4"
        fontWeight="bold"
        color="#F5F5DC"
        text-shadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
      >
        IOT WEATHER CONTROL HIDROPONICO
      </Typography>
    </Box>
  );
}

function dataRow(colors, data) {
  const propsBoxData = {
    gridColumn: "span 1",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    borderRadius: "15px",
    justifyContent: "center",
  };

  // Verifica si hay datos en ddata antes de usarlos
  if (data.length === 0) {
    return null; // O muestra un mensaje de carga
  }
  const fontSize = "12px";
  const propsStatBoxData0 = {
    title: "Temperatura",
    subtitle1: data[0].subtitle1, // Number
    subtitle2: data[0].subtitle2, // Number
    value1: data[0].value1,
    value2: data[0].value2,
    icon: (
      <WbSunnyIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
    ),
    fontSize: fontSize,
  };

  const propsStatBoxData1 = {
    title: "Humedad",
    subtitle1: data[1].subtitle1,
    subtitle2: data[1].subtitle2,
    value1: data[1].value1,
    value2: data[1].value2,
    fontSize: fontSize,

    icon: (
      <OpacityIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
    ),
  };
  const propsStatBoxData2 = {
    title: "Válvula",
    subtitle1: data[2].subtitle1,
    subtitle2: data[2].subtitle2,
    fontSize: fontSize,
    value1: data[2].value1,
    value2: data[2].value2,
    icon: (
      <LocalFloristIcon
        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
      />
    ),
  };

  return (
    <Box
      display="grid"
      marginTop="20px"
      marginBottom="20px"
      gridTemplateColumns="repeat(3, 1fr)"
      gridAutoRows="140px"
      borderRadius="5px"
      gap="10px"
    >
      <MiddleDataBox {...propsBoxData} {...propsStatBoxData0} />
      <MiddleDataBox {...propsBoxData} {...propsStatBoxData1} />
      <MiddleDataBox {...propsBoxData} {...propsStatBoxData2} />
    </Box>
  );
}

const MiddleDataBox = ({
  borderRadius,
  gridColumn,
  backgroundColor,
  display,
  alignItems,
  justifyContent,
  title,
  icon,
  subtitle1,
  value1,
  subtitle2,
  value2,
}) => {
  return (
    <Box
      borderRadius={borderRadius}
      gridColumn={gridColumn}
      backgroundColor={backgroundColor}
      display={display}
      alignItems={alignItems}
      justifyContent={justifyContent}
      sx={{ paddingX: "20px" }}
    >
      <StatBox
        title={title}
        subtitle1={subtitle1}
        value1={value1}
        subtitle2={subtitle2}
        value2={value2}
        icon={icon}
      />
    </Box>
  );
};
