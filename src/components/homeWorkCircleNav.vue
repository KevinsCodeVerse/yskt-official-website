<template>
  <div class="user-nav-menu">
    <el-menu :default-active="defaulActive" class="el-menu-vertical" router>
      <div v-for="item in routers" :key="item.path">
        <el-menu-item
            v-if="!item.meta.hidden"
            :index="item.path"
        >
          <i :class="'el-icon-' + item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import operationSquare from '../views/homeWorkCircle/operationSquare'
import myWork from '../views/homeWorkCircle/myWork'
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
    // 初始化路由
    this.initializeRoutes();
  },
  methods: {
    initializeRoutes() {
      // 手动添加的路由
      this.routers = [
        {
          path: 'operationSquare',
          name: 'operationSquare',
          meta: {
            title: "广场",
            // icon: "user"
          },
          component: operationSquare
        },
        {
          path: 'myWork', // 待定的路径
          name: 'myWork',
          meta: {
            title: "我的作业",

          },
          component: myWork
        }
      ];
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
