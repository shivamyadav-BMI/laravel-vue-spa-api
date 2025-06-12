<template>
    <AdminLayout>
        <div class="max-w-2xl border border-gray-50 rounded shadow p-4 mx-auto">
            <h2 class="text-center font-serif uppercase text-xl font-semibold">Create a new Product</h2>
            <div class="">
                <form @submit.prevent="handleStore" enctype="multipart/form-data">
                    <InputGroup v-model="form.name" label="Name" :errors="errors?.name" />
                    <InputGroup v-model="form.description" label="Description" :errors="errors?.description" />
                    <InputGroup v-model="form.price" label="Price" :errors="errors?.price" />
                    <InputGroup type="file" @change="fileUpload" label="image" :errors="errors?.image" />
                    <InputGroup v-model="form.stock_quantity" label="stock quantity" :errors="errors?.stock_quantity" />
                    <InputGroup v-model="form.is_available" label="Is Available" :errors="errors?.is_available" />
                    <div class="flex justify-between gap-5 items-center">
                        <CancelButton link="/admin/categories">Cancel</CancelButton>
                        <Button>Create Product</Button>
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
import useProductStore from "../../../../store/admin/productStore";

const router = useRouter();
const store = useProductStore();
const { form, errors } = storeToRefs(useProductStore());

//function to load all categories


//file upload
function fileUpload(event)
{
    store.form.image = event.target.files[0];
}
// function to store
const handleStore = async () => {
    const success = await store.productStore();
    if (success) {
        router.push("/admin/categories");
    }
};

</script>
