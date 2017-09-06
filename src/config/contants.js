export const INIT_WINDOW_SIZE = {
  width  : 1100,
  height : 800
}

export const LOGIN_WINDOW_SIZE = {
  width : 1100,
  height : 800
}

export const PRINT_JOB_STATUS = {
  undo: '未完成',
  done: '已完成',
  cancelled: '被取消',
  suspend: '打印中断'
}

export const TOAST_TYPE_COLOR = {
  success: '#38BA72',
  fail: '#E13B3F'
}
export const TOAST_INIT = {
  active: 'kb-toast_active',
  off: 'kb-toast_off'
}
export const POPUP_INIT = {
  active: 'kb-popup_active',
  off: 'kb-popup_off'
}

export const WINDOW_BACKGROUND = '#171f2e'
export const WINDOW_NAME = '酷办'


// Printer server
export const PRINTER_NAME = '酷办打印机'
export const PRINTER_HTTP_PORT = 6311
export const PRINTER_MAX_FILE_SIZE = 1024 * 1024 * 100

export const URL_SCHEME = 'http://'

export const PRINT_PORT = 9354

export const JANUS_PORT = 8088

export const LOCAL_SERVER_URL = 'local-server.kuban.local'

export const PRINT_SERVER_URL = 'print-server.kuban.local'

export const JANUS_SERVER_URL = 'janus-server.kuban.local'
// export const JANUS_SERVER_URL = '10.0.109.136'

export const PRINT_URL = `${URL_SCHEME}${PRINT_SERVER_URL}:${PRINT_PORT}`

export const LOCAL_URL = `${URL_SCHEME}${PRINT_SERVER_URL}:${PRINT_PORT}`

export const JANUS_URL = `${URL_SCHEME}${JANUS_SERVER_URL}:${JANUS_PORT}/janus`

const urlScheme = 'https'

//通过分支去区分
const BASE_URL = `${urlScheme}://devapi.kuban.io`

export const BASE_API_URL = `${BASE_URL}/api/v1`
