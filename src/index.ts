import express from 'express';

const app = express();
const PORT = 3000;
const pokeApi = 'https://pokeapi.co/api/v2/';

interface Pokemon {
    id: number;
    name: string;
    HP: number;
    Attack: number;
}
const fetchPokemon = async (num: number, rival: number) => {
    const res1 = await fetch(`${pokeApi}pokemon/${num}`);
    const P1 = await res1.json();
    const pokemon1: Pokemon = { id: P1.id, name: P1.name, HP: P1.stats[0].base_stat, Attack: P1.stats[1].base_stat };

    const res2 = await fetch(`${pokeApi}pokemon/${rival}`);
    const P2 = await res2.json();
    const pokemon2: Pokemon = { id: P2.id, name: P2.name, HP: P2.stats[0].base_stat, Attack: P2.stats[1].base_stat };

    let pokemon1Attack = pokemon2.HP - pokemon1.Attack;    
    let pokemon2Attack = pokemon1.HP - pokemon2.Attack;

    if (pokemon1Attack >= 0 && pokemon2Attack >= 0) {
        pokemon1Attack -= pokemon1.Attack;
        pokemon2Attack -= pokemon2.Attack;
    }

    let result;

    if (pokemon1Attack <= 0 && pokemon2Attack <= 0) {
        result = '----- DRAW! -----';
    } else if (pokemon1Attack > pokemon2Attack) {
        result = `----- ${pokemon2.name} WINS! -----`.toUpperCase();
    } else {
        result = `----- ${pokemon1.name} WINS! -----`.toUpperCase();
    }

    return({
        pokemon1: pokemon1,
        pokemon2: pokemon2,
        result: result
    })

};
// Middleware to parse JSON and URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/battle/:string', async (req, res) => {
    const id = req.params.string;
    const id_filter = id.split(',');
    const pokemon1st = parseInt(id_filter[0]);
    const pokemon2nd = parseInt(id_filter[1]);
    res.json(await fetchPokemon(pokemon1st, pokemon2nd));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});