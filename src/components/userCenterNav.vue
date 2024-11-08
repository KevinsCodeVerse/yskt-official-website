<!-- 个人中心侧边栏 -->
<template>
  <div class="user-nav-menu">
    <el-menu :default-active="defaulActive" class="el-menu-vertical" router>
      <template v-for="item in routers">
        <el-menu-item
          v-if="!item.meta.hidden"
          :key="item.path"
          :index="item.path"
        >
          <i :class="'el-icon-' + item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import router from "@/router";
import { isShowRegisterApi } from "@/common/api/user";
export default {
  data() {
    return {
      routers: [],
    };
  },
  computed: {
    defaulActive() {
      return this.$route.path;
    },
  },
  created() {


    this.isShowReg();
  },

  methods: {
    async isShowReg() {
      const res = await isShowRegisterApi();

      let isShowReg = !res.result;
      this.routers = router
      .getRoutes()
      .filter((item) => {

        if(item.name === "registration") {
          return item.parent && item.parent.name === "userCenter" && isShowReg
        } else {
          return item.parent && item.parent.name === "userCenter"
        }

      });

    },
  },
};
</script>
<style lang="less" scoped>
.user-nav-menu {
  height: 100%;
  .el-menu-vertical {
    height: 100%;
    border-right: none;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
