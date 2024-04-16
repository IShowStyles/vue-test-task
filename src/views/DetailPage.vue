<template>
  <section class='section'>
    <div class="container">
      <el-row>
        <el-col :span="8" v-for="(movie, idx) in movieStore.detailsMovie" :key="idx">
          <el-card class="card">
            <div>
              <el-image
                  class="img"
                  object-fit="cover"
                  width="100px"
                  height="100px"
                  :src="movie.Poster"
              />
            </div>
            <div>
              <h2 class='my-2'>{{ movie.Title }}</h2>
              <p class='my-2'>{{ movie.Year }}</p>
              <p class='my-2'>{{ movie.Director }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {ElCard, ElCol, ElImage, ElRow} from 'element-plus'
import {useMovieStore} from '../stores/moviStore'

const movieStore = useMovieStore()
onMounted(() => {
  movieStore.setDetailsMovies()
})
</script>

<style scoped>
.card {
  max-width: 325px;
  width: 100%;
}

.img {
  width: 200px;
  height: 200px;
}

.img > img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.my-2 {
  margin-top: 16px;
  margin-bottom: 16px;
}

.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 96px);
}
</style>
