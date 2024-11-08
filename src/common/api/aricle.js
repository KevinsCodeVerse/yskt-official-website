import http from "../request";


//获取课程详情
export function getArticleListApi(data) {
    return http({
        url: "/user/info/public/articleList",
        method: "post",
        data
    })
}

export function getArticleDetailApi(data) {
    return http({
        url: "/user/info/public/articleDetail",
        method: "post",
        data
    })
}


