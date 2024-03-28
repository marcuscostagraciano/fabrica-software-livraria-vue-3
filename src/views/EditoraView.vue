<script setup>
import { ref, reactive, onMounted } from "vue";

import TableHeaderList from "@/components/TableHeaderList.vue"

import EditorasApi from "@/api/editoras";


const editorasApi = new EditorasApi();
const defaultEditora = { id: null, nome: "", site: "" };
const editoras = ref([]);
const editora = reactive({ ...defaultEditora });

const isEditando = ref(false)

onMounted(async () => {
  editoras.value = await editorasApi.buscarTodasAsEditoras();
});

function limpar() {
  isEditando.value = false
  Object.assign(editora, { ...defaultEditora });
}

async function salvar() {
  if (editora.id) {
    await editorasApi.atualizarEditora(editora);
  } else {
    await editorasApi.adicionarEditora(editora);
  }
  editoras.value = await editorasApi.buscarTodasAsEditoras();
  limpar();
}

function editar(editora_para_editar) {
  isEditando.value = true
  Object.assign(editora, editora_para_editar);
}

async function excluir(id) {
  await editorasApi.excluirEditora(id);
  editoras.value = await editorasApi.buscarTodasAsEditoras();
  limpar();
}

const theader_text = [
  "nome", "site"
]

</script>

<template>
  <h1>Editora</h1>
  <hr />
  <v-form class="mx-6">
    <v-text-field v-model="editora.nome" name="name" label="Nome"></v-text-field>
    <v-text-field v-model="editora.site" name="site" label="Site"></v-text-field>

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
      <tr v-for="editora in editoras" :key="editora.nome" @click="editar(editora)">
        <td>{{ editora.id }}</td>
        <td>{{ editora.nome }}</td>
        <td v-if="editora.site">{{ editora.site }}</td>
        <td v-else> - - - </td>
        <td><button @click="excluir(editora.id)" class="excluir">X</button></td>
      </tr>
    </tbody>
  </v-table>
</template>

<style></style>
