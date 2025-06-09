import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../app/views/HomeView.vue";
import Register from "../app/Views/Auth/Register.vue";
import IndexView from "../app/Views/Tasks/IndexView.vue";

const router = createRouter({
    routes : [
        {
            path : "/",
            component : HomeView,
            name: "home"
        },
        {
            path : "/register",
            component : Register,
            name : "register"
        },
        {
            path : "/tasks",
            component : IndexView,
            name : "tasks"
        }
    ],
    history : createWebHistory()
});


export default router;
