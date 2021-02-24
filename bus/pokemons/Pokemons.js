import { usePokemons } from './hooks/usePokemons';

const Pokemons = () => {
    const { pokemons } = usePokemons();
    
    const pokemonsList = pokemons && pokemons.map(({name}, index) => (
        <p key = { index }>{ name }</p>
    ));
    
    return (
        <section>
            <h2>Pokemons</h2>
            {pokemonsList}
        </section>
    )
}

export default Pokemons
