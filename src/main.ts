import './reset.css'
import {createApp} from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus'
import {createPinia} from 'pinia';
import router from './router';
import 'element-plus/dist/index.css'
const app = createApp(App);
app.use(ElementPlus, { size:'large', zIndex: 3000 })
app.use(router);
app.use(createPinia());
app.mount('#app');
