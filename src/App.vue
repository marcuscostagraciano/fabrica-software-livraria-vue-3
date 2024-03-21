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

form.v-form button.v-button {
  display: flex;
  align-items: right;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

ul li {
  text-align: center;
}

ul li span {
  cursor: pointer;
}

ul li button {
  background-color: red;
  color: #000;
  border: #fff 2px solid;
}
</style>
