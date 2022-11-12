const pokemonList = document.getElementById('pokemonList')
const loadMorebutton = document.getElementById('loadMorebutton')

const maxRecords = 649
const limit = 6;
let offset = 0;

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => `
      <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
  
        <div class="detail">
          <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
          </ol>
  
          <img src="${pokemon.photo}"
            alt="${pokemon.name}">
  
        </div>
      </li>
    `).join(' ')

    pokemonList.innerHTML += newHtml
  })
}

loadPokemonItems(offset, limit)

loadMorebutton.addEventListener('click', () => {
  offset += limit
  const qtRecordMaxWithPage = offset + limit

  if (qtRecordMaxWithPage >= maxRecords) {
    const newLimit = maxRecords - offset   
    loadPokemonItems(offset, newLimit)

    loadMorebutton.parentElement.removeChild(loadMorebutton)
  } else {
    loadPokemonItems(offset, limit)
  }  
})