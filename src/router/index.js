import { createRouter, createWebHistory } from "vue-router"

import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Welcome from "../views/Welcome.vue"
import Test from "../views/Test.vue"
import Specialization from "../views/Specialization.vue"
import Result from "../views/Result.vue"
import FieldDetails from "../views/FieldDetails.vue"
import Profile from "../views/Profile.vue"
import News from "../views/News.vue"

const routes = [
  { path: "/", redirect: "/Login" },
  { path: "/Login", name: "Login", component: Login },
  { path: "/Register", name: "Register", component: Register },
  { path: "/Welcome", name: "Welcome", component: Welcome },
  { path: "/Test", name: "Test", component: Test },
  { path: "/Specialization", name: "Specialization", component: Specialization },
  { path: "/Result", name: "Result", component: Result },
  { path: "/field/:id", name: "FieldDetails", component: FieldDetails, props: true },
  { path: "/Profile", name: "Profile", component: Profile },
  { path: "/news", name: "News", component: News }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
