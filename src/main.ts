import { createApp } from 'vue'
import './style.css'
import router from "./router";
import App from './App.vue'
import '@vant/touch-emulator';
import 'vant/es/notify/style'
import 'vant/lib/index.css';
import '../src/plugins/myAxios'
import 'vant/es/toast/style';
import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'
import {createPinia} from 'pinia'
import { DatePicker } from 'ant-design-vue';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'

document.head.appendChild(meta)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
import { Lazyload } from 'vant';
const app = createApp(App);
app.use(pinia)
app.use(UndrawUi)
app.use(Antd)
app.use(router);
app.use(DatePicker);
app.use(Lazyload);
app.mount("#app");

