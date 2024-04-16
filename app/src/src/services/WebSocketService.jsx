// WebSocketService.js

class WebSocketService {
    constructor() {
      this.socket = null;
    }
  
    connect() {
      if (!this.socket) {
        this.socket = new WebSocket('ws://localhost:8000/ws');
  
        this.socket.onopen = () => {
          console.log('WebSocket connected');
        };
  
        this.socket.onclose = () => {
          console.log('WebSocket disconnected');
        };
      }
    }

    onMessage(callback) {
      if (this.socket) {
        this.socket.onmessage = (event) => {
          callback(event);
        };
      }
    }


    disconnect() {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }
    }
  
    // Agrega otros métodos según tus necesidades, como enviar mensajes, etc.
  }
  
  const webSocketService = new WebSocketService();
  export default webSocketService;
  