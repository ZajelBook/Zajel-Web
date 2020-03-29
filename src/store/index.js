import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    signedIn: localStorage.signedIn == 'true',
    user_id: localStorage.user_id,
    accessToken: localStorage.accessToken,
    client: localStorage.client,
    uid: localStorage.uid,
    expiry: localStorage.expiry,
    bearer: localStorage.bearer
  },
  getters: {
    headers: state => {
      return {
        accessToken: state.accessToken,
        uid: state.uid,
        client: state.client
      }
    }
  },
  mutations: {
    signIn (state, {user_id, accessToken, client, uid, expiry, bearer}) {
      localStorage.signedIn = true;
      localStorage.user_id = user_id;
      state.signedIn = true;
      state.user_id = user_id;
      state.accessToken = accessToken;
      state.client = client;
      state.uid = uid;
      state.expiry = expiry;
      state.bearer = bearer;

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
      state.accessToken = null;
      state.client = null;
      state.uid = null;
      state.expiry = null;
      state.bearer = null;
    }
  }
})