import { createRouter, createWebHistory, useRouter } from "vue-router";
import HomeView from "../app/views/HomeView.vue";
import Register from "../app/Views/Auth/RegisterView.vue";
import IndexView from "../app/Views/Tasks/IndexView.vue";
import NotFoundPage from "../app/Views/errors/NotFoundPage.vue";
import useAuthStore from "../store/authStore";
import LoginView from "../app/Views/Auth/LoginView.vue";
import DashboardView from "../app/Views/admin/DashboardView.vue";
import ProductsIndexView from "../app/Views/admin/products/IndexView.vue";
import ProductsCreateView from "../app/Views/admin/products/CreateView.vue";
import ProductsEditView from "../app/Views/admin/products/EditView.vue";
import CategoriesIndexView from "../app/Views/admin/categories/IndexView.vue";
import CategoriesCreateView from "../app/Views/admin/categories/CreateView.vue";
import CategoriesEditView from "../app/Views/admin/categories/EditView.vue";



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
                guest: true
            }
        },
        {
            path: "/login",
            component: LoginView,
            name: "login",
            meta: {
                guest: true
            }
        },
        {
            path: "/admin/dashboard",
            component: DashboardView,
            name: "admin-dashboard",
            meta: {
                auth: true,
                role: "admin"
            }
        },
        {
            path: "/tasks",
            component: CategoriesIndexView,
            name: "tasks",
            meta: {
                auth: true
            }
        },

        {
            path: '/admin/categories',
            component: CategoriesIndexView,
            name: "categories",
            meta: {
                auth: true,
                role: 'admin'
            }
        },
        {
            path: "/admin/categories/create",
            component: CategoriesCreateView,
            name: "categories-create",
            meta: {
                auth: true,
                role: 'admin'
            }
        },
        {
            path: "/admin/categories/:id/edit",
            component: CategoriesEditView,
            name: "categories-edit",
            meta: {
                auth: true,
                role: 'admin'
            }
        },
        {
            path: '/admin/products',
            component: ProductsIndexView,
            name: "products",
            meta: {
                auth: true,
                role: 'admin'
            }
        },
        {
            path: "/admin/products/create",
            component: ProductsCreateView,
            name: "products-create",
            meta: {
                auth: true,
                role: 'admin'
            }
        },
        {
            path: "/admin/products/:id/edit",
            component: ProductsEditView,
            name: "products-edit",
            meta: {
                auth: true,
                role: 'admin'
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
    store.emptyForm(); //on every reload or navigation null the auth form

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
