export function toggleLoading (state, payload) {
  state.isLoading = payload || !state.isLoading;
}

export function setIsConnected (state, payload) {
  state.isConnected = payload;
}