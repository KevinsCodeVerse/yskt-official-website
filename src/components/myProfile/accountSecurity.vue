<!-- 账户安全 -->
<template>
  <div class="userProfile">
    <div class="content-item">
      <div class="left">
        <img width="30" height="30" src="@/assets/security.png" />
        <div>
          <span class="title">账号密码</span>
          <div class="desc">用于保护帐号信息和登录安全</div>
        </div>
      </div>
      <div class="right">
        <span class="btn">去验证</span>
      </div>
    </div>

    <div class="content-item">
      <div class="left">
        <img width="30" height="30" src="@/assets/phone.png" />
        <div>
          <span class="title">更换手机号</span>
          <div class="desc">
            换手机了? 来这里修改一下，以后就不怕忘记密码咯!
          </div>
        </div>
      </div>
      <div class="right">
        <span class="btn">去更换</span>
      </div>
    </div>

    <div class="content-item">
      <div class="left">
        <img width="30" height="30" src="@/assets/updatePassword.png" />
        <div>
          <span class="title">修改密码</span>
          <div class="desc">互联网环境建议您定期更换密码!</div>
        </div>
      </div>
      <div class="right">
        <span class="btn">去更换</span>
      </div>
    </div>

    <div class="content-item">
      <div class="left">
        <img width="30" height="30" src="@/assets/forgotPassword.png" />
        <div>
          <span class="title">忘记密码</span>
          <div class="desc">怎么也想不起来了? 通过手机号验证重置吧!</div>
        </div>
      </div>
      <div class="right">
        <span class="btn">去更换</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {},
};
</script>
<style lang="less" scoped>
.userProfile {
  padding: 20px 30px;
  font-size: 14px;
  .content-item {
    display: flex;
    justify-content: space-between;
    padding: 25px 10px;
    border-bottom: 1px solid #dfdede;
    .left {
      display: flex;
      img {
        // width: 30px;
        margin-right: 15px;
      }

      .title {
        font-weight: bold;
        color: #909090;
      }
      .desc {
        color: #ccc;
      }
    }
    .right {
      width: 100px;
      height: 35px;
      border-radius: 5px;
      background: var(--color-main);
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover {
        background: var(--color-main-hover);
      }
    }
  }
}
</style>
