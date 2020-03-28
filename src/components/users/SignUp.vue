<template>
  <div>
    <h1>auth</h1>
      <form @submit.prevent="signUp">
          <label>email</label>
          <input type="email" v-model="email">

          <label>Password</label>
          <input type="password" v-model="password">

          <label>Password Confirmation</label>
          <input type="password" v-model="password_confirmation">

          <button type="submit">Submit</button>
      </form>
    </div>
</template>

<script>
export default {
  data(){
    return {
      email: 'mrahmoun93@gmail.com',
      password: '00000000',
      password_confirmation: '00000000'
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signUp() {
      this.$http.post('auth', { email: this.email, password: this.password, password_confirmation: this.password_confirmation } )
      .then(response => {
        localStorage.accessToken = response.headers['map']['access-token'];

        localStorage.client = response.headers['map']['client'];

        localStorage.uid = response.headers['map']['uid'];

        localStorage.expiry = response.headers['map']['expiry'];

        localStorage.bearer = response.headers['map']['token-type'];

        localStorage.signedIn = true;

        this.$router.replace('/');
      }, error => {
        console.log(error);
      }).then(data => {
        this.headers = data
        console.log(this.headers)
      })
    },

    checkSignedIn () {
      if (localStorage.signedIn === 'true') {
          this.$router.replace('/');
      }
    }
  }
}
</script>
