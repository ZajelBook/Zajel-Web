import VueResource from 'vue-resource';
import Paginate from 'vuejs-paginate'
import vSelect from 'vue-select'
import App from './App.vue';
import VCalendar from 'v-calendar';
import Vue from "vue";
import store from './store'
import router from './router'
import './cable'
import { formatDistance } from 'date-fns'
import jquery from 'jquery'
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import NProgress from 'vue-nprogress';
import NprogressContainer from 'vue-nprogress/src/NprogressContainer';
import Toasted from 'vue-toasted';

const nprogress = new NProgress('.nprogress-container');

window.$ = jquery;
Vue.prototype.formatDistance = formatDistance
Vue.config.productionTip = false

Vue.use(VueResource);
Vue.use(VCalendar);
Vue.use(NProgress);
Vue.use(Toasted, {
  theme: "toasted-primary",
  position: "top-right",
  duration : 5000,
  keepOnHover: true,
  action : {
    text : 'Cancel',
    onClick : (e, toastObject) => {
      toastObject.goAway(0);
    }
  },
});
Vue.component('NprogressContainer', NprogressContainer);
Vue.component('paginate', Paginate);
Vue.component('v-select', vSelect);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getPosition);
}
function getPosition(position) {
  store.commit('setLocation', {latitude: position.coords.latitude, longitude: position.coords.longitude})
}
// Vue.http.options.root = "http://localhost:3000/api/";
// Vue.http.options.root = "https://zajel.mylestone.life/api/";
Vue.http.options.root = "https://api.zajelbook.com/api/";

router.beforeEach((to, from, next) => {
  nprogress.start();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (localStorage.signedIn !== 'true') {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresAuth === false)) {
    // this route does not requires auth, check if NOT logged in
    // if logged in, redirect to home page.
    if (localStorage.signedIn === 'true') {
      next({path: '/'})
    } else {
      next()
    }
  } else {
    next() // make sure to always call next() if the requiresAuth is undefined
  }
})
router.afterEach((to, from) => {
  nprogress.done();
});
Vue.mixin({
  computed: {
    loading() {
      return store.state.loading;
    },
  },
});

Vue.http.interceptors.push((request, next) => {
  store.state.loading = true;
  nprogress.start();
  request.headers.set('access-token', localStorage.accessToken);
  request.headers.set('client', localStorage.client);
  request.headers.set('uid', localStorage.uid);
  request.headers.set('expiry', localStorage.expiry);
  request.headers.set('token-type', localStorage.bearer);

  next(response => {
    store.state.loading = false;
    nprogress.done();
    // @todo make unified message field on response so we can show dynamic toast msg based on the response status
    switch (response.status) {
      case 200:
        if (response.data.message !== '' && response.data.message !== undefined) {
          Vue.toasted.success(response.data.message);
        }
        break;
      case 400:
        if (typeof response.data.message === 'string') {
          Vue.toasted.error(response.data.message);
        }
        else if (typeof response.data.message === 'object') {
          for (let i in response.data.message) {
            Vue.toasted.error(response.data.message[i]);
          }
        }
        break;
      case 401:
        Vue.toasted.error(response.body.errors[0]);
        store.commit('signOut');
        router.push('/login').catch(err => {})
        break;
      case 403:
        Vue.toasted.error(response.data.message);
        router.push('/confirm').catch(err => {})
        break;
      case 404:
      case 423:
        Vue.toasted.error(response.data.message);
        break;
      case 422:
        if (!response.body.data.hasOwnProperty('errors') && typeof response.body.data.message === 'string') {
          Vue.toasted.error(response.body.data.message);
        } else {
          for (let i in response.body.errors['full_messages']) {
            Vue.toasted.error(response.body.errors['full_messages'][i]);
          }
        }
        break;
      case 500:
        Vue.toasted.error(response.data.message);
        break;
      default:
        Vue.toasted.error('Oops... Something went wrong: ' + error.message + '. Please try again');
    }
  });
});

new Vue({
  el: '#app',
  components: { App },
  router,
  store,
  render: h => h(App),
})
