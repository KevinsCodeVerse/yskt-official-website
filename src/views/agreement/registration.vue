<!-- 注册学籍 -->
<template>
  <div>
    <header-world></header-world>
    <div class="registerPage">
      <h2>学籍注册系统</h2>
      <p class="title2">阅读平台介绍，并确认生成学籍号</p>

      <div class="content-box">
        <p>(学籍号简介)亲爱的同学:</p>
        <p>您好!欢迎您来到课堂!</p>
        <p>
          为方便各位同学重好的课堂平台在第学习，享受更优质的教学务，我们将为您分配专国的学籍号。<span>学籍号道循“一人一号，一号用”的原则，是依在本平台学习的-身份标识，将伴随您在课堂的整个学习过程。</span>学籍号生效后，我们今后将会料对您的学箱号安排专业的学管服务。学箱号将绑定您专属的学管老师、专属的学营服务，是您享受相关服务的重要身份认证。我们将在此基础上为您提供全程的学习服务。
        </p>
        <p>祝您在课堂学习愉快，学有所成!</p>
      </div>

      <div class="create-btn">立即生成学籍号</div>
    </div>
  </div>
</template>

<script>
import headerWorld from "@/components/headerWorld.vue";
import { getArticleDetailApi } from '@/common/api/aricle';

export default {
  components: { headerWorld },
  name: "registrationPage",
  data() {
    return {
      content: ""
    };
  },
  created() {
    this.getInfo()
  },

  methods: {
    async getInfo() {
     const res =  await getArticleDetailApi({id: 11})
     console.log(res);
     this.content = res.result
    }
  },
};
</script>
<style lang="less" scoped>
.registerPage {
  h2 {
    text-align: center;
    padding: 30px 0px;
  }

  .title2 {
    padding: 20px 0px;
    text-align: center;
    font-size: 20px;
  }

  .content-box {
    padding: 10px 20px;
    p {
      line-height: 40px;
      span {
        color: red;
      }
    }
  }
  .create-btn {
    width: 60%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin: auto;
    margin-top: 60px;
    border-radius: 4px;
    background: var(--color-main);

    &:hover {
      background: var(--color-main-hover);
    }
  }
}
</style>
