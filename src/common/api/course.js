import http from "../request";


//获取课程详情
export function getCourseInfoApi(data) {
    return http({
        url: "/user/info/public/courseDetail",
        method: "post",
        data
    })
}

//获取猜你喜欢
export function getLikeCourseApi() {
    return http({
        url: "/user/info/public/guessLike",
        method: "post"
    })
}


//获取立即学习详细信息
export function getStudentInfoApi(data) {
    return http({
        url: "/user/info/student",
        method: "post",
        data
    })
}

//添加或修改学习记录
export function watchSave(data){
    return http({
        url: "/user/info/watchSave",
        method: "post",
        data
    })
}

//获取公开课详细信息
export function getFreeStudentInfoApi(data) {
    return http({
        url: "/user/info/openClass",
        method: "post",
        data
    })
}

export function getOrderDetailApi(data) {
    return http({
        url: "/user/info/myOrderDetail",
        method: "post",
        data
    })
}
