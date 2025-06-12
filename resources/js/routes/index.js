import { createRouter, createWebHistory, useRouter } from "vue-router";
import HomeView from "../app/views/HomeView.vue";
import Register from "../app/Views/Auth/RegisterView.vue";
import IndexView from "../app/Views/Tasks/IndexView.vue";
import NotFoundPage from "../app/Views/errors/NotFoundPage.vue";
import useAuthStore from "../store/authStore";
import LoginView from "../app/Views/Auth/LoginView.vue";
import DashboardView from "../app/Views/admin/DashboardView.vue";
import ProductIndexView from "../app/Views/admin/products/IndexView.vue";
import ProductCreateView from "../app/Views/admin/products/CreateView.vue";
import ProductEditView from "../app/Views/admin/products/EditView.vue";
import CategoryIndexView from "../app/Views/admin/categories/IndexView.vue";
import CategoryCreateView from "../app/Views/admin/categories/CreateView.vue";
import CategoryEditView from "../app/Views/admin/categories/EditView.vue";
import RoleIndexView from "../app/Views/admin/roles/RoleIndexView.vue";
import RoleCreateView from "../app/Views/admin/roles/RoleCreateView.vue";
import RoleEditview from "../app/Views/admin/roles/RoleEditview.vue";
import useCategoryStore from "../store/admin/categoryStore";



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
            component: CategoryIndexView,
            name: "tasks",
            meta: {
                auth: true
            }
        },

        // categories routes
        {
            path: '/admin/categories',
            component: CategoryIndexView,
            name: "categories",
            meta: {
                auth: true,
                role: 'admin'
            }
        },
        {
            path: "/admin/categories/create",
            component: CategoryCreateView,
            name: "categories-create",
            meta: {
                auth: true,
                role: 'admin'
            }
        },
        {
            path: "/admin/categories/:id/edit",
            component: CategoryEditView,
            name: "categories-edit",
            meta: {
                auth: true,
                role: 'admin'
            }
        },

        // products routes
        {
            path: '/admin/products',
            component: ProductIndexView,
            name: "products",
            meta: {
                auth: true,
                role: 'admin'
            }
        },
        {
            path: "/admin/products/create",
            component: ProductCreateView,
            name: "products-create",
            meta: {
                auth: true,
                role: 'admin'
            }
        },
        {
            path: "/admin/products/:id/edit",
            component: ProductEditView,
            name: "products-edit",
            meta: {
                auth: true,
                role: 'admin'
            }
        },

        // roles routes
         {
            path: '/admin/roles',
            component: RoleIndexView,
            name: "roles",
            meta: {
                auth: true,
                role: 'admin'
            }
        },
        {
            path: "/admin/roles/create",
            component: RoleCreateView,
            name: "roles-create",
            meta: {
                auth: true,
                role: 'admin'
            }
        },
        {
            path: "/admin/roles/:id/edit",
            component: RoleEditview,
            name: "roles-edit",
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
    const category = useCategoryStore();
    const route = useRouter();

    if(!store.auth?.user)
    {
        await store.fetchUser(); //to set the auth user
    }
    store.errors = null; //on every reload or navigation null the errors
    store.emptyForm(); //on every reload or navigation null the auth form
    category.errors = null;
    category.form.name = '';

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
