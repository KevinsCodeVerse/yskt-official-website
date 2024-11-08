<template>
  <div>
    <headerWorld></headerWorld>
    <div class="header-swiper">
      <el-carousel
          style="width: 100%"
          :interval="3000"
          arrow="hover"
          height="450px"
          indicator-position="outside"
      >
        <!-- 使用 v-lazy 指令懒加载轮播图图片 -->
        <el-carousel-item v-for="item in bannerList" :key="item.sort">
          <img :src="item" alt="" class="swiperImage" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="content">
      <!-- 将侧边栏放置在 content 中 -->
      <div class="sidebar">
        <div class="sidebar-section" @click="handleToDetail(7)">
          <div class="sidebar-icon"><i class="el-icon-info"></i></div>
          <div class="sidebar-text">关于我们</div>
        </div>
        <div class="sidebar-section" @click="handleToDetail(8)">
          <div class="sidebar-icon"><i class="el-icon-service"></i></div>
          <div class="sidebar-text">售后服务</div>
        </div>
        <div class="sidebar-section" @click="handleToDetail(9)">
          <div class="sidebar-icon"><i class="el-icon-warning"></i></div>
          <div class="sidebar-text">投诉建议</div>
        </div>
        <div class="sidebar-section" @click="handleToDetail(14)">
          <div class="sidebar-icon"><i class="el-icon-help"></i></div>
          <div class="sidebar-text">帮助中心</div>
        </div>
        <div class="sidebar-section">
          <div class="sidebar-icon"><i class="el-icon-mobile"></i></div>
          <el-image
              src="https://qiniu.pengfkt.com/FnLDs3DDiyta2AfTaRWR5_Ys1Zgo"
              alt="公众号二维码"
              class="qr-code-image"
              :preview-src-list="['https://qiniu.pengfkt.com/FnLDs3DDiyta2AfTaRWR5_Ys1Zgo']"
          />
          <div class="sidebar-text">公众号二维码</div>
        </div>
        <div class="sidebar-section">
          <div class="sidebar-icon"><i class="el-icon-phone"></i></div>
          <el-image
              src="https://qiniu.pengfkt.com/FqtEIjrM1T7NfBBGFZV2z7DgkOaL"
              alt="官方电话"
              class="qr-code-image"
              :preview-src-list="['https://qiniu.pengfkt.com/FqtEIjrM1T7NfBBGFZV2z7DgkOaL']"
          />
          <div class="sidebar-text">官方电话：{{ rightInfo.phone }}</div>
        </div>
      </div>

      <div class="main-content">
        <div
            class="course-section"
            v-for="couseContent in courseTitleList"
            :key="couseContent.categoryName"
        >
          <h2 class="section-title">{{ couseContent.categoryName }}</h2>
          <div class="course-grid">
            <div
                class="course-card"
                v-for="item in couseContent.courseList"
                :key="item.id"
                @click="goPage(item)"
            >
              <div class="course-image-wrapper">
                <!-- 使用 v-lazy 懒加载课程图片 -->
                <img v-lazy="item.image" alt class="course-image" />
                <span class="course-tag">{{ item.hasFree === 0 ? '免费' : '收费' }}</span>
                <div class="course-overlay"></div>
              </div>
              <div class="course-info">
                <div class="course-name">{{ item.name }}</div>
                <div class="course-teacher">主讲老师: {{ item.teacherName }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footWorld></footWorld>
  </div>
</template>

<script>
import { getBannerApi, getCourseApi, getRightInfo } from "@/common/api/index";
import footWorld from "@/components/footWorld";
import headerWorld from "@/components/headerWorld.vue";

export default {
  components: {
    footWorld,
    headerWorld,
  },
  data() {
    return {
      rightInfo: {},
      bannerList: [],
      courseTitleList: [],
    };
  },
  created() {
    this.getBannerList();
    this.getCourseList();
    this.getRightInfo();
  },
  methods: {
    goPage(item) {
      const path = item.hasFree === 0 ? `/freeLive/${item.id}` : `/homeIndex?id=${item.id}`;
      this.$router.push({ path });
    },
    handleToDetail(id) {
      this.$router.push({ path: "/article/detail", query: { id } });
    },
    async getBannerList() {
      const res = await getBannerApi({});
      this.bannerList = res.result.map((item) => item.image);
    },
    async getCourseList() {
      const res = await getCourseApi({});
      this.courseTitleList = res.result;
    },
    async getRightInfo() {
      const res = await getRightInfo();
      this.rightInfo = JSON.parse(res.result);
    },
  },
};
</script>

<style scoped lang="less">
.header-swiper {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .swiperImage {
    width: 100%;
    height: 450px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
}

.content {
  display: flex;
  max-width: 1400px;
  margin: 80px auto;
  flex-grow: 1;
  position: relative; /* 让 sidebar 在 content 内相对固定 */
}

.sidebar {
  position: sticky;
  top: 20px;
  flex-basis: 200px; /* 初始宽度 */
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-wrap: wrap; /* 允许换行 */
}

.sidebar-section {
  display: flex;
  align-items: center;
  background: #f7f7f7;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.4s ease;
  justify-content: space-between; /* 使内容更合理分布 */
  flex-wrap: wrap; /* 使内容在小屏下自动换行 */

  &:hover {
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
    background: #f0f0f0;
  }

  .sidebar-icon {
    font-size: 24px;
    color: #FF6347;
    margin-right: 15px;
  }

  .sidebar-text {
    font-size: 18px;
    color: #333;
    font-weight: bold;
    flex-grow: 1; /* 使文字部分自适应 */
  }

  .qr-code-image {
    width: 80px;
    height: 80px;
    margin-right: 15px;
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    flex-shrink: 0; /* 防止图片压缩 */
  }
}

@media (max-width: 1600px) {
  .sidebar {
    flex-basis: 150px; /* 中等屏幕时稍微缩小侧边栏 */
  }

  .sidebar-section {
    flex-direction: column; /* 使内容在小屏下垂直排列 */
    align-items: flex-start; /* 左对齐 */
    .sidebar-icon {
      margin-bottom: 10px;
    }
    .qr-code-image {
      margin-bottom: 10px;
    }
  }
}

@media (max-width: 1200px) {
  .sidebar {
    display: none; /* 小屏幕时隐藏侧边栏 */
  }
}


.main-content {
  z-index: 99;
  flex: 1;
  min-width: 0;
  margin-left: 20px;
}

.sidebar-section {
  display: flex;
  align-items: center;
  background: #f7f7f7;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
    background: #f0f0f0;
  }
  .sidebar-icon {
    font-size: 24px;
    color: #FF6347;
    margin-right: 15px;
  }
  .sidebar-text {
    font-size: 18px;
    color: #333;
    font-weight: bold;
  }
  .qr-code-image {
    width: 80px;
    height: 80px;
    margin-right: 15px;
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
}

.course-section {
  margin-bottom: 60px;
  .section-title {
    font-size: 34px;
    color: #333;
    text-align: right;
    margin-right: 36px;
    margin-bottom: 30px;
    text-transform: uppercase;
    letter-spacing: 3px;
    position: relative;
    &::after {
      content: "";
      width: 100%;
      height: 4px;
      background: #FF6347;
      position: absolute;
      bottom: -10px;
      left: 0;
    }
  }
  .course-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
  }
  .course-card {
    flex: 1 1 calc(16.66% - 40px);
    max-width: calc(16.66% - 40px);
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    cursor: pointer;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    position: relative;
    &:hover {
      transform: translateY(-12px);
      box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
    }
    .course-image-wrapper {
      position: relative;
      overflow: hidden;
      border-radius: 12px 12px 0 0;
      .course-image {
        width: 100%;
        height: 180px;
        object-fit: cover;
        transition: transform 0.4s ease;
      }
      &:hover .course-image {
        transform: scale(1.1);
      }
      .course-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        opacity: 0;
        transition: opacity 0.4s ease;
      }
      &:hover .course-overlay {
        opacity: 1;
      }
      .course-tag {
        position: absolute;
        top: 12px;
        right: 12px;
        background: #FF6347;
        padding: 8px 12px;
        border-radius: 5px;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        z-index: 10;
      }
    }
    .course-info {
      padding: 20px;
      .course-name {
        font-size: 20px;
        color: #333;
        margin-bottom: 12px;
        font-weight: bold;
      }
      .course-teacher {
        font-size: 14px;
        color: #666;
      }
    }
  }
}
</style>
