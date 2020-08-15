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
            <form class="form-signin" @submit.prevent="updatePassword">
                <h1 class="h4 mb-3 font-weight-normal">Change your password</h1>
                <label for="inputPassword" class="sr-only">Password</label>
                <ValidationProvider vid="password" name="Password" rules="required" v-slot="{ errors }">
                    <input type="password" v-model="userPassword.password" id="inputPassword" class="form-control"
                           placeholder="Password" required>
                    <span>{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider vid="passwordConfirmation" name="PasswordConfirmation" rules="required" v-slot="{ errors }">
                    <input type="password" v-model="userPassword.password_confirmation" id="inputPasswordConfirmation" class="form-control"
                           placeholder="Password confirmation" required>
                    <span>{{ errors[0] }}</span>
                </ValidationProvider>
                <div class="text-center">
                    <button :class="[loading ? 'loading-btn': '', 'genric-btn primary circle btn-block text-center mb-3 form-control']" type="submit">Update
                    </button>
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
                userPassword: {
                    password: '',
                    password_confirmation: '',
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

            if (localStorage.signedIn !== 'true') {
                localStorage.accessToken = this.$route.query['access-token'];

                localStorage.client = this.$route.query['client'];

                localStorage.uid = this.$route.query['uid'];

                localStorage.expiry = this.$route.query['expiry'];

                localStorage.bearer = this.$route.query['token-type'];
            }

        },
        methods: {
            updatePassword() {
                this.$http.put('auth/password', this.userPassword)
                    .then(response => {
                        this.$http.delete('auth/sign_out')
                            .then(response => {
                                this.$store.commit('signOut')
                                this.$router.push('/').catch(err => {});
                            }, error => {
                                console.log(error);
                            })
                    })
            },
        }
    }
</script>

<style scoped>
    .form-signin {
        width: 100%;
        max-width: 350px;
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
