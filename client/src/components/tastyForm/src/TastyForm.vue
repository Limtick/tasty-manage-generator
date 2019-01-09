<template>
  <el-form :model="form" ref="form" label-width="100px">
    <template v-for="(item, index) in options">
      <el-form-item
        v-if="item._renderable && item._renderable(form)"
        :key="`${item.type}_${index}`"
        :label="item.label"
        :prop="item.key">
        <component
          v-model="form[item.key]"
          v-bind="item.props"
          :is="item.component"
          :inherit-prop="item.props"
          :option="item.option"
          :bind-key="item.key"></component>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import changeOption from './mixins/changeOption'
import formMixins from './mixins/form'
import { list2obj } from './util'
export default {
  name: 'TastyForm',
  componentName: 'TastyForm',
  model: {
    prop: 'data',
    event: 'change'
  },
  props: {
    config: Array,
    data: Object,
    bindRule: Object
  },
  mixins: [formMixins, changeOption],
  data () {
    return {
      options: list2obj(this._mergeConfig(this.config), 'key')
    }
  },
  computed: {
    itemConfig () {
      return this._mergeConfig(this.config)
    }
  },
  methods: {
    initForm () {
      Object.keys(this.options).forEach(key => {
        const item = this.options[key]
        this.$set(this.form, item.key, item.defaultValue())
      })
    },
    loadForm (data) {
      Object.keys(data).forEach(key => {
        this.$set(this.form, key, data[key])
      })
    },
    resetForm () {
      this.$refs.form.resetFields()
    }
  },
  created () {
    this.initForm()
    this.$on('tastyForm.change', (value, bindKey) => {
      this.$emit('form-change', value, bindKey)
    })
    this.$on('tastyForm.item.change', (value, bindKey) => {
      this._changeOptionByRule(value, bindKey)
    })
  }
}
</script>
