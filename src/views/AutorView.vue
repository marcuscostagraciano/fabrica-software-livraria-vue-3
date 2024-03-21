<script setup>
import { ref, reactive, onMounted } from "vue";
import AutoresApi from "@/api/autores";
const autoresApi = new AutoresApi();

const defaultAutor = { id: null, nome: "", email: "" };
const autores = ref([]);
const autor = reactive({ ...defaultAutor });

onMounted(async () => {
    autores.value = await autoresApi.buscarTodosOsAutores();
});

function limpar() {
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
    <v-form>
        <v-text-field v-model="autor.nome" name="name" label="Nome"></v-text-field>
        <v-text-field v-model="autor.email" name="name" label="Email"></v-text-field>

        <v-btn @click="salvar" class="bg-surface-variant">Salvar</v-btn>
        <v-btn @click="limpar" class="bg-surface-variant">Limpar</v-btn>
    </v-form>
    <hr />

    <!-- <v-list density="compact" lines="one">
        <v-list-item v-for="autor in autores" :key="autor.id" :title="autor.email" :subtitle="autor.nome"
            @click="editar(autor)"><v-btn color="error" @click="excluir(autor.id)">Excluir</v-btn></v-list-item>
    </v-list> -->

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
