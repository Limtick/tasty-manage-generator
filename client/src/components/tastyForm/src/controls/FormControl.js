import BaseControl from './BaseControl'

export default class FormControl extends BaseControl {
  /**
   * @description 表单控制类
   * @param {String} name tasty form ref name
   * @param {Object} option 请求设置
   * @param {Object} vm vue 组件实例
   */
  constructor (name, option, vm) {
    super(name, option, vm)
    this.isEdit = false
  }
  static init (name, option, vm) {
    return new FormControl(name, option, vm)
  }
  getReadyForAdd () {
    this.resetForm()
    this.isEdit = false
    this.args = arguments

    delete this.vm.$refs[this.name].form['id']
  }
  getReadyForUpdate () {
    this.isEdit = true
    this.args = arguments
  }
  resetForm () {
    this.vm.$refs[this.name].resetForm()
  }
  submitForm () {
    const { add, update } = this.option
    const request = this.isEdit ? update : add

    this._send(request, this.args).then(res => {
      this.emit('submit-success', res)
    }).catch(mes => {
      this.emit('submit-error', mes)
    })
  }
}
