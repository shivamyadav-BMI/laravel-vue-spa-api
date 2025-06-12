import { defineStore } from "pinia";
import  { allProducts,storeProduct,csrfCookie, editProduct,updateProduct,   destroyProduct } from "../../http/admin/product-api";
import api from "../../http/api";
import { reactive, ref } from "vue";

const useProductStore = defineStore("products-store", function (){

     const form = reactive({
        name : '',
        description : '',
        price : '',
        image : null,
        stock_quantity : '',
        is_available : '',
        category_id : ''
    });

    const errors = ref([]);
    const products = ref([]);

    const categories = ref([]);

    // fetch all categories
     const fetchAllCategories= async(page) => {
        await csrfCookie();
        const {data} = await api.get('/api/admin/products/categories');
        categories.value = data.categories;
    }

    const fetchAll = async(page) => {
        await csrfCookie();
        const {data} = await allProducts(page);
        products.value = data.products;
    }

    const productStore = async() => {
        try {
            await csrfCookie();
            await storeProduct({...form});
            return true;
        } catch (error) {
            if (error && error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
            return false;
        }
    }

    const productEdit = async(id) => {
        const {data} = await editProduct(id);
        form.name = data.product.name;
    }

    const productUpdate = async(id) => {
          try {
            await csrfCookie();
            await updateProduct(id, {...form});
            return true;
        } catch (error) {
            if (error && error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
            return false;
        }
    }

    const productDelete = async(id) => {
        await csrfCookie();
        await destroyProduct(id);
    }

    return {
        form,
        errors,
        fetchAll,
        productDelete,
        productEdit,
        productStore,
        productUpdate,
        fetchAllCategories
    }

});

export default useProductStore;
