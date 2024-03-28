<script setup>
import { ref, reactive, onMounted } from "vue";

import TableHeaderList from "@/components/TableHeaderList.vue"

import AutoresApi from "@/api/autores";
import CategoriasApi from "@/api/categorias";
import EditorasApi from "@/api/editoras";
import LivrosApi from "@/api/livros";

const autoresApi = new AutoresApi();
const categoriasApi = new CategoriasApi();
const editorasApi = new EditorasApi();
const livrosApi = new LivrosApi();

const defaultLivro = {
    id: null, titulo: "", isbn: "", quantidade: null,
    preco: "", categoria: null, editora: null, autores: null
};
const livro = reactive({ ...defaultLivro });

const autores = ref([]);
const categorias = ref([]);
const editoras = ref([]);
const livros = ref([]);

const isEditando = ref(false)

onMounted(async () => {
    autores.value = await autoresApi.buscarTodosOsAutores();
    categorias.value = await categoriasApi.buscarTodasAsCategorias();
    editoras.value = await editorasApi.buscarTodasAsEditoras();
    livros.value = await livrosApi.buscarTodosOsLivros();
});

function limpar() {
    isEditando.value = false
    Object.assign(livro, { ...defaultLivro });
}

async function salvar() {
    console.log(livro);
    if (livro.id) {
        await livrosApi.atualizarLivro(livro);
    } else {
        await livrosApi.adicionarLivro(livro);
    }
    livros.value = await livrosApi.buscarTodosOsLivros();
    limpar();
}

function editar(livro_para_editar) {
    isEditando.value = true
    Object.assign(livro, livro_para_editar);
}

async function excluir(id) {
    await livrosApi.excluirLivro(id);
    livros.value = await livrosApi.buscarTodosOsLivros();
    limpar();
}

async function detalhes_livro(id) {
    const detalhes = await livrosApi.getLivro(id);
    console.log(detalhes)
}

const theader_text = [
    "titulo", "preço"
]

</script>

<template>
    <h1>Livro</h1>
    <hr />
    <v-form class="mx-6">
        <v-text-field v-model="livro.titulo" name="titulo" label="Titulo"></v-text-field>
        <v-text-field v-model="livro.isbn" name="isbn" label="ISBN"></v-text-field>
        <v-text-field v-model="livro.quantidade" name="quantidade" label="Quantidade" type="number"></v-text-field>
        <v-text-field v-model="livro.preco" name="preco" label="Preço"></v-text-field>

        <v-select :items="categorias" item-title="descricao" item-value="id" v-model="livro.categoria"
            label="Categoria"></v-select>
        <v-select :items="editoras" item-title="nome" item-value="id" v-model="livro.editora"
            label="Editora"></v-select>
        <v-select :items="autores" item-title="nome" item-value="id" v-model="livro.autor" label="Autor" multiple
            clearable></v-select>

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
            <tr v-for="livro in livros" :key="livro.nome" @click="editar(livro)">
                <td>{{ livro.id }}</td>
                <td>{{ livro.titulo }}</td>
                <td v-if="livro.preco">R$ {{ livro.preco }}</td>
                <td v-else> - - - </td>
                <td><button @click="excluir(livro.id)" class="excluir">X</button></td>
            </tr>
        </tbody>
    </v-table>
</template>

<style scoped></style>
