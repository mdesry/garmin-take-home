<template>
    <div class="content">
        <h4 class="text-center">{{header}}</h4>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Content",

        props: {
            header: String
        }
    }
</script>

<style scoped>
    .content {
        max-width: 768px;
        margin: 0 auto;
        padding: 1rem;
        border: 1px solid #333333;
        border-radius: 1rem;
    }

    h4 {
        color: #2980b9;
    }
</style>