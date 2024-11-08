import http from "../request";

export function getCategoryApi(data) {
    return http({
        url: "/user/info/public/categoryNoList",
        method: "post",
        data
    })
}

export function getCourseListApi(data) {
    return http({
        url: "/user/info/public/courseList",
        method: "post",
        data
    })
}
// 通过订单获取课程列表
export function getCourseListByOrderApi(data) {
    return http({
        url: "/user/info/courseListByOrder",
        method: "post",
        data
    })
}




