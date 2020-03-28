<template>
  <header>
    <div class="header-area ">
      <div id="sticky-header" class="main-header-area">
        <div class="container-fluid ">
          <div class="header_bottom_border">
            <div class="row align-items-center">
              <div class="col-xl-3 col-lg-2">
                <div class="logo">
                  <a href="index.html">
                    <img src="@/assets/img/logo.png" alt="">
                  </a>
                </div>
              </div>
              <div class="col-xl-6 col-lg-7">
                <div class="main-menu  d-none d-lg-block">
                  <nav>
                    <ul id="navigation">
                      <li><router-link to="/">Home</router-link></li>
                      <li><router-link to="/books">books</router-link></li>
                      <li><router-link to="/book_activities">Requests</router-link></li>
                      <li><router-link to="/books/new">Add new book</router-link></li>
                      <li> <router-link to="/conversations">Conversations</router-link></li>
                    </ul>
                  </nav>
                </div>
              </div>

              <div class="col-xl-3 col-lg-3 d-none d-lg-block">
                <div class="Appointment">
                  <div class="book_btn d-none d-lg-block">
                    <router-link to="/login" v-if="!signedIn()">Sign in</router-link>
                  </div>
                  <div class="book_btn d-none d-lg-block">
                    <router-link to="/signup" v-if="!signedIn()">Sign up</router-link>
                    <a href="#" @click.prevent="signOut" v-if="signedIn()">Sign Out</a>
                  </div>
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
export default {
    methods: {
        signedIn () {
            return this.$store.state.signedIn
        },
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

</style>
