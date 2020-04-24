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
            <div class="mt-5 offset-3 col-6 text-center" v-if="!received_requests.length" style="height: 300px">
              <h3>No received requests</h3>
              <br>
              <h4>If you haven't added any books yet. why don't you add some?</h4>
              <router-link class="mt-4 genric-btn primary circle arrow" to="/books/new">Add book</router-link>
            </div>
            <div class="offset-sm-3 col-sm-9 offset-md-2 col-md-8 col-12" v-for="received in received_requests">
              <div class="row">
                <div class="col-sm-3 col-3">
                  <div class="mb-20 text-center">
                    <img :src="received.book.image" class="img-fluid mb-3" alt="borrowed_book">
                    <div :class="received.status === 'pending' ? 'badge badge-primary' : 'badge badge-success'" role="alert">
                      {{received.status}}
                    </div>
                  </div>
                </div>
                <div class="col-9">
                  <h3><router-link :to="'books/by_name/' + received.book.friendly_id">{{received.book.title}}</router-link></h3>
                  <p><b>{{received.borrower.name}}</b> requested your book {{formatDistance(new Date(), new Date(received.created_at))}} ago</p>

                  <div class="text-center">
                    <button @click="accept" :id="received.id" :class="'m-2 genric-btn info circle accept_' + received.id" v-show="received.status === 'pending'">Accept</button>
                    <button @click="reject" :id="received.id" :class="'m-2 genric-btn primary circle reject_' + received.id" v-show="received.status === 'pending'">Reject</button>
                    <router-link :id="received.conversation_id" class="genric-btn success circle" v-show="received.status === 'accepted'" :to="'/conversations/' + received.conversation_id +'/messages'">Go to Conversation</router-link>
                  </div>
                </div>
              </div>
              <hr>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        received_requests: []
      }
    },
    watch: {
      received_requests(value) {
        this.received_requests = value
      }
    },
    created () {
      if(this.$store.state.signedIn){
        this.fetchReceivedRequests()
      } else {
        this.$router.push('/login')
      }
    },
    methods: {
      accept (event) {
        this.$http.put('book_activities/' + event.target.id, {
          type: 'accept'
        }).then(() => {
          this.fetchReceivedRequests()
        })
      },
      reject (event) {
        if(confirm("Do you really want to reject this request? this action is not reversible")){
          this.$http.put('book_activities/' + event.target.id, {
            type: 'reject'
          }).then(() => {
            this.fetchReceivedRequests()
          })
        }
      },
      fetchReceivedRequests () {
        this.$http.get('book_activities?type=received')
          .then(response => {
            this.received_requests = response.data['book_activities']
          })
      }
    }
  }
</script>
