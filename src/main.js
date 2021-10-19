import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import VueLazyload from 'vue-lazyload'
import './components/global-components'
import firebase from 'firebase'

Vue.use(VueLazyload)

// ADD FIREBASE CONFIG TO USE FIREBASE HOSTING 
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "pokedex12",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

firebase.initializeApp(firebaseConfig);

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
