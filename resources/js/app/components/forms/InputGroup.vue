<template>
    <div class="mb-5">
        <label for="email" class="block mb-2 capitalize text-sm font-medium text-gray-900 dark:text-white">
            {{ label }}
        </label>
        <input :type="type" :value="modelValue" @input="emit('update:modelValue', $event.target.value)" :class="[
            'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
            {
                'border-red-600 bg-red-100': errors
            }
        ]" />
        <InputError :errors="errors" />
    </div>
</template>

<script setup>
import InputError from "./InputError.vue";

const emit = defineEmits(['update:modelValue'])
defineProps({
    label: String,
    modelValue: String,
    type: {
        default: "text"
    },
    errors: Object


})
</script>
