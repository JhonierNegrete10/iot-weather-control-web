/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";

const StatBox = ({ title, subtitle1, value1, subtitle2, value2, icon }) => {
  return (
    <Box width="100%" m="0 10px" backgroundColor="#fff">
      <Box display="flex" alignItems="center">
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#000" }}>
          {title}
        </Typography>
        <Box ml="auto">{icon}</Box>
      </Box>
      <Box display="flex" flexDirection="column" mt="8px">
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: "#000" }}>
            {subtitle1}
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {value1}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt="4px">
          <Typography variant="body2" sx={{ color: "#000" }}>
            {subtitle2}
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {value2}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;

{
  /* <Typography
                    variant="body2"
                    fontStyle="italic"
                    sx={{ color: colors.greenAccent[100] }}
                >
                    {increase}
                </Typography> */
}
