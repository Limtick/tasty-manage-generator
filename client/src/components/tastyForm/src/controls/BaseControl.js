import { EventEmitter } from 'events'
import { sendRequest } from '../util'
export default class BaseControl extends EventEmitter {
  /**
   * @description 控制类
   * @param {String} name ref name
   * @param {Object} option 请求设置 <add | update | delete | load>
   * ======================================
   * @param {Promise} option.add    新增请求
   * @param {Promise} option.update 更新请求
   * @param {Promise} option.delete 删除请求
   * @param {Promise} option.load   加载请求
   * ======================================
   * @param {Object} vm vue 组件实例
   */
  constructor (name, option, vm) {
    super()
    this.vm = vm
    this.name = name
    this.loading = false
    this.args = []
    this.option = option
  }
  loadData () {
    const { load } = this.option
    this.loading = true
    this.emit('loading')
    this._send(load, arguments).then((res) => {
      setTimeout(() => {
        this.loading = false
        this.emit('load-success', res)
      }, 1000)
    }).catch(mes => {
      this.loading = false
      this.emit('load-error', mes)
    })
  }
  _send (request, args) {
    const param = args || []
    return sendRequest(request, ...param)
  }
}
