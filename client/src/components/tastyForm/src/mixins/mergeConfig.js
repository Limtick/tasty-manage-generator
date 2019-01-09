import { isFn } from '../util'

export default {
  methods: {
    _mergeConfig (data) {
      let res = []
      data.forEach(item => {
        const { type } = item
        const tagItem = this.$componentTag[type]
        const { component, defaultValue, props } = tagItem

        item.props = {
          ...props,
          ...item.props
        }
        item.component = component
        item.defaultValue = item.defaultValue || defaultValue
        item.option = isFn(item.option) ? item.option : (item.option ? item.option : () => false)
        item._renderable = isFn(item._renderable) ? item._renderable : () => true

        res.push(item)
      })
      return res
    }
  }
}
