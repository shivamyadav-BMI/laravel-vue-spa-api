import { createRouter, createWebHistory, useRouter } from "vue-router";
import HomeView from "../app/views/HomeView.vue";
import Register from "../app/Views/Auth/RegisterView.vue";
import IndexView from "../app/Views/Tasks/IndexView.vue";
import NotFoundPage from "../app/Views/errors/NotFoundPage.vue";
import useAuthStore from "../store/authStore";
import LoginView from "../app/Views/Auth/LoginView.vue";

const router = createRouter({
    routes: [
        {
            path: "/:notFound(.*)",
            component: NotFoundPage,
            name: "error.404"
        },
        {
            path: "/",
            component: HomeView,
            name: "home"
        },
        {
            path: "/register",
            component: Register,
            name: "register",
            meta: {
                guest : true
            }
        },
        {
            path: "/login",
            component: LoginView,
            name: "login",
            meta: {
                guest : true
            }
        },
        {
            path: "/tasks",
            component: IndexView,
            name: "tasks",
            meta: {
                auth: true
            }
        }
    ],
    history: createWebHistory()
});

router.beforeEach(async (to, from) => {
    const store = useAuthStore();
    const route = useRouter();

    await store.fetchUser(); //to set the auth user
    store.errors = null; //on every reload or navigation null the errors

    // redirect the user to the login page if they are not authenticated
    if (to.meta.auth && !store.isLoggedIn) {
        route.push("/login");
    }
    // user should not able to access the register and login if they are authenticated user
    if (to.meta.guest && store.isLoggedIn) {
        route.push("/");
    }
});


export default router;
