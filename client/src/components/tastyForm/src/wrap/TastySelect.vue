<template>
  <el-select v-model="selected" v-bind="inheritProp" @change="_handleChange">
    <el-option v-for="item in option" :key="item.name" :value="item.value"></el-option>
  </el-select>
</template>

<script>
import common from './common'
export default {
  name: 'TastySelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    inheritProp: Object,
    option: Array,
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
