<template>
    <section id="list">
        <Header :page-name="pageName"></Header>
        <Content :header="listHeader">
            <div class="form-group">
                <label class="form-label" for="name">Filter By Name</label>
                <input type="text" id="name" name="api" class="form-control" v-model="name">
            </div>
            <table cellpadding="0" cellspacing="0">
                <thead>
                    <tr role="row">
                        <th role="columnheader"><span aria-label="Number">#</span></th>
                        <th role="columnheader">NAME</th>
                        <th role="columnheader">VIEW DETAILS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr role="row" v-for="pokemon in filteredList" :key="pokemon.name">
                        <td role="cell">{{getPokemonId(pokemon.url)}}</td>
                        <td role="cell">{{capitalize(pokemon.name)}}</td>
                        <td role="cell">
                            <router-link :to="{name: 'Details', params: {id: (getPokemonId(pokemon.url))}}">Details</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Content>
    </section>
</template>

<script>
    import Header from '../entities/Header.vue';
    import Content from '../entities/Content.vue';

    export default {
        name: "List",

        components: {
            Header,
            Content
        },

        data: function() {
            return {
                api: "pokemon",
                name: "",
                pageName: "LIST",
                listHeader: "Pokémon List",
                pokemonList: [],
                filteredList: [],
                isFiltered: false
            }
        },

        methods: {
            fetchList: function() {
                this.$axios.get(this.api).then(function(response) {
                    this.pokemonList = this.pokemonList.concat(response.data.results).slice();
                    this.api = response.data.next;
                }.bind(this));
            },

            capitalize: function(name) {
                return name.charAt(0).toUpperCase() + name.slice(1);
            },

            filter: function() {
                this.filteredList = this.pokemonList.filter(function(pokemon) {
                    return pokemon.name.indexOf(this.name) > -1;
                }.bind(this));
            },

            getPokemonId: function(url) {
                return url.split("/")[url.split("/").length-2];
            }
        },

        created: function() {
            this.fetchList();
        },

        computed: {
            isFoundInSearch: function() {
                return !this.searched || this.found && this.searched;
            }
        },

        watch: {
            api: function(val) {
                if (val !== null) {
                    this.$nextTick(function() {
                        this.fetchList();
                    }.bind(this));
                }
            },
            
            pokemonList: {
                deep: true,
                handler: function(val) {
                    if (this.isFiltered) {
                        this.filter();
                    }
                    else {
                        this.filteredList = this.pokemonList;
                    }
                }
            },

            name: function(val) {
                this.isFiltered = true;
                this.$nextTick(function() {
                    this.filter()
                }.bind(this));
            }
        }
    }
</script>

<style scoped>
    table {
        width: 100%;
    }

    tr {
        background: #f0f0f0;
        border-bottom: 2px solid white;
        display: table;
        table-layout: fixed;
        width: 100%;
    }

    thead tr {
        background: white;
        border-bottom: 2px solid gray
    }

    th {
        font-weight: normal;
    }

    tbody {
        display: block;
        max-height: 65vh;
        overflow: auto;
    }

    tbody::-webkit-scrollbar
    {
        width: 0px;
    }

    th, td {
        padding: .25rem .75rem;
    }
</style>
