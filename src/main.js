import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import VueLazyload from 'vue-lazyload'
import './components/global-components'
import firebase from 'firebase'

Vue.use(VueLazyload)

const firebaseConfig = {
  apiKey: "AIzaSyDJ4nA2RK8qZHddgxxQWODi2ILUKyU9Cak",
  authDomain: "pokedex12.firebaseapp.com",
  projectId: "pokedex12",
  storageBucket: "pokedex12.appspot.com",
  messagingSenderId: "527953933637",
  appId: "1:527953933637:web:6ee38923f38c302add7a2c",
  measurementId: "G-C4G97SS235"
};

firebase.initializeApp(firebaseConfig);

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
