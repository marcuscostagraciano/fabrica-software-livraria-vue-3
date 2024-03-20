<script setup>
import { ref, reactive, onMounted } from "vue";
import LivrosApi from "@/api/livros";
const livrosApi = new LivrosApi();

const defaultLivro = {
    id: null, titulo: "", isbn: "", quantidade: null,
    preco: "", categoria: null, editora: null, autores: null
};
const livros = ref([]);
const livro = reactive({ ...defaultLivro });

// import CategoriasApi from "@/api/categorias";
// const categoriasApi = new CategoriasApi();

// const defaultCategoria = { id: null, descricao: "" };
// const categorias = ref([]);
// const categoria = reactive({ ...defaultCategoria });

// import AutoresApi from "@/api/autores";
// const autoresApi = new AutoresApi();

// const defaultAutor = { id: null, nome: "", email: "" };
// const autores = ref([]);
// const autor = reactive({ ...defaultAutor });

// import EditorasApi from "@/api/editoras";
// const editorasApi = new EditorasApi();

// const defaultEditora = { id: null, nome: "", site: "" };
// const editoras = ref([]);
// const editora = reactive({ ...defaultEditora });

onMounted(async () => {
    // autores.value = await autoresApi.buscarTodosOsAutores();
    // categorias.value = await categoriasApi.buscarTodasAsCategorias();
    // editoras.value = await editorasApi.buscarTodasAsEditoras();
    livros.value = await livrosApi.buscarTodosOsLivros();
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
        <!-- <input type="text" v-model="livro.isbn" placeholder="ISBN" /> -->
        <!-- <input type="text" v-model="livro.quantidade" placeholder="Quantidade" /> -->
        <input type="text" v-model="livro.preco" placeholder="Preço" />

        <!-- <select name="categorias" id="categorias">
            <option v-for="categoria in categorias" :value="categoria.id">{{ categoria.descricao }}</option>
        </select>
        <select name="editoras" id="editoras">
            <option v-for="editora in editoras" :value="editora.id">{{ editora.nome }}</option>
        </select>
        <select name="autores" id="autores">
            <option v-for="autor in autores" :value="autor.id">{{ autor.nome }}</option>
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
