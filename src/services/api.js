export default class APIPokemons {
    static getList (params){
        return `https://api.vandvietnam.com/api/pokemon-api/pokemons${params}`
    }

    static getDetail(id) {
        return `https://api.vandvietnam.com/api/pokemon-api/pokemons/${id}`;
    }

    static downloadById(id) {
        return `https://api.vandvietnam.com/api/pokemon-api/pokemons/${id}/sprite`;
    }

    static getListType(){
        return `https://api.vandvietnam.com/api/pokemon-api/types`
    }
}