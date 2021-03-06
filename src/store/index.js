import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login';
import users from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    users,
  },
});
