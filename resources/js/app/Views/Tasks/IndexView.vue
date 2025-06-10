<template>
    <div class="max-w-3xl mx-auto mt-6 rounded border border-gray-100">
        <div class="p-4">
            <div>
                <form action="">
                    <div>
                        <input  type="text" placeholder="Add task... Pree enter to save"
                            class="border border-gray-300 rounded px-3 py-2 w-full" name="" id="">
                    </div>
                </form>
            </div>
        </div>
        <!-- incompleted tasks -->
        <div class="p-4  rounded border border-gray-100 shadow mb-5 " v-if="uncompletedTasks.length">
            <h2 class="text-xl font-semibold my-3">Uncompleted Tasks</h2>
            <div  v-for="task in uncompletedTasks" :key="task.id" class="flex gap-5 items-center justify-between">
                <TaskItem  :task="task"/>
            </div>
        </div>

        <!-- toogle button for completed tasks -->
        <div class="flex justify-center my-5" v-if="completedTasks.length">
        <button @click="toggleCompletedTasks" class="text-center bg-teal-600 text-white rounded-lg shadow px-3 py-2 cursor-pointer">Toggle completed tasks</button>
        </div>
        <!-- completed tasks -->
          <div v-show="showCompletedTasks" class="p-4  rounded border border-gray-100 shadow " v-if="completedTasks.length">
            <h2 class="text-xl font-semibold my-3">Completed Tasks</h2>
            <div  v-for="task in completedTasks" :key="task.id" class="flex gap-5 items-center justify-between">
                <TaskItem  :task="task"/>
            </div>
        </div>
    </div>
</template>


<script setup>
import api from '../../../http/api';
import { computed, onMounted, ref } from 'vue';
import { fetchAllTask } from '../../../http/task-api';
import TaskItem from '../../components/TaskItem.vue';

const tasks = ref([]);
const showCompletedTasks = ref(false);

onMounted(async () => {
    tasks.value = (await fetchAllTask()).data.tasks;
});

const completedTasks = computed(() => tasks.value.filter((task) => task.completed));
const uncompletedTasks = computed(() => tasks.value.filter((task) => !task.completed));

// function to toggle the completed tasks hide and show
function toggleCompletedTasks()
{
    showCompletedTasks.value = ! showCompletedTasks.value;
}
</script>
