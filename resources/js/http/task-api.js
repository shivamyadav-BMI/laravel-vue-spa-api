
import api from "./api";

const resource = "/tasks";

const fetchAllTask = () => api.get(resource);
const storeTask = (task) => api.post(resource, task);
const updateTask = (id, task) => api.put(`${resource}/${id}`, task);
const deleteTask = (id) => api.delete(`${resource}/${id}`, data);
const completeTask = () => api.put(`${resource}/${id}/complete`, data);


export {
    fetchAllTask,
    storeTask,
    updateTask,
    deleteTask,
    completeTask
}
