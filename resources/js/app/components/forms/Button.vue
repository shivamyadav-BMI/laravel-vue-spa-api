<template>
    <button type="submit"
        class="text-white w-full bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-600 font-medium rounded-lg text-sm w-full cursor-pointer px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <slot></slot>
    </button>
</template>

<script setup>
defineProps({

})
</script>
