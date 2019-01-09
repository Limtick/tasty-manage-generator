<template>
  <div class="FormGenerator h-full">
    <el-container class="h-full">
      <el-aside class="param" width="260px">
        <el-table :data="tableData" height="100%">
          <el-table-column
            v-for="item in tableColumns"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"></el-table-column>
        </el-table>
      </el-aside>
      <el-main class="padding-x-20">
        <el-row class="h-full" :gutter="30">
          <el-col class="h-full scrollable" :span="12">
            <tasty-form-group
              v-model="formSetting"
              ref="formSetting"
              class="form-pre"
              :config="formSettingConf"
              :bind-rule="bindRule"></tasty-form-group>
          </el-col>
          <el-col class="h-full" :span="12">
            <div class="padding-y-10">
              <el-button @click="addForm" type="success" size="small">新建</el-button>
              <el-button @click="submitForm" type="primary" size="small">提交</el-button>
              <el-button @click="loadForm" size="small">更新</el-button>
            </div>
            <tasty-form
              v-model="demo"
              v-loading="controlTest.loading"
              class="form-pre"
              ref="controlTest"
              :config="formConf"
              :bind-rule="bindRule2"></tasty-form>
            <pre>{{ demo }}</pre>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import api from '@/api'
import { debounce } from 'throttle-debounce'
export default {
  name: 'FormGenerator',
  data () {
    return {
      source: {},
      formSetting: {},
      tableColumns: [
        {
          label: 'key',
          prop: 'key'
        },
        {
          label: '说明',
          prop: 'name'
        }
      ],
      demo: {},
      controlTest: this.$FormControl.init('controlTest', {
        // mock request
        add: () => this.$http.post('/mock/form/add.json', this.demo),
        update: () => this.$http.post(`/mock/form/update.json`, this.demo),
        delete: () => this.$http.get('/mock/form/delete.json'),
        load: (id, params) => this.$http.get(`/mock/form/load_${id}.json`, { params })
      }, this),
      formJSON: [],
      handleChange: debounce(200, () => {
        this.formJSON = this.genFormJSON()
      }),
      bindRule: {
        type: {
          target: 'defaultSetting',
          useRequest: false,
          option: value => this.$settingMap[value]
          // params: ['id', 'test'],
          // option: (id, test) => this.$http.get('/mock/form/delete.json', { params: {id, test} })
          // option: () => this.$http.get('/mock/form/delete.json')
        }
      },
      bindRule2: {
        province: {
          target: 'check',
          useRequest: false,
          option: [
            {
              label: '上海',
              value: '上海'
            },
            {
              label: '北京',
              value: '北京'
            }
          ]
        }
      }
    }
  },
  computed: {
    tableData () {
      return Object.keys(this.source).map(key => {
        const name = this.source[key]
        return {
          name,
          key
        }
      })
    },
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
        groups: Object.keys(this.source).map(key => {
          return {
            key,
            title: this.source[key]
          }
        }),
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
            defaultValue: ''
          },
          {
            key: 'required',
            label: '是否必填',
            type: 'radio',
            option: {
              0: '不必填',
              1: '必填'
            },
            defaultValue: '1'
          },
          {
            key: 'optionsLoadType',
            label: '加载控件选项',
            type: 'radio',
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
            defaultValue: '0'
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
            defaultValue: []
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
    formConf () {
      return [
        {
          key: 'name',
          label: '企业名称',
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
          key: 'productName',
          label: '产品名称',
          type: 'input'
        },
        {
          key: 'entAdminInfo',
          label: '企业管理员',
          type: 'input'
        },
        {
          key: 'createDate',
          label: '创建时间',
          type: 'date'
        },
        {
          key: 'label',
          label: '租户使用类型',
          type: 'radio',
          option: {
            1: '使用',
            2: '演示',
            3: '测试'
          }
        },
        {
          key: 'check',
          label: '测试多选',
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
  watch: {
    formSetting: {
      handler (old, value) {
        this.handleChange()
      },
      deep: true
    }
  },
  methods: {
    fetchSource () {
      this.$http.get(api.fetchSource).then(res => {
        this.source = res.data
      })
    },
    loadForm () {
      this.controlTest.loadData('1', { test: 1 })
    },
    addForm () {
      this.controlTest.getReadyForAdd()
    },
    submitForm () {
      this.controlTest.submitForm()
    },
    genFormJSON () {
      const { groupList } = this.formSetting
      let res = []
      groupList.forEach(item => {
        const { key, label, type } = item
        res.push({
          key,
          label,
          type,
          // props: {
          //   clearable: false
          // },
          option: null
        })
      })
      // console.log(JSON.stringify(res, null, 2))
      return res
    }
  },
  mounted () {
    this.fetchSource()
    const controlTest = this.controlTest
    controlTest
      .on('loading', () => {
        console.log('is loading')
      })
      .on('load-success', res => {
        console.log('load-success')
        this.$refs.controlTest.loadForm({
          ...this.source,
          id: 'idtest',
          province: '北京',
          createDate: Date.now(),
          label: '1',
          check: ['上海']
        })
        controlTest.getReadyForUpdate()
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
</script>

<style lang='scss' scoped>
.form-pre {
  width: 420px;
}
</style>
