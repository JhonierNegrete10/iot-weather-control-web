import { useState } from "react";
import { tokens } from "../theme";
import { Box, Typography, Grid } from "@mui/material";
import SimpleListMenu from "../components/Menu";
import FormDialog from "../components/FormDialog";
import UrlBaseFormDialog from "../components/UrlBaseFormDialog";
import TitleBox from "../components/TittleBox";
import DataRow from "../components/DataRow";
import HistoricalDataTable from '../components/HistoricalDataTable';
import CustomPlot from '../components/CustomPlot';
import { transformData } from "../utils/dataTransformations";
import { useDeviceData } from "../hooks/useDeviceData";
import { APP_STATUS } from "../pages/DasboardConstants";

export const Dashboard = () => {
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
      setAppStatus(APP_STATUS.INIT);
    }
  };
  //  <--END URL base Change -->
  const handleDeviceSelect = (newDeviceMac) => {
    //  si es vacio, agrega mensaje diciendo, añade un device al backend
    setDeviceMac(newDeviceMac);
    setAppStatus(APP_STATUS.DEVICES_LOADED);
    console.log("data handleDeviceSelect:", newDeviceMac);
    console.log("app status handleDeviceSelect :", appStatus);
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
            onClose={handleDialogClose} />
        </Grid>
        <Grid item xs={12} sm={4} style={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            mt={{ xs: '10px', sm: '25px' }}
            p={{ xs: '0 15px', sm: '0 30px' }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box padding={{ xs: '10px', sm: '20px' }} borderRadius="20px" backgroundColor="#fff">
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
          <CustomPlot transformedData={transformedData} />
        </Box>
        <HistoricalDataTable data={historicData} />
      </Box>
    </Box>
  );
};

export default Dashboard;