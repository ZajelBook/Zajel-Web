import Vue from 'vue'
import store from '../store/index'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Book from '../components/books/List.vue';
import MyBook from '../components/books/MyList.vue';
import SignIn from '../components/users/SignIn.vue';
import SignUp from '../components/users/SignUp.vue';
import UserConfirmation from '../components/users/UserConfirmation.vue'
import BookDetails from '../components/books/BookDetails.vue'
import NewBook from '../components/books/NewBook.vue'
import BorrowRequests from '../components/books/BorrowRequests.vue'
import LendRequests from '../components/books/LendRequests.vue'
import Conversations from '../components/conversations/List.vue'
import UpdateBook from "../components/books/UpdateBook";
import Notifications from "../components/notifications/List";


Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/confirm', component: UserConfirmation },
  { path: '/books', name: 'Books', component: Book },
  { path: '/my_books', component: MyBook, meta: {requiresAuth: true} },
  { path: '/login', component: SignIn, meta: {requiresAuth: false} },
  { path: '/signup', component: SignUp, meta: {requiresAuth: false} },
  { path: '/books/new', component: NewBook, meta: {requiresAuth: true} },
  { path: '/books/:id', name: 'BookDetails', component: BookDetails },
  {
      path: '/books/by_name/:friendly_id',
      component: BookDetails,
      beforeEnter: (to, from, next) => {
          Vue.http.get('books/by_name/' + to.params.friendly_id, {
              params: {
                  latitude: store.getters.data.latitude,
                  longitude: store.getters.data.longitude
              }
          }).then((data) => {
              store.commit('setBook', data.body);
              next()
          }).catch((err) => {
              // show msg to user that something went wrong
              console.log(error);
              next('/')
          })
      },
  },
  {
      path: '/books/by_name/:friendly_id/edit',
      component: UpdateBook,
      beforeEnter: (to, from, next) => {
          // @todo
          next()
      },
  },
  { path: '/borrow_requests', name: 'BorrowRequests', component: BorrowRequests },
  { path: '/lend_requests', name: 'LendRequests', component: LendRequests },
  { path: '/notifications', component: Notifications },
  { path: '/conversations/:id/messages', component: Conversations },
  {
    path: '/about',
    name: 'Static',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/policy',
    name: 'Static',
    component: () => import(/* webpackChunkName: "about" */ '../views/PrivacyPolicy.vue')
  },
  {
    path: '/terms',
    name: 'Static',
    component: () => import(/* webpackChunkName: "about" */ '../views/TermsAndConditions.vue')
  }
]

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior() {
        return {x: 0, y: 0}
    }
})

export default router
