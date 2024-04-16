<script setup lang="ts">
import {useMovieStore} from "../stores/moviStore.ts";
import {onMounted} from 'vue'

const movieStore = useMovieStore()
onMounted(() => {
  movieStore.setMoviesFromLocalStorage()
})
</script>

<template>
  <section>
    <div class="empty-slider" v-if="!movieStore.resultMovies.length">
      <el-text class="small justify-center" text="2xl">No Results Movies Found</el-text>
    </div>
    <el-carousel :arrow="movieStore.resultMovies.length < 1 ? 'never' : 'hover'" class="carousel">
      <el-carousel-item v-for="movie in movieStore.resultMovies" class="item" :key="movie.ImdbID">
        <el-image
            cover="fit"
            class="image"
            :src="movie.Poster"
        ></el-image>
        <el-container>
          <div class="overlay">
            <div class="text-content glass-effect">
              <el-text class="small justify-center" type="primary" size="large">{{ movie.Title }}</el-text>
              <el-text class="small justify-center" type="primary" size="large">{{ movie.Year }}</el-text>
              <el-text class="small justify-center" type="primary" size="large">{{ movie.Director }}</el-text>
              <el-text class="small justify-center" type="primary" size="large">{{ movie.Type }}</el-text>
            </div>
          </div>
        </el-container>
      </el-carousel-item>
    </el-carousel>
  </section>
</template>

<style scoped>


.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 16/9;
}

.item {
  height: calc(100vh - 60px);
}

.empty-slider {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 96px);
}

.carousel {
  height: calc(100vh - 60px);
}

.text-content > * {
  font-weight: 500;
  margin: 5px 0;
  font-size: 24px;
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.text-content {
  max-width: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
