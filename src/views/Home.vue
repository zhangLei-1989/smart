<template>
  <div class="home">
    <div class="main">
       <div class="mainContent content">
         <div class="mainLeft">
           <div class="titleText"></div>
           <div class="homeRule"></div>
           <router-link to="/adinput">
             <div class="startAudit"></div>
           </router-link>
         </div>
         <div class="mainRight"></div>
       </div>
     </div>
    <mainFooter></mainFooter>
  </div>
</template>
<script>
// @ is an alias to /src
import mainFooter
  from '../components/footer'

export default {
  name: 'home',
  data () {
    return {
    }
  },
  components: {
    mainFooter
  }
}
</script>
<style lang="scss" text="text/scss"  scoped>
  .home{
    background:linear-gradient(to bottom,rgba(255, 255, 255, 1) 0%, rgba(240, 245, 255, 1) 50%,rgba(240, 245, 255, 1) 100%);
  }
  .home{
    height: calc(100vh - 110px);
    overflow: hidden;
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
  .mainContent{
    margin-top: 8vh;
    &>div{
      height: 607px;
    }
    .mainRight{
      width:607px ;
      float: right;
      height: 557px;
      background: url("../assets/image/homeAd.png") no-repeat;
      background-size: contain;
    }
    .mainLeft{
      float: left;
    }
    .titleText{
      width: 298px;
      height: 132px;
      background: url("../assets/image/homeTitleText.png") no-repeat;
      background-size: contain;
      margin-bottom: 5.6vh;
    }
    .homeRule{
      width: 538px;
      height: 57px;
      background: url("../assets/image/homeRuleDesc.png") no-repeat;
      background-size: contain;
      margin-bottom: 8vh;
    }
    .startAudit{
      cursor: pointer;
      width:400px;
      height:80px;
      background: url("../assets/image/homeStartBtn.png") no-repeat;
      background-size: contain;
    }
  }
</style>
