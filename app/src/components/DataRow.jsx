import { Box, Grid } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import OpacityIcon from "@mui/icons-material/Opacity";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import StatBox from "./StatBox";

const DataRow = ({ colors, data }) => {
  if (data.length === 0) {
    return null;
  }
  const titles = ["Temperatura", "Humedad", "Válvula"]
  const boxStyle = {
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    borderRadius: "15px",
    justifyContent: "center",
    paddingX: "20px",
    paddingY: "20px",
  };
  
  const iconsSx = { color: colors.greenAccent[600], fontSize: "26px" }
  const icons = [
    <WbSunnyIcon sx={iconsSx} />,
    <OpacityIcon sx={iconsSx} />,
    <LocalFloristIcon sx={iconsSx} />,
  ];

  return (
    <Box
      marginTop={{ xs: '10px', sm: '20px' }}
      marginBottom={{ xs: '10px', sm: '20px' }}
      borderRadius="5px"
    >
      <Grid container spacing={1}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Box {...boxStyle}>
              <StatBox
                title={titles[index]}
                subtitle1={item.subtitle1}
                value1={item.value1}
                subtitle2={item.subtitle2}
                value2={item.value2}
                icon={icons[index]}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DataRow;
