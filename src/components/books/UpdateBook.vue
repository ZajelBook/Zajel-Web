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
                    <u><h3 class="mb-30">update book information</h3></u>
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
                            <input type="number" class="form-control" id="published_at" min="1900" max="2020" placeholder="Book published at" v-model="published_at" required>
                        </div>

                        <div class="mb-3">
                            <label>Language</label>
                            <v-select :options="languages" placeholder="Select book language" class="style-chooser" @input="setLanguage" v-model="language"></v-select>
                        </div>

                        <div class="mb-3">
                            <label>Genre</label>
                            <v-select :options="genres"
                                      placeholder="Select genre"
                                      label="name"
                                      class="style-chooser"
                                      @input="setGenre"
                                      v-model="genre"></v-select>
                        </div>

                        <div class="mb-3">
                            <label for="description">Published at</label>
                            <textarea class="form-control" id="description" rows="5" placeholder="Book description" v-model="description" required></textarea>
                        </div>

                        <div class="mt-10">
                            <img :src="this.current_image" width="100px" class="mb-3">
                            <br>
                            <label for="file-upload" class="custom-file-upload" id="file-upload-label">
                                <i class="fa fa-cloud-upload"></i> Choose book cover
                            </label>
                            <span id="file-selected"></span>
                            <input id="file-upload" type="file" accept="image/*" @change="uploadImage($event)" />
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
                genre: null,
                current_image: '',
                id: '',
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
            this.$http.get('metadata/')
                .then(response => {
                    this.genres = response.data['genres'];
                    this.languages = response.data['languages'];
                })
            this.$http.get('books/by_name/'+ this.$route.params.friendly_id)
            .then(response => {
                let book = response.data
                this.id = book.id
                this.title = book.title
                this.author = book.author
                this.page_count = book.page_count
                this.language = book.language
                this.genre_id = book.genre_id
                this.genre = this.genres.filter(function(genre) {
                    return genre.id === book.genre_id
                })
                this.published_at = book.published_at
                this.description = book.description
                this.current_image = book.image
                fetch(book.image)
                    .then(res => res.blob()) // Gets the response and returns it as a blob
                    .then(blob => {
                        this.image = blob
                    });
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
                this.$http.put('books/' + this.id, data).then(response => {
                    console.log(response.body);
                    this.$router.replace('/books/by_name/' + response.body.friendly_id);
                })
            },
            uploadImage (event) {
                $('#file-selected').text(event.target.files[0].name);
                this.image = event.target.files[0];
                this.current_image = URL.createObjectURL(event.target.files[0])
            }
        }
    }
</script>

<style>
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

