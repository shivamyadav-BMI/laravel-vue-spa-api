import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { csrfCookie, getUser, login, logout, register } from "../http/auth-api";

const useAuthStore = defineStore("auth-store", function () {
    const auth = reactive({
        user: null,
    });

    const user = ref(null);

    const isLoggedIn = computed(() => !!user.value); //return boolean based on the user value


    const form = reactive({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    // function to null the form data
    const emptyForm = () => {
        form.name = '',
        form.email = '',
        form.password = '',
        form.password_confirmation = ''
    }

    const errors = ref(null);

    const setCsrfCookie = async () => {
        const res = await csrfCookie();

    }

    const fetchUser = async () => {
        try {
            const { data } = await getUser();
            user.value = data;
            auth.user = data;
        } catch (error) {
            auth.user = null;
            user.value = null;
        }
    }

    const loginUser = async () => {
        try {
            await csrfCookie();
            let credentials = { ...form };
            const { data } = await login(credentials);
            await fetchUser();
            emptyForm();
        } catch (error) {
            if (error && error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    }

    const registerUser = async () => {
        try {
            const credentials = { ...form };
            const { data } = await register(credentials);
            // null the form
            emptyForm();
            return true;
        } catch (error) {
            console.log(error);
            if (error && error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
            return false;
        }

    }

    const logoutUser = async () => {
        const { data } = await logout();
        user.value = null;
        auth.user = null;
    }

    // setters


    return {
        setCsrfCookie,
        loginUser,
        logoutUser,
        registerUser,
        fetchUser,
        isLoggedIn,
        auth,
        user,
        form,
        errors,
    }
});

export default useAuthStore;
