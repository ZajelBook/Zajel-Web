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
        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <form class="form-signin" @submit.prevent="signIn">
                <h1 class="h3 mb-3 font-weight-normal">Please Login</h1>
                <label for="inputEmail" class="sr-only">Email address</label>
                <ValidationProvider vid="email" name="E-mail" rules="required|email" v-slot="{ errors }">
                    <input type="email" v-model="user.email" id="inputEmail" class="form-control"
                           placeholder="Email address" required autofocus>
                    <span>{{ errors[0] }}</span>
                </ValidationProvider>
                <label for="inputPassword" class="sr-only">Password</label>
                <ValidationProvider vid="password" name="Password" rules="required" v-slot="{ errors }">
                    <input type="password" v-model="user.password" id="inputPassword" class="form-control"
                           placeholder="Password" required>
                    <span>{{ errors[0] }}</span>
                </ValidationProvider>
                <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"> Remember me
                    </label>
                </div>
                <div class="text-center">
                    <button :class="[loading ? 'loading-btn': '', 'genric-btn primary circle btn-block text-center mb-3 form-control']" type="submit">Login
                    </button>
                    <p><u><router-link to="/signup" class="text-center">Create new account</router-link></u></p>
                    <p><u><router-link to="/forget_password" class="text-center">Forgot your password?</router-link></u></p>
                </div>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
    import store from "../../store";

    export default {
        data() {
            return {
                user: {
                    email: '',
                    password: ''
                }
            }
        },
        created() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(getPosition);
            }

            function getPosition(position) {
                store.commit('setLocation', {latitude: position.coords.latitude, longitude: position.coords.longitude})
            }
        },
        methods: {
            signIn() {
                this.$http.post('auth/sign_in', this.user)
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

                        if (this.$route.query.redirect !== undefined && this.$route.query.redirect !== null) {
                            this.$router.replace(this.$route.query.redirect);
                        } else {
                            this.$router.replace('/');
                        }

                        if (this.$store.getters.data.latitude && this.$store.getters.data.longitude) {
                            this.$http.put('users/' + this.$store.getters.data.user_id, {
                                latitude: this.$store.getters.data.latitude,
                                longitude: this.$store.getters.data.longitude
                            })
                        }
                    })
            },
        }
    }
</script>

<style scoped>
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
        font-size: 14px;
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

     span {
         font-size: .9em;
         color: #f22435;
     }

</style>
