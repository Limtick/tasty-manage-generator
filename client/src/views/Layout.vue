<template>
  <el-container class="tasty-form">
    <el-header class="tasty-form__header">tasty form</el-header>
    <el-container class="tasty-form__container">
      <el-aside class="tasty-form__container-aside" width="200px">
        <el-menu :default-active="menu[0].path" router>
          <el-menu-item v-for="item in menu" :key="item.path" :index="item.path">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="tasty-form__container-main">
        <router-view class="router-view"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import menu from '@/router/menu'
export default {
  name: 'Layout',
  data () {
    return {
      menu
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~style/_var.scss';

.tasty-form {
  height: 100%;
  .tasty-form__header {
    line-height: 60px;
    font-size: 20px;
    box-shadow: $--box-shadow-base;
    color: #333;
  }
  .tasty-form__container {
    .tasty-form__container-aside {
      padding-top: 10px;
      border-right: 1px solid $--border-color-base;
      .el-menu {
        border-right: none;
      }
    }
    .tasty-form__container-main {
      overflow: auto;
    }
  }
}
</style>
