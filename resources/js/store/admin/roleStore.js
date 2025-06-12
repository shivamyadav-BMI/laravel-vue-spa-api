import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { destroy, edit, allRoles, store, update, csrfCookie } from "../../http/admin/role-api";
import usePagination from "../../app/composables/usePagination";


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

    // function previousPage(pagination)
    // {
    //     let prev = pagination.current_page - 1;
    //     fetchAllRole(prev);
    // }

    // function nextPage(pagination)
    // {
    //     let next = pagination.current_page + 1;
    //     fetchAllRole(next);

    // }
    // const pagination = () =>  usePagination(page, fetchAllRole);


    const storeRole = async () => {
        try {
            let data = { ...form };
            await csrfCookie();
            await store(data);
            errors.value = null;
            return true;
        } catch (error) {
            if (error && error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
            return false;
        }
    };

    const editRole = async () => {
        await csrfCookie();
        await edit()
    }

    const updateRole = async () => {
        try {
            let data = { ...form };
            await csrfCookie();
            await update(data);
            errors.value = null;
            return true;
        } catch (error) {
            if (error && error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
            return false;
        }
    };
    const deleteRole = async () => {
        try {
            await csrfCookie();
            await destroy(id);
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
        // pagination,

    }
});

export default useRoleStore;
