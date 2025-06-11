<template>
    <div class="flex gap-3 justify-end" v-if="pagination.per_page <= pagination.total">
        <div v-for="link in pagination.links">
            <button class="rounded-lg bg-gray-200 cursor-pointer px-3 py-1 hover:text-white hover:bg-teal-500"
                v-if="link.url && !link.active" :to="link.url" v-html="link.label"></button>
            <button disabled class="rounded-lg bg-gray-200 px-3 cursor-not-allowed py-1 hover:text-white hover:bg-teal-500"
                v-if="!link.url || link.active" v-html="link.label"></button>
        </div>
    </div>
</template>

<script setup>
import useRoleStore from '../../store/admin/roleStore';

    defineProps({
        pagination : Object
    })

    const store =  useRoleStore();

</script>
