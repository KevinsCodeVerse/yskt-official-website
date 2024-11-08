<template>
  <div>
    <headerWorld></headerWorld>
    <div class="concat">
      <div class="bos-bowwow">
        <img
            :src="courseInfo.image"
            alt=""
            style="width: 720px; height: 506px"
        />
        <div
            style="
            margin-left: 30px;
            text-align: left;
            justify-content: left;
            width: 500px;
          "
        >
          <h3>{{ courseInfo.name }}</h3>
          <div
              class="flex"
              style="margin: 20px 0; text-align: left; justify-content: left"
          >
            <img
                src="https://www.haixingkt.com/Public/Default/images/zxxx.png"
                alt=""
                style="width: 30px; height: 30px"
            />
            <div style="margin-left: 5px">
              {{ courseInfo.readCount }}学习热度
            </div>
          </div>
          <!--          <div>-->
          <!--            <span-->
          <!--              style="-->
          <!--                color: #1584f6;-->
          <!--                font-size: 25px;-->
          <!--                font-weight: bold;-->
          <!--                margin: 15px 0;-->
          <!--              "-->
          <!--              >{{ courseInfo.count }}</span-->
          <!--            >节-->
          <!--          </div>-->
          <div style="color: #999; margin-top: 15px">
            {{ courseInfo.overview }}
          </div>
          <divr
              style="
              color: red;
              font-size: 35px;
              font-weight: bold;
              margin-top: 15px;
            "
          >
            <span style="color: red; font-size: 12px; margin: 15px 0">¥</span
            >{{ courseInfo.hasFree == 0 ? "免费" : courseInfo.price }}
          </divr>
          <div class="studys" @click="handleStudy">我要报名</div>
        </div>
      </div>
      <div class="cruse">
        <div class="leftcruse" style="">
          <div class="leftcruseheader">课程介绍</div>
          <div class="courseo-content" style="background: #ffffff">
            <div class="coursezhong" style="">课程介绍</div>
            <div class="coursetext" style="" v-html="courseInfo.content"></div>
          </div>
        </div>
        <div style="width: 420px">
          <div class="leftcruseheader" style="font-weight: bold">猜你喜欢</div>
          <div
              class="caiLike"
              style=""
              v-for="(item, index) in likeData"
              :key="index"
          >
            <img :src="item.image" alt="" style="width: 175px; height: 110px"/>
            <div
                style="
                margin-left: 30px;
                text-align: left;
                justify-content: left;
                width: 300px;
              "
            >
              <h4 style="margin-bottom: 20px">{{ item.name }}</h4>
              <div
                  class="flex"
                  style="margin: 10px 0; text-align: left; justify-content: left"
              >
                <img
                    src="https://www.haixingkt.com/Public/Default/images/ls.png"
                    alt=""
                    style="width: 16px; height: 16px"
                />
                <div style="margin-left: 5px">
                  主讲老师：{{ item.teacherName }}
                </div>
              </div>
              <div
                  class="flex"
                  style="margin: 10px 0; text-align: left; justify-content: left"
              >
                <img
                    src="https://www.haixingkt.com/Public/Default/images/zxxx.png"
                    alt=""
                    style="width: 16px; height: 16px"
                />
                <div style="margin-left: 5px">{{ item.readCount }}人学习</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footWorld></footWorld>
    <el-dialog @close="handleClose" title="扫码开通课程" :visible="webchatVisible">
      <div style="display: flex;justify-content: center;align-items: center">
        <el-image
            src="https://qiniu.pengfkt.com/FqtEIjrM1T7NfBBGFZV2z7DgkOaL"
            style="width: 500px;height: 500px"
            fit="contain"
            :lazy="true"
        ></el-image>

      </div>
      <div style="color: #666666; text-align: center;">微信扫老师二维码进行报名</div>
    </el-dialog>
  </div>
<!--  location ^~ /files/{-->
<!--    /www/wwwroot/voltameterApi.mtfsoft.cn/files/firmware/20221108/311707e13a0fcf4b32156d950062d8e9.bin-->
<!--  }-->
</template>

<script>
import headerWorld from "@/components/headerWorld.vue";
import footWorld from "@/components/footWorld";
import {getCourseInfoApi, getLikeCourseApi} from "@/common/api/course";

export default {
  components: {
    headerWorld,
    footWorld,
  },
  data() {
    return {
      webchatVisible: false,
      likeData: [
        {
          image:
              "https://www.haixingkt.com/Public/Uploads/20200825/5f44e41af1f39720506.png",
          title: "20231121期基础平面班",
          name: "主讲老师：橙子老师",
          icon: "https://www.haixingkt.com/Public/Default/images/ls.png",
          xuexi: 80,
        },
        {
          image:
              "https://www.haixingkt.com/Public/Uploads/20200825/5f44e41af1f39720506.png",
          title: "20231121期基础平面班",
          name: "主讲老师：橙子老师",
          icon: "https://www.haixingkt.com/Public/Default/images/ls.png",
          xuexi: 80,
        },
        {
          image:
              "https://www.haixingkt.com/Public/Uploads/20200825/5f44e41af1f39720506.png",
          title: "20231121期基础平面班",
          name: "主讲老师：橙子老师",
          icon: "https://www.haixingkt.com/Public/Default/images/ls.png",
          xuexi: 80,
        },
        {
          image:
              "https://www.haixingkt.com/Public/Uploads/20200825/5f44e41af1f39720506.png",
          title: "20231121期基础平面班",
          name: "主讲老师：橙子老师",
          icon: "https://www.haixingkt.com/Public/Default/images/ls.png",
          xuexi: 80,
        },
      ],
      courseInfo: {},
    };
  },
  created() {
    this.getCourseInfo();
    this.getLikeCourse();
  },
  methods: {
    async getCourseInfo() {
      const res = await getCourseInfoApi({
        id: this.$route.query.id,
      });
      this.courseInfo = res.result;
    },
    async getLikeCourse() {
      const res = await getLikeCourseApi();
      this.likeData = res.result;
    },
    handleStudy() {
      this.webchatVisible = true;
    },
    handleClose() {
      this.webchatVisible = false
    }
  },
};
</script>

<style scoped>
.concat {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}

.bos-bowwow {
  background: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 1200px;
  margin: 20px auto;
  /* margin: 50px auto; */
  display: flex;
  align-content: center;
  justify-content: space-between;
}

.studys {
  width: 130px;
  height: 40px;
  line-height: 40px;
  display: block;
  font-size: 20px;
  text-align: center;
  color: #fff;
  background: #1484f6;
  border-radius: 5px;
  margin-top: 30px;
  cursor: pointer;
}

.cruse {
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 1200px;
  margin: auto;
}

.leftcruse {
  width: 750px;
  height: 100%;
  overflow: hidden;
  /* margin-right: 150px; */
  border-radius: 8px 8px 0 0;
}

.leftcruseheader {
  height: 60px;
  line-height: 60px;
  background: #eaeaea;
  border-bottom: 1px solid #eaeaea;
  border-radius: 8px 8px 0 0;
  padding-left: 80px;
}

.courseo-content {
  height: 100%;
  overflow: hidden;
}

.coursezhong {
  font-size: 20px;
  border-bottom: 1px solid #eaeaea;
  height: 45px;
  line-height: 45px;
  margin-bottom: 20px;
  padding: 25px 0 10px 30px;
  font-weight: bold;
}

.coursetext {
  font-size: 20px;
  border-bottom: 1px solid #eaeaea;
  height: 100%;
  line-height: 45px;
  margin-bottom: 20px;
  /* margin-left: 30px; */
}

.caiLike {
  margin-top: 30px;
  padding: 0 30px 30px 30px;
  display: flex;
  align-content: center;
  justify-content: space-between;
}
</style>
