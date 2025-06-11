<template>
    <p class="text-sm text-red-500 space-y-1" v-if="errors">
        {{ errors[0] }}
    </p>
</template>

<script setup>
defineProps({
    errors :Object
})
</script>
