<template>
  <div>
    <div class="myCourse">
      <div
          class="content-box"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="disabled"
          infinite-scroll-distance="50"
      >
        <div
            v-for="(item, index) in courseList"
            :key="index"
            class="content-item"
            @click="handleItemClick(item)"
        >
          <!-- 左侧的头像和用户信息 -->
          <div class="avatar-box">
            <img class="avatar" :src="item.avatar" alt="avatar" />
          </div>

          <!-- 右侧的内容区域 -->
          <div class="content-info">
            <h3 class="name">{{ item.name }}</h3>
            <p class="chapter">章节: {{ item.chapterName }}</p>
            <p class="comment">评论: {{ item.comment }}</p>
            <p class="time">时间: {{ item.time }}</p>

            <!-- 图片展示 -->
            <div v-if="item.url && parseUrls(item.url).length" class="image-box">
              <el-image
                  :preview-src-list="parseUrls(item.url)"
                  class="image"
                  :src="parseUrls(item.url)[0]"
                  alt="related image"
              />
            </div>

          </div>
        </div>
        <div class="bottom-info" v-if="loading">加载中...</div>
        <div class="bottom-info" v-if="noMore">没有更多了</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWorkCircleApi } from "@/common/api/user";

export default {
  data() {
    return {
      params: {
        pageNo: 1,
        pageSize: 10,
      },
      total: 0,
      courseList: [],
      loading: false,
      pageNo: 1,
      pageSize: 10,
      noMore: false,  // 增加 noMore 标志
    };
  },
  created() {
    this.getCourseList();
  },
  computed: {
    disabled() {
      return this.loading || this.noMore; // 当 loading 或者没有更多内容时，禁用加载
    },
  },
  methods: {
    async getCourseList(load = false) {
      if (this.loading || this.noMore) return;  // 防止重复加载
      this.loading = true;

      this.params.pageNo = this.pageNo;
      try {
        const res = await getWorkCircleApi(this.params);
        if (res && res.result) {
          const { list, total } = res.result;

          if (load) {
            this.courseList = [...this.courseList, ...list];
          } else {
            this.courseList = list;
          }

          this.total = total;

          // 判断是否加载完所有数据
          if (this.courseList.length >= total) {
            this.noMore = true;  // 设置 noMore，表示没有更多数据
          }
        }
      } catch (error) {
        console.error("加载课程列表出错:", error);
      } finally {
        this.loading = false;
      }
    },
    loadMore() {
      if (!this.noMore && !this.loading) {
        this.pageNo++;
        this.getCourseList(true);  // 加载下一页数据
      }
    },
    handleItemClick(item) {
      console.log(item, "item");
    },
    parseUrls(urlString) {
      try {
        return JSON.parse(urlString);
      } catch (e) {
        console.error("Invalid URL format", e);
        return [];
      }
    },
  },
};
</script>

<style scoped lang="less">
.myCourse {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0;
  box-sizing: border-box;
  height: 100vh; /* 确保有固定高度，才会出现滚动条 */
  overflow: auto; /* 当内容超出时出现滚动条 */
}

.content-box {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.content-item {
  display: flex;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  align-items: center;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  .avatar-box {
    margin-right: 20px;
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #f0f0f0;
    }
  }

  .content-info {
    flex-grow: 1;

    .name {
      font-size: 20px;
      font-weight: bold;
      color: #333;
      margin-bottom: 8px;
    }

    .chapter,
    .comment,
    .time {
      font-size: 14px;
      color: #666;
      margin-bottom: 4px;
    }

    .image-box {
      margin-top: 10px;
      display: flex;
      gap: 10px;

      .image {
        width: 80px;
        height: 80px;
        border-radius: 8px;
        object-fit: cover;
        transition: transform 0.3s ease;
        border: 1px solid #f0f0f0;
      }

      .image:hover {
        transform: scale(1.05);
      }
    }
  }
}

.bottom-info {
  text-align: center;
  margin: 20px 0;
  color: #999;
  font-size: 14px;
}
</style>
