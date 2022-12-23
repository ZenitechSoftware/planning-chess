import wsWrapper from "./wsWrapper";

export const openWsConnection = (url) => {
  const WebSockets = wsWrapper(WebSocket);
  return new WebSockets(url);
};
