<template>
    <section id="details">
        <Header :page-name="pageName"></Header>
        <Content v-if="details !== null" :header="capitalize(details.name)">
            <div class="row mx-0">
                <img :src="details.sprites.front_default">
            </div>
            <h5 class="mt-3">Pokémon Number</h5>
            <div class="row mx-0"><strong>{{details.id}}</strong></div>
            <h5 v-if="details.types.length > 1" class="mt-3">Types</h5>
            <h5 v-else class="mt-3">Type</h5>
            <div v-for="type in details.types" :key="type.type.name" class="row mx-0"><strong>{{capitalize(type.type.name)}}</strong></div>
            <h5 class="mt-3">Stats</h5>
            <div v-for="stat in details.stats" :key="stat.stat.name" class="row mx-0">
                <div class="col-12 col-md-6 px-0"><strong>{{stat.stat.name.toUpperCase()}}</strong></div>
                <div class="col-12 col-md-6 px-0">{{stat.base_stat}}</div>
            </div>
            <div class="row mx-0 mt-3">
                <router-link :to="{name: 'List'}" class="text-center">Return to List</router-link>
            </div>
        </Content>
    </section>
</template>

<script>
    import Header from '../entities/Header.vue';
    import Content from '../entities/Content.vue';

    export default {
        name: "Details",

        components: {
            Header,
            Content
        },

        data: function() {
            return {
                pageName: "DETAILS",
                api: "pokemon/",
                details: null
            }
        },

        methods: {
            showDetails: function(id) {
                this.$axios.get(this.api + id).then(function(response) {
                    this.details = response.data;
                }.bind(this));
            },

            capitalize: function(name) {
                return name.charAt(0).toUpperCase() + name.slice(1);
            }
        },

        created: function() {
            this.showDetails(this.$route.params.id);
        }
    }
</script>

<style scoped>
    img {
        margin: 0 auto;
        width: 200px;
    }
</style>
