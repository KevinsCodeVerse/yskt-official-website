n<!-- 我的资料 -->
<template>
  <div class="myProfile-content">
    <div class="header-check">
      <div
        class="check-btn"
        v-for="item in header_list"
        :key="item.name"

        @click="handleCheckClick(item)"
        :class="{'active': item.id == currentId}"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="page-content">
      <component :is="currentPage"></component>
    </div>
  </div>
</template>

<script>
import personalProfile from "@/components/myProfile/personalProfile.vue";
import accountSecurity from "@/components/myProfile/accountSecurity.vue";
export default {
  data() {
    return {
      currentPage: personalProfile,
      currentId: 1,
      header_list: [
        {
          id: 1,
          name: "个人资料",
          component: personalProfile,
        },
        {
          id: 2,
          name: "账户安全",
          component: accountSecurity,
        },
      ],
    };
  },

  methods: {
    handleCheckClick(item) {
      this.currentPage = item.component;
      this.currentId = item.id
    },
  },
};
</script>
<style lang="less" scoped>
.myProfile-content {
  .header-check {
    display: flex;
    .check-btn {
      width: 80px;
      padding: 15px;
      cursor: pointer;
      &.active {
        color: #1584f6;
      }
    }
  }
}
</style>
