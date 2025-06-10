
import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH

const resource = `${apiPath}/tasks`;

const fetchAllTask = () => api.get(resource);
const storeTask = (task) => api.post(resource, task);
const updateTask = (id, task) => api.put(`${resource}/${id}`, task);
const deleteTask = (id) => api.delete(`${resource}/${id}`, id);
const completeTask = (id, task) => api.put(`${resource}/${id}/complete`, task);


export {
    fetchAllTask,
    storeTask,
    updateTask,
    deleteTask,
    completeTask
}
