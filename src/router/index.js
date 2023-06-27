import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../plants/views/HomeView.vue";
import LoginView from "../auth/components/log-in.component.vue";
import PlansView from "../auth/components/plans.conponent.vue";
import RegisterView from "../auth/components/register.component.vue";
import Plots from "../plots/components/plots.component.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/plans",
    component: PlansView,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/plots",
    name: "Plots",
    component: Plots,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (isAuthenticated && (to.name === "Login" || to.name === "Register")) {
    next("/");
  } else {
    next();
  }
});

export default router;
