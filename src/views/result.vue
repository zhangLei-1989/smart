<template>
  <div class="result">
    <div class="content">
      <div class="header">
        <div class="evaluate">
          <div>{{result.score}}分</div>
          <div>综合评分</div>
        </div>
        <div class="tab">
          <ul>
            <li v-for="(item,index) in tabTopOption" :key="index" @click="toggleTab(item,index)"
                :class="{active: topTabIndex==index}">
              {{item.text}}：{{item.number}}处
            </li>
          </ul>
        </div>
        <div class="tabContent">{{tabContentText}}</div>
      </div>
    </div>
    <div class="articleContent " ref="articleContent">
      <div class="articleLeft" ref="articleLeft" :class="{leftFixed:isFixed}">
        <div>
          <div class="title">
            <span class="titleLeft">审核原文</span>
            <span class="areaDesc">{{this.$route.query.selectIndustry}} · {{this.$route.query.selectCity}}</span>
          </div>
          <div class="articleLeftCon" v-html="article" @click="findTarget($event)">
          </div>
        </div>
        <div>
          <dl class="friendTips">
            <dt>友情提示</dt>
            <dd>1、广告内容应当与许可内容相符合</dd>
            <dd>2、保健食品广告应显著标明“本品不能代替药物”字样。</dd>
            <dd>3、保健食品广告中应当含有保健食品的批准文号。</dd>
            <dd>4、不得以新闻报道形式变相发布广告。</dd>
            <dd>5、除商标用字外，广告用语不得使用繁体字、错别字、已废止异体字和简化字。</dd>
          </dl>
        </div>
      </div>
      <div class="articleRight" ref="articleRight">
        <div class="title" :class="{fixed:isFixed}" :style="articleRightTab">
          <ul>
            <li v-for="(item,index) in rightTabOption" :key="index" :class="[item.nowClass, item.activeClass]"
            @click="changRightTab(item,index)">
              <i></i>{{item.text}}
            </li>
          </ul>
        </div>
        <div class="articleRightCon" :class="{articleRightConFxed:isFixed}">
          <div class="note">*相关案例按相关度从高到低排序</div>
          <div class="item" v-for="(item, index) in filterList" :key="index" :ref="'miao'+index">
            <div class="itemTitle"
             :class="{breakLaw: item.riskLevel=='涉嫌违法',risk: item.riskLevel=='高风险',evaluate: item.riskLevel=='需佐证',needSure: item.riskLevel=='应明确'}">
              <i class="itemNum">{{index+1}}</i>
              <span>{{item.name}}</span>
            </div>
            <ul class="listWrap">
              <li>
                <div class="itemOption">风险等级：</div>
                <div class="itemContent">{{item.riskLevel}}</div>
              </li>
              <li>
                <div class="itemOption">违规事由：</div>
                <div class="itemContent">{{item.reason}}</div>
              </li>
              <li v-for="(item2, index2) in item.illegal" :key="index2">
                <div class="itemOption">违规依据：</div>
                <div class="itemContent reason">{{item2.name}}</div>
                <div class="itemOption">违规内容：</div>
                <div class="itemContent">{{item2.content}}</div>
              </li>
              <li>
                <div class="itemOption" v-show="item.similar.length>0">相关案例：</div>
                <div class="itemContent">
                  <ol>
                    <li v-for="(item3, index) in item.similar" :key="index">
                      <p @click="goRelatedCase(item3.id,item.name)">{{item3.title}}</p>
                      <span>{{item3.institution}} [{{item3.punishTime}}]</span>
                    </li>
                  </ol>
                </div>
              </li>
            </ul>
          </div>
          <div class="liability">
            免责声明：本产品提供的广告文案审核结果及相关建议仅供您参考，不构成任何法律意见或对广告合规性的保证。请自行对您的广告合规性 承担责任。
          </div>
        </div>
      </div>
    </div>
    <div class="footerText">© Copyright北京华宇元典信息服务有限公司</div>
  </div>
</template>

<script>
export default {
  name: 'result',
  data () {
    return {
      result: {},
      posTop: [],
      topIndex: 0,
      boundingTop: [],
      isFixed: false,
      articleContentWidth: 0,
      articleRightWidth: 0,
      topTabIndex: 0,
      rightTabIndex: 0,
      tabContentText: '',
      currentRiskLevel: '全部',
      listVo: [],
      article: '',
      tabTopOption: [
        {
          text: '涉嫌违法',
          code: '',
          number: 5
        },
        {
          text: '高风险',
          code: '',
          number: 1
        },
        {
          text: '需佐证',
          code: '',
          number: 3
        },
        {
          text: '应明确',
          code: '',
          number: 1
        }
      ],
      rightTabOption: [
        {
          text: '全部',
          code: '',
          nowClass: 'all',
          activeClass: {
            'active': true
          }
        },
        {
          text: '涉嫌违法',
          code: '',
          nowClass: 'breakLaw',
          activeClass: {
            'active': false
          }
        }, {
          text: '高风险',
          code: '',
          nowClass: 'risk',
          activeClass: {
            'active': false
          }
        },
        {
          text: '需佐证',
          code: '',
          nowClass: 'evidence',
          activeClass: {
            'active': false
          }
        },
        {
          text: '应明确',
          code: '',
          nowClass: 'needSure',
          activeClass: {
            'active': false
          }
        }
      ]
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('toggleBtnFixed', false)
    next()
  },
  computed: {
    filterList () {
      let list = []
      if (this.currentRiskLevel === '全部') {
        list = this.listVo
      } else {
        list = this.listVo.filter((item) => this.currentRiskLevel === item.riskLevel)
      }
      return list
    },
    articleRightStyle () {
      if (!this.articleContentWidth || !this.articleRightWidth) {
        return {}
      } else {
        if (this.isFixed) {
          return {
            width: `${this.articleContentWidth - this.articleRightWidth - 16}px !important`
          }
        } else {
          return {}
        }
      }
    },
    articleRightTab () {
      if (!this.articleRightWidth) {
        return {}
      } else {
        if (this.isFixed) {
          return {
            width: `${this.articleRightWidth}px !important`
          }
        } else {
          return {}
        }
      }
    }
  },
  created () {
    this.$store.dispatch('toggleBtnFixed', true)
  },
  mounted () {
    window.addEventListener('scroll', this.watchScroll)
    this.initData()
    console.log(document.querySelector('.articleRight'))
    this.articleRightWidth = this.getStyle(document.querySelector('.articleRight'), 'width')
    this.articleContentWidth = this.getStyle(this.$refs.articleContent, 'width')
  },
  components: {
  },
  methods: {
    goRelatedCase (id, type) {
      const { href } = this.$router.resolve({
        path: `/relatedCases`,
        query: {
          id,
          type
        }
      })
      window.open(href, '_blank')
    },
    findTarget (e) {
      this.rightTabOption[this.rightTabIndex].activeClass['active'] = false
      this.rightTabOption[0].activeClass['active'] = true
      this.rightTabIndex = 0
      this.currentRiskLevel = '全部'
      setTimeout(() => {
        const attr = e.target.getAttribute('data-riskLevel')
        const index = e.target.getAttribute('data-index')
        if (!attr) {
          return
        }
        let dist = 0
        dist = this.posTop[index] - this.posTop[0]
        document.body.scrollTop = document.documentElement.scrollTop = Math.max(380 + Math.abs(dist) - 40, 380)
        this.topIndex = index
      }, 0)
    },
    initData () {
      const result = JSON.parse(sessionStorage.getItem('saveResult'))
      this.result = result
      let str = sessionStorage.getItem('article')
      this.tabTopOption.forEach((item) => {
        item.code = result.scoreVo[item.text].join('   ')
        item.number = result.scoreVo[item.text].length
      })
      this.listVo = result.listVo
      // 处理左侧文本
      this.result.key.forEach((item, index) => {
        let reg = new RegExp(item.name, 'g')
        let className = ''
        switch (item.riskLevel) {
          case '涉嫌违法':
            className = 'breakLaw'
            break
          case '高风险':
            className = 'risk'
            break
          case '需佐证':
            className = 'evaluate'
            break
          case '应明确':
            className = 'needSure'
            break
        }
        str = str.replace(reg, `<span class=" textFlag ${className}" data-riskLevel="${item.riskLevel}"
           data-index="${index}">${item.name}</span>`)
      })
      this.article = str
      this.tabContentText = result.scoreVo['涉嫌违法'].join('  ')
      setTimeout(() => {
        for (var i = 0; i < this.filterList.length; i++) {
          var flag = 'miao' + i
          this.posTop.push(this.$refs[flag][0].offsetTop)
        }
      }, 200)
    },
    updated () {
    },
    toggleTab (item, index) {
      this.tabContentText = item.code
      this.topTabIndex = index
    },
    changRightTab (item, index, flag) {
      if (this.rightTabIndex !== index) {
        this.rightTabOption[this.rightTabIndex].activeClass['active'] = false
        item.activeClass['active'] = true
        this.rightTabIndex = index
        this.currentRiskLevel = item.text
      }
      if (this.isFixed) {
        document.body.scrollTop = document.documentElement.scrollTop = 380
      }
    },
    watchScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 380) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    getStyle (obj, styleName) {
      if (obj.currentStyle) {
        return obj.currentStyle[styleName]
      } else {
        return getComputedStyle(obj, null)[styleName]
      }
    }
  }
}
</script>

<style scoped text="text/scss" lang="scss">
  .articleRight {
    .title {
      background: #fff;
      border-radius: 10px 10px 0 0 ;

      li {
        width: 113px;
        text-align: center;
        box-sizing: border-box;
        cursor: pointer;
      }

      i {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        padding-right: 8px;
      }
    }
    .all {
      color: #3485fb;
      &.active{
        border: 1px solid rgba(52, 133, 251, 1);
        border-radius: 40px;
      }
      i {
        background: url("../assets/image/menuAll.png") no-repeat;
        background-size: contain;
      }
    }

    .breakLaw {
      color: #d9524e;

      &.active {
        border: 1px solid #D9524E;
        border-radius: 40px;
        background: rgba(255, 244, 243, 1);
      }

      i {
        background: url("../assets/image/menuBreakLaw.png") no-repeat;
        background-size: contain;
      }
    }

    .risk {
      color: rgba(216, 138, 4, 1);

      &.active {
        background: rgba(255, 246, 230, 1);
        border-radius: 40px;
        border: 1px solid rgba(216, 138, 4, 1);
      }

      i {
        background: url("../assets/image/menuRisk.png") no-repeat;
        background-size: contain;
      }
    }

    .evidence {
      color: rgba(73, 137, 212, 1);

      &.active {
        background: rgba(247, 251, 255, 1);
        border-radius: 40px;
        border: 1px solid rgba(73, 137, 212, 1);
      }

      i {
        background: url("../assets/image/menuEvidence.png") no-repeat;
        background-size: contain;
      }
    }

    .needSure {
      color: rgba(108, 170, 92, 1);

      &.active {
        background: rgba(246, 255, 243, 1);
        border-radius: 40px;
        border: 1px solid rgba(108, 170, 92, 1);
      }

      i {
        background: url("../assets/image/menuSure.png") no-repeat;
        background-size: contain;
      }
    }
  }

  .articleContent {
    .liability {
      padding-top: 24px;
      color: #8490a6;
      font-size: 14px;
    }

    background: rgba(241, 243, 250, 1);
    width: 89%;
    margin: 24px auto 24px auto;
    max-width: 1280px;
    overflow: auto;

    .note {
      color: #8490a6;
      font-size: 12px;
    }

    .item {
      border-bottom: 2px solid #DCDFEA;
      padding: 24px 0;
    }

    .listWrap {
      & > li {
        color: #444a55;
        font-size: 14px;
        overflow: hidden;
        margin-bottom: 10px;

        .itemOption, .itemContent {
          float: left;
          li{
          }
        }

        .itemContent {
          width: calc(100% - 80px);

          li {
            p {
              color: #3485FB;
            }
          }
        }
      }
    }

    .itemNum {
      width: 20px;
      height: 20px;
      background: rgba(73, 137, 212, 1);
      border-radius: 50%;
      line-height: 20px;
      text-align: center;
      display: inline-block;
      font-style: normal;
      color: #fff;
      margin-right: 10px;
    }
    .itemTitle {
      color: #4989D4;
      font-size: 14px;
      margin-bottom: 16px;
      &.breakLaw{
        span {
          color: #D9524E;
        }
        i{
          background: #D9524E;
          color: #fff;
        }
      }
      &.risk{
        span {
          color: #D88A04;
        }
        i{
          background: #D88A04;
          color: #fff;
        }
      }
      &.evaluate{
        span {
          color: #4989D4;
        }
        i{
          background: #4989D4;
          color: #fff;
        }
      }
      &.needSure{
        span {
          color: #6CAA5C;
        }
        i{
          background: #6CAA5C;
          color: #fff;
        }
      }
    }

    .articleRightCon {
      padding: 8px 24px 24px 24px;
    }

    .articleLeftCon {
      padding: 16px 24px;
      font-weight: 400;
      color: rgba(68, 74, 85, 1);
      width: 480px;
      box-sizing: border-box;
      font-size: 14px;
      line-height: 35px;
      height: calc(100% - 100px);
      overflow: auto;
    }

    .articleLeft {
      width: 480px;
      dl, dt, dd {
        margin: 0;
        padding: 0;
      }

      & > div {
        background: #fff;
        border-radius: 10px;
      }

      & > div:nth-of-type(1) {
        min-height: 430px;
        height: calc(100vh - 340px);
        position: relative;
        overflow: hidden;
        width: 480px;
      }

      & > div:nth-of-type(2) {
        margin-top: 24px;
        box-sizing: border-box;
        padding: 16px 24px;
        width: 480px;
        dt {
          margin-bottom: 9px;
          font-size: 14px;
          color: #8490a6;
        }

        dd {
          color: #8490a6;
          font-size: 12px;
          line-height: 24px;
        }
      }

      box-sizing: border-box;
      float: left;
      border-radius: 10px;

      .titleLeft {
        font-weight: bold;
        color: #444a55;
      }

      .areaDesc {
        float: right;
        font-size: 14px;
        color: #8490a6;
      }
    }

    .articleRight {
      background: #fff;
      float: right;
      width: calc(100% - 496px);
      border-radius: 10px;

      .title {
        padding-top: 12px;
        box-sizing: border-box;
        &.active {
        }
        ul {
          overflow: hidden;
        }

        li {
          float: left;
          line-height: 34px;
          font-size: 14px;
          margin-right: 5px;
        }
        li.active{
          line-height: 32px;
        }
      }
    }

    .title {
      height: 60px;
      padding: 0 24px;
      line-height: 60px;
      border-bottom: 1px solid #DCDFEA;
    }
  }

  .result {
    background: rgba(240, 245, 255, 1);
    overflow: hidden;
  }

  .tabContent {
    float: left;
    height: 177px;
    background: rgba(241, 243, 250, 1);
    border-radius: 0 10px 10px 0;
    position: absolute;
    top: 52px;
    left: 520px;
    bottom: 52px;
    right: 24px;
    box-sizing: border-box;
    padding: 17px 20px;
    color: #444a55;
    font-size: 14px;
    overflow: auto;
  }

  .evaluate {
    float: left;
    width: 177px;
    height: 177px;
    background: rgba(255, 243, 243, 1);
    border: 1px solid rgba(217, 82, 78, 1);
    border-radius: 50%;

    div {
      text-align: center;
      margin: 0 auto;

      &:nth-of-type(1) {
        margin-top: 35px;
        font-size: 40px;
        font-weight: 600;
        color: rgba(217, 82, 78, 1);
      }

      &:nth-of-type(2) {
        width: 58px;
        padding-top: 12px;
        margin-top: 20px;
        border-top: 1px solid rgba(217, 82, 78, 1);
        font-size: 14px;
        font-weight: 400;
        color: rgba(217, 82, 78, 1);
      }
    }
  }

  .content {
    max-width: 1280px;
    margin: 0 auto;
    width: 89%;
  }

  .header {
    margin-top: 24px;
    height: 280px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    box-sizing: border-box;
    padding: 52px 24px 51px 93px;
    position: relative;
    max-width: 1280px;
  }

  .tab {
    float: left;
    box-sizing: border-box;
    padding: 10px 0;
    margin: 0 16px 0 50px;

    li {
      width: 160px;
      height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 20px;
      border-radius: 4px;
      padding: 5px 10px;
      margin-bottom: 10px;
      transition: width .3s;
    }

    li:nth-of-type(1) {
      background: #D9524E;
    }

    li:nth-of-type(2) {
      background: #D88A04;
    }

    li:nth-of-type(3) {
      background: #4989D4;
    }

    li:nth-of-type(4) {
      background: #6CAA5C;
    }

    li.active {
      width: 178px;
      background-image: url("../assets/image/resultLeft.png");
      background-position: center right;
      background-repeat: no-repeat;
      background-size: 16px 16px;
      box-shadow: 0 0 0 10px #f1f3fa;
    }
  }

  .fixed {
    position: fixed;
    top: 24px;
    width: calc(66.5% - 480px);
    box-shadow: 0 -30px 0   #F0F5FF;
  }

  .leftFixed {
    position: fixed;
    top: 0;
    width: 37.5% !important;
    margin-top: 24px;
  }

  .articleRightConFixed {
    position: relative;
    top: 200px;
    padding-top: 200px !important;
  }
  .footerText {
    width: 100%;
    line-height: 28px;
    height: 28px;
    text-align: center;
    font-size: 12px;
    font-weight: 300;
    color: rgba(132, 144, 166, 1);
    background: #fff;
  }
  .reason{
    margin-bottom: 10px;
  }
  @media screen and(max-width: 1280px) and (min-width: 1000px) {
    .articleLeft {
      & > div:nth-of-type(1) {
        height: calc(100vh - 300px) !important;
        min-height: 0 !important;
        width: 480px;
      }
    }
    .articleContent {
      margin-bottom: 20px;
    }
  }
</style>
<style>
  .articleLeft .breakLaw{
    background: #D9524E !important;
  }
  .articleLeft .risk{
    background: #D88A04;
  }
  .articleLeft .evaluate{
    background: #4989D4;
  }
  .articleLeft .needSure{
    background: #6CAA5C;
  }
  .articleLeft .textFlag{
    padding: 0 3px;
    border-radius:4px;
    color: #fff;
    display: inline-block;
    line-height: 24px;
    cursor: pointer;
  }
</style>
