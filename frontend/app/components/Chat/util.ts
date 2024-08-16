export const getWebSocketApiHost = () => {
      if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
          return `ws://${process.env.NEXT_PUBLIC_SERVER_URL}/ws/generate_stream`
      }
      // If you're serving the app directly through FastAPI, generate the WebSocket URL based on the current location.
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const host = window.location.host;
      return `${protocol}//${host}/ws/generate_stream`;
};
