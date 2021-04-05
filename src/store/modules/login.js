import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    authentication: null,
    defaultUser: {
      name: 'Usuario Teste',
      login: 'admin',
      password: 'admin',
    },
  },
  mutations: {
    SET_AUTHENTICATION(state, payload) {
      state.authentication = payload;
    },
  },
  actions: {
    authenticate({ commit, state }, login) {
      if (
        login.login === state.defaultUser.login &&
        login.password === state.defaultUser.password
      ) {
        commit('SET_AUTHENTICATION', state.defaultUser);
        return true;
      }
      return false;
    },
  },
  getters: {
    getAuthentication: (state) => state.authentication,
    isAuthenticated: (state) => state.authentication !== null,
  },
  modules: {},
  namespaced: true,
};
