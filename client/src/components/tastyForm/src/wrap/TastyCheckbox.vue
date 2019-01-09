<template>
  <div class="tasty-checkbox-wrap">
    <template v-if="inheritProp.enableIndeterminate">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAll">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
    </template>
    <el-checkbox-group v-model="checked" @change="handleCheckedChange">
      <el-checkbox v-for="item in option" :label="item.value" :key="item.value" v-bind="inheritProp">{{ item.label }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
import common from './common'
export default {
  name: 'TastyCheckbox',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    inheritProp: Object,
    option: Array,
    value: Array,
    bindKey: String
  },
  mixins: [common],
  data () {
    return {
      checkAll: false,
      checked: [],
      // eslint-disable-next-line
      isIndeterminate: (this.value && this.value.length) ? true : false
    }
  },
  watch: {
    checked (val) {
      this.$emit('change', val)
    },
    value (val) {
      this.checked = val
    }
  },
  methods: {
    handleCheckAll (val) {
      this.checked = val ? this.option.map(item => item.value) : []
      this.isIndeterminate = false
    },
    handleCheckedChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.option.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.option.length
      this._handleChange(value)
    }
  },
  created () {
    this.selected = this.value
  }
}
</script>
