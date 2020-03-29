import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    signedIn: localStorage.signedIn == 'true',
    user_id: localStorage.user_id
  },
  mutations: {
    signIn (state, {user_id}) {
      console.log(user_id)
      localStorage.signedIn = true;
      localStorage.user_id = user_id;
      state.signedIn = true;
      state.user_id = user_id;
    },
    signOut (state) {
      localStorage.accessToken = null;

      localStorage.client = null;

      localStorage.uid = null;

      localStorage.expiry = null;

      localStorage.bearer = null;

      localStorage.signedIn = false;

      localStorage.user_id = null;

      state.signedIn = false;

      state.user_id = null;
    }
  }
})

export default store