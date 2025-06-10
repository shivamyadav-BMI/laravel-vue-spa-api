<template>
    <div class="max-w-3xl mx-auto mt-6 rounded border border-gray-100">
        <div class="p-4">
            <div>
                <AddNewTask @added="store.handleAddedTask" />
            </div>
        </div>
        <!-- incompleted tasks -->
        <div class="p-4  rounded border border-gray-100 shadow mb-5 " v-if="store.uncompletedTasks.length">
            <h2 class="text-xl font-semibold my-3">Uncompleted Tasks</h2>
            <div v-for="task in store.uncompletedTasks" :key="task.id"
                class="flex gap-5 items-center border-b border-gray-300  h-20">
                <TaskItem :tasks="tasks" :task="task" />
            </div>
        </div>
        <!-- toogle button for completed tasks -->
        <div class="flex justify-center my-5" v-if="store.completedTasks.length">
            <button @click="store.toggleCompletedTasks"
                class="text-center bg-teal-600 text-white rounded-lg shadow px-3 py-2 cursor-pointer">
                <span v-if="!store.showCompletedTasks">Show completed tasks</span>
                <span v-if="store.showCompletedTasks">Hide completed tasks</span>
            </button>
        </div>
        <!-- completed tasks -->
        <div v-show="store.showCompletedTasks" class="p-4  rounded border border-gray-100 shadow "
            v-if="store.completedTasks.length">
            <h2 class="text-xl font-semibold my-3">Completed Tasks</h2>
            <div v-for="task in store.completedTasks" :key="task.id" class="flex gap-5 items-center justify-between">
                <TaskItem :task="task" />
            </div>
        </div>
    </div>
</template>


<script setup>
import api from '../../../http/api';
import { computed, onMounted, ref, watch } from 'vue';
import { fetchAllTask, storeTask } from '../../../http/task-api';
import TaskItem from '../../components/tasks/TaskItem.vue';
import AddNewTask from '../../components/tasks/AddNewTask.vue';
import useTaskStore from '../../../store/taskStore';

const store = useTaskStore();

// const tasks = ref([]);
// const showCompletedTasks = ref(false);

onMounted(async () => {
    store.getAllTasks();
});

watch(store.tasks.value, async () => {
    console.log("watching...");
        store.getAllTasks();

});

// const completedTasks = computed(() => tasks.value.filter((task) => task.completed));
// const uncompletedTasks = computed(() => tasks.value.filter((task) => !task.completed));

// function to toggle the completed tasks hide and show
// function toggleCompletedTasks() {
//     showCompletedTasks.value = !showCompletedTasks.value;
// }

// // function to create new task
// const handleAddedTask = async (newTask) => {
//     if (newTask.title.trim() == '') return;
//     const res = await storeTask(newTask);
//     tasks.value.unshift(newTask);
// }

</script>
