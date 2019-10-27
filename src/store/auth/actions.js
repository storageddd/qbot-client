// @see PassportJS
import InstagramApi from 'src/InstagramApi';
import { Cookies } from 'quasar';

const COOKIES_CREDENTIALS_KEY = 'qbot-credentials';
const COOKIES_STATE_KEY = 'qbot-state';

/**
 * @param commit
 * @param rootState
 * @param userName
 * @param password
 * @returns {Promise<boolean>}
 */
export async function authorizeByCredentials ({ commit, rootState }, { userName, password }) {
  if (!rootState.global.isConnected) {
    commit('authorizeError', 'Отсутствует подключение к интернету.');
    return false;
  }

  const ig = InstagramApi.getInstance();
  ig.state.generateDevice(userName);
  let currentUser = null;
  try {
    commit('global/toggleLoading', true, { root: true });
    await ig.simulate.preLoginFlow();
    currentUser = await ig.account.login(userName, password);
    await process.nextTick(async () => await ig.simulate.postLoginFlow());
  } catch (e) {
    commit('authorizeError', 'Ошибка авторизации. Проверьте данные для входа.');
    commit('global/toggleLoading', false, { root: true });
    return false;
  }
  const credentials = await ig.state.serializeCookieJar();
  const state = {
    deviceString: ig.state.deviceString,
    deviceId: ig.state.deviceId,
    uuid: ig.state.uuid,
    phoneId: ig.state.phoneId,
    adid: ig.state.adid,
    build: ig.state.build,
  };
  Cookies.set(COOKIES_CREDENTIALS_KEY, credentials);
  Cookies.set(COOKIES_STATE_KEY, state);
  commit('authorize', currentUser);
  commit('global/toggleLoading', false, { root: true });
  return true;
}

/**
 * @param commit
 * @param rootState
 * @returns {Promise<boolean>}
 */
export async function authorizeByCookies ({ commit, rootState }) {
  if (!rootState.global.isConnected) {
    commit('authorizeError', 'Отсутствует подключение к интернету.');
    return false;
  }

  const credentials = Cookies.get(COOKIES_CREDENTIALS_KEY);
  const state = Cookies.get(COOKIES_STATE_KEY);
  if (!credentials || !state) {
    return false;
  }

  let currentUser = null;
  try {
    commit('global/toggleLoading', true, { root: true });

    const ig = InstagramApi.getInstance();
    await ig.state.deserializeCookieJar(JSON.stringify(credentials));

    ig.state.deviceString = state.deviceString;
    ig.state.deviceId = state.deviceId;
    ig.state.uuid = state.uuid;
    ig.state.phoneId = state.phoneId;
    ig.state.adid = state.adid;
    ig.state.build = state.build;

    currentUser = await ig.account.currentUser();
  } catch (e) {
    commit('authorizeError', 'Ошибка авторизации. Проверьте данные для входа.');
    commit('global/toggleLoading', false, { root: true });
    return false;
  }
  commit('authorize', currentUser);
  commit('global/toggleLoading', false, { root: true });
  return true;
}

/**
 * @param commit
 * @returns {Promise<boolean>}
 */
export async function unauthorize ({ commit }) {
  try {
    commit('global/toggleLoading', true, { root: true });
    await InstagramApi.getInstance().account.logout();
  } catch (e) {
    console.log(e);
    commit('authorizeError', 'Ошибка авторизации.');
    commit('global/toggleLoading', false, { root: true });
    return false;
  }

  Cookies.remove(COOKIES_CREDENTIALS_KEY);
  Cookies.remove(COOKIES_STATE_KEY);
  commit('unauthorize');
  commit('global/toggleLoading', false, { root: true });
  return true;
}