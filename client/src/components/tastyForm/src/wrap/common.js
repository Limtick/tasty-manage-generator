import emitter from '../mixins/emitter'

export default {
  props: {
    renderInGroup: Boolean,
    groupIndex: Number
  },
  mixins: [emitter],
  methods: {
    _handleChange (value) {
      if (this.renderInGroup) {
        this.dispatch('TastyFormGroup', 'tastyForm.group.change', [value, this.bindKey])
        this.dispatch('TastyFormGroupItem', 'tastyForm.groupItem.change', [value, this.bindKey, this.groupIndex])
      } else {
        this.dispatch('TastyForm', 'tastyForm.change', [value, this.bindKey])
        this.dispatch('TastyForm', 'tastyForm.item.change', [value, this.bindKey])
      }
    }
  }
}
