<script setup>
const props = defineProps(["th_text"])
</script>

<template>
    <thead>
        <tr>
            <th>
                Código
            </th>
            <th v-for="text in props.th_text">
                {{ text }}
            </th>
            <th>
                Excluir
            </th>
        </tr>
    </thead>
</template>

<style scoped>
th {
    text-align: center !important;
    text-transform: uppercase;
}
</style>
