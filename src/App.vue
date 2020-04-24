<template>
  <div>
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import 'bootstrap'
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'vue-select/dist/vue-select.css';

  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';

  export default {
    components: {
      appHeader: Header,
      appFooter: Footer
    }
  }
</script>

<style>
  @import './assets/css/font-awesome.min.css';
  @import './assets/css/style.css';
</style>

