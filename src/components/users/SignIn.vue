<template>
  <div>
    <div class="bradcam_area bradcam_bg_2">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <div class="bradcam_text text-center">
              <h3></h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <form class="form-signin" @submit.prevent="signIn">
      <h1 class="h3 mb-3 font-weight-normal">Please Login</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" v-model="user.email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" v-model="user.password" id="inputPassword" class="form-control" placeholder="Password" required>
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <div class="text-center">
        <button class="genric-btn primary e-large circle btn-block text-center mb-3" type="submit">Login</button>
        <p><span>Don't have an account? </span></p><u><router-link to="/signup" class="text-center">Register here</router-link></u>

      </div>
    </form>
  </div>
</template>

<script>
import store from "../../store";

export default {
  data (){
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  created () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    }
    function getPosition(position) {
      store.commit('setLocation', {latitude: position.coords.latitude, longitude: position.coords.longitude})
    }
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signIn() {
      this.$http.post('auth/sign_in', this.user )
      .then(response => {
        localStorage.accessToken = response.headers['map']['access-token'];

        localStorage.client = response.headers['map']['client'];

        localStorage.uid = response.headers['map']['uid'];

        localStorage.expiry = response.headers['map']['expiry'];

        localStorage.bearer = response.headers['map']['token-type'];

        this.$store.commit('signIn', {
          user_id: response.data.data.id,
          accessToken: localStorage.accessToken,
          client: localStorage.client,
          uid: localStorage.uid,
          expiry: localStorage.expiry,
          bearer: localStorage.bearer
        })

        this.$router.replace('/');
      }, error => {
        console.log(error);
      }).then(data => {
        this.headers = data
        if(this.$store.getters.data.latitude && this.$store.getters.data.longitude) {
          this.$http.put('users/' + this.$store.getters.data.user_id, {
            latitude: this.$store.getters.data.latitude,
            longitude: this.$store.getters.data.longitude
          })
        }
      })
    },

    checkSignedIn () {
      if (this.$store.getters.data.signedIn === true) {
          this.$router.replace('/');
      }
    }

  }
}
</script>

<style>
  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }
  .form-signin .checkbox {
    font-weight: 400;
  }
  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

</style>
