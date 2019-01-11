<template>
  <div>
    <div class="adInput">
      <div class="header">
        <ul class="tabWrap">
          <li class="active">
            <i></i> 文字审核
          </li>
          <li class="image">
            <i></i> 图片审核
          </li>
          <li class="web">
            <i></i> 网址审核
          </li>
        </ul>
        <ul class="selectWrap">
          <li><i class="industry"></i>行业
          </li>
          <li>
            <el-select v-model="value" placeholder="请选择" size="small">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li><i class="area"></i>地区</li>
          <li>
            <el-select v-model="value" placeholder="请选择" size="small">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
        </ul>
      </div>
      <div class="inputWrap">
        <el-input type="textarea" class="inputCon" resize="none" v-model="article"></el-input>
        <div class="inputBtn"><span class="clear">清空</span><span class="writeNum">{{article.length}}字/2000字</span></div>
      </div>
      <div class="inputBottom">
        <router-link to="/result">
          <div class="btn"></div>
        </router-link>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>
<script>
import mainFooter
  from '../components/footer'

export default {
  name: 'AdInput',
  data () {
    return {
      article: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  components: {
    mainFooter
  }
}
</script>
<style scoped text="text/scss" lang="scss">
  /deep/.selectWrap .el-input__inner {
    font-size: 12px;
    height: 20px;
    line-height:  20px;
    width: 113px;
    background:rgba(241,243,250,1);
    border-radius:18px;
  }
  /deep/ .selectWrap .el-input__suffix{
    top: 5px;
  }
  /deep/ .selectWrap .is-focus .el-input__suffix{
    top: -5px;
  }
  .selectWrap{
    color:rgba(68,74,85,1);
    font-size: 14px;
    float: right;
    li{
      float: left;
    }
    li:nth-of-type(2) {
      margin-right: 38px;
    }
    li:nth-of-type(2n) {
      margin-left: 28px;
    }
    i{
      display: inline-block;
      width:20px;
      height:20px;
      vertical-align: top;
      margin-right: 12px;
    }
    .industry{
      background: url("../assets/image/industryIcon.png") no-repeat;
      background-size: contain;
    }
    .area{
      background: url("../assets/image/areaIcon.png") no-repeat;
      background-size: contain;
    }
  }
  .inputBottom{
    height: 88px;
    width: 950px;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }
  .btn{
    cursor: pointer;
    display: inline-block;
    width: 203px;
    height: 41px;
    background: url("../assets/image/smartBtn.png") no-repeat;
    background-size: 203px 41px;
  }
  .inputWrap {
    height: calc( 69.3vh - 178px);
    background: green;
    box-sizing: border-box;
    background:rgba(241,243,250,1);
    padding: 18px 24px;
    border-radius:13px;
    position: relative;
    .inputBtn{
      position: absolute;
      right: 24px;
      bottom: 18px;
    }
    .clear{
      color:rgba(132,144,166,1);
      cursor: pointer;
      font-size: 12px;
      margin-right: 16px;
    }
    .writeNum{
      color:rgba(182,190,207,1);
      font-size: 12px;
    }
  }
  /deep/.inputCon textarea{
    height: calc( 69.3vh - 240px);
    left: 24px;
    box-sizing: border-box;
    background:rgba(241,243,250,1);
    border: none;
    padding: 0;
  }
  .adInput {
    width: 1000px;
    height: 69.3vh;
    background: rgba(255, 255, 255, 1);
    border-radius: 13px;
    margin: 3.3vh auto 0 auto;
    box-sizing: border-box;
    border: 1px solid rgba(241, 243, 250, 1);
    padding: 0 24px 24px 24px;
  }

  .header {
    height: 90px;
    position: relative;
    .tabWrap {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      overflow: hidden;
      li {
        width: 147px;
        height: 41px;
        line-height: 41px;
        border-radius: 40px;
        text-align: center;
        float: left;
        color: rgba(132, 144, 166, 1);
        font-size: 14px;
        cursor: pointer;
        i {
          display: inline-block;
          vertical-align: middle;
          width: 20px;
          height: 20px;
        }
        .text {

        }
      }
      li:nth-of-type(1) {
        i {
          background: url("../assets/image/textIcon.png") no-repeat;
          background-size: contain;
        }
      }

      li:nth-of-type(2) {
        i {
          background: url("../assets/image/imageIcon.png") no-repeat;
          background-size: contain;
        }
      }

      li:nth-of-type(3) {
        i {
          background: url("../assets/image/webIcon.png") no-repeat;
          background-size: contain;
        }
      }
    }
    .active {
      background: #E3EEFD;
      color: rgba(52, 133, 251, 1);
    }
  }
</style>
