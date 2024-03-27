<script setup>
import { ref, reactive, onMounted } from "vue";

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
  <ul>
    <li v-for="editora in editoras" :key="editora.id">
      <span @click="editar(editora)">
        ({{ editora.id }}) - {{ editora.nome }} - {{ editora.site }} -
      </span>
      <button @click="excluir(editora.id)">X</button>
    </li>
  </ul>
</template>

<style></style>
