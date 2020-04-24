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
      <div class="section-top-border">
          <div class="row">
              <div class="col-lg-6 col-md-6 offset-md-3 col-10 offset-1">
                  <u><h3 class="mb-30">Register for new account</h3></u>
                  <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                    <form @submit.prevent="signUp">
                      <div class="mb-3">
                          <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                              <label for="email">Email</label>
                              <input type="text" class="form-control" id="email" name="email" placeholder="Email address" v-model="user.email" required>
                              <span>{{ errors[0] }}</span>
                          </ValidationProvider>
                      </div>

                      <ValidationObserver>
                          <div class="mb-3">
                              <ValidationProvider rules="confirmed:confirmation" v-slot="{ errors }">
                                  <label for="password">Password</label>
                                  <input type="password" class="form-control" id="password" placeholder="Password" v-model="user.password" required minlength="4">
                                  <span>{{ errors[0] }}</span>
                              </ValidationProvider>
                          </div>

                          <div class="mb-3">
                              <ValidationProvider v-slot="{ errors }" vid="confirmation">
                                  <label for="password_confirmation">Password Confirmation</label>
                                  <input type="password" class="form-control" id="password_confirmation" placeholder="Password confirmation" v-model="user.password_confirmation" required>
                                  <span>{{ errors[0] }}</span>
                              </ValidationProvider>
                          </div>
                      </ValidationObserver>
                      <div class="mb-3">
                          <label for="first_name">First Name</label>
                          <input type="text" class="form-control" id="first_name" placeholder="First name" v-model="user.first_name" required>
                      </div>

                      <div class="mb-3">
                          <label for="last_name">Last Name</label>
                          <input type="text" class="form-control" id="last_name" placeholder="Last name" v-model="user.last_name" required>
                      </div>


                      <div class="mb-3">
                          <label for="phone_number">Phone number</label>
                          <input type="number" class="form-control" id="phone_number"  placeholder="Phone number" v-model="user.phone_number" required>
                      </div>

                      <div class="mb-3">
                          <label for="phone_number">Birth date</label>
                          <v-date-picker  :input-props='{ placeholder: "Choose date of birth" }' v-model="user.birth_date" :max-date="new Date('2009-12-31')"  />
                      </div>

                      <div class="mt-10">
                          <button type="submit" class="genric-btn primary circle arrow">Register</button>
                      </div>

                  </form>
                  </ValidationObserver>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import store from "../../store";
import { extend } from 'vee-validate';
import { required, email, confirmed, min } from 'vee-validate/dist/rules';

extend('email', email);
extend('confirmed', confirmed);
extend('min', min);

extend('required', {
    ...required,
    message: 'This field is required'
});


export default {
  data(){
    return {
        user: {
            email: '',
            password: '',
            password_confirmation: '',
            first_name: '',
            last_name: '',
            phone_number: '',
            birth_date: ''
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
  },
  methods: {
    signUp() {
      this.$http.post('auth', this.user )
      .then(response => {
        localStorage.accessToken = response.headers['map']['access-token'];

        localStorage.client = response.headers['map']['client'];

        localStorage.uid = response.headers['map']['uid'];

        localStorage.expiry = response.headers['map']['expiry'];

        localStorage.bearer = response.headers['map']['token-type'];

        localStorage.signedIn = true;

        this.$store.commit('signIn', {user_id: response.data.data.id})

        this.$router.replace('/confirm');
      }, error => {
          this.$refs.form.setErrors({
              email: [error.body.errors.email[0]]
          });
      }).then(data => {
        this.headers = data
      })
    },
  }
}
</script>

<style>
    span {
        font-size: .9em;
        color: #f22435;
    }
</style>
