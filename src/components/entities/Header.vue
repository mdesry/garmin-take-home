<template>
    <header>
        <h3 class="font-italic bold"><strong>{{pageName}}</strong></h3>
    </header>
</template>

<script>
    export default {
        name: "Header",

        props: {
            pageName: String
        }
    }
</script>

<style scoped>
    header {
        padding: 1rem 3rem;
        border-bottom: 2px solid gray;
        margin-bottom: 2rem;
    }

    h3 {
        color: #2980b9;
    }
</style>