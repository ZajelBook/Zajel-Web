import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    signedIn: localStorage.signedIn == 'true'
  },
  mutations: {
    signIn (state) {
      localStorage.signedIn = true;
      state.signedIn = true
    },
    signOut (state) {
      localStorage.accessToken = null;

      localStorage.client = null;

      localStorage.uid = null;

      localStorage.expiry = null;

      localStorage.bearer = null;

      localStorage.signedIn = false;

      state.signedIn = false
    }
  }
})

export default store