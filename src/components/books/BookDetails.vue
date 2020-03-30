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
                <img :src="this.book.image" class="img-fluid">
              </div>
              <div class="text-center mb-20" v-if="this.$store.getters.data.signedIn">
                <button @click="borrow" id="borrow" class="genric-btn primary circle arrow" v-show="!this.book.requested && this.book.status === 'available'">Send borrow request</button>
                <button @click="cancel" id="cancel" class="genric-btn primary-border circle arrow" v-show="this.book.requested && this.book.status === 'available'">Cancel borrow request</button>
                <button id="disabled" class="genric-btn disable radius circle arrow" v-show="this.book.status === 'borrowed'">Book is unavailable</button>
              </div>
            </div>
            <div class="col-md-8 mt-sm-20">
              <h2 class="mb-30">{{this.book.title}}</h2>
                <p>By: <u>{{this.book.author}}</u></p>
                <p>{{this.book.language}}</p>
                <p>{{this.book.genre}}</p>
                <p>{{this.book.description}}</p>
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
      book: {}
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$http.get('books/' + this.$route.params.id)
      .then(response => {
        return response.json();
      }, error => {
        console.log(error);
      }).then(data => {
        this.book = data
      })
    },
    borrow () {
      this.$http.post('book_activities', {
        book_id: this.$route.params.id
      }).then( response => {
        this.fetchData()
      })
    },
    cancel () {
      this.$http.delete('book_activities/' + this.$route.params.id ).then( response => {
        this.fetchData()
      })
    }
  }
}
</script>
