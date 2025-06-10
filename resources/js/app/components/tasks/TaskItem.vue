<template>
    <label for=""></label>
    <input  @change="completed" :id="task.id" :checked="task.completed" type="checkbox"
        class="rounded border border-gray-300">
    <div v-if="isEdit" class="w-full">
        <input @keydown.esc="undoTask" :id="task.id" @keyup.enter="update(task.id, $event)" type="text"
            :value="task.title" class="w-full rounded border border-gray-300 px-3 py-2">
    </div>
    <p v-if="!isEdit" @dblclick="isEdit = !isEdit" :class="{ 'line-through': task.completed }" class="text-start w-full">
        {{ task.title }}</p>
    <div class="space-x-5 flex justify-end w-full" v-show="!isEdit">
        <button class="bg-cyan-600 text-white px-3 py-2 rounded-lg cursor-pointer" @click="edit">Edit</button>
        <button class="bg-red-500 text-white px-3 py-2 rounded-lg cursor-pointer"
            @click="remove(task.id)">Delete</button>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, useTemplateRef } from 'vue';
import { completeTask, deleteTask, updateTask } from '../../../http/task-api';

const props = defineProps({
    task: Object,
    tasks: Object
});

const isEdit = ref(false);

// const emit = defineEmits(['edit', 'remove'])
const edit = async () => {
    isEdit.value = true;
}

//undo task
function undoTask() {
    isEdit.value = false;

}

// function to completed task
const completed = async () => {
    let completedTask = { ...props.task, completed: !props.completed };
    const data = await completeTask(props.task.id, completedTask);
}

const update = async (id, event) => {
    let updatedTask = { ...props.task, title: event.target.value }
    const data = await updateTask(id, updatedTask);
    isEdit.value = false;
}

const remove = async (task) => {
    const w = confirm("Are you sure you want to delete this task?", task);
    if (!w) return;

    const data = await deleteTask(task);
    console.log(data);
    props.tasks.splice(task, 1);
}

</script>
