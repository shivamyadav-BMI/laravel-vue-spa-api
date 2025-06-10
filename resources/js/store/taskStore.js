import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { completeTask, deleteTask, fetchAllTask, storeTask, updateTask } from "../http/task-api";

const useTaskStore = defineStore('tasks-store', function () {

    const tasks = ref([]);

    const isEdit = ref(false);
    const showCompletedTasks = ref(false);


    // setters
    const getAllTasks = async () => {
        tasks.value = (await fetchAllTask()).data.tasks;
    }

    const toggleCompletedTasks = () => {
        showCompletedTasks.value = !showCompletedTasks.value;
    }


    const edit = async () => {
        isEdit.value = true;
    }

    //undo task
    function undoTask() {
        isEdit.value = false;

    }

    // function to completed task
    const completed = async () => {
        let completedTask = { completed: !props.completed };
        const data = await completeTask(props.task.id, completedTask);
    }

    const update = async (id, event) => {
        let updatedTask = {  title: event.target.value }
        const data = await updateTask(id, updatedTask);
        isEdit.value = false;
        getAllTasks();
    }

    const remove = async (task) => {
        const w = confirm("Are you sure you want to delete this task?", task);
        if (!w) return;

        const data = await deleteTask(task);
        tasks.value.splice(task, 1);
        getAllTasks();
    }

    // function to create new task
    const handleAddedTask = async (newTask) => {
        if (newTask.title.trim() == '') return;
        const res = await storeTask(newTask);
        tasks.value.unshift(newTask);
    }

    // getters
    const completedTasks = computed(() => tasks.value.filter((task) => task.completed));
    const uncompletedTasks = computed(() => tasks.value.filter((task) => !task.completed));



    return {
        completedTasks,
        uncompletedTasks,
        showCompletedTasks,
        tasks,
        getAllTasks,
        toggleCompletedTasks,
        handleAddedTask,
        isEdit,
        edit,
        update,
        remove,
        completed,
        undoTask,


    }

});


export default useTaskStore;
