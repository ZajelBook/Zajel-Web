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
            <div class="col-md-6">
              <u><h3 class="text-center">Borrow requests</h3></u>
              <hr>
              <ul>
                <li v-for="sent in sent_requests">
                  <div class="row">
                    <div class="col-md-3">
                      <div class="mb-20">
                        <img :src="sent.book.image" class="img-fluid">
                      </div>
                    </div>
                    <div class="col-md-9 mt-sm-20">
                      <h3><router-link :to="'books/' + sent.book.id">{{sent.book.title}}</router-link></h3>
                      <div v-if="sent.status === 'pending'" class="badge badge-primary" role="alert">
                        {{sent.status}}
                      </div>
                      <div v-else-if="sent.status === 'accepted'" class="badge badge-success" role="alert">
                        {{sent.status}}
                      </div>
                      <div v-else class="badge badge-danger" role="alert">
                        {{sent.status}}
                      </div>
                    </div>
                  </div>
                  <hr/>
                </li>
              </ul>
            </div>
            <div class="col-md-6">
              <u><h3 class="text-center">Lend requests</h3></u>
              <hr>
              <ul>
                <li v-for="received in received_requests">
                  <div class="row">
                    <div class="col-md-3">
                      <div class="mb-20">
                        <img :src="received.book.image" class="img-fluid">
                      </div>
                    </div>
                    <div class="col-md-9 mt-sm-20">
                      <h3><router-link :to="'books/' + received.book.id">{{received.book.title}}</router-link></h3>
                      <div :class="received.status === 'pending' ? 'badge badge-primary' : 'badge badge-success'" role="alert">
                        {{received.status}}
                      </div>
                      <p>Requested by: <u>{{received.borrower.name}}</u></p>

                      <button @click="accept" :id="received.id" :class="'genric-btn info circle accept_' + received.id" v-show="received.status === 'pending'">Accept</button>
                      <button @click="reject" :id="received.id" :class="'genric-btn primary circle reject_' + received.id" v-show="received.status === 'pending'">Reject</button>

                    </div>
                  </div>
                  <hr/>
                </li>
              </ul>
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
        sent_requests: [],
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
        this.fetchSentRequests()
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
      fetchSentRequests () {
        this.$http.get('book_activities?type=sent')
          .then(response => {
            this.sent_requests = response.data['book_activities']
          })
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
