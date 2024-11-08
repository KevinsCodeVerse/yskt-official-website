<!-- 直播页面 -->
<template>
  <div>
    <headerWorld></headerWorld>
    <div class="live_box">
      <div v-if="info.adCourse" class="title_content">
        <div class="name">{{ courseName }}</div>
        <div class="hot">
          <img style="width: 20px" src="@/assets/img/hot.svg" alt=""/>{{
            info.adCourse.readCount
          }}学习热度
        </div>
      </div>

      <div class="video-box">
        <div class="left_video">
          <div v-show="emptyVisible" class="empty_content">
            <img src="@/assets/img/empty_video.svg" alt=""/>
            <span>{{ emptyMessage }}</span>
          </div>

          <div v-show="!emptyVisible" id="videoPlayer"></div>
        </div>
        <div class="teach_info shadow">
          <div class="title">授课老师</div>
          <div class="avatr">
            <img width="50px" src="@/assets/img/woman.svg" alt=""/>
            <span>{{ info.teacherName }}</span>
          </div>

          <div class="overview">
            <span v-if="info.teacherOverview"> {{ info.teacherOverview }}</span>
            <span v-else>这个人很懒还没有留下什么话~</span>
          </div>
          <div class="worklist">
            <div class="title">{{info.workList?.length>0?'附件下载':'暂无附件'}}</div>
            <div class="work_box">
              <div
                  class="work_item"
                  v-for="item in info.workList"
                  :key="item.id"
              >
                <span> {{ item.name }}</span>
                <i
                    v-if="item.material"
                    @click="handleDownloadMaterial(item.material)"
                    class="el-icon-download"
                ></i>
              </div>
            </div>
          </div>
          <span @click="handleSubmitWork" class="submit_work">提交作业</span>
        </div>
      </div>
      <div class="chapter_list shadow">
        <div class="title">{{ courseType }}</div>
        <div class="chapter">
          <div v-for="(item, index) in info.chapterList" :key="index">
            <div class="chapter_name">
              {{ item.name }}
            </div>
            <div v-if="item.children && item.children.length > 0">
              <div
                  class="chapter_item"
                  v-for="(item, innerIndex) in item.children"
                  :key="innerIndex"
                  @click="handleChapter(item)"
                  :class="{ isActive: isAcitveItem(item) }"
              >
                <div class="chapter_name">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="title">课程描述</div>
        <div v-if="info.adCourse" class="course_desc">
          <div v-html="info.adCourse.content"></div>
        </div>
      </div>
    </div>
    <submitWork ref="work"></submitWork>
  </div>
</template>

<script>
import headerWorld from "@/components/headerWorld.vue";
import rsa from "@/utils/rsa";
import {getStudentInfoApi} from "@/common/api/course";
import {watchSave} from "@/common/api/course";
import submitWork from "@/components/submitWork.vue";
import {listToTree} from "@/utils/tools";
import "mui-player/dist/mui-player.min.css";
import MuiPlayer from "mui-player";
import Hls from "hls.js";
import MuiPlayerDesktopPlugin from "mui-player-desktop-plugin";

export default {
  components: {
    headerWorld,
    submitWork,
  },
  name: "livePage",
  data() {
    return {
      emptyVisible: false,
      emptyMessage: "",
      courseName: "",
      cameraURL: "",
      myPlayer: "",
      courseType: "",
      listToTree,
      info: {},
      player: "",
      chapterImage:""
    };
  },
  mounted() {
    this.getStudentInfo();
  },

  methods: {
    initVideo(url, live = true, image, name) {
      if (image){
        this.chapterImage=image
      }
      this.player = new MuiPlayer({
        container: "#videoPlayer",
        title: name || "",
        src: url,
        live: live,
        autoplay: live,
        lang: "zh-cn",
        volume: 0.6,
        poster: this.chapterImage,
        muted: false,
        height: 472.5,
        preload: "auto",
        parse: {
          type: live ? "hls" : "mp4",
          loader: live ? Hls : "",
        },
        plugins: [
          new MuiPlayerDesktopPlugin({
            contextmenu: [],
            customSetting: [],
          }),
        ],
      });
      this.player.on("error", (e) => {
        this.hanleVideoError(e);
      });
    },

    async getStudentInfo() {
      this.emptyVisible = true;
      this.emptyMessage = "加载中....";
      console.log('this.$route.',this.$route)
      const res = await getStudentInfoApi({
        courseId: this.$route.query.courseId,
        orderNum: this.$route.query.orderNum,
        teacherId: this.$route.query.teacherId,
      });
      this.info = res.result;
      this.info.chapterList = listToTree(this.info.chapterList);
      this.courseName = this.info.adCourse.name;
      this.courseType =
          this.info.adCourse.hasLive === 0 ? "直播课程" : "录播课程";
      if (this.info.liveUrl) {
        const url = rsa.decryptByPublicKey(this.info.liveUrl);
        this.emptyVisible = false;
        this.initVideo(url);
      } else {
        if (this.info.adCourse.hasLive === 1) {
          if (
              this.info.chapterList[0] &&
              this.info.chapterList[0].children[0]
          ) {
            this.handleChapter(this.info.chapterList[0].children[0]);
          } else {
            this.emptyVisible = true;
            this.emptyMessage = "请点击下方章节播放视频";
          }
        } else {
          this.emptyVisible = true;
          this.emptyMessage = "当前暂无直播";
        }
      }
    },
    handleSubmitWork() {
      this.$refs.work.edit(this.$route.params.id);
    },
    handleDownloadMaterial(url) {
      let downloadElement = document.createElement("a");
      var lastOf = url.lastIndexOf("/"); // '/'所在的最后位置
      var str = url.substr(lastOf + 1);
      downloadElement.href = url + `?attname=${str}`;
      document.body.appendChild(downloadElement);
      downloadElement.click(); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
    },

    hanleVideoError() {
      this.emptyVisible = true;
      if (this.info.adCourse.hasLive === 1) {
        this.emptyMessage = "视频出错啦~，请重新加载！";
      } else {
        this.emptyMessage = "当前暂无直播";
      }
    },
    handleChapter(chapter) {
      if (!chapter.url) {
        this.$message.error("暂无视频");
        return;
      }
      if (this.player) {
        this.player.destroy();
      }
      this.emptyVisible = false;
      this.courseName = this.info.adCourse.name + "-" + chapter.name;
      const url = rsa.decryptByPublicKey(chapter.url);
      this.initVideo(url, false, chapter.image, chapter.name);
      watchSave({
        chapterId: chapter.id,
      });
      //添加学习记录
      console.log("学习章节:", chapter)
    },

    isAcitveItem(item) {
      return this.courseName === this.info.adCourse.name + "-" + item.name;
    },
  },
  destroyed() {
  },
};
</script>
<style lang="less" scoped>
.live_box {
  width: 1200px;
  margin: 20px auto;
}

.title {
  position: relative;
  font-size: 16px;
  font-weight: bold;
  padding-left: 10px;
  margin-bottom: 10px;

  &::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 10%;
    width: 4px;
    border-radius: 2px;
    background: #3a85ee;
    height: 80%;
  }
}

.title_content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  .name {
    font-size: 18px;
    font-weight: bold;
  }

  .hot {
    display: flex;
    align-items: flex-start;

    img {
      padding-right: 5px;
    }

    color: #666;
  }
}

.video-box {
  display: flex;
  justify-content: space-between;

  .left_video {
    width: 70%;
  }

  .empty_content {
    display: flex;
    width: 100%;
    height: 425.5px;
    flex-direction: column;
    background: #e8e8e8;
    justify-content: center;
    align-items: center;
    color: #666;
  }

  .teach_info {
    width: 25%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    overflow: auto;
    position: relative;
    box-sizing: border-box;

    .avatr {
      margin: 10px 0px;
      display: flex;
      align-items: center;

      span {
        padding-left: 10px;
      }
    }

    .overview {
      margin-bottom: 20px;
      color: #666;
    }

    .submit_work {
      position: absolute;
      box-sizing: border-box;
      width: 94%;
      bottom: 10px;
      padding: 8px 10px;
      margin: auto;
      text-align: center;
      color: #fff;
      border-radius: 4px;
      // margin: 10px 0px;
      background: #3a85ee;
      cursor: pointer;

      &:hover {
        background: rgba(58, 133, 238, 0.8);
      }
    }
  }
}

.chapter_list {
  box-sizing: border-box;
  margin: 10px 0px;
  width: 70%;
  padding: 20px 15px 30px;

  .isActive {
    color: #3a85ee;
  }

  .chapter {
    margin: 10px 0px;
    margin-bottom: 20px;
    max-height: 500px;
    overflow: auto;
  }

  .chapter_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    cursor: pointer;
    margin: 10px;

    &:hover {
      background: #e9e9e9;
    }

    .chapter_time {
      display: flex;
      align-items: center;
      color: #666;
      box-sizing: border-box;

      img {
        padding-right: 5px;
      }
    }
  }
}

.worklist {
  .work_box {
    max-height: 180px;
    overflow: auto;
    .work_item {
      color: #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
      //margin: 5px 2px;
      //padding: 3px;

      i {
        font-weight: bold;
      }

      &:hover {
        background: #e9e9e9;

        i {
          color: #3a85ee;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
