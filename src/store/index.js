import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = sessionStorage.getItem("state")
  ? JSON.parse(sessionStorage.getItem("state"))
  : { saveUserName: "", isShow: true };

export default new Vuex.Store({
  state,
  mutations: {
    saveUserName(state, data) {
      state.saveUserName = data;
    },
    saveIsShow(state, data) {
      state.isShow = data;
    }
  },
  actions: {},
  modules: {}
});
