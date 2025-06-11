<template>
<AdminLayout>
    <div class="max-w-2xl border border-gray-50 rounded shadow p-4 mx-auto">
        <h2 class="text-center font-serif uppercase text-xl font-semibold">Create a new product</h2>
        <div class="">
            <form @submit.prevent="">
                <InputGroup label="Name"  />
            </form>
        </div>
    </div>
</AdminLayout>
</template>

<script setup>
import InputGroup from "../../../components/forms/InputGroup.vue";
import AdminLayout from "../../../layouts/AdminLayout.vue";
</script>
