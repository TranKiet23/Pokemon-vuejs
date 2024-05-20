<script>
import Pokemons from './components/PokemonList.vue'
import Loading from './components/Loading.vue'
export default {
  name: 'App',
  components: { Loading, Pokemons },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    functionLoad(val) {
      this.loading = val
    },
  }
}
</script>

<template>
  <div>
    <Loading v-if="loading"></Loading>
    <Pokemons @load-data="functionLoad"></Pokemons>
  </div>
</template>

<style lang="scss"></style>
