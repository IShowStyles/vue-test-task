<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <el-alert
            v-if="movieStore.error"
            title="Error"
            type="error"
            :description="movieStore.error"
            show-icon
        />
      </el-col>
    </el-row>

    <div class="search-container">
      <el-input
          v-model="searchTitleRef"
          placeholder="Search for a movie"
          prefix-icon="el-icon-search"
          clearable
      />
    </div>
    <div v-if="movieStore && movieStore.uniqueMovies.length">
      <base-card @clear-search="clearSearch" />
    </div>
  </div>
</template>


<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {useMovieStore} from "../stores/moviStore";
import {ElAlert, ElCol, ElInput, ElRow} from 'element-plus'
import BaseCard from "../components/BaseCard.vue";

const movieStore = useMovieStore()
const searchTitleRef = ref<string>('')

const clearSearch = () => {
  searchTitleRef.value = '';
  movieStore.clearMovies();
};

watch(searchTitleRef, (newVal) => {
  if (newVal.trim().length > 0) {
    movieStore.fetchMovies(newVal);
  } else {
    movieStore.clearMovies();
  }
});

onMounted(() => {
  movieStore.setMoviesFromLocalStorage();
});
</script>

<style scoped>
.search-container {
  margin: 35px 0;
}
</style>
