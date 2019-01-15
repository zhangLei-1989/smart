<template>
  <div class="adInputWrap">
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
            <el-select v-model="selectIndustry" placeholder="请选择" size="small"
                       popper-class="aaa">
              <el-option
                v-for="item in industryList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li><i class="area"></i>地区</li>
          <li>
            <el-select v-model="selectCity" placeholder="请选择" size="small">
              <el-option
                v-for="item in cityList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
        </ul>
      </div>
      <div class="inputWrap " :class="{isFocus: inputIsFocus}" >
        <el-input type="textarea" class="inputCon" resize="none" v-model="article"
                  @focus="inputFocus" @blur='inputBlur'></el-input>
        <div class="inputBtn"><span class="clear" @click="clearInput">清空</span></div>
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
      selectCity: '',
      selectIndustry: '',
      inputIsFocus: false,
      industryList: [
        {
          value: 0,
          label: '保健食品'
        },
        {
          value: 1,
          label: '投资金融'
        },
        {
          value: 2,
          label: '房地产'
        },
        {
          value: 3,
          label: '电子商务'
        },
        {
          value: 4,
          label: '社交媒体'
        },
        {
          value: 5,
          label: '游戏'
        },
        {
          value: 6,
          label: '化妆品'
        },
        {
          value: 7,
          label: '服饰'
        },
        {
          value: 8,
          label: '汽车'
        },
        {
          value: 9,
          label: '旅游'
        },
        {
          value: 10,
          label: '电子产品'
        },
        {
          value: 11,
          label: '教育培训'
        },
        {
          value: 12,
          label: '家具家装'
        },
        {
          value: 13,
          label: '母婴玩具'
        },
        {
          value: 14,
          label: '影视娱乐'
        },
        {
          value: 15,
          label: '普通食品'
        },
        {
          value: 16,
          label: '法律咨询'
        },
        {
          value: 17,
          label: '信息服务'
        },
        {
          value: 18,
          label: '医药器械'
        },
        {
          value: 19,
          label: '医疗服务'
        },
        {
          value: 20,
          label: '其他'
        }
      ],
      cityList: [
        {
          value: '',
          label: '全国'
        },
        {
          value: '1',
          label: '北京'
        },
        {
          value: '2',
          label: '上海'
        },
        {
          value: '3',
          label: '广东'
        },
        {
          value: '4',
          label: '江苏'
        },
        {
          value: '5',
          label: '浙江'
        },
        {
          value: '6',
          label: '河北'
        },
        {
          value: '7',
          label: '四川'
        },
        {
          value: '8',
          label: '福建'
        },
        {
          value: '9',
          label: '安徽'
        },
        {
          value: '10',
          label: '湖南'
        },
        {
          value: '11',
          label: '其他'
        }
      ]
    }
  },
  components: {
    mainFooter
  },
  methods: {
    clearInput () {
      this.article = ''
    },
    inputFocus () {
      this.inputIsFocus = true
    },
    inputBlur () {
      this.inputIsFocus = false
    }
  }
}
</script>
<style scoped text="text/scss" lang="scss">
  .adInputWrap{
    height: 80vh;
    background:linear-gradient(to bottom,rgba(255, 255, 255, 1) 0%, rgba(240, 245, 255, 1) 50%,rgba(240, 245, 255, 1) 100%);
  }
  /deep/.selectWrap .el-input__inner {
    font-size: 12px;
    height: 24px;
    line-height:  24px;
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
    &.isFocus{
      box-shadow: 0 0 0  2px #9DD2FF;
    }
    .inputBtn{
      position: absolute;
      right: 24px;
      bottom: 18px;
    }
    .clear{
      color:rgba(132,144,166,1);
      cursor: pointer;
      font-size: 12px;
      margin-right: 0;
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
  /deep/.el-select-dropdown__item.selected{color:#409EFF;font-weight:400}
</style>
