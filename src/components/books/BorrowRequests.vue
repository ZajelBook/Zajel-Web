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
          <h3 class="text-center" v-if="loading">Loading...</h3>
          <div class="row" v-else>
            <div class="offset-3 col-6 mt-5 text-center" v-if="!sent_requests.length" style="height: 300px">
              <h3>No sent requests</h3>
              <router-link class="mt-4 genric-btn primary circle arrow" to="/books">Explore nearby books</router-link>
            </div>
            <div class="offset-sm-3 col-sm-9 offset-md-2 col-md-8 col-12" v-for="sent in sent_requests">
              <div class="row">
                <div class="col-sm-3 col-3">
                  <div class="mb-20 text-center">
                    <img :src="sent.book.image" class="img-fluid mb-3" alt="borrowed_book">
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
                <div class="col-9">
                  <h3><router-link :to="'books/by_name/' + sent.book.friendly_id">{{sent.book.title}}</router-link></h3>
                  <p>You have requested <b>{{sent.lender.name}}</b>'s book {{formatDistance(new Date(), new Date(sent.created_at))}} ago</p>

                  <div class="text-center">
                    <router-link :id="sent.conversation_id" class="genric-btn success circle" v-show="sent.status === 'accepted'" :to="'/conversations/' + sent.conversation_id +'/messages'">Go to Conversation</router-link>
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
        sent_requests: [],
      }
    },
    created () {
      if(this.$store.state.signedIn){
        this.fetchSentRequests()
      } else {
        this.$router.push('/login')
      }
    },
    methods: {
      fetchSentRequests () {
        this.$http.get('book_activities?type=sent')
          .then(response => {
            this.sent_requests = response.data['book_activities']
          })
      }
    }
  }
</script>

<style>
  .whole-wrap {
    min-height: 300px;
  }
</style>
