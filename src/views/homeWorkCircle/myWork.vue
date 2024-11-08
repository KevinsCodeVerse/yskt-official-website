<template>
  <div>
    <div class="myCourse">
      <!-- 标签栏切换 -->
      <el-tabs v-model="activeTab">
        <!-- 已提交作业 Tab -->
        <el-tab-pane label="已提交作业" name="submitted">
          <div class="content-box">
            <div
                v-for="(item, index) in submittedWorkList"
                :key="index"
                class="content-item"
                @click="handleItemClick(item)"
            >
              <div class="content-info">
                <h3 class="name">{{ item.name }}</h3>
                <p class="time">提交时间: {{ item.time }}</p>
                <p class="comment">老师点评: {{ item.comment }}</p>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- 未提交作业 Tab -->
        <el-tab-pane label="未提交作业" name="unsubmitted">
          <div class="content-box">
            <div
                v-for="(item, index) in unsubmittedWorkList"
                :key="index"
                class="content-item"
                @click="handleItemClick(item)"
            >
              <div class="content-info">
                <h3 class="name">{{ item.name }}</h3>
                <p class="time">截至时间: {{ item.time }}</p>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getSubmitWorkApi, getUnsubmitWorkApi } from "@/common/api/user";

export default {
  data() {
    return {
      activeTab: 'submitted', // 默认激活的标签页
      submittedWorkList: [],  // 已提交作业
      unsubmittedWorkList: [],  // 未提交作业
      loading: false,
    };
  },
  created() {
    this.getSubmittedWork();
    this.getUnsubmittedWork();
  },
  methods: {
    // 获取已提交作业
    async getSubmittedWork() {
      this.loading = true;
      try {
        const res = await getSubmitWorkApi();
        if (res && res.result) {
          this.submittedWorkList = res.result;
        }
      } catch (error) {
        console.error("加载已提交作业列表出错:", error);
      } finally {
        this.loading = false;
      }
    },
    // 获取未提交作业
    async getUnsubmittedWork() {
      this.loading = true;
      try {
        const res = await getUnsubmitWorkApi();
        if (res && res.result) {
          this.unsubmittedWorkList = res.result;
        }
      } catch (error) {
        console.error("加载未提交作业列表出错:", error);
      } finally {
        this.loading = false;
      }
    },
    handleItemClick(item) {
      console.log(item, "item");
    },
  },
};
</script>

<style scoped lang="less">
.myCourse {

  margin: 20px auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.el-tabs {
  margin-bottom: 20px;
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

  .content-info {
    flex-grow: 1;

    .name {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      margin-bottom: 8px;
    }

    .time {
      font-size: 14px;
      color: #666;
    }
    .comment{
      font-size: 14px;
      color:red;  //红色
    }
  }
}
</style>
