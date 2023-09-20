import { createApp } from 'vue'
// import './style.css'
import './style/main.css'
import App from './App.vue'
import { createPinia } from "pinia"
import router from './router'
import 'reset-css'
// import './plugins/element-plus'
// import './plugins/vue-echarts'
import 'element-plus/dist/index.css'
// echarts
import * as echarts from 'echarts'

// vue-echarts
import vChart from 'vue-echarts'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia).use(router).mount('#app')
app.config.globalProperties.$echarts = echarts
app.component('v-chart', vChart)