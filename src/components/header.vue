<template>
  <div>
    <header>
      <div class="headerContent content"></div>
    </header>
  </div>
</template>
<script>
export default {
  name: 'mainHeader'
}
</script>

<style lang="scss" text="text/scss" scoped>
  header{
    border-bottom: 1px solid rgba(220, 223, 234, 1);
  }
  .content{
    width: 1280px;
    margin: 0 auto;
  }
  .headerContent{
    line-height: 80px;
    height: 80px;
    background:  url("../assets/image/homeLogo.png") no-repeat center left;
    background-size: 226px 40px;
  }
</style>
