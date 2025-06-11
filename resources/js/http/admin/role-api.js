import api from "../api";

const csrfCookie = () => api.get("/sanctum/csrf-cookie");
const allRoles = () => api.get("/api/admin/roles");
const store = (form) => api.post("/api/admin/roles", form);
const edit = (id) => api.get(`/api/admin/roles/${id}`);
const update = (id,form) => api.put(`/api/admin/roles/${id}`, form);
const destroy = (id) => api.delete(`/api/admin/roles/${id}`);


export {
    allRoles,
    edit,
    csrfCookie,
    store,
    update,
    destroy
}
