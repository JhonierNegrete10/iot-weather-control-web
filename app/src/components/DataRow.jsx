/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import OpacityIcon from "@mui/icons-material/Opacity";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import StatBox from "./StatBox";

const DataRow = ({ colors, data }) => {
  const propsBoxData = {
    gridColumn: "span 1",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    borderRadius: "15px",
    justifyContent: "center",
  };

  if (data.length === 0) {
    return null;
  }

  const fontSize = "12px";
  const propsStatBoxData0 = {
    title: "Temperatura",
    subtitle1: data[0].subtitle1,
    subtitle2: data[0].subtitle2,
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
};

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

export default DataRow;
