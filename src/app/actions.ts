// for list of Pokemons
export async function fetchPokemon() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=27&offset=0"
  );
  const data = await res.json();
  const pokemonList = data.results;

  const detailedPokemonList = await Promise.all(
    pokemonList.map(async (pokemon: { name: string; url: string }) => {
      const res = await fetch(pokemon.url);
      const details = await res.json();
      return {
        name: details.name,
        types: details.types.map((typeInfo: any) => typeInfo.type.name),
        stats: details.stats.map((statInfo: any) => ({
          name: statInfo.stat.name,
          value: statInfo.base_stat,
        })),
        abilities: details.abilities.map(
          (abilityInfo: any) => abilityInfo.ability.name
        ),
        moves: details.moves.map((moveInfo: any) => moveInfo.move.name),
        imageUrl: details.sprites.other["official-artwork"].front_default,
      };
    })
  );

  return detailedPokemonList;
}

// for type of Pokemons
export async function fetchPokemonTypes() {
  const res = await fetch("https://pokeapi.co/api/v2/type");
  const data = await res.json();
  return data.results;
}

