import emitter from './emitter'
import { isFn, sendRequest, resetBindValue } from '../util'

export default {
  mixins: [emitter],
  methods: {
    _send: sendRequest,
    _getResetOption (bindRule, key, value) {
      const { option, useRequest } = bindRule[key]
      if (!isFn(option)) {
        return Promise.resolve(option)
      }
      const params = bindRule[key].params || []
      return useRequest ? this._send(option, ...params) : Promise.resolve(option(value))
    },
    _changeOptionByRule (value, key, groupIndex) {
      if (!this.bindRule || !this.bindRule[key]) return

      const { target } = this.bindRule[key]
      this._getResetOption(this.bindRule, key, value).then(res => {
        this.options[target].option = res
        if (groupIndex === undefined || groupIndex === null) {
          resetBindValue(this.form, target)
        } else {
          this.dispatch('TastyFormGroup', 'tastyForm.group.reset.bind.value', [target, groupIndex])
        }
      })
    }
  }
}
