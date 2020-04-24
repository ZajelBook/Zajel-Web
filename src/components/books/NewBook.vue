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
    <div class="section-top-border">
      <div class="row">
        <div class="col-lg-6 col-md-6 offset-md-3 col-10 offset-1 ">
          <u><h3 class="mb-30">Add new book</h3></u>
          <form @submit.prevent="submit">
            <div class="mb-3">
              <label for="title">Title</label>
              <input type="text" class="form-control" id="title" placeholder="Book title" v-model="title" required>
            </div>

            <div class="mb-3">
              <label for="author">Author</label>
              <input type="text" class="form-control" id="author" placeholder="Book author" v-model="author" required>
            </div>

            <div class="mb-3">
              <label for="page_count">Page count</label>
              <input type="number" class="form-control" id="page_count" min="1" placeholder="Book page count" v-model="page_count" required>
            </div>

            <div class="mb-3">
              <label for="published_at">Published at</label>
              <input type="number" class="form-control" id="published_at" max="2020" placeholder="Book published at" v-model="published_at" required>
            </div>

            <div class="mb-3">
              <label>Language</label>
              <v-select :options="languages" placeholder="Select book language" class="style-chooser" @input="setLanguage"></v-select>
            </div>

            <div class="mb-3">
              <label>Genre</label>
              <v-select :options="genres" placeholder="Select genre" label="name" class="style-chooser" @input="setGenre"></v-select>
            </div>

            <div class="mb-3">
              <label for="description">Description</label>
              <textarea class="form-control" id="description" rows="5" placeholder="Book description" v-model="description" required></textarea>
            </div>

            <div class="mt-10">
              <label for="file-upload" class="custom-file-upload" id="file-upload-label">
                <i class="fa fa-cloud-upload"></i> Choose book cover
              </label>
              <span id="file-selected"></span>
              <input id="file-upload" type="file" accept="image/*" @change="uploadImage($event)" />
            </div>

            <div class="mt-10">
              <small>* Your book needs to be approved by Zajel moderators after submission </small>
            </div>

            <div class="mt-10">
              <button type="submit" class="genric-btn primary circle arrow">Submit</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        genres: [],
        languages: [],
        title: '',
        description: '',
        author: '',
        page_count: '',
        language: '',
        image: '',
        published_at: '',
        genre_id: ''
      }
    },
    created () {
      // @todo move to before enter
      this.$http.get('metadata/')
      .then(response => {
        this.genres = response.data['genres'];
        this.languages = response.data['languages'];
      })
    },
    methods: {
      setLanguage(value){
        this.language = value
      },
      setGenre(value){
        this.genre_id = value.id

      },
      submit () {
        let data = new FormData();
        data.append('title', this.title);
        data.append('description', this.description);
        data.append('author', this.author);
        data.append('page_count', this.page_count);
        data.append('language', this.language);
        data.append('published_at', this.published_at);
        data.append('genre_id', this.genre_id);
        data.append('image', this.image, this.image.name);
        this.$http.post('books', data).then(response => {
          this.$router.replace('/books/by_name/' + response.body.friendly_id);
        })
      },
      uploadImage (event) {
        $('#file-selected').text(event.target.files[0].name);
        this.image = event.target.files[0];
      }
    }
  }
</script>

<style>
  /*.style-chooser .vs__search::placeholder,*/
  /*.style-chooser .vs__dropdown-toggle,*/
  /*.style-chooser .vs__dropdown-menu {*/
  /*  color: #000;*/
  /*  border-radius: 0;*/

  /*  width: 100%;*/
  /*  line-height: 60px;*/
  /*  border: none;*/
  /*  outline: none;*/
  /*  background: #f9f9ff;*/
  /*}*/

  /*.style-chooser .vs__clear,*/
  /*.style-chooser .vs__open-indicator {*/
  /*  fill: #394066;*/
  /*}*/

  /*.style-chooser .vs__dropdown-toggle {*/
  /*  -webkit-transition: all 0.3s ease 0s;*/
  /*  -moz-transition: all 0.3s ease 0s;*/
  /*  -o-transition: all 0.3s ease 0s;*/
  /*  transition: all 0.3s ease 0s;*/
  /*  line-height: 28px;*/
  /*  min-height: 28px;*/
  /*  font-size: 16px;*/
  /*  padding-left: 10px;*/
  /*}*/

  input[type="file"] {
    display: none;
  }

  .custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
  }
</style>

