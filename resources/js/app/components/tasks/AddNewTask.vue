<template>
        <div>
            <input type="text" placeholder="Add new task... Press enter to save"
            @keydown.enter="$emit('added', newTask)" v-model="newTask.title"
                class="border border-gray-300 rounded px-3 py-2 w-full" name="" id="">
        </div>
</template>

<script setup>
import { reactive } from 'vue';


const emit = defineEmits(['added']);

const newTask = reactive({
    title: '',
    completed: 0
});

const addNewTask = (event) => {
    if (event.target.value.trim()) {
        newTask.title = event.traget.value;
        event.target.value = "";

        emit("added", newTask);

    }
}

</script>
