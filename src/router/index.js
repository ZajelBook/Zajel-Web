import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Book from '../components/books/List.vue';
import SignIn from '../components/users/SignIn.vue';
import SignUp from '../components/users/SignUp.vue';
import BookDetails from '../components/books/BookDetails.vue'
import NewBook from '../components/books/NewBook.vue'
import Requests from '../components/books/Requests.vue'
import Conversations from '../components/conversations/List.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/books', component: Book },
  { path: '/login', component: SignIn },
  { path: '/signup', component: SignUp },
  { path: '/books/new', component: NewBook },
  { path: '/books/:id', component: BookDetails },
  { path: '/book_activities', component: Requests },
  { path: '/conversations/:id/messages', component: Conversations },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
