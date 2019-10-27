import Vue from 'vue';
import Vuex from 'vuex';

import global from './global';
import auth from './auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    global
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
});
