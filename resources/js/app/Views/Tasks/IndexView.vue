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
        <div class="p-4" v-if="uncompletedTasks.length">
            <div  v-for="task in uncompletedTasks" :key="task.id" class="flex gap-5 items-center justify-between">
                <TaskItem  :task="task"/>
            </div>
        </div>

        <!-- toogle button for completed tasks -->

        <!-- completed tasks -->
          <div class="p-4" v-if="completedTasks.length">
            <div  v-for="task in completedTasks" :key="task.id" class="flex gap-5 items-center justify-between">
                <TaskItem  :task="task"/>
            </div>
        </div>
    </div>
    {{ tasks }}
</template>


<script setup>
import api from '../../../http/api';
import { computed, onMounted, ref } from 'vue';
import { fetchAllTask } from '../../../http/task-api';
import TaskItem from '../../components/TaskItem.vue';

const tasks = ref([]);

onMounted(async () => {
    tasks.value = (await fetchAllTask()).data.tasks;
});

const completedTasks = computed(() => tasks.value.filter((task) => task.completed));
const uncompletedTasks = computed(() => tasks.value.filter((task) => !task.completed));
</script>
