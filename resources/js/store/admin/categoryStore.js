import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { allCategories, destroyCategory, editCategory, storeCategory, updateCategory } from "../../http/admin/category-api";
import { csrfCookie } from "../../http/admin/role-api";

const useCategoryStore = defineStore("category-store", function (){

    const form = reactive({
        name : ''
    });
    const errors = ref([]);
    const categories = ref([]);

    const fetchAll = async(page) => {
        await csrfCookie();
        const {data} = await allCategories(page);
        categories.value = data.categories;
    }

    const categoryStore = async() => {
        try {
            await csrfCookie();
            await storeCategory({...form});
            return true;
        } catch (error) {
            if (error && error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
            return false;
        }
    }

    const categoryEdit = async(id) => {
        const {data} = await editCategory(id);
        form.name = data.category.name;
    }

    const categoryUpdate = async(id) => {
          try {
            await csrfCookie();
            await updateCategory(id, {...form});
            return true;
        } catch (error) {
            if (error && error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
            return false;
        }
    }

    const categoryDelete = async(id) => {
        await csrfCookie();
        await destroyCategory(id);
    }

return {
    form,
    errors,
    categories,
    fetchAll,
    categoryStore,
    categoryDelete,
    categoryEdit,
    categoryUpdate,
}
});

export default useCategoryStore;
