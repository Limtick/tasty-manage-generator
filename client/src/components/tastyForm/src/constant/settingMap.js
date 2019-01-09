import componentTag from './componentTag'
import propMap from './propMap'

let settingMap = {}

Object.keys(componentTag).forEach(key => {
  if (!settingMap[key]) {
    settingMap[key] = []
  }
  const { props } = componentTag[key]
  if (props) {
    settingMap[key] = Object.keys(props).map(prop => {
      return {
        label: propMap[prop],
        value: prop
      }
    })
  }
})

export default settingMap
