<template>
  <div class="result">
    <div class="content">
      <div class="header">
           <div class="evaluate">
             <div>0分</div>
             <div>综合评分</div>
           </div>
      </div>
    </div>
    <main-footer :changeClass="true"></main-footer>
  </div>
</template>

<script>
import mainFooter
  from '../components/footer'

export default {
  name: 'result',
  data () {
    return {
      aaa: '4224242342'
    }
  },
  components: {
    mainFooter
  },
  mounted () {
  }
}
</script>

<style scoped text="text/scss" lang="scss">
  .result{
    background: rgba(240, 245, 255, 1);
    overflow: hidden;
  }
  .evaluate{
    width:177px;
    height:177px;
    background:rgba(255,243,243,1);
    border:1px solid rgba(217,82,78,1);
    border-radius: 50%;
    div{
      text-align: center;
      margin: 0 auto;
      &:nth-of-type(1) {
        margin-top: 35px;
        font-size:40px;
        font-weight:600;
        color:rgba(217,82,78,1);
      }
      &:nth-of-type(2){
        width:58px;
        padding-top: 12px;
        margin-top: 20px;
        border-top: 1px solid rgba(217,82,78,1);
        font-size:14px;
        font-weight:400;
        color:rgba(217,82,78,1);
      }
    }
  }
  .content {
    width: 1280px;
    height: 800px;
    margin: 0 auto;
  }
  .header{
    margin-top: 24px;
    height:280px;
    background:rgba(255,255,255,1);
    border-radius:10px;
    box-sizing: border-box;
    padding: 52px 24px 51px 93px;
  }
</style>
