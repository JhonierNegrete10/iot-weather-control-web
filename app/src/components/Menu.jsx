/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { fetchDevices } from "../utils/api";
import { APP_STATUS } from"../pages/DasboardConstants";

export default function SimpleListMenu({ urlBase, onDeviceSelect, appStatus, setAppStatus, onError }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [optionsDescriptions, setOptionsDescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let attempt = 0
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchSetDevices = async () => {
      setLoading(true);
      setError(null);
      attempt = attempt + 1
      if (appStatus == "init") {
        try {
          const devices = await fetchDevices(urlBase);
          setOptions(devices.map((device) => device.device_mac));
          setOptionsDescriptions(devices.map((device) => device.description));
          setAppStatus(APP_STATUS.PRE_DEVICES_LOADED)

        } catch (error) {
          setError(error.message);
          onError();
        } finally {
          setLoading(false);
          setError(null);
        }
      }
    };

    fetchSetDevices();
  }, [urlBase]);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    onDeviceSelect(options[index]); // Callback to update deviceMac in parent component
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <List
          // borderRadius="20px"
          component="nav"
          aria-label="Device settings"
          sx={{ borderRadius: "20px", bgcolor: "background.paper" }}
        >
          <ListItemButton
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="Escoge la MAC del dispositivo IOT que quieres visualizar: "
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickListItem}
          >
            <ListItemText
              primary="Escoge la MAC del dispositivo IOT que quieres visualizar: "
              secondary={options[selectedIndex]}
            />
          </ListItemButton>
        </List>
      )}
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {`${option} : ${optionsDescriptions[index]}`}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
