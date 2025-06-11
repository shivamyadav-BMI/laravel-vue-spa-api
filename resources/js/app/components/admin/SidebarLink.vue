<template>
    <li>
    <RouterLink :to="link"
    activeClass="bg-purple-500 text-white"
    activeExactClass="bg-purple-500 text-white"
            :class="[
                'flex  gap-3 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:text-white hover:bg-purple-600  group',
            ]">
            <!-- icon slot  -->
           <slot name="icon">

           </slot>
        </RouterLink>
    </li>
</template>

<script setup>
    defineProps({
        link : String,

    })
</script>
