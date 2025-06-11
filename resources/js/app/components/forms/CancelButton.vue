<template>
    <RouterLink :to="link"
        class="px-3 py-2  rounded-lg w-full text-center border border-gray-100 text-gray-600 hover:text-gray-800 hover:bg-gray-100 border-gray-300">
        <slot></slot>
    </RouterLink>

</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
    link: String
})
</script>
