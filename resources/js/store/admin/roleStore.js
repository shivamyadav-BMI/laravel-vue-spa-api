import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { destroy, edit, allRoles, store, update, csrfCookie } from "../../http/admin/role-api";


const useRoleStore = defineStore("roles-store", function () {

    const roles = ref([]);
    const form = reactive({
        role: ''
    });

    const errors = ref(null);

    // for pagination
    const page = ref(1);

    const fetchAllRole = async (page) => {
        await csrfCookie();
        const { data } = await allRoles(page);
        roles.value = data.roles;
    };


    const storeRole = async () => {
        try {
            let data = { ...form };
            await csrfCookie();
            await store(data);
            errors.value = null;
            form.role = '';
            return true;
        } catch (error) {
            if (error && error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
            return false;
        }
    };

    const editRole = async (id) => {
        await csrfCookie();
        const  { data } = await edit(id);
        form.role = data.role.role;
    }

    const updateRole = async (id) => {
        try {
            let data = { ...form };
            await csrfCookie();
            await update(id,data);
            errors.value = null;
            form.role = '';
            return true;
        } catch (error) {
            if (error && error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
            return false;
        }
    };
    const deleteRole = async (id) => {
        try {
            await csrfCookie();
            await destroy(id);
            await fetchAllRole();
            return true;
        } catch (error) {
            return false;
        }
    };

    return {
        storeRole,
        form,
        errors,
        updateRole,
        editRole,
        deleteRole,
        fetchAllRole,
        roles,
    }
});

export default useRoleStore;
