<template>
  <div class="form-group">
    <h3 v-if="showTitle">{{ groupItem.label }}</h3>
    <template v-for="(item, key) in options">
      <el-form-item
        v-if="item._renderable && item._renderable(groupItem)"
        :key="`${item.type}_${key}`"
        :label="item.label"
        :prop="item.key">
        <component
          v-model="groupItem[item.key]"
          v-bind="item.props"
          :is="item.component"
          :inherit-prop="item.props"
          :option="item.option"
          :bind-key="item.key"
          :group-index="index"
          render-in-group></component>
      </el-form-item>
    </template>
  </div>
</template>

<script>
import changeOption from '../mixins/changeOption'
import { list2obj } from '../util'
export default {
  name: 'TastyFormGroupItem',
  componentName: 'TastyFormGroupItem',
  props: {
    groupItem: Object,
    itemConfig: Array,
    bindRule: Object,
    index: Number,
    showTitle: Boolean
  },
  mixins: [changeOption],
  data () {
    return {
      separator: '.',
      options: list2obj(this.itemConfig, 'key')
    }
  },
  created () {
    this.$on('tastyForm.groupItem.change', (value, bindKey, groupIndex) => {
      console.log(value, bindKey, groupIndex)
      this._changeOptionByRule(value, bindKey, groupIndex)
    })
  }
}
</script>
