<script setup>
import { ref, reactive, onMounted } from "vue";

import AutoresApi from "@/api/autores";


const autoresApi = new AutoresApi();
const defaultAutor = { id: null, nome: "", email: "" };
const autores = ref([]);
const autor = reactive({ ...defaultAutor });

const isEditando = ref(false)

onMounted(async () => {
    autores.value = await autoresApi.buscarTodosOsAutores();
});

function limpar() {
    isEditando.value = false
    Object.assign(autor, { ...defaultAutor });
}

async function salvar() {
    if (autor.id) {
        await autoresApi.atualizarAutor(autor);
    } else {
        await autoresApi.adicionarAutor(autor);
    }
    autores.value = await autoresApi.buscarTodosOsAutores();
    limpar();
}

function editar(autor_para_editar) {
    isEditando.value = true
    Object.assign(autor, autor_para_editar);
}

async function excluir(id) {
    await autoresApi.excluirAutor(id);
    autores.value = await autoresApi.buscarTodosOsAutores();
    limpar();
}

</script>

<template>
    <h1>Autor</h1>
    <hr />
    <v-form class="mx-6">
        <v-text-field v-model="autor.nome" name="name" label="Nome"></v-text-field>
        <v-text-field v-model="autor.email" name="name" label="Email"></v-text-field>

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
        <li v-for="autor in autores" :key="autor.id">
            <span @click="editar(autor)">
                ({{ autor.id }}) - {{ autor.nome }} - {{ autor.email }} -
            </span>
            <button @click="excluir(autor.id)">X</button>
        </li>
    </ul>
</template>

<style></style>
