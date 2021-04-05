import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    listUsers: [],
  },
  mutations: {
    ADD_USER(state, payload) {
      state.listUsers.push(payload);
    },
    DELETE_USER(state, payload) {
      state.listUsers.splice(state.listUsers.map((user) => user.id).indexOf(payload), 1);
    },
    UPDATE_USER(state, payload) {
      const index = state.listUsers.map((user) => user.id).indexOf(payload.id);
      state.listUsers[index] = payload;
    },
    SET_USERS(state, payload) {
      state.listUsers = payload;
    },
  },
  actions: {
    addUser({ commit }, payload) {
      axios.post('http://localhost/create.php', payload).then((response) => {
        const user = payload;
        user.id = response.data;
        commit('ADD_USER', user);
      });
    },
    deleteUser({ commit }, payload) {
      axios.delete(`http://localhost/delete.php?id=${payload}`).then(() => {
        commit('DELETE_USER', payload);
      });
    },
    updateUser({ commit }, payload) {
      axios.put('http://localhost/update.php', payload).then(() => {
        commit('UPDATE_USER', payload);
      });
    },
    fetchUsers({ commit }) {
      axios.get('http://localhost/list.php').then((response) => {
        commit('SET_USERS', response.data);
      });
    },
  },
  modules: {},
  getters: {
    listUsersRegistered: (state) => state.listUsers,
  },
};
