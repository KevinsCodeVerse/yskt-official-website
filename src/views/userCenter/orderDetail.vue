<!-- 订单详情 -->
<template>
  <div class="orderDetailContent">
    <div class="title">订单详情</div>
    <div class="subTitle">课程及服务</div>
    <div class="content-item">
      <div class="item">
        <div class="label">课程名称：</div>
        <div class="content">{{ info.courseName }}</div>
      </div>
      <div class="item">
        <div class="label">课程套餐：</div>
        <div class="content">{{ info.setMealName }}</div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="subTitle">订单及费用</div>
    <div class="content-item">
      <div class="item">
        <div class="label">订单编号：</div>
        <div class="content">{{ info.orderNum }}</div>
      </div>
      <div class="item">
        <div class="label">开始/结束时间：</div>
        <div class="content">{{ info.stAndEdTime }}</div>
      </div>
      <div class="item">
        <div class="label">创建时间：</div>
        <div class="content">
          {{ getDate(info.createTime, "yyyy-MM-dd HH:mm:ss") }}
        </div>
      </div>
      <div class="item">
        <div class="label">付款状态：</div>
        <div class="content">{{ getNameByStatus(info.status) }}</div>
      </div>
      <el-divider></el-divider>
      <div class="item">
        <div class="label">课程总价：</div>
        <div class="content">￥{{ info.marketPrice }}</div>
      </div>
      <div class="item">
        <div class="label">应付款：</div>
        <div class="content">￥{{ info.unReceivedPrice }}</div>
      </div>
      <div class="item">
        <div class="label">已付款：</div>
        <div class="content">￥{{ info.receivedPrice }}</div>
      </div>
      <div class="item">
        <div class="label">未付款：</div>
        <div class="content">￥{{ info.unReceivedPrice }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderDetailApi } from "@/common/api/course";
import { getDate } from "@/utils/tools";
export default {
  data() {
    return {
      info: {},
      getDate,
    };
  },

  created() {
    this.getOrderDetail();
  },

  methods: {
    async getOrderDetail() {
      const res = await getOrderDetailApi({
        orderNum: this.$route.query.orderNum,
      });
      this.info = res.result;
    },
    getNameByStatus(status) {
        if(status === 0) {
            return "未支付"
        } else if(status === 7) {
            return "已取消"
        } else if(status === 1) {
            return "已支付"
        } else {
            return "已支付"
        }
    } 
  },
};
</script>
<style lang="less" scoped>
.orderDetailContent {
  color: #666;
  padding: 15px;
  

  .subTitle {
    padding-left: 15px;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .content-item {
    padding-left: 30px;
    margin-bottom: 5px;
    .item {
      display: flex;
      margin-bottom: 10px;
      .label {
        width: 120px;
        text-align: right;
      }
    }
  }
}
.title {
  position: relative;
  font-size: 16px;
  font-weight: bold;
  padding-left: 10px;
  margin-bottom: 20px;
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 10%;
    width: 4px;
    border-radius: 2px;
    background: #3a85ee;
    height: 80%;
  }
}
</style>
