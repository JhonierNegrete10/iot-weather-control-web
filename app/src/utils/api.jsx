export const fetchDevices = async (urlBase) => {
  try {
    const response = await fetch(`http://${urlBase}/device/`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching devices:", error);
    throw error;
  }
};

export const fetchAPIData = async (urlBase) => {
  try {
    const response = await fetch(`http://${urlBase}/api/data/`);
    if (!response.ok) {
      throw new Error("Error fetching API data");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching API data:", error);
    throw error;
  }
};

export const fetchSetPointData = async (deviceMac, urlBase) => {
  try {
    const response = await fetch(
      `http://${urlBase}/setpoints/device/${deviceMac}`
    );
    if (!response.ok) {
      throw new Error("Error fetching setpoint data");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching setpoint data:", error);
    throw error;
  }
};

export const postSetpoint = async (deviceMac, setpoint, urlBase) => {
  try {
    const response = await fetch(`http://${urlBase}/setpoints/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        device_mac: deviceMac,
        setpoint: setpoint,
      }),
    });
    if (!response.ok) {
      throw new Error("Error posting setpoint data");
    }
    return response.json();
  } catch (error) {
    console.error("Error posting setpoint data:", error);
    throw error;
  }
};

export const fetchHistoricData = async (deviceMac, urlBase) => {
  try {
    const response = await fetch(`http://${urlBase}/data/device/${deviceMac}`);
    if (!response.ok) {
      throw new Error("Error fetching historic data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching historic data:", error);
    throw error;
  }
};
