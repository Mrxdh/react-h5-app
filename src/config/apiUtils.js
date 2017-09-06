import reqwest from 'reqwest'
import { GLOBAL_USER, GLOBAL_SPACE } from './kbUtil'

export const ajax = (params) => {
  if (params.data && params.data.headers) {
    delete params.data.headers
  }
  console.log(`API Request: ${JSON.stringify(params)}`)
  /**
   * @url 请求地址(必填)
   * @type  json数据类型
   * @method  请求类型
   **/
  return new Promise((resolve, reject) => {
    reqwest({
      method : 'GET',
      ...params,
    }).then(res => {
      resolve(res)
    }).fail((e, msg) => {
      let errorJSON = ''
      console.error(`API Error: ${e.status}: ${e.response}`)

      if (e.status == 401){
        console.error(`Token expired`)
      }

      try {
        errorJSON = JSON.parse(e.response)
      } catch (e) {
        errorJSON = e.response
      }

      const message = typeof errorJSON === 'string' ? errorJSON : (errorJSON && errorJSON._error && errorJSON._error.message || '')

      if (message) {
        // ipcRenderer.send('send-msg', {
        //   msg : message,
        //   status : 'error'
        // })
      }

      reject({
        message,
        status : e.status
      })
    })
  })
}

export const getHeader = (headers) => {
  let header = {
    'Accept' : 'application/json',
    ...headers
  }

  if (GLOBAL_USER && GLOBAL_USER.jwt_token) {
    header.Authorization = `Bearer ${GLOBAL_USER.jwt_token}`
  }

  if (GLOBAL_SPACE) {
    //TODO(CR): this could be a big problem if a user belongs to two spaces
    //we must use current space instead of user home space!
    //maybe check network call should return current space id!
    header['X-space-id'] = GLOBAL_SPACE.id
  }

  return header
}

export const normal_ajax = (url, data, method) => ajax({
  url,
  method,
  data,
  headers : getHeader(data ? data.headers : {})
})

export const apiGET    = (url, data) => normal_ajax(url, data, 'GET')

export const apiPOST   = (url, data) => normal_ajax(url, data, 'POST')

export const apiPUT    = (url, data) => normal_ajax(url, data, 'PUT')

export const apiDELETE = (url, data) => normal_ajax(url, data, 'DELETE')
