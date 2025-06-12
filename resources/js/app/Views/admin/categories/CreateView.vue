<template>
    <AdminLayout>
        <div class="max-w-2xl border border-gray-50 rounded shadow p-4 mx-auto">
            <h2 class="text-center font-serif uppercase text-xl font-semibold">Create a new Category</h2>
            <div class="">
                <form @submit.prevent="handleStore">
                    <InputGroup v-model="form.name" label="Name" :errors="errors?.name" />
                    <div class="flex justify-between gap-5 items-center">
                        <CancelButton link="/admin/categories">Cancel</CancelButton>
                        <Button>Create Category</Button>
                    </div>
                </form>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import InputGroup from "../../../components/forms/InputGroup.vue";
import Button from "../../../components/forms/Button.vue";
import CancelButton from "../../../components/forms/CancelButton.vue";
import AdminLayout from "../../../layouts/AdminLayout.vue";
import { RouterLink, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import useCategoryStore from "../../../../store/admin/categoryStore";

const router = useRouter();
const store = useCategoryStore();
const { form, errors } = storeToRefs(useCategoryStore());

// function to store
const handleStore = async () => {
    const success = await store.categoryStore();
    if (success) {
        router.push("/admin/categories");
    }
};

</script>
