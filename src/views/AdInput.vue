<template>
  <div class="adInputWrap">
    <div class="adInput">
      <div class="header">
        <ul>
          <li class="active">
            <i></i> 文字审核
          </li>
          <li class="image" @click="toggleTab">
            <i></i> 图片审核
          </li>
          <li class="web" @click="toggleTab">
            <i></i> 网址审核
          </li>
        </ul>
        <ul class="selectWrap">
          <li>
            <i class="industry"></i>
            <span>行业</span>
          </li>
          <li>
            <el-select v-model="selectIndustry" placeholder="请选择" size="small"
              popper-class="aaa">
              <el-option
                v-for="item in industryList"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </li>
          <li>
            <i class="area"></i>地区
          </li>
          <li>
            <el-select v-model="selectCity" placeholder="请选择" size="small">
              <el-option
                v-for="item in cityList"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </li>
        </ul>
      </div>
      <div class="inputWrap " :class="{isFocus: inputIsFocus}">
        <el-input type="textarea" class="inputCon" resize="none" v-model="article"
          @focus="inputFocus" @blur='inputBlur'></el-input>
        <div class="inputBtn">
          <span class="clear" @click="clearInput">清空</span>
        </div>
      </div>
      <div class="inputBottom">
        <!--<router-link to="/result">-->
        <!--</router-link>-->
        <div class="btn" @click="saveInput"></div>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>
<script>
import mainFooter
  from '../components/footer'
import {
  auditText,
  auditRegion,
  auditType
} from '@/api/examine.js'

export default {
  name: 'AdInput',
  data () {
    return {
      article: '',
      selectCity: '全国',
      selectIndustry: '',
      inputIsFocus: false,
      industryList: [],
      cityList: []
    }
  },
  components: {
    mainFooter
  },
  created () {
    this.fetchArea()
    this.fetchAuditType()
  },
  methods: {
    fetchArea () {
      auditRegion().then((res) => {
        if (res.data.code === 1) {
          this.cityList = res.data.result.map((item, index) => {
            return {
              value: item,
              label: item
            }
          })
        } else {
          this.$message.error(this.data.msg)
        }
      })
    },
    fetchAuditType () {
      auditType().then((res) => {
        if (res.data.code === 1) {
          this.industryList = res.data.result.map((item, index) => {
            return {
              value: item,
              label: item
            }
          })
        } else {
          this.$message.error(this.data.msg)
        }
      })
    },
    toggleTab () {
      this.$message({
        message: '此功能还在努力开发中哟',
        type: 'warning'
      })
    },
    saveInput () {
      const sendData = {
        region: this.selectCity,
        text: this.article.trim(),
        type: this.selectIndustry
      }
      if (!sendData.type) {
        this.$message.error('请选择行业')
        return
      }
      if (!sendData.text) {
        this.$message.error('请输入需要审核的内容')
        return
      }
      console.log(sendData)
      auditText(sendData).then((res) => {
        if (res.data.code === 1) {
          this.$store.dispatch('saveResult', res.data.result)
          sessionStorage.setItem('saveResult', JSON.stringify(res.data.result))
          sessionStorage.setItem('article', sendData.text)
          this.$router.push({
            path: '/result',
            query: {
              selectIndustry: this.selectIndustry,
              selectCity: this.selectCity
            }
          })
        } else {
          this.$message.error(this.data.msg)
        }
      })
    },
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
  .adInputWrap {
    height: 80vh;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(240, 245, 255, 1) 50%, rgba(240, 245, 255, 1) 100%);
  }

  /deep/ .selectWrap .el-input__inner {
    font-size: 12px;
    height: 24px;
    line-height: 24px;
    width: 113px;
    background: rgba(241, 243, 250, 1);
    border-radius: 18px;
  }

  .selectWrap {
    font-size: 14px;
    float: right;

    li {
      float: left;
      height: 41px;
    }

    li:nth-of-type(2) {
      margin-right: 38px;
    }

    li:nth-of-type(2n) {
      margin-left: 12px;
    }

    i {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
      margin-right: 12px;
    }

    .industry {
      background: url("../assets/image/industryIcon.png") no-repeat;
      background-size: contain;
    }

    .area {
      background: url("../assets/image/areaIcon.png") no-repeat;
      background-size: contain;
    }
  }

  .inputBottom {
    height: 88px;
    width: 950px;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }

  .btn {
    cursor: pointer;
    display: inline-block;
    width: 203px;
    height: 41px;
    background: url("../assets/image/smartBtn.png") no-repeat;
    background-size: 203px 41px;
  }

  .inputWrap {
    height: calc(69.3vh - 178px);
    background: green;
    box-sizing: border-box;
    background: rgba(241, 243, 250, 1);
    padding: 18px 24px;
    border-radius: 13px;
    position: relative;

    &.isFocus {
      box-shadow: 0 0 0 2px #9DD2FF;
    }

    .inputBtn {
      position: absolute;
      right: 24px;
      bottom: 18px;
    }

    .clear {
      color: rgba(132, 144, 166, 1);
      cursor: pointer;
      font-size: 12px;
      margin-right: 0;
    }

    .writeNum {
      color: rgba(182, 190, 207, 1);
      font-size: 12px;
    }
  }

  /deep/ .inputCon textarea {
    height: calc(69.3vh - 240px);
    left: 24px;
    box-sizing: border-box;
    background: rgba(241, 243, 250, 1);
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
    .active {
      background: #E3EEFD;
      color: rgba(52, 133, 251, 1);
    }

    height: 41px;
    line-height: 41px;
    padding: 24px 0;

    li {
      float: left;
    }

    ul:nth-of-type(1) {
      float: left;
      line-height: 41px;

      li {
        width: 147px;
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

        &:nth-of-type(1) {
          i {
            background: url("../assets/image/textIcon.png") no-repeat;
            background-size: contain;
          }
        }

        &:nth-of-type(2) {
          i {
            background: url("../assets/image/imageIcon.png") no-repeat;
            background-size: contain;
          }
        }

        &:nth-of-type(3) {
          i {
            background: url("../assets/image/webIcon.png") no-repeat;
            background-size: contain;
          }
        }
      }
    }

    ul:nth-of-type(2) {
      float: right;
    }
  }

  /deep/ .el-select-dropdown__item.selected {
    color: #409EFF;
    font-weight: 400
  }
</style>
