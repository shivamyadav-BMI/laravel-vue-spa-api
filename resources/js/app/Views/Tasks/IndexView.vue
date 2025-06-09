<template>
    <div class="max-w-3xl mx-auto mt-6 rounded border border-gray-100">
        <div class="p-4">
            <div>
                <form action="">
                    <div>
                        <input type="text" placeholder="Add task... Pree enter to save"
                            class="border border-gray-300 rounded px-3 py-2 w-full" name="" id="">
                    </div>
                </form>
            </div>
        </div>
        <div class="p-4" v-if="tasks.length">
            <div  v-for="task in tasks" :key="task.id" class="flex gap-5 items-center justify-between">
                <TaskItem  :task="task"/>
            </div>
        </div>
    </div>
    {{ tasks }}
</template>


<script setup>
import api from '../../../http/api';
import { onMounted, ref } from 'vue';
import { fetchAllTask } from '../../../http/task-api';
import TaskItem from '../../components/TaskItem.vue';

const tasks = ref([]);

onMounted(async () => {
    tasks.value = (await fetchAllTask()).data.tasks;
});
</script>
