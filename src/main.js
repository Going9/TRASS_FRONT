import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components
import App from './App.vue'
import router from './router'

// Vuetify 인스턴스 생성
const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

// 플러그인 추가
app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
