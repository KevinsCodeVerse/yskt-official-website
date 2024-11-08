<!--  -->
<template>
  <div>
    <headerWorld></headerWorld>
    <div class="detailBox">
        <div class="header-box">
            <div class="title">

                {{ article.title }}
            </div>
<!--            <div class="time">-->
<!--                {{ getDate(article.createTime) }}-->
<!--            </div>-->
        </div>
        <el-divider></el-divider>
        <div class="content" v-html="article.content">
        </div>
    </div>
  </div>
</template>

<script>
import headerWorld from "@/components/headerWorld.vue";
import { getArticleDetailApi } from "@/common/api/aricle";
import { getDate } from '@/utils/tools';
export default {
  name: "detailPage",
  components: { headerWorld },
  data() {
    return {
        article: {},
        getDate
    };
  },

  created() {
    
    this.getArticleDetail();
  },

  methods: {
    async getArticleDetail() {
      const res = await getArticleDetailApi({
        id: this.$route.query.id,
      });
      this.article = res.result
    },
  },
};
</script>
<style lang="less" scoped>
.detailBox {
  width: 1200px;
  margin: auto;
  margin-top: 10px;
  background: #fff;
  border-radius: 2px;
  height: calc(100vh - 120px);
  overflow: auto;
  .header-box {
    text-align: center;
    .title {
        font-size: 24px;
        padding: 15px 0px;
        font-weight: bold;
    }
    .time {
        font-size: 12px;
        color: #666;
    }
  }
  .content {
    padding: 15px
  }
}
</style>
