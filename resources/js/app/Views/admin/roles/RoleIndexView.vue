<template>
    <AdminLayout>
        <div class="p-4 w-full">
            <div class="w-full  flex justify-between items-center">
                <div>
                    <h2>Roles Table</h2>
                </div>
                <div class="">
                    <RouterLink to="/admin/roles/create"
                        class="bg-teal-500 hover:bg-teal-600 px-3 py-2 rounded-lg shadow text-white uppercase font-serif">
                        Create Role</RouterLink>
                </div>
            </div>

            <!-- table -->
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg my-10">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Role Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                User Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Created At
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="role in store.roles.data"
                            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                            <th scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ role.role }}
                            </th>
                            <td class="px-6 py-4">
                                <span v-for="user in role.users">{{ user.name }},</span>
                            </td>
                            <td class="px-6 py-4">
                                {{ new Date(role.created_at).toLocaleDateString() }}
                            </td>

                            <td class="px-6 py-4 space-x-3">
                                <RouterLink :to="`/admin/roles/${role.id}/edit`"
                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit
                                </RouterLink>

                                <button class="cursor-pointer text-red-500" @click="openModal(role.id)">Delete</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <!-- <div v-else>
                <h3 class="text-center font-semibold font-serif">No roles is avialabel at this mmoment.</h3>
            </div> -->
            <Pagination :pagination="store.roles" :fetch="store.fetchAllRole"/>

            <!-- delete modal -->
            <Teleport to="body">
                <Modal :isOpen="isOpen">
                    <template #footer>
                        <button type="button" @click="handleDelete()"
                            class="inline-flex w-full justify-center cursor-pointer rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">Delete</button>
                        <button type="button" @click="closeModal"
                            class="mt-3 inline-flex w-full cursor-pointer justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                    </template>
                </Modal>
            </Teleport>
        </div>
    </AdminLayout>
</template>

<script setup>
import { onMounted } from "vue";
import useRoleStore from "../../../../store/admin/roleStore";
import AdminLayout from "../../../layouts/AdminLayout.vue";
import { RouterLink } from "vue-router";
import Pagination from "../../../components/Pagination.vue";
import Modal from "../../../components/Modal.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
const store = useRoleStore();
const {fetchAllRole } = storeToRefs(useRoleStore());
onMounted(() => {
    store.fetchAllRole();
});

// modal properties and method
const isOpen = ref(false);
const roleId = ref(null);
function openModal(id) {
    roleId.value = id;
    isOpen.value = true;
}

function closeModal() {
    roleId.value = null;
    isOpen.value = false;
}

// delete role
const handleDelete = () => {
    store.deleteRole(roleId.value);
    closeModal();
}
</script>
