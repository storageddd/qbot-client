export function authorize (state, currentUser) {
  state.isAuthorized = true;
  state.errorMessage = null;
  state.currentUser = currentUser;
}

export function unauthorize (state) {
  state.isAuthorized = false;
  state.errorMessage = null;
  state.currentUser = null;
}

export function authorizeError (state, errorMessage) {
  state.errorMessage = errorMessage;
}
