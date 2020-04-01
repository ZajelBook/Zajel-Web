import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Book from '../components/books/List.vue';
import MyBook from '../components/books/MyList.vue';
import SignIn from '../components/users/SignIn.vue';
import SignUp from '../components/users/SignUp.vue';
import BookDetails from '../components/books/BookDetails.vue'
import NewBook from '../components/books/NewBook.vue'
import Requests from '../components/books/Requests.vue'
import Conversations from '../components/conversations/List.vue'
import UpdateBook from "../components/books/UpdateBook";


Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/books', component: Book },
  { path: '/my_books', component: MyBook },
  { path: '/login', component: SignIn },
  { path: '/signup', component: SignUp },
  { path: '/books/new', component: NewBook },
  { path: '/books/:id', component: BookDetails },
  { path: '/books/by_name/:friendly_id', component: BookDetails },
  { path: '/books/by_name/:friendly_id/edit', component: UpdateBook },
  { path: '/book_activities', component: Requests },
  { path: '/conversations/:id/messages', component: Conversations },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/policy',
    name: 'Policy',
    component: () => import(/* webpackChunkName: "about" */ '../views/PrivacyPolicy.vue')
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import(/* webpackChunkName: "about" */ '../views/TermsAndConditions.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router
