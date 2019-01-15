<template>
  <div>
    <header :class="{barFixed: tabBar.tabIsFixed}">
      <div class="headerContent content">
        <router-link to="/adinput" v-show="tabBar.buttonShow"
        >
          <div class="nextBtn">审核下一个</div>
        </router-link>
      </div>
    </header>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'mainHeader',
  computed: {
    ...mapGetters([
      'tabBar'
    ])
  }
}
</script>

<style lang="scss" text="text/scss" scoped>
  header {
    border-bottom: 1px solid rgba(220, 223, 234, 1);
  }

  .nextBtn {
    float: right;
    width: 120px;
    height: 40px;
    background: rgba(52, 133, 251, 1);
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
    margin-top: 20px;
  }

  .content {
    max-width: 1280px;
    width: 89%;
    margin: 0 auto;
  }

  .headerContent {
    line-height: 80px;
    height: 80px;
    background: url("../assets/image/homeLogo.png") no-repeat center left;
    background-size: 266px 40px;
  }

  .barFixed {
    position: fixed;
    width: 100%;
    background: #fff;
  }
</style>
