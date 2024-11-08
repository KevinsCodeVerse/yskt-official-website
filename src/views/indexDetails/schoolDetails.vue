<template>
  <div>
    <headerWorld></headerWorld>
    <div class="concat">
      <div class="filter-box">
        <singleFilter
          v-model="filterData"
          ref="filter"
          :filter-list="filterList"
          @search="handleSearch"
        ></singleFilter>
      </div>
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
            <div class="study-btn" @click="() => $router.push({path: '/homeIndex', query: {id: item.id}})">开始学习</div>
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
    </div>
  </div>
</template>

<script>
import { getCategoryApi, getCourseListApi } from "@/common/api/schoollDetails";
import headerWorld from "@/components/headerWorld.vue";
import singleFilter from "@/components/singleFilter.vue";
export default {
  components: {
    headerWorld,
    singleFilter,
  },
  data() {
    return {
      filterData: {
        hasFree: "",
        categoryId: "",
        hasLive: "",
      },
      filterList: [
        {
          label: "课程分类",
          key: "hasFree",
          value: "",
          options: [
            {
              id: 0,
              name: "公开",
            },
            {
              id: 1,
              name: "会员课",
            },
          ],
        },
        {
          label: "课程类型",
          key: "categoryId",
          value: "",
          options: [],
        },
        {
          label: "观看类型",
          value: "",
          key: "hasLive",
          options: [
            {
              id: 0,
              name: "直播",
            },
            {
              id: 1,
              name: "录播",
            },
          ],
        },
      ],
      courseList: [],
      pageNo: 1,
      pageSize: 3,
      total: 0,
      loading: false,
    };
  },
  created() {
    this.getCategoryList();
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
    async getCategoryList() {
      const res = await getCategoryApi();
      this.filterList[1].options = res.result;
    },
    async getCourseList(load) {
      this.loading = true;
      const res = await getCourseListApi({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        ...this.filterData,
      });
      if (load) {
        this.courseList = [...this.courseList, ...res.result.list];
      } else {
        this.courseList = res.result.list;
      }
      this.total = res.result.total;
      this.loading = false;
    
    },
    handleSearch() {
      this.pageNo = 1;
      this.courseList = []
      this.getCourseList();
    },
    load() {
      this.pageNo = this.pageNo + 1;
      this.getCourseList(true);
    },
  },
};
</script>

<style scoped lang="less">
.header {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-content: center;
  height: 50px;
  line-height: 50px;
  background: #2b2b37;
  padding: 20px 0;
}

.heaerRightSearch {
  text-align: center;
  height: 40px;
  width: 250px;
  line-height: 35px;
  border-radius: 5px 5px 0 5px;
  background: #ffffff;
}
.headerRight {
  display: flex;
  align-content: center;
  text-align: center;
  justify-content: center;
}
.no-border .el-input__inner {
  border: none;
  background-color: transparent;
}

.searchStyle {
  width: 50px;
  height: 40px;
  border-radius: 0 5px 0 0;
  background-color: #1584f6;
  cursor: pointer;
  text-align: center;
}

.searchStyle-img {
  transform: scale(0.6);
}
.box {
  transition: transform 0.1s ease-in-out 0.1s;
}
.fills {
  margin-right: 30px;
}

.fills:hover {
  color: #ffffff;
  cursor: pointer;
}
.concat {
  display: flex;
  justify-content: center;
  text-align: left;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  .filter-box {
    width: 1200px;
  }
}
.titleOptions {
  background: #fff;
  border-radius: 5px;
  width: 1200px;
  height: auto;
  margin: 30px 0;
  border: 1px solid #eaeaea;
}
.vn-cls {
  display: flex;
  border-bottom: 1px solid #eaeaea;
  padding-left: 30px;
  height: 60px;
  margin-bottom: 15px;
  line-height: 60px;
}
.courseIndex {
  min-width: 60px;
  height: 30px;
  margin-right: 15px;
  line-height: 30px;
  margin-left: 15px;
  text-align: center;
  padding: 10px;
}
.courseIndex2 {
  min-width: 60px;
  height: 30px;
  font-weight: 700;
  line-height: 30px;
  text-align: center;
  padding: 10px;
  background: #1584f6;
  cursor: pointer;
  color: #fff;
  border-radius: 5px;
}
.courseIndex:hover {
  background: #1584f6;
  cursor: pointer;
  border-radius: 5px;
  font-weight: 700;
  color: #fff;
}

.content-box {
  overflow: auto;
  width: 1200px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .content-item {
    display: flex;
    justify-content: space-between;
    width: 48%;
    margin-bottom: 20px;
    background: #fff;
    box-sizing: border-box;
    cursor: pointer;

    padding: 20px;
    // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .title {
        color: var(--color-main);
      }
      .study-btn {
        color: #fff !important;
        background: var(--color-main);
      }
      .cover {
        transform: scale(1.1);
      }
    }
    .left-box {
      .title {
        font-size: 20px;
        font-weight: bold;
        padding-bottom: 10px;
      }
      .text {
        font-size: 14px;
        color: #666;
        margin: 10px 0px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        word-break: break-all;
      }

      span {
        color: #999999;
        font-size: 12px;
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
      }
    }
    .right-box {
      display: flex;
      flex-direction: column;
      position: relative;
      width: 278px;

      // height: 250px;
      .cover-box {
        width: 278px;
        height: 180px;
        overflow: hidden;
        border-radius: 10px;
        .cover {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
          transition: all 0.5s;
        }
      }
      &::after {
        content: "";
        display: block;
        margin: 0 16px;
        height: 22px;
        background: url("@/assets/shadow_1380@2x.d42d9897.png") no-repeat;
        background-size: 100%;
      }
    }
  }

  .bottom-info {
    width: 100%;
    text-align: center;
    margin: 20px 0px;
  }
}
</style>
