import Request from '../utilis/request';
export function getProducts(params) {
    return Request({
        url: '/api/products',
        method: 'get',
        params: params
    })
}
export function getProduct(id, params) {
    return Request({
        url: '/api/products/'+id,
        method: 'get',
        params: params
    })
}
export function rateProduct(id, data) {
    return Request({
        url: '/add_comment/'+id,
        method: 'post',
        data: data
    })
}