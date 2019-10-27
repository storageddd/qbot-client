import InstagramApi from 'src/InstagramApi';
import { LocalStorage } from 'quasar'

const LOCAL_STORAGE_CREDENTIALS_KEY = 'CREDENTIALS';

export async function authorizeByCredentials ({ commit, rootState }, { userName, password }) {
  if (!rootState.global.isConnected) {
    commit('authorizeError', 'Отсутствует соединение с интернетом.');
    return false;
  }

  InstagramApi.getInstance().state.generateDevice(userName);
  let loggedInUser = null;

  try {
    await InstagramApi.getInstance().simulate.preLoginFlow();
    loggedInUser = await InstagramApi.getInstance().account.login(userName, password);
    await process.nextTick(async () => await InstagramApi.getInstance().simulate.postLoginFlow());
  } catch (e) {
    commit('authorizeError', 'Ошибка авторизации. Проверьте данные для входа.');
    return false;
  }
  console.log('---');
  console.log(loggedInUser);
  console.log(InstagramApi.getInstance());
  console.log('---');
  commit('authorize', loggedInUser);
  LocalStorage.set(LOCAL_STORAGE_CREDENTIALS_KEY, { userName, password });
  return true;
}

export async function authorize ({ commit, rootState }) {
  if (!rootState.global.isConnected) {
    commit('authorizeError', 'Отсутствует соединение с интернетом.');
    return false;
  }

  const credentials = LocalStorage.getItem(LOCAL_STORAGE_CREDENTIALS_KEY);
  if (!credentials) {
    return false;
  }

  const { userName, password } = credentials;

  InstagramApi.getInstance().state.generateDevice(userName);

  let loggedInUser = null;
  try {
    await InstagramApi.getInstance().simulate.preLoginFlow();
    loggedInUser = await InstagramApi.getInstance().account.login(userName, password);
    await process.nextTick(async () => await InstagramApi.getInstance().simulate.postLoginFlow());
  } catch (e) {
    commit('authorizeError', 'Ошибка авторизации. Проверьте данные для входа.');
    return false;
  }

  commit('authorize', loggedInUser);
  console.log('---');
  console.log(loggedInUser);
  console.log(InstagramApi.getInstance());
  console.log('---');
  LocalStorage.set(LOCAL_STORAGE_CREDENTIALS_KEY, { userName, password });
  return true;
}

export function unauthorize ({ commit }) {
  LocalStorage.remove(LOCAL_STORAGE_CREDENTIALS_KEY);
  InstagramApi.destroy();
  commit('unauthorize');
  return true;
}

// function x() {
//   const ig = new IgApiClient();
//   ig.state.deviceString = "saved deviceString";
//   ig.state.deviceId = "saved deviceId";
//   ig.state.uuid = "saved uuid";
//   ig.state.phoneId = "saved phoneId";
//   ig.state.adid = "saved adid";
//   ig.state.build = "saved build";
//   await ig.state.deserializeCookieJar(JSON.stringify(cookies));
// }


// account contactPointPrefill, currentUser https://github.com/dilame/instagram-private-api/blob/master/docs/classes/_repositories_account_repository_.accountrepository.md
// qe sync syncLoginExperiments https://github.com/dilame/instagram-private-api/blob/master/docs/classes/_repositories_qe_repository_.qerepository.md#sync
// qp batchFetch https://github.com/dilame/instagram-private-api/blob/master/docs/classes/_repositories_qp_repository_.qprepository.md#batchfetch

// @see https://habr.com/ru/post/310594/

// @see passportjs