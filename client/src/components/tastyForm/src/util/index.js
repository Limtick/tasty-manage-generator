export const isFn = data => Object.prototype.toString.call(data) === '[object Function]'
export const isArray = data => Object.prototype.toString.call(data) === '[object Array]'

/**
 * @description send request via function name
 * @example
 * ```javascript
 * const add = param => Axios.post('/path/to/add', param)
 * const detail = (id, param) => Axios.get('/path/to/get' + id, param)
 * sendRequest(add, {name: 'demo'})
 * sendRequest(detail, 'testId', {type: 'demo'})
 * ```
 * @param {Function} request a function which return a request Promise
 * @param args
 */
export const sendRequest = (request, ...args) => request.apply(request, args)

export const list2obj = (list, key) => {
  let res = {}
  list.forEach(item => {
    if (!res[item[key]]) {
      res[item[key]] = { ...item }
    }
  })

  return res
}

export const resetBindValue = (form, target) => {
  if (isArray(form[target])) {
    form[target] = []
  }
}
