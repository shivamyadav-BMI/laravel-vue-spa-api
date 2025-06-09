<template>
    <form action="">
        <label for=""></label>
        <input checked="task.completed == 1" type="checkbox" class="rounded border border-gray-300">
    </form>
    <p class="text-start">{{ task.title }}</p>
    <div class="space-x-5">
        <button class="bg-cyan-600 text-white px-3 py-2 rounded-lg">Edit</button>
        <button class="bg-red-500 text-white px-3 py-2 rounded-lg">Delete</button>
    </div>
</template>

<script setup>
defineProps({
    task: Object
})
</script>
