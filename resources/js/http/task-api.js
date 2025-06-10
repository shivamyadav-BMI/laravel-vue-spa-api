
import api from "./api";

const resource = "/tasks";

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
