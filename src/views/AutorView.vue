<script setup>
import { ref, reactive, onMounted } from "vue";

import TableHeaderList from "@/components/TableHeaderList.vue"

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

const theader_text = [
    "nome", "email"
]

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
    <v-table density="comfortable">
        <TableHeaderList :th_text="theader_text" />
        <tbody>
            <tr v-for="autor in autores" :key="autor.nome" @click="editar(autor)">
                <td>{{ autor.id }}</td>
                <td>{{ autor.nome }}</td>
                <td v-if="autor.email">{{ autor.email }}</td>
                <td v-else> - - - </td>
                <td><button @click="excluir(autor.id)" class="excluir">X</button></td>
            </tr>
        </tbody>
    </v-table>

</template>

<style></style>
