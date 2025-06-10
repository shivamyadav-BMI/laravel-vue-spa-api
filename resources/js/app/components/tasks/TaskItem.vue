<template>
    <div class="flex gap-4 items-center w-full">
        <label for=""></label>
    <input  @change="store.completed" :id="task.id" :checked="task.completed" type="checkbox"
        class="rounded border border-gray-300">
    <div v-if="store.isEdit" class="w-full">
        <input @keydown.esc="undoTask" :id="task.id" @keyup.enter="store.update(task.id, $event)" type="text"
            :value="task.title" class="w-full rounded border border-gray-300 px-3 py-2">
    </div>
    <p v-if="!store.isEdit" @dblclick="store.isEdit = !store.isEdit" :class="{ 'line-through': task.completed }" class="text-start w-full">
        {{ task.title }}</p>
    <div class="space-x-5 flex justify-end w-full" v-show="!store.isEdit">
        <button class="bg-cyan-600 text-white px-3 py-2 rounded-lg cursor-pointer" @click="store.edit">Edit</button>
        <button class="bg-red-500 text-white px-3 py-2 rounded-lg cursor-pointer"
            @click="store.remove(task.id)">Delete</button>
    </div>
    </div>
</template>
<script setup>

import useTaskStore from '../../../store/taskStore';

const store = useTaskStore();
const props = defineProps({
    task: Object,
});


</script>
