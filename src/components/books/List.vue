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
              <h3 class="exp_title text-center" v-if="!this.$store.getters.data.latitude">Please allow Zajel to access your location</h3>
              <h3 class="exp_title text-center">{{this.metadata.count}} Books are available</h3>
              <div class="col-xl-12 page_nation text-center">
                <paginate
                  :page-count="this.metadata.total_pages || 1"
                  :margin-pages="1"
                  :click-handler="paginateCallback"
                  :no-li-surround=true
                  active-class="active">
                </paginate>
              </div>
              <div class="row">
                <div v-for=" book in books" class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                  <div class="single_explorer">
                    <div class="thumb">
                      <img :src="book.image">
                    </div>
                    <div class="explorer_bottom d-flex">
                      <div class="explorer_info">
                        <h3><router-link :to="'books/' + book.id">{{book.title}}</router-link></h3>
                        <p>{{book.genre}}</p>
                        <p><i style="font-size:24px; color: red" class="fa fa-map-marker"></i> {{book.distance === 0 ? 'few meters away!' : book.distance + ' km away'}}</p>
                      </div>
                    </div>
                  </div>
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
      books: [],
      metadata: {},
      location_data: {
        location: null,
        gettingLocation: false,
        errorStr: null
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData(pageNumber) {
      let requestParams = {
        page: pageNumber,
        per_page: 21,
        latitude: this.$store.getters.data.latitude,
        longitude: this.$store.getters.data.longitude
      }
      this.$http.get('books', {params: requestParams})
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
