import { Box, Typography } from "@mui/material";

const TitleBox = () => {
  return (
    <Box display="flex" justifyContent="space-around" alignItems="center">
      <Typography
        className="title"
        variant="h4"
        fontWeight="bold"
        color="#F5F5DC"
        textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
      >
        IOT WEATHER CONTROL HIDROPONICO
      </Typography>
    </Box>
  );
};

export default TitleBox;