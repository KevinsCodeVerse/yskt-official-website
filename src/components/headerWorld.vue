<template>
  <div class="header-top">
    <div class="header">
      <div class="left-box">
        <div
            v-for="(item, index) in headerTitle"
            :key="index"
            class="box"
            @click="goSchool1(index)"
        >
          {{ item }}
        </div>
      </div>
      <div class="headerRight">
        <div class="heaerRightSearch">
          <el-input
              size=""
              v-model="input"
              placeholder="搜索更多课程"
              class="no-border"
          >
            <el-button slot="append" icon="el-icon-search" class="search-button"></el-button>
          </el-input>
        </div>

      </div>
      <div>
        <div class="account-actions">
          <div
              v-for="(item, index) in headerRightTitle"
              :key="index"
              class="fills"
              @click="rightGo(index)"
          >
            <span v-if="isShow(item)">{{ item }}</span>
          </div>
          <div v-if="account">
            <el-dropdown trigger="click" size="medium">
              <span class="el-dropdown-link account_user">
                <i class="el-icon-user-solid"></i>{{ account
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="dropdown_exit">
                <el-dropdown-item @click.native="handleExit">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      iconSearch: "https://www.haixingkt.com/Public/Default/images/s-icon.png",
      headerTitle: ["首页", "所有课程","作业圈"],
      headerRightTitle: ["快捷支付", "登录", "注册", "个人中心"],
      input: "",
    };
  },
  computed: {
    token() {
      return localStorage.getItem("token") ? true : false;
    },
    ...mapGetters({ account: "account" }),
  },
  methods: {
    goSchool1(e) {
      console.log('e',e)
      if (e == 0) {
        this.$router.push("/");
      }  else if (e == 1  || e == 3) {
        this.$router
            .push({ name: "schoolIndex", query: { periodId: "优师课堂" } })
            .catch((err) => err);
      }else if(e===2){
  this.$router.push({ path: "/homeworkCircle", query: { name: "作业圈" } });
      }
      else {
        location.reload();
      }
    },
    rightGo(e) {
      if (e == 0) {
        this.$router.push({ path: "/payIndex", query: { name: "优师课堂" } });
        location.reload;
      } else if (e == 1) {
        this.$router
            .push({ path: "/loginIndex", query: { name: "优师课堂" } })
            .catch((err) => err);
        location.reload;
      } else if (e == 2) {
        this.$router
            .push({ path: "/regIndex", query: { name: "优师课堂" } })
            .catch((err) => err);
        location.reload;
      } else if (e == 3) {
        this.$router
            .push({ path: "/userCenter", query: { name: "优师课堂" } })
            .catch((err) => err);
        location.reload;
      }
    },
    isShow(title) {
      if (title === "个人中心" && this.token) {
        return true;
      }
      if ((title === "登录" || title === "注册") && !this.token) {
        return true;
      }

      return false;
    },
    handleExit() {
      this.$store.commit("LAYOUT_USER")
      this.$router.push("/loginIndex")
    }
  },
};
</script>

<style scoped lang="less">
.header-top {
  width: 100%;
  background: linear-gradient(90deg, #2b2b37, #1c1c29);
  font-size: 16px;
  padding: 15px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  .header {
    width: 1200px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left-box {
      display: flex;
      align-items: center;
    }

    .heaerRightSearch /deep/.el-input-group__append {
      background: #FF6347; /* 替换为经典红色 */
      color: #fff;
      border-color: #FF6347; /* 替换为经典红色 */
      border-radius: 0 5px 5px 0;
    }
    .heaerRightSearch {
      display: flex;
      align-items: center;
      .search-button {
        background: #FF6347; /* 替换为经典红色 */
        color: #fff;
        border: none;
        border-radius: 0 5px 5px 0;
        &:hover {
          background: #e55347; /* 替换为经典红色的更深色调 */
        }
      }
    }
  }
}

.account_user {
  cursor: pointer;
  color: #dce9f8;
  font-size: 16px;
  display: flex;
  align-items: center;

  i {
    padding-right: 5px;
    font-size: 18px;
  }
}

.dropdown_exit {
  background: #f7f8fa;
  width: 120px;
  border: #09090b;
  text-align: center;
}

.headerRight {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fills {
  margin-right: 20px;
  color: #dce9f8;
  font-weight: 500;
  transition: color 0.3s ease;
  cursor: pointer;
  &:hover {
    color: #ffffff;
  }
}

.box {
  margin-right: 20px;
  cursor: pointer;
  color: #dce9f8;
  font-weight: 500;
  transition: transform 0.2s ease-in-out, color 0.3s ease;
  &:hover {
    color: #ffffff;
    transform: scale(1.1);
  }
}

.account-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

</style>
