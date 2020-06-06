<template>
  <header>
    <div class="header-area ">
      <div id="sticky-header" class="main-header-area">
        <div class="container-fluid ">
          <div class="header_bottom_border">
            <div class="row align-items-center">
              <div class="col-xl-12 col-lg-12 col-sm-12">
                <nav class="main-menu navbar navbar-expand-lg navbar-dark">
                  <div class="logo">
                    <router-link to="/">
                      <img src="@/assets/img/5.png" alt="" width="60px" alt="background">
                    </router-link>
                  </div>
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div v-if="this.$store.getters.data.signedIn" class="offset-2 col-9 collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav text-center">
                      <li class="nav-item"><router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/">Home</router-link></li>
                      <li class="nav-item"><router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/books">books</router-link></li>
                      <li class="nav-item"><router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/my_books">My books</router-link></li>
                      <li class="nav-item"><router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" :to="{name: 'BorrowRequests'}">Borrow Requests</router-link></li>
                      <li class="nav-item"><router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" :to="{name: 'LendRequests'}">Lend Requests</router-link></li>
                      <li class="nav-item"><router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/books/new">Add book</router-link></li>
                      <li class="nav-item"><router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/notifications">Notifications
                        <span class="badge badge-pill badge-danger">{{this.notificationsCount}}</span>
                      </router-link></li>
                      <li class="nav-item"><a href="#" class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" @click.prevent="signOut">Logout</a></li>
                    </ul>
                  </div>

                  <div v-if="!this.$store.getters.data.signedIn" class="offset-4 col-7 collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav text-center">
                      <li class="nav-item"><router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/">Home</router-link></li>
                      <li class="nav-item"><router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/books">books</router-link></li>
                      <li class="nav-item" v-if="!this.$store.getters.data.signedIn"><router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/login">Login</router-link></li>
                      <li class="nav-item"><router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/signup">Register</router-link></li>
                    </ul>
                  </div>
                </nav>
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
                this.$router.push('/').catch(err => {});
            }, error => {
                console.log(error);
            })
        }
    }
}
</script>

<style>
  @media only screen and (max-width : 768px) {
    .navbar-collapse {
      background: white;
    }
    .navbar-dark .navbar-toggler {
      border-color: white;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .navbar-collapse {
      background: white;
    }
    .navbar-dark .navbar-toggler {
      border-color: white;
    }
  }
.logo {
  margin-top: -10px;
}
</style>
