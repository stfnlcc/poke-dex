async function obtenerYMostrarPokemon() {
    try {
        const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        if (!respuesta.ok) throw new Error(`Error al obtener datos. Código de estado: ${respuesta.status}`);

        const datos = await respuesta.json();
        const detallesPokemon = await Promise.all(datos.results.map(pokemon => fetch(pokemon.url).then(res => res.json())));

        const pokedexElement = document.getElementById('pokedex');
 
        detallesPokemon.forEach(pokemon => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.innerHTML = `
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="card-image">
                <p class="card-title">Nombre: ${pokemon.name}</p>
                <p class="card-subtitle">Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
                <p class="card-subtitle">ID: ${pokemon.id}</p>
            `;
            pokedexElement.appendChild(cardDiv);
        });

        return detallesPokemon;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
} 

obtenerYMostrarPokemon().then(result => {
    console.log(result);
}).catch(error => {
    console.error(error);
});
