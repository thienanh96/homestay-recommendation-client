export function createQueryString(params) {
    const { limitParams, offsetParams, orderByParams, cityParams, nameParams, priceRangeParams, idsParams } = params
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
    console.log('apiiiiiiiiiiiiiiiiiiii: ',api)
    return api
}