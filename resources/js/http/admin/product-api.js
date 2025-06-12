import api from "../api";

const csrfCookie = () => api.get("/sanctum/csrf-cookie");
const allProducts= (page) => api.get("/api/admin/products",{params : {page}});
const storeProduct = (form) => api.post("/api/admin/products", form);
const editProduct = (id) => api.get(`/api/admin/products/${id}/edit`);
const updateProduct = (id,form) => api.put(`/api/admin/products/${id}`, form);
const destroyProduct = (id) => api.delete(`/api/admin/products/${id}`);


export {
    allProducts,
    storeProduct,
    csrfCookie,
    editProduct,
    updateProduct,
    destroyProduct
}
