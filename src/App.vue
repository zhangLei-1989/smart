<template>
  <div id="app">
    <main-header></main-header>
    <router-view/>
  </div>
</template>
<script>
import mainHeader
  from './components/header'

export default {
  name: 'home',
  data () {
    return {}
  },
  components: {

    mainHeader
  }
}
</script>
<style>
  @import "style/normailze.css";
</style>
