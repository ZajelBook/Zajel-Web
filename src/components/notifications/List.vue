<template>
    <div>
        <div class="bradcam_area bradcam_bg_2">
            <div class="container">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="bradcam_text text-center">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="explorer_europe list_wrap">
            <div class="container">
                <div class="row">
                    <div class="col-xl-12 col-lg-12">
                        <h3 class="exp_title text-center">Notification Center</h3>
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col" class="text-center">Message</th>
                                <th scope="col">Time</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-if="!this.notifications.length">
                                <td colspan="2" class="text-center">no notifications found</td>
                            </tr>
                            <tr v-for=" notification in notifications">
                                <td scope="row" class="text-center"><router-link :to="notification.page">{{notification.content}}</router-link></td>
                                <td><router-link :to="notification.page">{{new Date(notification.created_at).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })}}</router-link></td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="col-xl-12 page_nation text-center">
                            <paginate
                                    :page-count="this.metadata.total_pages || 1"
                                    :margin-pages="1"
                                    :click-handler="paginateCallback"
                                    :no-li-surround=true
                                    active-class="active"
                                    v-if="this.metadata.count">
                            </paginate>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                notifications: [],
                metadata: {}
            }
        },
        created () {
            this.fetchData()
            if(this.$store.getters.data.notificationsCount !== 0) {
                this.updateUnreadCount()
            }

        },
        methods: {
            updateUnreadCount(){
                this.$http.put('notifications/read')
                this.$store.commit('resetNotificationsCount')
            },
            fetchData(pageNumber) {
                let requestParams = {
                    page: pageNumber,
                    per_page: 30,
                }
                this.$http.get('notifications', {params: requestParams})
                    .then(response => {
                        this.metadata = response.data.metadata
                        this.notifications = response.data.notifications.map((notification) => {
                            let notificationObject = Object.assign({}, notification);
                            if (notification.payload.type === 'new_message'){
                                notificationObject.page = 'conversations/'+ notification.payload.conversation_id +'/messages';
                            } else if (notification.payload.type === 'borrow_request') {
                                notificationObject.page = 'lend_requests';
                            } else {
                                notificationObject.page = 'borrow_requests';
                            }
                            return notificationObject;
                        })
                    })
            },
            paginateCallback (pageNumber) {
                this.fetchData(pageNumber)
            }
        }
    }
</script>

<style>
    td a {
        display: block;
    }
</style>