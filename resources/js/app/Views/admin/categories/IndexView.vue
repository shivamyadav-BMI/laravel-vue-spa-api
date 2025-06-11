<template>
    <AdminLayout>
        <div class="p-4 w-full">
            <div class="w-full  flex justify-between items-center">
                <div>
                    <h2>Categories Table</h2>
                </div>
                <div class="">
                    <RouterLink to="/admin/categories/create"
                        class="bg-teal-500 hover:bg-teal-600 px-3 py-2 rounded-lg shadow text-white uppercase font-serif">
                        Create Product</RouterLink>
                </div>
            </div>


        </div>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from "../../../layouts/AdminLayout.vue";
</script>
