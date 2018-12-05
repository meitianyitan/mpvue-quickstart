import flyRequest from './flyio/request'

export const getSSQ = (param) => flyRequest.get('mcwp.getSsq', param)
