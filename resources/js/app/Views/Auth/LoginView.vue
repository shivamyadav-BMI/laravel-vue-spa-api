<template>
  <AuthLayout>
      <div class="mt-20 rounded-lg max-w-xl mx-auto p-4 border border-gray-100 shadow">
        <form @submit.prevent="login" class="max-w-xl mx-auto">
            <h3 class="text-center font-semibold text-xl my-5 uppercase">Login to you account</h3>
            <InputGroup label="your email" v-model="form.email" :errors="errors?.email"/>
            <InputGroup label="your password" type="password" v-model="form.password" :errors="errors?.password"/>
            <button type="submit"
                class="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full cursor-pointer px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            <div class="text-center font-serif my-3">
                Didn't have an account <RouterLink to="/register" class="text-blue-600 hover:underline">register</RouterLink> here.
            </div>
        </form>
    </div>
  </AuthLayout>
</template>

<script setup>
import {
    useRouter
} from 'vue-router';
import useAuthStore from '../../../store/authStore';
import {
    storeToRefs
} from 'pinia';
import InputGroup from '../../components/forms/InputGroup.vue';
import AuthLayout from '../../layouts/AuthLayout.vue';

const store = useAuthStore();
const {
    errors,
    form
} = storeToRefs(useAuthStore());
const router = useRouter();
const login = async () => {
    await store.loginUser();
    // is user is logged in then redirect to the homepage
    if (store.isLoggedIn) {
        router.push("/");

    }
}
</script>
