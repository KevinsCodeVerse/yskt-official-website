import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import schoolIndex from '../views/indexDetails/schoolDetails'
import homeIndex from '../views/indexDetails/homeIndex'
import payIndex from '../views/indexDetails/payIndex'
import loginIndex from '../views/login/loginIndex'
import regIndex from '../views/reg/regIndex'
import live from '../views/live/index'
import freeLive from '../views/live/freeIndex'
import userCenter from '../views/userCenter/index'
import homeWorkCircle from '../views/homeWorkCircle/index'
import operationSquare from '../views/homeWorkCircle/operationSquare'
import myWork from "@/views/homeWorkCircle/myWork.vue";
import myProfile from '../views/userCenter/myProfile'
import registration from '../views/userCenter/registration'
import myCourse from '../views/userCenter/myCourse'
import myOrder from '../views/userCenter/myOrder'
import orderDetail from "../views/userCenter/orderDetail"
import article from "../views/article/index"
import detail from "../views/article/detail"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/schoolIndex',
    name: 'schoolIndex',
    component: schoolIndex
  },
  {
    path: '/homeIndex',
    name: 'homeIndex',
    component: homeIndex
  },
  {
    path: '/payIndex',
    name: 'payIndex',
    component: payIndex
  },
  {
    path: '/loginIndex',
    name: 'loginIndex',
    component: loginIndex
  },
  {
    path: '/regIndex',
    name: 'regIndex',
    component: regIndex
  },
  {
    path: '/freeLive/:id',
    name: 'freeLive',
    component: freeLive
  },
  {
    path: '/live/:id',
    name: 'live',
    component: live
  },
  {
    path: '/article',
    name: 'article',
    component: article
  },
  {
    path: '/article/detail',
    name: 'detail',
    component: detail
  },
  {
    path: '/userCenter/myCourse',
    name: 'myCourse',
    // meta: {
    //   title: "我的课程",
    //   icon: "reading"
    // },
    component: myCourse,
  },
    //作业圈
  {
    path: '/homeWorkCircle',
    name: 'homeWorkCircle',
    component: homeWorkCircle,
    redirect: "/homeWorkCircle/operationSquare",
    children: [
      {
        path: 'operationSquare',
        name: 'operationSquare',
        meta: {
          title: "广场",
          icon: "user"
        },
        component: operationSquare,
      }  ,    {
        path: 'myWork',
        name: 'myWork',
        meta: {
          title: "我的作业",
          icon: "user"
        },
        component: myWork,
      }
    ]
  },
  {
    path: '/userCenter',
    name: 'userCenter',
    component: userCenter,
    redirect: "/userCenter/myProfile",
    children: [
      {
        path: 'myProfile',
        name: 'myProfile',
        meta: {
          title: "我的资料",
          icon: "user"
        },
        component: myProfile,
      },
      {
        path: 'registration',
        name: 'registration',
        meta: {
          title: "注册学籍",
          icon: "document"
        },
        component: registration,
      },

      {
        path: 'myOrder',
        name: 'myOrder',
        meta: {
          title: "我的订单",
          icon: "document"
        },
        component: myOrder,
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        meta: {
          title: "订单详情",
          hidden: true,
          active: "/userCenter/myOrder"
        },
        component: orderDetail,
      }
      // {
      //   path: 'workCircle',
      //   name: 'workCircle',
      //   meta: {
      //     title: "作业圈",
      //     icon: "bangzhu"
      //   },
      //   component: workCircle,
      // }
    ]
  },
  // {
  //   path: '/details',
  //   name: 'details',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/indexDetails/soloLj.vue')
  // }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
