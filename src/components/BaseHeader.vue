<script setup lang="ts">
import {ref} from 'vue'
import {RouterLink} from 'vue-router'

const activeIndex = ref<string>('1')
const handleSelect = (index: string) => {
  activeIndex.value = index
}
</script>

<template>
  <header class="header">
    <div class="container">
      <el-row class="row" :span="20">
        <el-col :span="9">
          <router-link to="/">
            <el-text class="heading" size="large">
              Movie App
            </el-text>
          </router-link>
        </el-col>
        <el-col :span="12">
          <el-menu class="menu" :default-active="activeIndex" @select="handleSelect">
            <el-menu-item index="1">
              <router-link to="/details">
                <el-text size="large">
                  Details
                </el-text>
              </router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link to="/results">
                <el-text size="large">
                  Results
                </el-text>
              </router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link to="/add">
                <el-text size='large'>
                  Add Movie
                </el-text>
              </router-link>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </header>
</template>

<style scoped>


.row {
  display: flex;
  align-items: center;
}

.header {
  border: 1px solid #409EFF;
}

.heading {
  font-weight: bold;
  color: #409EFF;
  cursor: pointer;
}

.menu {
  display: flex;
  align-items: center;
  border: none;
}
</style>
