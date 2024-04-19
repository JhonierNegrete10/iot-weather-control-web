import { useState, useEffect } from "react";

const useWebSocket = (url, onMessage) => {
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    if (!webSocket) {
      const ws = new WebSocket(url);
      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        ws.send("disconnect");
        setWebSocket(null);
      };

      setWebSocket(ws);
    } else {
      webSocket.onmessage = (event) => {
        onMessage && onMessage(JSON.parse(event.data));
      };
    //   return () => {
    //     webSocket.close();
    //   };
      
    }

  }, [url, onMessage, webSocket]);

  return webSocket;
};

export default useWebSocket;
