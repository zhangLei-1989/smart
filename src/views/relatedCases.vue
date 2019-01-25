<template>
  <div class="relatedCases">
    <div class="titleWrap">
      <div class="title">
        <div class="keyWordWrap">
          <span class="keyWord">关键词：</span>
          <span>{{this.$route.query.type}}</span>
          <span class="view">查看：</span>
          <span class="doBtn" @click="first">第一个</span>
          <span class="doBtn" @click="prev">上一个</span>
          <span class="doBtn" @click="next">下一个</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="articleTitle">
        <h2>{{result.title}}</h2>
        <p>{{result.institution}} | {{result.caseflag}} | {{result.punish_time}}</p>
      </div>
      <div class="articleCon">
        <div class='partiesConcerned'> 当事人：
          <span>山东广播电视台 </span>
        </div>
        <div v-html="result.pdf_format_content">
        </div>
      </div>
    </div>
    <main-footer :changeClass="true"></main-footer>
  </div>
</template>

<script>
import mainFooter
  from '../components/footer'
import { auditSimilar } from '@/api/examine.js'

export default {
  name: 'relatedCases',
  data () {
    return {
      currentIndex: 0,
      textIndexArr: [],
      result: {
      }
    }
  },
  methods: {
    scrollTo (index) {
      document.body.scrollTop = document.documentElement.scrollTop = Math.floor(this.textIndexArr[index] / 60) * 30
    },
    first () {
      document.querySelectorAll('.miao')[this.currentIndex].className = 'miao'
      this.currentIndex = 0
      document.querySelectorAll('.miao')[this.currentIndex].className += ' selectActive'
      this.scrollTo(this.currentIndex)
    },
    next () {
      if (this.currentIndex >= this.textIndexArr.length - 1) {
        return
      }
      document.querySelectorAll('.miao')[this.currentIndex].className = 'miao'
      this.currentIndex += 1
      document.querySelectorAll('.miao')[this.currentIndex].className += ' selectActive'
      this.scrollTo(this.currentIndex)
    },
    prev () {
      if (this.currentIndex <= 0) {
        this.currentIndex = 0
        return
      }
      document.querySelectorAll('.miao')[this.currentIndex].className = 'miao'
      this.currentIndex -= 1
      document.querySelectorAll('.miao')[this.currentIndex].className += ' selectActive'
      this.scrollTo(this.currentIndex)
    },
    searchSubStr (str, subStr) {
      var arr = []
      let pos = str.indexOf(subStr)
      while (pos > -1) {
        arr.push(pos)
        pos = str.indexOf(subStr, pos + 1)
      }
      return arr
    },
    fetchData () {
      const that = this
      const data = {
        id: this.$route.query.id
      }
      auditSimilar(data).then((res) => {
        if (res.data.code === 1) {
          let str = res.data.result['_source']['pdf_format_content']
          let reg = new RegExp(this.$route.query.type, 'g')
          this.result = res.data.result['_source']
          let i = 0
          let arr = []
          this.result['pdf_format_content'] = str.replace(reg, function (text, textIndex, index, msg) {
            i++
            arr.push(textIndex)
            return `<span data-index="${i}" class="miao">${text}</span>`
          })
          that.textIndexArr = arr
          console.log(document.querySelectorAll('.miao'))
          setTimeout(function () {
            document.querySelectorAll('.miao')[0].className += ' selectActive'
          }, 100)
        }
      })
    }
  },
  mounted () {
  },
  created () {
    this.$store.dispatch('toggleTopFixed', true)
    this.fetchData()
  },
  components: {
    mainFooter
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('toggleTopFixed', false)
    next()
  }
}
</script>

<style scoped text="text/scss" lang="scss">
  .relatedCases {
    overflow: hidden;
    background: #F0F5FF;
    padding-top: 100px;
  }

  .view {
    color: rgba(132, 144, 166, 1);
    font-size: 12px;
    margin: 0 6px 0 24px;
  }

  .articleCon {
    line-height: 30px;
    color: #444A55;
    font-size: 16px;
    .partiesConcerned {
      padding-bottom: 20px;
    }
    word-break: break-all;
  }

  .articleTitle {
    text-align: center;
    padding-top: 100px;
    h2 {
      margin: 32px 0 16px 0;
      color: #444a55;
      font-size: 20px;
    }

    p {
      color: rgba(132, 144, 166, 1);
      font-size: 14px;
      margin: 0 0 32px 0;
    }
  }

  .title {
    border-bottom: 1px solid #DCDFEA;
    overflow: hidden;
    padding: 16px;
    background: #fff;
    width: 968px;
    margin: 0 auto;
    box-shadow: 0 -24px 0   #F0F5FF;
    border-radius: 10px 10px 0 0;
  }

  .content {
    width: 1000px;
    margin: 0 auto 48px auto;
    box-sizing: border-box;
    padding: 0 32px 32px 32px;
    background: #fff;
  }

  .keyWordWrap, .doList {
    float: left;
  }

  .keyWordWrap {
    color: #3485FB;
    font-size: 14px;
    .keyWord {
      font-size: 14px;
      color: #444a55;
    }
  }

  .doList {
    span:nth-of-type(1) {
      margin: 0 17px 0 24px;
    }
  }

  .doBtn {
    display: inline-block;
    background: rgba(241, 243, 250, 1);
    border-radius: 4px;
    border: 1px solid rgba(220, 223, 234, 1);
    color: rgba(132, 144, 166, 1);
    line-height: 17px;
    margin-right: 10px;
    font-size: 12px;
    padding: 5px 14px;
    vertical-align: middle;
    cursor: pointer;
  }
  .titleWrap{
    height: 200px;
    width: 100%;
    position: fixed;
    top: 105px;
  }
</style>
<style>
  .miao{
    display: inline-block;
    padding: 0 3px;
  }
  .selectActive{
    background-color: #3485FB;
    display: inline-block;
    border-radius:4px;
    line-height: 24px;
    color: #fff;
  }
</style>
