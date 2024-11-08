<!-- 个人中心 -->
<template>
  <div class="user-main">
    <headerWorld></headerWorld>
    <div class="user-center-content">
      <div class="left-nav">
        <userCenterNav></userCenterNav>
      </div>
      <div class="right-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import headerWorld from "@/components/headerWorld.vue";
import userCenterNav from "@/components/userCenterNav.vue";

export default {
  name: "indexPage",
  components: { headerWorld, userCenterNav },
  data() {
    return {
    };
  },

  created() {
  },

  methods: {

  },
};
</script>
<style lang="less" scoped>
.user-main {
  height: 100%;
  .user-center-content {
    height: calc(100% - 120px);
    overflow: hidden;
    width: 1200px;
    margin: auto;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    .left-nav {
      width: 200px;
      height: 100%;
    }
    .right-content {
      flex: 1;
      margin-left: 20px;
      width: 100%;
      overflow: hidden;
      background: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
