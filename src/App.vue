<script setup>
import Header from './components/Header.vue';

</script>

<template>
  <Header />
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

.v-table {
  text-align: center;
}

.excluir {
  height: 90%;
  width: 90%;
}
</style>
