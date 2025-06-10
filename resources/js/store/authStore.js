import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { csrfCookie, getUser, login, logout, register } from "../http/auth-api";

const useAuthStore = defineStore("auth-store", function () {
    const auth = reactive({
        user : null,
    });

    const user = ref(null);

    const isLoggedIn = computed(() => !!user.value); //return boolean based ont he user value


    const form = reactive({
        name : '',
        email : '',
        password : '',
        password_confirmation : ''
    });

    const setCsrfCookie = async() => {
        const res = await csrfCookie();

    }

    const fetchUser = async () => {
        const { data } = await getUser();
        user.value = data;
    }

    const loginUser = async (form) => {
        await csrfCookie();
        const { data } = await login(form);
        console.log(data);
        await fetchUser();
    }

    const registerUser = async(form) => {
        const { data } = await register(form);
        await loginUser({
            email : form.email,
            password : form.password
        });

    }

    const logoutUser = async () => {
        const { data } =  await logout();
        console.log(data);
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
        form
    }
});

export default useAuthStore;
