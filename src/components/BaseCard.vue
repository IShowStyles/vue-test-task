<script setup lang="ts">
import {ElCard, ElImage} from "element-plus";
import {useMovieStore} from "../stores/moviStore.ts";
import {Movie} from "../types/movie.interface.ts";

const movieStore = useMovieStore();

const emit = defineEmits(['clear-search']);

const handleButtonClick = (movie:Movie) => {
  emit('clear-search');
  console.log(movie)
  movieStore.addAndSaveMovie(movie);
};
</script>

<template>
  <el-card
      :style="{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            maxWidth: '350px'
          }"
      v-for="movie in movieStore.uniqueMovies"
      :key="movie.ImdbID"
  >
    <el-image :src="movie.Poster"/>
    <div>
      <h2>{{ movie.Title }}</h2>
      <p>{{ movie.Year }}</p>
      <p>{{ movie.Type }}</p>
      <p>{{ movie.Director }}</p>
      <el-button type="primary"
                 @click="handleButtonClick({
                    Title: movie.Title,
                    Year: movie.Year,
                    Type: movie.Type,
                    Director: movie.Director,
                    Poster: movie.Poster,
                    ImdbID: movie.ImdbID
                 })">
      >Add to Favourites</el-button>
    </div>
  </el-card>
</template>

<style scoped>

</style>
