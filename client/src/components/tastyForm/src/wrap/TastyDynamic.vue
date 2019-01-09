<template>
  <div class="tasty-dynamic">
    <div class="tasty-dynamic__head">
      <el-button size="mini" icon="el-icon-plus" @click="handleAdd"></el-button>
    </div>
    <el-scrollbar :style="scrollbarStyle" ref="bar">
      <div class="tasty-dynamic__content" ref="content">
        <tasty-form-group-item
          v-for="(item, index) in list"
          :key="`${item}_${index}`"
          :group-item="item"
          :item-config="itemConfig"
          :bind-rule="bindRule"
          :index="index"></tasty-form-group-item>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import mergeConfig from '../mixins/mergeConfig'
export default {
  name: 'TastyDynamic',
  componentName: 'TastyDynamic',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    inheritProp: Object,
    option: Object,
    value: Array,
    bindKey: String
  },
  mixins: [mergeConfig],
  data () {
    return {
      list: this.value,
      totalHeight: 0
    }
  },
  computed: {
    bindRule () {
      return this.option.bindRule ? this.option.bindRule : {}
    },
    itemConfig () {
      return this.option.groupItems ? this._mergeConfig(this.option.groupItems) : []
    },
    scrollbarStyle () {
      const height = this.totalHeight >= 300 ? '300px' : '100%'
      return `height:${height};`
    }
  },
  watch: {
    list: {
      handler (old, cur) {
        this.$emit('change', cur)
      }
    }
  },
  methods: {
    _genEmpty () {
      let empty = {}
      Object.values(this.itemConfig).forEach(item => {
        const { key, defaultValue } = item
        empty[key] = defaultValue()
      })
      return empty
    },
    handleAdd () {
      this.list.push(this._genEmpty())
      this.$nextTick(() => {
        this.$refs.bar.wrap.scrollTop = this.$refs.bar.wrap.scrollHeight
        this.totalHeight += this.$refs.content.clientHeight
      })
    }
  }
}
</script>
