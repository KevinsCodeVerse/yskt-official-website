<!-- 布置作业 -->
<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :close-on-click-modal="false"
      :visible.sync="addModifyVisible"
      :append-to-body="true"
      width="40%"
      @close="close"
    >
      <el-form
        :model="addData"
        :rules="workRule"
        ref="workRef"
        size="small"
        label-position="left"
        label-width="120px"
      >
        <el-form-item label="作业" prop="work">
          <el-select
            style="width: 100%"
            v-model="addData.work"
            placeholder="请选择课作业"
            value-key="id"
            clearable
            filterable
          >
            <el-option
              v-for="item in workOptions"
              :key="item.id"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="作业图片:" prop="url">
          <upload-image v-model="addData.url" :limit="5"></upload-image>
        </el-form-item>
        <el-form-item label="作业描述:" prop="name">
          <el-input
            type="textarea"
            :rows="5"
            v-model="addData.name"
            placeholder="请输入作业描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" plain @click="close">取 消</el-button>
        <el-button size="small" type="primary" @click="handleSubmit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import uploadImage from "@/components/uploadImage.vue";
import { getCourseWorkList, submitWork } from "@/common/api/user";
export default {
  name: "addCourseWork",
  components: { uploadImage },
  data() {
    return {
      addModifyVisible: false,
      dialogTitle: "",
      chapterIdOptions: [],
      workOptions: [],
      addData: {
        chapterId: "",
        courseId: "",
        name: "",
        url: "",
        work: "",
      },
      workRule: {
        work: [{ required: true, message: "请选择作业", trigger: "blur" }],
        url: [{ required: true, message: "请上传作业图片", trigger: "blur" }],
        name: [{ required: true, message: "请输入作业描述", trigger: "blur" }],
      },
    };
  },

  created() {},

  mounted() {},

  methods: {
    edit(id) {
      this.dialogTitle = "提交作业";
      this.addData.courseId = id;
      // this.chapterIdOptions = row.adCourseChapters;
      this.addModifyVisible = true;
      this.getWorkList(id);
    },

    close() {
      this.$refs.workRef && this.$refs.workRef.clearValidate();
      this.addData = {
        chapterId: "",
        courseId: "",
        name: "",
        url: "",
        work: "",
      };
      this.addModifyVisible = false;
    },

    handleSubmit() {
      this.$refs.workRef.validate(async (valid) => {
        if (valid) {
          const { work,url, ...rest } = this.addData;
          const res = await submitWork({
            workId: work.id,
            url: url  ? JSON.stringify(url.map(item => item.url)) : "",
            ...rest,
            chapterId: work.chapterId,
          });
          if (res) {
            this.$message.success("提交成功");
            this.addModifyVisible = false;
          }
        }
      });
    },

    getChapterList() {},
    async getWorkList(courseId) {
      const res = await getCourseWorkList({ courseId });
      this.workOptions = res.result;
    },
  },
};
</script>
<style lang="scss" scoped></style>
