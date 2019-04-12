export function createQueryString(params) {
    if(!params) return null;
    const { limitParams, offsetParams, orderByParams, cityParams, nameParams, priceRangeParams, idsParams, host_id, notAllowed } = params
    let api = ''
    if (limitParams) {
        api += '?limit=' + limitParams
    } else {
        api += '?limit=9'
    }
    if (offsetParams) {
        api += '&offset=' + offsetParams
    } else {
        api += '&offset=0'
    }
    if (orderByParams) {
        api += '&order_by=' + orderByParams
    }
    if (cityParams) {
        api += '&city=' + cityParams
    }
    if (nameParams) {
        api += '&city=' + cityParams
    }
    if (priceRangeParams) {
        api += '&price_range=' + priceRangeParams
    }
    if (idsParams) {
        api += '&ids=' + idsParams
    }
    if (host_id) {
        api += '&host_id=' + host_id
    }
    if(notAllowed){
        api += '&not_allowed=1'
    }
    console.log('apiiiiiiiiiiiiiiiiiiii: ', api)
    return api
}