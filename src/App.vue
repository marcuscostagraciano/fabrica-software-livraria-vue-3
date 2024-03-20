<script setup>
import { routes } from './router'

</script>

<template>
  <header>
    <a v-for="route in routes" id="navbar">
      <router-link :to="route.path">{{ route.name }}</router-link> |
    </a>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
#navbar {
  text-transform: capitalize;
}
</style>
