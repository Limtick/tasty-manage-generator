import TastySelect from './src/wrap/TastySelect'
import TastyCheckbox from './src/wrap/TastyCheckbox'
import TastyRadio from './src/wrap/TastyRadio'
import TastyDynamic from './src/wrap/TastyDynamic'
import TastyFormGroupItem from './src/wrap/TastyFormGroupItem'

import TastyForm from './src/TastyForm'
import TastyFormGroup from './src/TastyFormGroup'

import componentTag from './src/constant/componentTag'
import propMap from './src/constant/propMap'
import settingMap from './src/constant/settingMap'

import FormControl from './src/controls/FormControl'

import './src/style/index.scss'

const components = [
  TastySelect,
  TastyCheckbox,
  TastyRadio,
  TastyDynamic,
  TastyFormGroupItem,
  TastyForm,
  TastyFormGroup
]

export default {
  install: function (Vue, opt = {}) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })

    Vue.prototype.$FormControl = FormControl
    Vue.prototype.$componentTag = componentTag
    Vue.prototype.$propMap = propMap
    Vue.prototype.$settingMap = settingMap
  }
}
