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

const Dashboard = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const colors = tokens("dark");

  const [dataFromEndpoint, setDataFromEndpoint] = useState([]);

  let singletonWebSocket = null;
  // Todo: call backend to this
  const umbral = 5; // Establece el umbral deseado

  // var [ws, setWS] = useState()

  var [data, setData] = useState({
    x: [1, 2, 3, 4, 5, 6, 7],
    y: [6, 4, 2, 1, 15, 5, 4],
  });
  const exampleData = [
    {
      subtitle1: "Valor sensado",
      value1: "25°C",
      subtitle2: "Valor API",
      value2: "23°C",
    },
    {
      subtitle1: "Sensor 1",
      value1: "70 % RH",
      subtitle2: "Sensor 2",
      value2: "80 % RH",
    },
    {
      subtitle1: "Set Point",
      value1: "60 % RH",
      subtitle2: "Acción",
      value2: "ON",
    },
  ];

  //
  useEffect(() => {
    // todo: call the endpoint backend to set data
  }, []);

  // useEffect(() => {
  //     if (!singletonWebSocket) {
  //       singletonWebSocket = new WebSocket("ws://localhost:8000/camera/ws");
  //       singletonWebSocket.onclose = () => {
  //         console.log('WebSocket disconnected');
  //         singletonWebSocket.send("DISCONNECT")
  //         singletonWebSocket = null;
  //       };
  //       singletonWebSocket.onopen = () => singletonWebSocket.send("connected to backend ws ");
  //     }

  //     singletonWebSocket.onmessage = (dataEvent) => {
  //       console.log("accepting the message ", dataEvent.data);
  //       var dataRaw = JSON.parse(dataEvent.data)
  //       console.log("accepting the message ", dataRaw);
  //       const last_data = parseFloat(dataRaw["volume"])
  //       singletonWebSocket.send("recived")
  //       setData((prev) => {
  //         return {
  //           x: [...prev.x, prev.x.length + 1],
  //           y: [...prev.y, last_data],
  //         };
  //       });
  //     }
  //   }, []);

  return (
    <Box
      //Esto es para cambiar el color del fondo
      paddingLeft="20px"
      paddingRight="20px"
      backgroundColor="#004751"
    >
      {titleBox()}

      {/* GRID & CHARTS */}
      {dataRow(colors, exampleData)}

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

          <Plot
            data={[
              {
                ...data,
                type: "scatter",
                mode: "markers",
                marker: {
                  size: 10,
                  color: data.y.map((value) =>
                    value < umbral ? "red" : "rgb(0, 255, 0)"
                  ),
                },
              },
            ]}
            layout={{
              plot_bgcolor: "#fff",
              paper_bgcolor: "#fff",
              xaxis: {
                title: "X", // Etiqueta del eje X
              },
              yaxis: {
                title: "Humedad", // Etiqueta del eje Y
                rangemode: "tozero",
              },
              font: {
                color: "#000",
              },
            }}
          ></Plot>
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

function dataRow(colors, dataFromEndpoint) {
  const propsBoxData = {
    gridColumn: "span 1",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    borderRadius: "15px",
    justifyContent: "center",
  };

  // Verifica si hay datos en dataFromEndpoint antes de usarlos
  if (dataFromEndpoint.length === 0) {
    return null; // O muestra un mensaje de carga
  }
  const fontSize = "12px";
  const propsStatBoxData0 = {
    title: "Temperatura",
    subtitle1: dataFromEndpoint[0].subtitle1, // Number
    subtitle2: dataFromEndpoint[0].subtitle2, // Number
    value1: dataFromEndpoint[0].value1,
    value2: dataFromEndpoint[0].value2,
    icon: (
      <WbSunnyIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
    ),
    fontSize: fontSize,
  };

  const propsStatBoxData1 = {
    title: "Humedad",
    subtitle1: dataFromEndpoint[1].subtitle1,
    subtitle2: dataFromEndpoint[1].subtitle2,
    value1: dataFromEndpoint[1].value1,
    value2: dataFromEndpoint[1].value2,
    fontSize: fontSize,

    icon: (
      <OpacityIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
    ),
  };
  const propsStatBoxData2 = {
    title: "Válvula",
    subtitle1: dataFromEndpoint[2].subtitle1,
    subtitle2: dataFromEndpoint[2].subtitle2,
    fontSize: fontSize,
    value1: dataFromEndpoint[2].value1,
    value2: dataFromEndpoint[2].value2,
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
