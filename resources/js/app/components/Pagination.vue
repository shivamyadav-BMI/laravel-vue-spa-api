<template>
    <div class="lg:flex justify-between items-center gap-5" v-if="pagination.per_page <= pagination.total">
        <h1 class="">
            Showing from {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }}
        </h1>
        <div class="flex gap-3 justify-end">
            <div v-for="link in pagination.links">
            <button
                :class="[
                'rounded-lg bg-gray-200  px-3 py-1 hover:text-white hover:bg-teal-500',
                {'cursor-not-allowed' : isDisabled(link)},
                {'cursor-pointer' : !isDisabled(link)}
                ]"
                :disabled="props.pagination.current_page == 1"
                @click="previousPage(props.pagination)"
                v-if="isPrevious(link)"
                v-html="link.label">
            </button>

            <button
                :class="[
                'rounded-lg bg-gray-200  px-3 py-1 hover:text-white hover:bg-teal-500',
                {'cursor-not-allowed' : isDisabled(link)},
                {'cursor-pointer' : !isDisabled(link)}
                ]"
                :disabled="isDisabled(link)"
                @click="props.fetch(link.label)"
                v-if="isLink(link)"
                v-html="link.label">
            </button>

            <button
                :class="[
                'rounded-lg bg-gray-200  px-3 py-1 hover:text-white hover:bg-teal-500',
                {'cursor-not-allowed' : isDisabled(link)},
                {'cursor-pointer' : !isDisabled(link)}
                ]"
                :disabled="isDisabled(link)"
                @click="nextPage(props.pagination)"
                v-if="isNext(link)"
                v-html="link.label">
            </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import useRoleStore from '../../store/admin/roleStore';
import usePagination from '../composables/usePagination';

    const props =defineProps({
        pagination : Object,
        fetch : Function,
    })

    const store =  useRoleStore();

    // for previous and next button rendering and link
    const isPrevious = (link) => {
        return link.label.startsWith("&");
    }
    const isNext = (link) => {
        return link.label.startsWith("Next");
    }

    const isLink = (link) => {
        return !link.label.startsWith("&") && !link.label.startsWith("Next");
    }

    // for disabled the button if active no previous or next page
    const isDisabled = function (link)
    {
        return link.active || !link.url;
    }

    // pagination composables
    // const {nextPage,previousPage} = usePagination(store.fetchAllRole);
    const {nextPage,previousPage} = usePagination(props.fetch);
</script>
