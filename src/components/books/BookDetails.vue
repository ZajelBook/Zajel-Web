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
    <div class="whole-wrap">
      <div class="container box_1170">
        <div class="section-top-border">
          <div class="row">
            <div class="col-md-4">
              <div class="mb-20">
                <img :src="this.book.image" class="img-fluid" alt="book_image">
                <p class="text-center mt-2" v-if="!(this.$store.getters.data.user_id == this.book.owner_id)"><i style="font-size:24px; color: red" class="fa fa-map-marker"></i> {{book.distance === 0 ? 'few meters away!' : book.distance + ' km away'}}</p>
              </div>
              <div class="text-center mb-20" v-if="this.$store.getters.data.signedIn && !(this.book.owner_id == this.$store.getters.data.user_id)">
                <button @click="borrow(book.id)" id="borrow" class="genric-btn primary circle arrow" v-show="!this.book.requested && this.book.status === 'available'">Send borrow request</button>
                <button @click="cancel(book.id)" id="cancel" class="genric-btn primary-border circle arrow" v-show="this.book.requested && this.book.status === 'available'">Cancel borrow request</button>
                <button id="disabled" class="genric-btn disable radius circle arrow" v-show="this.book.status === 'borrowed'">Book is unavailable</button>
              </div>
              <div class="text-center mb-20" v-else-if="this.$store.getters.data.signedIn && this.book.owner_id == this.$store.getters.data.user_id">
                <router-link class="genric-btn primary circle arrow" :to=" this.book.friendly_id+'/edit'">update book details</router-link>
              </div>

              <div class="text-center mb-20" v-else-if="!this.$store.getters.data.signedIn">
                <router-link class="genric-btn primary circle arrow" to="/login">Login</router-link>
              </div>
            </div>
            <div class="col-md-8 mt-sm-20">
              <div class="mb-30">
                <h2>{{this.book.title}}</h2>
                <small>{{this.book.page_count}} pages</small>
                <small> | by: <b>{{this.book.author}}</b></small>
                |
                <div v-if="this.book.approved === false" class="badge badge-primary" role="alert">
                  Under review
                </div>
                <div v-else-if="this.book.status === 'available'" class="badge badge-success" role="alert">
                  {{this.book.status}}
                </div>
                <div v-else-if="this.book.status === 'unavailable'" class="badge badge-danger" role="alert">
                  {{this.book.status}}
                </div>
                <div v-else class="badge badge-info" role="alert">
                  {{this.book.status}}
                </div>
              </div>

              <p>{{this.book.language}} | {{this.book.genre}}</p>
              <span style="white-space: pre-wrap;">{{this.book.description}}</span>
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
        book: this.$store.getters.data.book
      }
    },
    created () {
      //
    },
    methods: {
      borrow (book_id) {
        this.$http.post('book_activities', {
          book_id: book_id
        }).then( response => {
          this.fetchData()
        })
      },
      cancel (book_id) {
        this.$http.delete('book_activities/' + book_id ).then( response => {
          this.fetchData()
        })
      }
    }
  }
</script>
