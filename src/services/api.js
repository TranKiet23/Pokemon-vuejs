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
    static getFieldsList() {
        return [
            {
                title: 'Number',
                dataIndex: 'number',
                key: 'number',
                width: 50,
                resizable: true,
                sorter: (a, b) => a.number - b.number,
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Hp',
                dataIndex: 'hp',
                key: 'hp',
            },
            {
                title: 'Attack',
                dataIndex: 'attack',
                key: 'attack',
            },
            {
                title: 'Defense',
                dataIndex: 'defense',
                key: 'defense',
            },
        ]
    }
}