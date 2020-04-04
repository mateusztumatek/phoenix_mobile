import Request from '../utilis/request';
export function getAppInfo(params) {
    return Request({
        url: '/app_info',
        method: 'get',
        params: params
    })
}
export function getHome(params) {
    return Request({
        url: '/',
        method: 'get',
        params: params
    })
}
export function getFilters(params) {
    return Request({
        url: '/api/filters',
        method: 'get',
        params: params
    })
}
export function order(data) {
    return Request({
        url: '/store/order',
        method: 'post',
        data: data
    })
}