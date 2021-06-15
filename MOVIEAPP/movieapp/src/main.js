import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index.js";
import TheJoke from "./component/TheJoke.vue";
import TheMovie from "./component/TheMovie.vue";
import TheLogin from "./component/TheLogin.vue";
import TheRegistration from "./component/TheRegistration.vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyDwmP_NxMakbqOARxxXgaScEDQFVgiimHY",
  authDomain: "movieapp-7442c.firebaseapp.com",
  databaseURL:
    "https://movieapp-7442c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "movieapp-7442c",
  storageBucket: "movieapp-7442c.appspot.com",
  messagingSenderId: "1097408514802",
  appId: "1:1097408514802:web:550ccda8ba256e9ea75e6b",
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/login" },
    {
      path: "/search",
      name: "search",
      component: TheJoke,
    },
    {
      path: "/login",
      component: TheLogin,
    },
    { path: "/register", component: TheRegistration },
    { path: "/search/:id", component: TheMovie },
  ],
});

const app = createApp(App);
app.use(VueAxios, axios);
app.use(store);
app.use(router);
app.mount("#app");
