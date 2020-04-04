import Request from '../utilis/request';
export function getGallery(params) {
    return Request({
        url: '/galeria',
        method: 'get',
        params: params
    })
}
