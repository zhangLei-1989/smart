<template>
  <div>
    <footer :class="{noFixed:changeClass}">
      <div class="mainBg"></div>
      <div class="footerText">© Copyright北京华宇元典信息服务有限公司</div>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'mainFooter',
  props: {
    changeClass: {
      type: Boolean,
      default: false
    }
  },
  create () {
  }
}
</script>

<style lang="scss" text="text/scss" scoped>
  footer.noFixed {
    position: static;
  }
  .content{
    width: 1280px;
    margin: 0 auto;
  }
  footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    text-align: center;
    color: rgba(132, 144, 166, 1);

    .mainBg {
      height: 102px;
      width: 100%;
      background: url("../assets/image/footerBg.png") no-repeat center center;
      background-size: cover;
    }

    .footerText {
      width: 100%;
      line-height: 28px;
      height: 28px;
      border-bottom: 2px solid #fff;

      font-size: 12px;

      font-weight: 300;

      color: rgba(132, 144, 166, 1);

    }
  }
</style>
