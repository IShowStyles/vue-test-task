<template>
  <section class="section">
    <div class="container">
      <el-form ref="form" label-position="left">
        <el-form-item class="item-form" label="* Title">
          <el-row class="item-form">
            <el-col>
              <el-input
                  v-model="title"></el-input>
            </el-col>
            <el-col>
              <el-text size="large" type="danger">{{ titleErrorRef }}</el-text>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label-position="left" class="input-wrapper item-form" label="* Poster IMG">
          <el-row class="item-form__horizontal item-form">
            <el-col class="input-upload">
              <el-text class="input-upload__text">Upload Poster</el-text>
              <input
                  class="input"
                  type="file"
                  @change="handleFileUpload"
                  placeholder="Please input the URL of the poster"
              />
            </el-col>
            <el-col style="max-width: 145px">
              <el-text size="large" type="danger">{{ PosterErrorRef }}</el-text>
            </el-col>
            <el-col v-if="Poster.length">
              <div class="preview">
                <div>
                  <el-text style="color: #efffff">Preview</el-text>
                </div>
                <el-image
                    style="width: 100px; height: 100px"
                    :src="Poster"
                />
              </div>
            </el-col>
            <el-col>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label-position="left" class="item-form" label="* Director">
          <el-row class="item-form">
            <el-col>
              <el-input v-model="director"></el-input>
            </el-col>
            <el-col>
              <el-text size="large" type="danger">{{ directorErrorRef }}</el-text>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="item-form" label-position="left" label="* Year">
          <el-row class="item-form">
            <el-col>
              <el-input v-model="year"></el-input>
            </el-col>
            <el-col>
              <el-text size="large" type="danger">{{ yearErrorRef }}</el-text>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label-position="left" class="item-form">
          <el-button type="primary" @click="submitForm">Submit</el-button>
          <el-button @click="resetForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {ElButton, ElForm, ElFormItem, ElInput} from 'element-plus';
import {useMovieStore} from '../stores/moviStore';

const movieStore = useMovieStore();
const Poster = ref('');
const director = ref('');
const year = ref('');
const title = ref('');
const titleErrorRef = ref('');
const yearErrorRef = ref('');
const directorErrorRef = ref('');
const PosterErrorRef = ref('');

const validateFields = () => {
  let isValid = true;
  const fields = {
    title: 'Title is required',
    director: 'Director is required',
    year: 'Year is required',
    Poster: 'Poster is required'
  };

  for (const [field, errorMessage] of Object.entries(fields)) {
    if (!eval(field).value) {
      eval(field + 'ErrorRef').value = errorMessage;
      isValid = false;
    }
  }

  return isValid;
};

const submitForm = () => {
  if (!validateFields()) {
    return;
  }

  movieStore.saveDetailsMoviesLS({
    Title: title.value,
    Poster: Poster.value,
    Director: director.value,
    Year: year.value.toString()
  });
  resetForm();
};

const resetForm = () => {
  title.value = '';
  Poster.value = '';
  director.value = '';
  year.value = '';
  titleErrorRef.value = '';
  PosterErrorRef.value = '';
  directorErrorRef.value = '';
  yearErrorRef.value = '';
};

const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    getBase64(file).then((data) => {
      console.log(data)
      Poster.value = data;
    });
  }
};

const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

</script>

<style scoped>

.input-upload__text {
  width: 100%;
  text-align: center;
  color: #efffff;
}

.item-form {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.item-form__horizontal {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.input-upload {
  margin-right: 15px;
  max-height: 55px;
  max-width: 130px;
  width: 100%;
  border: 1px solid #212121;
  border-radius: 16px;
  padding: 8px 12px;
  background: #409EFF;
}

.input-wrapper {
  position: relative;
}

.preview {
  max-height: 130px;
  max-width: 130px;
  width: 100%;
  height: 100%;
  border: 1px solid #212121;
  border-radius: 16px;
  padding: 8px 12px;
  background: #409EFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input {
  width: 100%;
  cursor: pointer;
  position: absolute;
  overflow: hidden;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  height: 100%;
}
</style>
