export function authorize (state, loggedInUser) {
  state.isAuthorized = true;
  state.errorMessage = null;
  state.loggedInUser = loggedInUser;
}

export function unauthorize (state) {
  state.isAuthorized = false;
  state.errorMessage = null;
  state.loggedInUser = null;
}

export function authorizeError (state, errorMessage) {
  state.errorMessage = errorMessage;
}
