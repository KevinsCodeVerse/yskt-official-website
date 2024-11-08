<template>
  <div class="myOrder">
    <div class="filter-box">
      <singleFilter
        v-model="filterData"
        ref="filter"
        size="small"
        :filter-list="filterList"
        @search="handleSearch"
      ></singleFilter>
    </div>
    <div
      class="content-box"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
    >
      <div v-for="(item, index) in orderList" :key="index" class="content-item">
        <div class="header-top">
          <div class="order_num">
            <span v-if="item.createTime">{{
              formateDate(item.createTime)
            }}</span
            ><span style="padding-right: 0px">订单号：{{ item.orderNum }}</span>
            <!-- <span :class="{ opend: item.openStatus === 1 }"
              >({{ item.openStatus === 1 ? "已开通" : "未开通" }})</span
            > -->
          </div>
          <div class="status">
            <!-- {{ item.status === 0 ? "未支付" : "已支付" }} -->
            <span :class="{ opend: item.openStatus === 1 }"
              >{{ item.openStatus === 1 ? "已开通" : "未开通" }}</span
            >
          </div>
        </div>
        <div class="course_order_info">
          <div class="course-info-left">
            <div
              class="course_item"
              v-for="(course, index) in item.courseVoList"
              :key="index"
            >
              <el-image
                :src="course.image"
                style="width: 100px"
                fit="fill"
                :lazy="true"
              ></el-image>
              <div class="course-name">{{ course.name }}</div>
            </div>
          </div>
          <div class="order-info-right">
            <div class="order_price_num">
              <div class="price">
                <span class="price_icon">￥</span>{{ item.price }}
              </div>
              <div class="num">共{{ item.count }}个课程</div>
            </div>
            <el-button @click="handleDetail(item)" style="margin-top: 10px;"
                       type="primary" size="mini">查看课程</el-button>
          </div>
        </div>
      </div>
      <div class="bottom-info" v-if="loading">加载中...</div>
      <div class="bottom-info" v-if="noMore">没有更多了</div>
    </div>
  </div>
</template>

<script>
import { getCategoryApi } from "@/common/api/schoollDetails";
import { getUserOrderApi } from "@/common/api/user";
import singleFilter from "@/components/singleFilter.vue";
import { getDate } from "@/utils/tools";
export default {
  components: {
    singleFilter,
  },
  data() {
    return {
      formateDate: getDate,
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
              name: "公开课",
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
      hasFreeList: [
        {
          id: 0,
          name: "免费",
        },
        {
          id: 1,
          name: "收费",
        },
      ],
      hasLiveList: [
        {
          id: 0,
          name: "直播",
        },
        {
          id: 1,
          name: "录播",
        },
      ],
      orderList: [],
      pageNo: 1,
      pageSize: 3,
      total: 0,
      loading: false,
    };
  },
  created() {
    this.getCategoryList();
    this.getOrderList();
  },
  computed: {
    noMore() {
      return this.orderList.length >= this.total;
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
    async getOrderList(load) {
      this.loading = true;
      const res = await getUserOrderApi({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        ...this.filterData,
      });
      if (res) {
        if (load) {
          this.orderList = [...this.orderList, ...res.result];
        } else {
          this.orderList = res.result;
        }
      }

      // this.total = res.result.total;
      this.loading = false;
    },
    handleSearch() {
      this.pageNo = 1;
      this.orderList = [];
      this.getOrderList();
    },

    getByIdFindName(id, list) {
      const item = list.find((item) => item.id == id);
      return item && item.name ? item.name : "";
    },

    load() {
      this.pageNo = this.pageNo + 1;
      this.getOrderList(true);
    },

    handleDetail(item) {
      console.log('item',item)
      // this.$router.push({path: "/userCenter/orderDetail", query: {orderNum: item.orderNum}})
      this.$router.push({path: "/userCenter/myCourse", query: {orderNum: item.orderNum}})
    }
  },
};
</script>

<style scoped lang="less">
.tag-living {
  background-color: rgba(255, 120, 0, 0.8);
  position: absolute;
  z-index: 10;
  top: 4px;
  left: 4px;
  display: block;
  width: 61px;
  height: 19px;
  line-height: 19px;
  font-size: 12px;
  text-align: center;
  color: #fff;
  border-radius: 2px;
  .tag-icon {
    border-radius: 50%;
    background-image: url(https://a.msstatic.com/huya/main3/components/SubscribeList/Card/img/icon_live_eb974.png);
    animation: matchLiving 0.6s steps(6) infinite;
    margin-left: -4px;
    margin-right: 3px;
    padding: 0 8px;
  }
}
@keyframes matchLiving {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -109px 0;
  }
}
.myOrder {
  width: 100%;
  // padding: 20px;
  padding-top: 0px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .vip-mark {
    box-sizing: border-box;
    display: flex;
    z-index: 100;
    justify-content: center;
    align-items: center;
    right: 4px;
    top: 4px;
    position: absolute;
    width: 30px;
    height: 16px;
    color: #8e5323;
    font-size: 10px;
    font-style: normal;
    background: linear-gradient(170deg, #fbdec0, #f2b981);
    border-radius: 5px;
  }
}

.content-box {
  overflow: auto;
  width: 100%;
  margin: auto;
  flex: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0px 20px;

  .content-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    background: #fff;
    box-sizing: border-box;
    justify-content: space-between;
    cursor: pointer;
    width: 100%;

    padding: 10px 20px;
    // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    border: 1px solid #eaeaea;
    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .opend {
          color: rgb(71, 184, 71);
        }
    .header-top {
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-size: 12px;
      color: #666666;
      .order_num {
        span {
          padding-right: 15px;
        }
        
      }
    }

    .course_order_info {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-top: 15px;
      .course-info-left {
        flex: 1;
        display: flex;
        font-size: 12px;
        color: #333333;
        overflow: auto;

        .course_item {
          padding-right: 20px;
        }
        .el-image {
          border-radius: 3px;
        }
      }
      .order-info-right {
        text-align: right;
        .order_price_num {
          font-size: 18px;

          .price {
            padding-bottom: 5px;
            // color: red;
            .price_icon {
              font-size: 14px;
            }
          }
          .num {
            font-size: 12px;
            color: #666666;
          }
        }
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
