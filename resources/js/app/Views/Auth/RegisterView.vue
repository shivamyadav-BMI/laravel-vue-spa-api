<template>
    <div class="mt-20 rounded-lg max-w-xl mx-auto p-4 border border-gray-100 shadow">
        <form @submit.prevent="register" class="max-w-xl mx-auto">
            <h3 class="text-center font-semibold text-xl my-5">Login to you account.</h3>
            <InputGroup label="your email" v-model="form.name" :errors="errors?.name" />
            <InputGroup label="your email" type="email" v-model="form.email" :errors="errors?.email" />
            <InputGroup label="your password" type="password" v-model="form.password" :errors="errors?.password" />
            <InputGroup label="confirm password" type="password" v-model="form.password_confirmation"
                :errors="errors?.password_confirmation" />
            <button type="submit"
                class="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full cursor-pointer px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Register
            </button>
        </form>
    </div>
</template>


<script setup>
import { useRouter } from 'vue-router';
import useAuthStore from '../../../store/authStore';
import { storeToRefs } from 'pinia';
import InputGroup from '../../components/forms/InputGroup.vue';

const router = useRouter();
const store = useAuthStore();
const { form, errors } = storeToRefs(useAuthStore());

const register = async () => {
    const success = await store.registerUser();
    // redirect to the login after successful register
    if (success) {
        router.push('/login');

    }
};

</script>
