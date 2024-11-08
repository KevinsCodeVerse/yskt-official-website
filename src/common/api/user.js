import http from "../request";

//账号登录
export function accountLoginApi(data) {
    return http({
        url: "/user/info/public/accountLogin",
        method: "post",
        data
    })
}

//验证码登录
export function smsCodeLoginApi(data) {
    return http({
        url: "/user/info/public/smsCodeLogin",
        method: "post",
        data
    })
}

//获取个人信息
export function getUserInfoApi(data) {
    return http({
        url: "/user/info/getPersonData",
        method: "post",
        data
    })
}

//修改个人信息
export function updateUserInfoApi(data) {
    return http({
        url: "/user/info/editPersonData",
        method: "post",
        data
    })
}

//获取个人课程
export function getUsercourseListApi(data) {
    return http({
        url: "/user/info/courseList",
        method: "post",
        data
    })
}

//获取个人订单
export function getUserOrderApi(data) {
    return http({
        url: "/user/info/orderList",
        method: "post",
        data
    })
}

//获取直播链接
export function getLiveUrlApi(data) {
    return http({
        url: "/user/info/getLiveUrl",
        method: "post",
        data
    })
}

//获取作业
export function getCourseWorkList(data) {
    return http({
        url: "/user/info/courseWorkList",
        method: "post",
        data
    })
}


//提交作业
export function submitWork(data) {
    return http({
        url: "/user/info/submitWork",
        method: "post",
        data
    })
}

//注册学籍
export function registerApi(data) {
    return http({
        url: "/user/info/register",
        method: "post",
        data
    })
}


//是否显示注册学籍
export function isShowRegisterApi(data) {
    return http({
        url: "/user/info/hasStudentNum",
        method: "post",
        data
    })
}
//作业圈广场
export function getWorkCircleApi(data) {
    return http({
        url: "/user/info/public/workList",
        method: "post",
        data
    })
}

// 已提交作业
export function getSubmitWorkApi(data) {
    return http({
        url: "/user/info/myWork",
        method: "post",
        data
    })
}
// 未提交作业
export function getUnsubmitWorkApi(data) {
    return http({
        url: "user/info/unSubWorkList",
        method: "post",
        data
    })
}





