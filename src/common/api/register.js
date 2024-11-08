import http from "../request";

export function sendCodeApi(data) {
    return http({
        url: "/user/info/public/sendCode",
        method: "post",
        data
    })
}

export function registerApi(data) {
    return http({
        url: "/user/info/public/register",
        method: "post",
        data
    })
}
