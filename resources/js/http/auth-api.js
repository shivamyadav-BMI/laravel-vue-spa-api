import api from "./api";

const csrfCookie = () => api.get("/sanctum/csrf-cookie");

const register =  (user) => api.post("/auth/register", user);
const login =  (credentials) => api.post("/auth/login", credentials);
const logout = () => api.delete("/auth/logout");
const getUser = () => api.get("/auth/user");

export {
    csrfCookie,
    register,
    login,
    logout,
    getUser
}
