<template>
    <AdminLayout>
        <div class="max-w-2xl border border-gray-50 rounded shadow p-4 mx-auto">
            <h2 class="text-center font-serif uppercase text-xl font-semibold">Update an existing Category</h2>
            <div class="">
                <form @submit.prevent="handleUpdate">
                    <InputGroup v-model="form.name" label="Name" :errors="errors?.name" />
                    <div class="flex justify-between gap-5 items-center">
                        <CancelButton link="/admin/categories">Cancel</CancelButton>
                        <Button>Update Category</Button>
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
import { RouterLink, useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import useCategoryStore from "../../../../store/admin/categoryStore";
import { onMounted } from "vue";

const router = useRouter();
const store = useCategoryStore();
const { form, errors } = storeToRefs(useCategoryStore());

let categoryId = useRoute().params.id;

onMounted(() => {
    store.categoryEdit(categoryId);
});

// function to store
const handleUpdate= async () => {
    const success = await store.categoryUpdate(categoryId);
    if (success) {
        router.push("/admin/categories");
    }
};

</script>
