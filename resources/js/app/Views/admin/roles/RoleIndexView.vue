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
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg my-10" >
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

                            <td class="px-6 py-4">
                                <RouterLink :to="`/admin/roles/${role.id}/edit`"
                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</RouterLink>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <!-- <div v-else>
                <h3 class="text-center font-semibold font-serif">No roles is avialabel at this mmoment.</h3>
            </div> -->


            <!-- pagination -->
            <!-- <div class="flex gap-3 justify-end" v-if="store.roles.per_page < store.roles.total">
                <div  v-for="link in store.roles.links">
                    <RouterLink  class="rounded-lg bg-gray-200 px-3 py-1 hover:text-white hover:bg-teal-500" v-if="link.url && !link.active" to="?page=2" v-html="link.label"></RouterLink>
                    <span class="rounded-lg bg-gray-200 px-3 cursor-not-allowed py-1 hover:text-white hover:bg-teal-500" v-if="!link.url || link.active" v-html="link.label"></span>
                </div>
            </div> -->
            <Pagination :pagination="store.roles"/>

        </div>
    </AdminLayout>
</template>

<script setup>
import { onMounted } from "vue";
import useRoleStore from "../../../../store/admin/roleStore";
import AdminLayout from "../../../layouts/AdminLayout.vue";
import { RouterLink } from "vue-router";
import Pagination from "../../../components/Pagination.vue";
const store = useRoleStore();
onMounted(() => {
    store.fetchAllRole();
});
</script>
