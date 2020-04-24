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
            <form class="form-signin" @submit.prevent="confirm">
                <h4 class="mb-3 mt-30 font-weight-normal text-center">Please check your email for the confirmation code</h4>
                <label for="confirmationCode" class="sr-only">Code</label>
                <input type="text" v-model="user.confirmationCode" id="confirmationCode" class="form-control" placeholder="Confirmation code" required autofocus>
                <div class="text-center mt-30 offset-3 col-6">
                    <button class="genric-btn primary e-large circle btn-block text-center mb-3" type="submit">Submit</button>
                </div>
            </form>
    </div>
</template>

<script>
    export default {
        data (){
            return {
                user: {
                    confirmationCode: null
                }
            }
        },
        methods: {
            confirm() {
                this.$http.put('users/confirm', {confirmation_code: this.user.confirmationCode})
                .then(response => {
                    this.$router.replace('/');
                }, error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style>
    .form-signin {
        width: 100%;
        max-width: 600px;
        padding: 15px;
        margin: auto;
    }
</style>
