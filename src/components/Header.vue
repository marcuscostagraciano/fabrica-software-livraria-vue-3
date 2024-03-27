<script setup>
import { routes } from '@/router'

</script>

<template>
    <header>
        <a v-for="route in routes" id="navbar">
            <router-link :to="route.path">{{ route.name }}</router-link> |
        </a>
    </header>
</template>

<style scoped></style>