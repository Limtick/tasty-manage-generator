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
  }
}
