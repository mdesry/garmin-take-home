<script setup>
import { inject, nextTick, onMounted, ref, watch } from 'vue';
import Header from '../entities/Header.vue';
import Content from '../entities/Content.vue';

const axios = inject('axios');
const capitalize = inject('capitalize');

const api = ref('pokemon');
const name = ref('');
const pageName = ref('LIST');
const listHeader = ref('Pokémon List')
const pokemonList = ref([]);
const filteredList = ref([]);
const isFiltered = ref(false);

const fetchList = async () => {
    const { data } = await axios.get(api.value);
    pokemonList.value = pokemonList.value.concat(data.results).slice();
    api.value = data.next;
};

const filter = () => {
    this.filteredList.value = pokemonList.value.filter((pokemon) => pokemon.name.contains(name.value));
}

const getPokemonId = (url) => url.split('/')[url.split('/').length - 2];

watch(api, (val) => {
    if (val !== null) {
        nextTick(fetchList);
    }
});

watch(pokemonList, () => {
    if (isFiltered.value) {
        filter();
    } else {
        filteredList.value = pokemonList.value;
    }
});

watch(name, () => {
    isFiltered.value = true;
    nextTick(filter);
});

onMounted(() => {
    fetchList();
});
</script>

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
            <th role="columnheader">Name</th>
            <th role="columnheader">View Details</th>
          </tr>
        </thead>
        <tbody>
            <tr role="row" v-for="pokemon in filteredList" :key="pokemon.name">
              <td role="cell">{{ getPokemonId(pokemon.url) }}</td>
              <td role="cell">{{ capitalize(pokemon.name) }}</td>
              <td role="cell">
                <router-link :to="{ name: 'Details', params: { id: getPokemonId(pokemon.url) }}">Details</router-link>
              </td>
            </tr>
        </tbody>
      </table>
    </Content>
  </section>
</template>

<style lang="scss" scoped>
table {
  width: 100%;

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

    th {
      font-weight: normal;
      text-transform: uppercase;
    }
  }

  tbody {
    display: block;
    max-height: 65vh;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0px;
    }
  }

  th, td {
      padding: .25rem .75rem;
  }
}
</style>
