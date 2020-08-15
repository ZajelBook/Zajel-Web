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
            <form class="form-signin" @submit.prevent="resetPassword">
                <h1 class="h4 mb-3 font-weight-normal">Enter your email</h1>
                <label for="inputEmail" class="sr-only">Email</label>
                <ValidationProvider vid="email" name="Email" rules="required" v-slot="{ errors }">
                    <input type="email" v-model="userResetData.email" id="inputEmail" class="form-control"
                           placeholder="Email" required>
                    <span>{{ errors[0] }}</span>
                </ValidationProvider>
                <div class="text-center">
                    <button :disabled='isDisabled' :class="[loading ? 'loading-btn': '', 'genric-btn primary circle btn-block text-center mb-3 form-control']" type="submit">Send me password reset instruction
                    </button>
                </div>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userResetData: {
                    email: '',
                    redirect_url: ''
                },
                disabled: false
            }
        },
        computed: {
            isDisabled: function(){
                console.log(this.disabled)
                return this.disabled;
            }
        },
        methods: {
            resetPassword() {
                this.$http.post('auth/password', this.userResetData)
                this.disabled = true
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
        margin-bottom: 10px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    span {
        font-size: .9em;
        color: #f22435;
    }

</style>
