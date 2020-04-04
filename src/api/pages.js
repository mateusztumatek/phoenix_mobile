import Request from '../utilis/request';
export function getPage(slug, params) {
    return Request({
        url: '/strona/'+slug,
        method: 'get',
        params: params
    })
}
