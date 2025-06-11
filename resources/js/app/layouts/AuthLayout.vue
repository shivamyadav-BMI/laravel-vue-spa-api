<template>
    <!-- sidebar -->
    <Navbar />
    <slot></slot>


</template>

<script setup>
import {RouterView} from "vue-router"
import Navbar from "../components/Navbar.vue";

</script>
