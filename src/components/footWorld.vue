<template>
  <div class="footer">
<!--    <div class="footer-top">链接:</div>-->
    <div class="divider"></div>
    <div class="footer-content">
      <div class="footer-links">
        <div class="footer-link" @click="handleToArticle">售后服务</div>
        <div class="footer-link" @click="handleToArticle">投诉建议</div>
        <div class="footer-link" @click="handleToArticle">关于我们</div>
        <div class="footer-link" @click="handleToArticle">用户服务协议</div>
        <div class="footer-link" @click="handleToArticle">查看更多</div>
      </div>
      <div class="footer-info">
<!--        <div class="gov-info">-->
<!--          鄂公网安备-->
<!--          <a target="_blank" href="https://beian.mps.gov.cn/#/query/webSearch">-->
<!--            鄂ICP备2023030661号-1-->
<!--          </a>-->
<!--        </div>-->
      </div>
      <div class="footer-qr">
        <h4>扫描公众号二维码</h4>
        <img
            src="https://qiniu.pengfkt.com/FnLDs3DDiyta2AfTaRWR5_Ys1Zgo"
            alt="公众号二维码"
            class="qr-image"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleToArticle() {
      this.$router.push("/article");
    },
  },
};
</script>

<style lang="less" scoped>
.footer {
  background-color: #2b2b38;
  padding: 50px 0;
  color: #fff;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  .footer-top {
    font-size: 20px;
    color: #ffffff;
    margin-bottom: 20px;
  }
  .divider {
    width: 80%;
    height: 1px;
    background-color: #4a4b4c;
    margin-bottom: 30px;
  }
  .footer-content {
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 1200px;
    flex-wrap: wrap;
    align-items: flex-start;
    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .footer-link {
        cursor: pointer;
        color: #cccccc;
        transition: color 0.3s ease;
        &:hover {
          color: #ffffff;
        }
      }
    }
    .footer-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
      color: #ffffff;
      .gov-logo {
        width: 30px;
        height: 30px;
        margin-bottom: 10px;
      }
      .gov-info {
        font-size: 12px;
        a {
          color: #ffffff;
          text-decoration: underline;
        }
      }
    }
    .footer-qr {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
      text-align: center;
      color: #ffffff;
      h4 {
        margin-bottom: 10px;
        font-size: 16px;
      }
      .qr-image {
        width: 100px;
        height: 100px;
        border-radius: 8px;
        border: 2px solid #4a4b4c;
      }
    }
  }
}
</style>
