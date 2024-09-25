"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
const pokeApi = 'https://pokeapi.co/api/v2/';
const fetchPokemon = (num, rival) => __awaiter(void 0, void 0, void 0, function* () {
    const res1 = yield fetch(`${pokeApi}pokemon/${num}`);
    const P1 = yield res1.json();
    const pokemon1 = { id: P1.id, name: P1.name, HP: P1.stats[0].base_stat, Attack: P1.stats[1].base_stat };
    const res2 = yield fetch(`${pokeApi}pokemon/${rival}`);
    const P2 = yield res2.json();
    const pokemon2 = { id: P2.id, name: P2.name, HP: P2.stats[0].base_stat, Attack: P2.stats[1].base_stat };
    let pokemon1Attack = pokemon2.HP - pokemon1.Attack;
    let pokemon2Attack = pokemon1.HP - pokemon2.Attack;
    if (pokemon1Attack >= 0 && pokemon2Attack >= 0) {
        pokemon1Attack -= pokemon1.Attack;
        pokemon2Attack -= pokemon2.Attack;
    }
    let result;
    if (pokemon1Attack <= 0 && pokemon2Attack <= 0) {
        result = '----- DRAW! -----';
    }
    else if (pokemon1Attack > pokemon2Attack) {
        result = `----- ${pokemon2.name} WINS! -----`.toUpperCase();
    }
    else {
        result = `----- ${pokemon1.name} WINS! -----`.toUpperCase();
    }
    return ({
        pokemon1: pokemon1,
        pokemon2: pokemon2,
        result: result
    });
});
// Middleware to parse JSON and URL-encoded data
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/battle/:string', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.string;
    const id_filter = id.split(',');
    const pokemon1st = parseInt(id_filter[0]);
    const pokemon2nd = parseInt(id_filter[1]);
    res.json(yield fetchPokemon(pokemon1st, pokemon2nd));
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
