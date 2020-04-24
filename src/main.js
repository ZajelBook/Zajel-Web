import VueResource from 'vue-resource';
import Paginate from 'vuejs-paginate'
import vSelect from 'vue-select'
import App from './App.vue';
import VCalendar from 'v-calendar';
import Vue from "vue";
import store from './store'
import router from './router'
import './cable'
import moment from 'moment';
import jquery from 'jquery'

window.$ = jquery;
Vue.prototype.moment = moment
Vue.config.productionTip = false

Vue.use(VueResource);
Vue.use(VCalendar);
Vue.component('paginate', Paginate);
Vue.component('v-select', vSelect);

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getPosition);
}
function getPosition(position) {
  store.commit('setLocation', {latitude: position.coords.latitude, longitude: position.coords.longitude})
}
// Vue.http.options.root = "http://localhost:3000/api/";
Vue.http.options.root = "https://zajel.mylestone.life/api/";
// Vue.http.options.root = "https://api.zajelbook.com/api/";

router.beforeEach((to, from, next) => {
  // @todo start page loader
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
  // @todo stop page loader
});

Vue.http.interceptors.push((request, next) => {
  request.headers.set('access-token', localStorage.accessToken);
  request.headers.set('client', localStorage.client);
  request.headers.set('uid', localStorage.uid);
  request.headers.set('expiry', localStorage.expiry);
  request.headers.set('token-type', localStorage.bearer);

  next(response => {
    if(response.status == 401){

      store.commit('signOut');
      router.push('/login')
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
