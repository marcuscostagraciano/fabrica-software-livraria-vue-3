<script setup>
import { ref, reactive, onMounted } from "vue";
import LivrosApi from "@/api/livros";
const livrosApi = new LivrosApi();

const defaultLivro = { id: null, titulo: "", preco: "" };
const livros = ref([]);
const livro = reactive({ ...defaultLivro });

import CategoriasApi from "@/api/categorias";
const categoriasApi = new CategoriasApi();

const defaultCategoria = { id: null, descricao: "" };
const categorias = ref([]);
const categoria = reactive({ ...defaultCategoria });

onMounted(async () => {
    livros.value = await livrosApi.buscarTodosOsLivros();
    categorias.value = await categoriasApi.buscarTodasAsCategorias();
});

function limpar() {
    Object.assign(livro, { ...defaultLivro });
}

async function salvar() {
    if (livro.id) {
        await livrosApi.atualizarLivro(livro);
    } else {
        await livrosApi.adicionarLivro(livro);
    }
    livros.value = await livrosApi.buscarTodosOsLivros();
    limpar();
}

function editar(livro_para_editar) {
    Object.assign(livro, livro_para_editar);
}

async function excluir(id) {
    await livrosApi.excluirLivro(id);
    livros.value = await livrosApi.buscarTodosOsLivros();
    limpar();
}

</script>

<template>
    <h1>Livro</h1>
    <hr />
    <div class="form">
        <input type="text" v-model="livro.titulo" placeholder="Titulo" />
        <input type="text" v-model="livro.isbn" placeholder="ISBN" />
        <input type="text" v-model="livro.preco" placeholder="Preço" />

        <!-- <select name="categorias" id="categorias">
            <option v-for="categoria in categorias" :value="categoria.id">{{ categoria.descricao }}</option>
        </select> -->

        <button @click="salvar">Salvar</button>
        <button @click="limpar">Limpar</button>
    </div>
    <hr />
    <ul>
        <li v-for="livro in livros" :key="livro.id">
            <span @click="editar(livro)">
                ({{ livro.id }}) - {{ livro.titulo }} - {{ livro.preco }}
            </span>
            <button @click="excluir(livro.id)">X</button>
        </li>
    </ul>
</template>

<style></style>
