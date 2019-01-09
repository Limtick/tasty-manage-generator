export default {
  input: {
    component: 'el-input',
    defaultValue: () => '',
    props: {
      clearable: true
    }
  },
  select: {
    component: 'tasty-select',
    defaultValue: () => '',
    props: {
      clearable: false
    }
  },
  checkbox: {
    component: 'tasty-checkbox',
    defaultValue: () => [],
    props: {
      enableIndeterminate: false,
      border: false
    }
  },
  radio: {
    component: 'tasty-radio',
    defaultValue: () => '',
    props: {
      border: false
    }
  },
  date: {
    component: 'el-date-picker',
    defaultValue: () => '',
    props: {
      clearable: false
    }
  },
  dynamic: {
    component: 'tasty-dynamic',
    defaultValue: () => []
  }
}
