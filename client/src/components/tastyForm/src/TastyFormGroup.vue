<template>
  <el-form class="tasty-form" :model="form" ref="form" label-width="100px">
    <template v-for="(item, index) in baseConfig">
      <el-form-item
        v-if="item._renderable && item._renderable(form, index)"
        :key="`${item.type}_${index}`"
        :label="item.label"
        :prop="item.key">
        <component
          v-model="form[item.key]"
          v-bind="item.props"
          :is="item.component"
          :inherit-prop="item.props"
          :option="item.option"
          :bind-key="item.key"
          render-in-group></component>
      </el-form-item>
    </template>
    <tasty-form-group-item
      class="form-group"
      v-for="(g, index) in config.groups"
      :key="g.key"
      show-title
      :group-item="form[groupKey][index]"
      :item-config="itemConfig"
      :bind-rule="bindRule"
      :index="index"></tasty-form-group-item>
    <pre>{{ form }}</pre>
  </el-form>
</template>

<script>
import formMixins from './mixins/form'
import { resetBindValue } from './util'
export default {
  name: 'TastyFormGroup',
  componentName: 'TastyFormGroup',
  model: {
    prop: 'data',
    event: 'change'
  },
  props: {
    config: Object,
    data: Object,
    groupKey: {
      type: String,
      default: 'groupList'
    },
    bindRule: Object
  },
  mixins: [formMixins],
  data () {
    return {
      separator: '.'
    }
  },
  computed: {
    baseConfig () {
      return this._mergeConfig(this.config.base)
    },
    itemConfig () {
      return this._mergeConfig(this.config.groupItems)
    }
  },
  watch: {
    'config.groups' (data) {
      this.initForm()
    }
  },
  methods: {
    initForm () {
      this.baseConfig.forEach(item => {
        this.$set(this.form, item.key, item.defaultValue())
      })
      this.$set(this.form, this.groupKey, [])

      this.config.groups.forEach((item, index) => {
        let param = {
          key: item.key,
          label: item.title
        }
        this.itemConfig.forEach(item => {
          const { key, defaultValue } = item
          param[key] = defaultValue()
        })
        this.form[this.groupKey].push(param)
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
    this.$on('tastyForm.group.change', (value, bindKey) => {
      this.$emit('form-change', value, bindKey)
    })
    this.$on('tastyForm.group.reset.bind.value', (target, groupIndex) => {
      resetBindValue(this.form[this.groupKey][groupIndex], target)
    })
  }
}
</script>
