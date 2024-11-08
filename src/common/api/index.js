import http from "../request";

export function getBannerApi(data) {
    return http({
        url: "/user/info/public/getIndexBanner",
        method: "post",
        data
    })
}

export function getCourseApi(data) {
    return http({
        url: "/user/info/public/getIndexCourse",
        method: "post",
        data
    })
}

export function getRightInfo() {
    return http({
        url: "/user/info/public/getSysParams",
        method: "post"
    })
}

export function getUpToken() {
    return http({
        url: "/comm/getUpToken",
        method: "post"
    })
}