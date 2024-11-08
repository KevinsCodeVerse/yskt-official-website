<!-- 注册学籍 -->
<template>
  <div class="registerPage">
    <h2>学籍注册系统</h2>

    <div class="content-box" v-html="info.content">
    
    </div>
    <div class="create-btn" @click="handleCreate">立即生成学籍号</div>
    <agreementDialog ref="agreement"></agreementDialog>
  </div>
</template>

<script>
import { getArticleDetailApi } from '@/common/api/aricle';
import agreementDialog from "./agreementDialog.vue";
export default {
  components: { agreementDialog },
  name: "registrationPage",
  data() {
    return {
      info: {}
    };
  },

  created() {
    this.getInfo()
  },

  methods: {
    handleCreate() {
      this.$refs.agreement.open();
    },
    async getInfo() {
     const res =  await getArticleDetailApi({id: 11})
     this.info = res.result
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
