<template>
  <el-radio-group v-model="selected" @change="_handleChange">
    <el-radio v-for="(label, key) in option" :key="key" v-bind="inheritProp" :label="key">{{ label }}</el-radio>
  </el-radio-group>
</template>

<script>
import common from './common'
export default {
  name: 'TastyRadio',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    inheritProp: Object,
    option: Object,
    value: String,
    bindKey: String
  },
  mixins: [common],
  data () {
    return {
      selected: ''
    }
  },
  watch: {
    selected (val) {
      this.$emit('change', val)
    },
    value (val) {
      this.selected = val
    }
  },
  created () {
    this.selected = this.value
  }
}
</script>
