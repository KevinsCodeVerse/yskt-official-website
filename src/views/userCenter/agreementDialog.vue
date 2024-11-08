<template>
  <div>
    <el-dialog
      center
      title="用户服务协议"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      @close="close"
      width="60%"
    >
      <div>
        <h2 style="text-align: center; margin-bottom: 10px">学籍注册系统</h2>
        <h4 style="text-align: center; margin-bottom: 10px">用户服务协议</h4>
        <div v-html="info.content"></div>
      </div>
      <div
        style="width: 100%; text-align: center"
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          style="width: 80%"
          :disabled="btnDisabled"
          type="primary"
          @click="() => (nameVisible = true)"
          >{{ btnTitle }}</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="真实姓名"
      :visible="nameVisible"
      v-model="addData"
      @close="closeName"
      width="30%"
    >
      <span>
        <el-input
          v-model="addData.name"
          placeholder="请输入真实姓名"
          size="normal"
          clearable
        ></el-input>
      </span>
      <template #footer>
        <span>
          <el-button type="primary" @click="handleRegisterSubmit"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { registerApi } from "@/common/api/user";
import { getArticleDetailApi } from '@/common/api/aricle';
export default {
  data() {
    return {
      dialogVisible: false,
      timer: "",
      nameVisible: false,
      btnDisabled: false,
      info: {},
      addData: {
        name: "",
      },
      btnTitle: "我已阅读并同意本协议",
    };
  },

  methods: {
    open() {
      this.dialogVisible = true;
      this.btnDisabled = true;
      this.getInfo()
      let time = 9;
      this.timer = setInterval(() => {
        // 判断剩余秒数
        if (time == 0) {
          // 清除定时器和复原按钮
          this.btnTitle = `我已阅读并同意本协议`;
          clearInterval(this.timer);
          this.btnDisabled = false;
        } else {
          this.btnTitle = `我已阅读并同意本协议（ ${time}s ）`;
          time--;
        }
      }, 1000);
    },
    close() {
      this.dialogVisible = false;
      clearInterval(this.timer);
      this.btnTitle = `我已阅读并同意本协议`;
    },
    async handleRegisterSubmit() {
      const res = await registerApi({ ...this.addData });
      if (res) {
        this.$message.success("注册成功");
        this.closeName()
        this.dialogVisible = false
      }
    },
    async getInfo() {
     const res =  await getArticleDetailApi({id: 6})
     this.info = res.result
    },
    closeName() {
        this.addData = {
            name: ""
        }
        this.nameVisible  = false
    }
  },
};
</script>
<style lang="less" scoped>
p {
  line-height: 30px;
}
</style>
