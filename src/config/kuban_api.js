import { apiGET, apiPOST, apiPUT, apiDELETE } from 'config/apiUtils'

const SCHEMA = 'https://'
let BASE_URL = `${SCHEMA}devapi.kuban.io`

if (process.env.NODE_ENV !== 'development') {
    BASE_URL = `${SCHEMA}api.kuban.io`
}

export const getSmartPlugs = (params) => apiGET(`${BASE_URL}/managements/v1/smart_plugs`, params)

export const getUserInfo = (params) => apiGET(`${BASE_URL}/managements/v1/user?all=true`, params)

export const postSwitch = (params) => apiPUT(`${BASE_URL}/managements/v1/smart_plugs/switch`, params)
