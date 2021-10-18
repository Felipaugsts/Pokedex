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
  apiKey: "AIzaSyDceSH1lfJrpF0wf0in0qjZh_jNAC3kH2c",
  authDomain: "pokedex-5c873.firebaseapp.com",
  projectId: "pokedex-5c873",
  storageBucket: "pokedex-5c873.appspot.com",
  messagingSenderId: "468907186431",
  appId: "1:468907186431:web:53c51402bcef95c81594ca",
  measurementId: "G-T1XRMZD6QJ"
};

firebase.initializeApp(firebaseConfig);

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
