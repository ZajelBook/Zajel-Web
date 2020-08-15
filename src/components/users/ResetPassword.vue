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
        <div class="whole-wrap">
            <div class="container box_1170">
                <div class="section-top-border">
                    <div class="row">
                        <div class="offset-md-4 col-md-4 text-center">
                           <h3>Please wait...</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            this.$http.get('auth/password/edit', { params: {reset_password_token: this.$route.query.reset_token, redirect_url: 'http://localhost:8080/update_password'} })
                .then(response => {
                    window.location.href = response.data.url
                })
        },
    }
</script>
