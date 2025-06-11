import api from "./api";

const csrfCookie = () => api.get("/sanctum/csrf-cookie");

const register =  (user) => api.post("/api/auth/register", user);
const login =  (credentials) => api.post("/api/auth/login", credentials);
const logout = () => api.delete("/api/auth/logout");
const getUser = () => api.get("/api/user");

export {
    csrfCookie,
    register,
    login,
    logout,
    getUser
}
