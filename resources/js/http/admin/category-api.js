import api from "../api";

const csrfCookie = () => api.get("/sanctum/csrf-cookie");
const allCategories= (page) => api.get("/api/admin/categories",{params : {page}});
const storeCategory = (form) => api.post("/api/admin/categories", form);
const editCategory = (id) => api.get(`/api/admin/categories/${id}/edit`);
const updateCategory = (id,form) => api.put(`/api/admin/categories/${id}`, form);
const destroyCategory = (id) => api.delete(`/api/admin/categories/${id}`);


export {
    allCategories,
    storeCategory,
    csrfCookie,
    editCategory,
    updateCategory,
    destroyCategory
}
