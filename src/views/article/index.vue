<!-- 文章列表 -->
<template>
  <div>
    <headerWorld></headerWorld>
    <div class="article-box">
      <div class="article-list">
        <div
          class="article-item"
          v-for="article in articleList"
          :key="article.id"
          @click="handleToDetail(article)"
        >
          <div v-if="article.imgUrl" class="left-cover"><img :src="article.imgUrl" alt="" /></div>
          <div class="middle-info">
            <div class="title">{{ article.title }}</div>
            <div class="overview">{{ article.overview }}</div>
<!--            <div class="time">{{ getDate(article.createTime) }}</div>-->
          </div>
          <div class="right-btn">
            <el-button type="primary" size="small" @click="handleToDetail(article)">查看详情</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleListApi } from "@/common/api/aricle";
import headerWorld from "@/components/headerWorld.vue";
import { getDate } from "@/utils/tools";
export default {
  name: "articlePage",
  components: { headerWorld },
  data() {
    return {
      articleList: [],
      getDate,
    };
  },
  created() {
    this.getArticleList();
  },

  methods: {
    async getArticleList() {
      const res = await getArticleListApi();
      this.articleList = res.result;
    },
    handleToDetail(article) {
      this.$router.push({path: "/article/detail", query: {id: article.id}})
    }
  },
};
</script>
<style lang="less" scoped>
.article-box {
  width: 1200px;
  margin: auto;
}
.article-list {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  .article-item {
    display: flex;
    margin-top: 20px;
    background: #fff;
    padding: 20px 10px;
    .left-cover {
      width: 130px;
      height: 90px;
      border-radius: 3px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .middle-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 18px;
        font-weight: bold;
      }
      
      padding-left: 20px;
      .overview {
        color: #666;
      }
      .time {
        color: #666;
        font-size: 12px;
      }
    }

    .right-btn {
      align-self: self-end;
    }
  }
}
</style>