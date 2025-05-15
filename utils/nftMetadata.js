const IPFS_BASE_URL = "https://ipfs.io/ipfs/";

exports.generatePokemonMetadata = (pokemonData) => {
  return {
    name: pokemonData.name,
    description: A ${pokemonData.type} type Pokémon,
    image: ${IPFS_BASE_URL}${pokemonData.imageCID},
    attributes: [
      {
        trait_type: "Level",
        value: pokemonData.level
      },
      {
        trait_type: "Type",
        value: pokemonData.type
      }
    ]
  };
};