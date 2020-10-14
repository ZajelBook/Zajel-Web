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
            <h3 class="exp_title text-center" v-if="this.metadata.count">You have added {{this.metadata.count}} books</h3>
            <h3 class="exp_title text-center" v-else-if="loading">Loading...</h3>
            <div class="mt-5 text-center" v-else>
              <h3 class="exp_title" >You haven't added any books yet. why don't you add some?</h3>
              <router-link class="genric-btn primary circle arrow" to="/books/new">Add book</router-link>
            </div>
            <div class="col-xl-12 page_nation text-center">
              <paginate
                  :page-count="this.metadata.total_pages || 1"
                  :margin-pages="1"
                  :click-handler="paginateCallback"
                  :no-li-surround=true
                  active-class="active"
                  v-if="this.metadata.count">
              </paginate>
              <br>
              <form @submit.prevent="submit">
                <div class="mb-3">
                  <input type="text" class="form-control" id="query" placeholder="Search for books" v-model="query">
                </div>

                <div class="mt-10">
                  <button type="submit" class="genric-btn primary circle arrow">Search</button>
                </div>

              </form>
            </div>


            <div class="row">
              <div v-for=" book in books" class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                <router-link :to="'books/by_name/' + book.friendly_id">
                  <div class="single_explorer">
                    <div class="thumb">
                      <img :src="book.image" alt="book_image">
                    </div>
                    <div class="explorer_bottom d-flex">
                      <div class="explorer_info">
                        <div id="book-title">{{book.title}}</div>
                        <p>{{book.genre}}</p>
                        <div v-if="!book.approved" class="badge badge-primary" role="alert">
                          under review
                        </div>
                        <div v-else-if="book.approved" class="badge badge-success" role="alert">
                          approved
                        </div>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
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
      query: '',
      books: [],
      metadata: {}
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    submit() {
      this.fetchData()
    },
    fetchData(pageNumber) {
      let requestParams = {
        page: pageNumber,
        per_page: 21,
        query: this.query
      }
      this.$http.get('my_books', {params: requestParams})
          .then(response => {
            this.books = response.data.books
            this.metadata = response.data.metadata
          }, error => {
            console.log(error);
          })
    },
    paginateCallback (pageNumber) {
      this.fetchData(pageNumber)
    }
  }
}
</script>
