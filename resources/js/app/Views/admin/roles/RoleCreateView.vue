<template>
    <AdminLayout>
        <div class="max-w-2xl border border-gray-50 rounded shadow p-4 mx-auto">
            <h2 class="text-center font-serif uppercase text-xl font-semibold">Create a new role</h2>
            <div class="">
                <form @submit.prevent="handleStore">
                    <InputGroup v-model="form.role" label="Name" :errors="errors?.role" />
                    <div class="flex justify-between gap-5 items-center">
                        <CancelButton link="/admin/roles">Cancel</CancelButton>
                        <Button>Create Role</Button>
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
import useRoleStore from "../../../../store/admin/roleStore";
import { storeToRefs } from "pinia";

const router = useRouter();
const store = useRoleStore();
const { form, errors } = storeToRefs(useRoleStore());

// function to store
const handleStore = async () => {
    const success = await store.storeRole();
    if (success) {
        router.push("/admin/roles");
    }
};

</script>
