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

<style>
header {
  text-align: right;
}

#navbar {
  text-transform: capitalize;
}

h1 {
  text-align: center;
}

div.form {
  width: 80vw;
  margin: 1vh 0px;
  display: flex;
  justify-content: center;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

ul li {
  text-align: center;
}
</style>
