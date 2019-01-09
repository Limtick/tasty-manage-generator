# Tasty form

> It's very easy to create forms, soo delicious
> depends on [vue](https://cn.vuejs.org/) and [Elemnt UI](http://element-cn.eleme.io/#/zh-CN/component/installation)

## feature

- generate form with JSON config

- use events to manage events

## install

```sh
npm install tasty-form --save
```

```javascript
import Vue from 'vue'
import TastyForm from 'tasty-form'

// element-ui is required
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(TastyForm)
```

## usage

### tasty form

```html
<div class="demo">
  <div class="demo-button-group">
    <el-button @click="addForm" type="success" size="small">新建</el-button>
    <el-button @click="submitForm" type="primary" size="small">提交</el-button>
    <el-button @click="loadForm" size="small">更新</el-button>
  </div>
  <tasty-form
    v-model="form"
    v-loading="demoForm.loading"
    ref="demoForm"
    :config="formConf"></tasty-form>
</div>
```

```javascript
import Axios from 'axios'
export default {
  data () {
    return {
      form: {},
      demoForm: this.$FormControl.init('demoForm', {
        // request setting
        add: () => Axios.post('/path/to/add', this.form),
        update: () => Axios.post(`/path/to/update`, this.form),
        delete: () => Axios.get('/path/to/delete'),
        load: id => Axios.get(`/path/to/load/${id}`)
      }, this),
      formConf: [
        {
          key: 'name',
          label: '名称',
          type: 'input',
          props: {
            clearable: false
          }
        },
        {
          key: 'province',
          label: '地域',
          type: 'select',
          props: {
            placeholder: '请选择地域',
            clearable: true
          },
          option: [
            { name: '北京', value: '北京' },
            { name: '上海', value: '上海' },
            { name: '河北', value: '河北' }
          ]
        },
        {
          key: 'createDate',
          label: '创建时间',
          type: 'date'
        },
        {
          key: 'useType',
          label: '使用类型',
          type: 'radio',
          option: {
            1: '使用',
            2: '演示',
            3: '测试'
          }
        },
        {
          key: 'check',
          label: '支持三态',
          type: 'checkbox',
          props: {
            enableIndeterminate: true
          },
          option: [
            {
              label: '上海',
              value: '上海'
            },
            {
              label: '北京',
              value: '北京'
            },
            {
              label: '广州',
              value: '广州'
            },
            {
              label: '深圳',
              value: '深圳'
            }
          ]
        }
      ]
    }
  },
  methods: {
    loadForm () {
      // switch status to edit
      this.demoForm.loadData('1')
    },
    addForm () {
      this.demoForm.getReadyForAdd()
    },
    submitForm () {
      this.demoForm.submitForm()
    }
  },
  mounted () {
    const demoForm = this.demoForm
    demoForm
      .on('loading', () => {
        console.log('is loading')
      })
      .on('load-success', res => {
        console.log('load-success')
        this.$refs.demoForm.loadForm(res)
        demoForm.getReadyForUpdate()
      })
      .on('load-error', mes => {
        console.log('load-error')
      })
      .on('submit-success', res => {
        console.log('submit-success')
      })
      .on('submit-error', mes => {
        console.log('submit-error')
      })
  }
}
```

### tasty form group

```html
<tasty-form-group 
  v-model="formSetting"
  ref="formSetting"
  class="form-pre"
  :config="formSettingConf"
  :bind-rule="bindRule"></tasty-form-group>
```

```javascript
export default {
  data () {
    return {
      formSetting: {},
      // 分组表单联动
      bindRule: {
        // 表单中 type 的值变化，会触发 defalutSetting 重新加载 option
        type: {
          target: 'defaultSetting',
          // 作为 rule 的 option 会替换原设置中的值
          option: (value, bindKey, groupIndex) => this.$settingMap[value]
          /* 也可以使用请求的方式更新 option */
          // useRequest: true,

          // 带参数
          // params: ['A', 'test']
          // option: (type, test) => Axios.get('/mock/form/delete.json', { params: {type, name} }) // -> params: {type: A, name: 'test'}

          // 无参数
          // option: () => Axios.get('/mock/form/delete.json')
        }
      },
    }
  },
  computed () {
    formSettingConf () {
      return {
        base: [
          {
            key: 'name',
            label: '表单名称',
            type: 'input'
          },
          {
            key: 'addUrl',
            label: '新增数据',
            type: 'input'
          },
          {
            key: 'updateUrl',
            label: '更新数据',
            type: 'input'
          },
          {
            key: 'deleteUrl',
            label: '删除数据',
            type: 'input'
          },
          {
            key: 'loadUrl',
            label: '加载数据',
            type: 'input'
          }
        ],
        // 分组数据
        groups: Object.keys(this.source).map(key => {
          return {
            key,
            title: this.source[key]
          }
        }),
        // 分组的表单配置
        groupItems: [
          {
            key: 'type',
            label: '控件类型',
            type: 'select',
            option: Object.keys(this.$componentTag).map(item => {
              return {
                name: item,
                value: item
              }
            }),
            defaultValue: () => ''
          },
          {
            key: 'required',
            label: '是否必填',
            type: 'radio',
            option: {
              0: '不必填',
              1: '必填'
            },
            defaultValue: () => '1'
          },
          {
            key: 'optionsLoadType',
            label: '加载控件选项',
            type: 'radio',
            // 渲染函数 item 为当前组表单对象
            _renderable: item => {
              return !(
                item.type === '' ||
                item.type === 'input' ||
                item.type === 'date'
              )
            },
            option: {
              0: '接口',
              1: '手动配置'
            },
            defaultValue: () => '0'
          },
          {
            key: 'url',
            label: '选项接口',
            type: 'input',
            _renderable: item => {
              return item.optionsLoadType === '0' && !(
                item.type === '' ||
                item.type === 'input' ||
                item.type === 'date'
              )
            }
          },
          {
            key: 'optionList',
            label: '选项列表',
            type: 'dynamic',
            _renderable: item => {
              return item.optionsLoadType === '1' && !(
                item.type === '' ||
                item.type === 'input' ||
                item.type === 'date'
              )
            },
            option: {
              groupItems: [
                {
                  key: 'name',
                  label: '名称',
                  type: 'input'
                },
                {
                  key: 'value',
                  label: '值',
                  type: 'input'
                }
              ]
            },
            defaultValue: () => []
          },
          {
            key: 'defaultSetting',
            label: '默认设置',
            type: 'checkbox',
            option: []
          }
        ]
      }
    },
  }
}
```

## TODO

- [x] TastyFormGroup
- component
  - [x] dynamic
  - [ ] mixed