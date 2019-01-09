import mergeConfig from './mergeConfig'

export default {
  mixins: [mergeConfig],
  data () {
    return {
      form: {}
    }
  },
  watch: {
    // 触发 v-model
    form (data) {
      this.$emit('change', data)
    }
  },
  methods: {
    setDefaultValueByRenderRule () {
      const settings = this.itemConfig
      switch (this.$options.componentName) {
        case 'TastyForm':
          settings.forEach(item => {
            const { key, defaultValue } = item
            const renderable = item._renderable && item._renderable(this.form)
            if (!renderable) {
              this.$set(this.form, key, defaultValue())
            }
          })
          break
        case 'TastyFormGroup':
          this.form[this.groupKey].forEach(groupItem => {
            settings.forEach(item => {
              const { key, defaultValue } = item
              const renderable = item._renderable && item._renderable(groupItem)
              if (!renderable) {
                this.$set(groupItem, key, defaultValue())
              }
            })
          })
          break
        default:
          break
      }
    }
  }
}
