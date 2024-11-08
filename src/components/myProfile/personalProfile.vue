<!-- 个人资料 -->
<template>
  <div class="userProfile">
    <div class="header-info">
      <div class="image-box">
        <img
          src="https://img12.yiihuu.com/upimg/album/2022/10/21/1948824-1666345609-403594.jpg"
          alt=""
        />
      </div>
      <div>
        <p>用户名： {{ userInfo.account }}</p>
        <p>联系电话： {{ userInfo.phone }}</p>
        <p v-if="userInfo.studentNumber">学籍号：{{ userInfo.studentNumber }}</p>
      </div>
    </div>
    <div>
      <el-form size="normal" :model="userInfo" ref="form" :inline="false">
        <el-form-item label="性别">
          <el-select
            style="width: 100%"
            v-model="userInfo.gender"
            placeholder="性别"
            clearable
          >
            <el-option label="男" :value="1"> </el-option>
            <el-option label="女" :value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="昵称:">
          <el-input
            clearable
            v-model="userInfo.nick"
            placeholder="昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="QQ号:">
          <el-input
            clearable
            v-model="userInfo.qq"
            placeholder="QQ号"
          ></el-input>
        </el-form-item>
        <el-form-item label="微信:">
          <el-input
            clearable
            v-model="userInfo.wechat"
            placeholder="微信"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="updateUserInfo">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getUserInfoApi, updateUserInfoApi } from "@/common/api/user";
export default {
  data() {
    return {
      userInfo: {
        nick: "",
        qq: "",
        gender: "",
        phone: "",
        name: "",
        wechat: "",
        account: "",
      },
    };
  },
  created() {
    this.getUserInfo();
  },

  methods: {
    async getUserInfo() {
      const res = await getUserInfoApi();
      if (res) {
        const { nick, qq, gender, phone, name, wechat, account, studentNumber } = res.result;
        this.userInfo = {
          nick,
          qq,
          gender,
          phone,
          name,
          wechat,
          studentNumber,
          account,
        };
      }
    },

    async updateUserInfo() {
      const res = await updateUserInfoApi(this.userInfo);
      if (res.code == 0) {
        this.$message.success(res.result);
        this.getUserInfo();
      }
    },
  },
};
</script>
<style lang="less">
.userProfile {
  padding: 20px 30px;
  font-size: 14px;
  .header-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    p {
      display: inline-block;
      line-height: 40px;
      padding-left: 60px;
      font-size: 16px;
    }
    .image-box {
      width: 100px;
      height: 100px;
      border-radius: 100px;
      overflow: hidden;
      img {
        width: 100px;
        height: 100%;
      }
    }
  }
  .el-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-form-item {
      width: 48%;
    }
  }
}
</style>
