<template>
  <div>
    <headerWorld></headerWorld>
    <div class="myCourse">
      <div
          class="content-box"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
      >
        <div
            v-for="(item, index) in courseList"
            :key="index"
            class="content-item"
        >
          <div class="left-box">
            <p class="title">{{ item.name }}</p>
            <p class="text">{{ item.overview }}</p>
            <span>主讲老师：{{ item.teacherName }}</span>
            <!-- 判断是否有直播讲师，显示相应的按钮 -->
            <div v-if="item.liveTeracher && item.liveTeracher.length > 0">
              <div
                  v-for="teacher in item.liveTeracher"
                  :key="teacher.id"
                  class="teacher-button"
              >
                <el-button
                    size="mini"
                    type="primary"
                    @click.stop="handleLiveTeacher(item, teacher)"
                >
                  看{{ teacher.name }}的直播
                </el-button>
              </div>
            </div>

            <!-- 如果没有直播讲师，显示开始学习按钮 -->
            <div v-else class="study-btn" @click="handleDetail(item)">
              开始学习
            </div>

          </div>
          <div class="right-box">
            <div class="cover-box">
              <img class="cover" :src="item.image" alt="" />
            </div>
          </div>
        </div>

        <div class="bottom-info" v-if="loading">加载中...</div>
        <div class="bottom-info" v-if="noMore">没有更多了</div>
      </div>
      <submitWork ref="work"></submitWork>
    </div>
  </div>
</template>

<script>
import { getCourseListByOrderApi } from "@/common/api/schoollDetails";
import headerWorld from "@/components/headerWorld.vue";
import submitWork from "@/components/submitWork.vue";

export default {
  components: {
    headerWorld,
    submitWork,
  },
  data() {
    return {
      courseList: [],
      pageNo: 1,
      pageSize: 3,
      total: 0,
      loading: false,
    };
  },
  created() {
    this.getCourseList();
  },
  computed: {
    noMore() {
      return this.courseList.length >= this.total;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    handleLiveTeacher(item, teacher) {
      console.log('item',item)
      console.log('teacher',teacher)
      this.$router.push({
        path: `/live/${item.id}`,
        query: {teacherId:teacher.id, orderNum: this.$route.query.orderNum, courseId:
          item.id },
      });
    },
    async getCourseList(load) {
      this.loading = true;
      const orderNum = this.$route.query.orderNum;
      const res = await getCourseListByOrderApi({ orderNum });
      if (res) {
        if (load) {
          this.courseList = [...this.courseList, ...res.result];
        } else {
          this.courseList = res.result;
        }
      }
      this.loading = false;
    },
    handleDetail(item) {
      this.$router.push({
        path: `/live/${item.id}`,
        query: { orderNum: this.$route.query.orderNum, courseId:
          item.id },
      });
    },
  },
};
</script>

<style scoped lang="less">
.content-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
}
.teacher-button {
  margin: 10px 0;
}
.el-button {
  width: 140px; /* 设置统一的宽度 */
  text-align: center; /* 文字居中对齐 */
  display: inline-block;
  white-space: nowrap; /* 防止文字换行 */
  overflow: hidden; /* 防止文字溢出 */
  text-overflow: ellipsis; /* 溢出显示省略号 */
}
.study-btn {
  width: 112px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-main);
  border-radius: 6px;
  color: var(--color-main);
  margin-top: 20px;
  cursor: pointer;
}
.cover-box {
  width: 278px;
  height: 180px;
  overflow: hidden;
  border-radius: 10px;
}
.cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s;
}
</style>
