<template>
    <AdminLayout>
        <div class="max-w-2xl border border-gray-50 rounded shadow p-4 mx-auto">
            <h2 class="text-center font-serif uppercase text-xl font-semibold">Create a new role</h2>
            <div class="">
                <form @submit.prevent="handleUpdate">
                    <InputGroup v-model="form.role" label="Name" :errors="errors?.role" />
                    <div class="flex justify-between gap-5 items-center">
                        <CancelButton link="/admin/roles">Cancel</CancelButton>
                        <Button>Update Role</Button>
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
import useRoleStore from "../../../../store/admin/roleStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const router = useRouter();
const store = useRoleStore();
const { form, errors } = storeToRefs(useRoleStore());

// load the role and fill the form
let id = useRoute().params.id;

onMounted(() => {
    store.editRole(id);
});

// function to store
const handleUpdate = async () => {
    const success = await store.updateRole(id);
    if (success) {
        router.push("/admin/roles");
    }
};

</script>
