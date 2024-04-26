import { useState, useEffect } from "react";

const useWebSocket = (url, onMessage, appStatus, setAppStatus) => {
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    const connectWebSocket = async () => {
      
      try {
        const ws = new WebSocket(url);
        ws.onopen = () => {
          console.log("-- ws: WebSocket connected ", url);
        };

        ws.onclose = () => {
          console.log("-- ws: WebSocket disconnected");
          ws.send("disconnect");
          setWebSocket(null);
        };

        setWebSocket(ws);
      } catch (error) {
        console.error("Error connecting to WebSocket:", error);
        setWebSocket(null);
      }
    }
    console.log("-- ws:", appStatus)
    if (appStatus == "historical_data_loaded"){
    if (!webSocket) {
      connectWebSocket();
    } else {

      webSocket.onmessage = (event) => {
        onMessage && onMessage(JSON.parse(event.data));
      };
    }
    }
  }, [url, onMessage, webSocket]);

  return webSocket;
};

export default useWebSocket;
