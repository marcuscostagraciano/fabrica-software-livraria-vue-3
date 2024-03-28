<script setup>
import { ref, reactive, onMounted } from "vue";

import TableHeaderList from "@/components/TableHeaderList.vue"

import CategoriasApi from "@/api/categorias";


const categoriasApi = new CategoriasApi();
const defaultCategoria = { id: null, descricao: "" };
const categorias = ref([]);
const categoria = reactive({ ...defaultCategoria });

const isEditando = ref(false)

onMounted(async () => {
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
});

function limpar() {
  isEditando.value = false
  Object.assign(categoria, { ...defaultCategoria });
}

async function salvar() {
  if (categoria.id) {
    await categoriasApi.atualizarCategoria(categoria);
  } else {
    await categoriasApi.adicionarCategoria(categoria);
  }
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
  limpar();
}

function editar(categoria_para_editar) {
  isEditando.value = true
  Object.assign(categoria, categoria_para_editar);
}

async function excluir(id) {
  await categoriasApi.excluirCategoria(id);
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
  limpar();
}

const theader_text = [
  "descrição"
]

</script>

<template>
  <h1>Categoria</h1>
  <hr />
  <v-form class="mx-6">
    <v-text-field v-model="categoria.descricao" name="desc" label="Descrição"></v-text-field>

    <v-container class="d-flex justify-center">
      <v-btn @click="salvar" class="bg-surface-variant">
        <p v-if="!isEditando">Adicionar</p>
        <p v-else>Atualizar</p>
      </v-btn>
      <v-btn @click="limpar" class="bg-surface-variant">Limpar</v-btn>
    </v-container>
  </v-form>
  <hr />

  <v-table density="comfortable">
    <TableHeaderList :th_text="theader_text" />
    <tbody>
      <tr v-for="categoria in categorias" :key="categoria.nome" @click="editar(categoria)">
        <td>{{ categoria.id }}</td>
        <td>{{ categoria.descricao }}</td>
        <td><button @click="excluir(categoria.id)" class="excluir">X</button></td>
      </tr>
    </tbody>
  </v-table>
</template>

<style></style>
