<template>
  <header>
    <div class="header-area ">
      <div id="sticky-header" class="main-header-area">
        <div class="container-fluid ">
          <div class="header_bottom_border">
            <div class="row align-items-center">
              <div class="col-xl-3 col-lg-3 col-sm-3">
                <div class="logo">
                  <router-link to="/">
                    <img src="@/assets/img/5.png" alt="" width="60px">
                  </router-link>
                </div>
              </div>
              <div class="col-xl-7 col-lg-7">
                <div class="main-menu  d-none d-lg-block">
                  <nav>
                    <ul id="navigation">
                      <li><router-link to="/">Home</router-link></li>
                      <li><router-link to="/books">books</router-link></li>
                      <li v-if="this.$store.getters.data.signedIn"><router-link to="/my_books">My books</router-link></li>
                      <li v-if="!this.$store.getters.data.signedIn"><router-link to="/login">Sign in</router-link></li>
                      <li v-if="!this.$store.getters.data.signedIn"><router-link to="/signup">Sign up</router-link></li>
                      <li v-if="this.$store.getters.data.signedIn"><router-link to="/book_activities">Requests</router-link></li>
                      <li v-if="this.$store.getters.data.signedIn"><router-link to="/books/new">Add new book</router-link></li>
                      <li v-if="this.$store.getters.data.signedIn"><router-link to="/notifications">Notifications
                        <span class="badge badge-pill badge-danger">{{this.notificationsCount}}</span>
                      </router-link></li>
                      <li v-if="this.$store.getters.data.signedIn"><a href="#" @click.prevent="signOut">Sign Out</a></li>
                    </ul>
                  </nav>
                </div>
              </div>

              <div class="col-12">
                <div class="mobile_menu d-block d-lg-none"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import store from '../store'

export default {
  data () {
    return {
      notificationsCount: this.$store.getters.data.notificationsCount
    }
  },
  computed: {
    count(){
      return this.$store.getters.data.notificationsCount;
    }
  },
  watch: {
    count(value){
      this.notificationsCount = value
    }
  },
  created () {
    if (this.$store.getters.data.signedIn){
      this.$http.get('notifications/unread')
              .then( response => {
                this.notificationsCount = response.data.notifications_count
                this.$store.commit('incrementNotificationsCount', {notificationsCount: response.data.notifications_count })
              })

    }
  },
  methods: {
        signOut () {
            this.$http.delete('auth/sign_out')
            .then(response => {
                this.$store.commit('signOut')
                this.$router.push('/');
            }, error => {
                console.log(error);
            })
        }
    }
}
</script>

<style>
.logo {
  margin-top: -10px;
}
</style>
