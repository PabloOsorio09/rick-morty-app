document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('character-gallery');
    const loadingMessage = document.getElementById('loading-message');
    const nameFilter = document.getElementById('name-filter');
    const statusFilter = document.getElementById('status-filter');
    const totalLikesCount = document.getElementById('total-likes-count');
    const totalDislikesCount = document.getElementById('total-dislikes-count');

    const apiBaseUrl = 'https://rickandmortyapi.com/api/character';
    
    let allCharacters = []; 
    let characterVotes = {};

    function loadVotesFromLocalStorage() {
        const savedVotes = localStorage.getItem('rickMortyVotes');
        if (savedVotes) {
            characterVotes = JSON.parse(savedVotes);
        }
        updateTotalVotesDisplay();
    }

    function saveVotesToLocalStorage() {
        localStorage.setItem('rickMortyVotes', JSON.stringify(characterVotes));
    }

    /*Se cargan todas las páginas de la API.*/
    async function fetchCharacters() {
        try {
            // Se hace la primera petición para saber cuántas páginas hay en total
            loadingMessage.textContent = 'Contactando la API de Rick and Morty...';
            const initialResponse = await fetch(apiBaseUrl);
            if (!initialResponse.ok) throw new Error(`Error en la petición inicial: ${initialResponse.statusText}`);
            
            const initialData = await initialResponse.json();
            const totalPages = initialData.info.pages;
            
            // Guardo los resultados de la primera página
            allCharacters = initialData.results;

            // Se crea un array de promesas para pedir el resto de las páginas
            // Se empieza desde la página 2 porque ya tenemos la 1
            const pagePromises = [];
            for (let i = 2; i <= totalPages; i++) {
                // Actualizo el mensaje de carga para ver el progreso
                loadingMessage.textContent = `Cargando personajes... Página ${i} de ${totalPages}`;
                pagePromises.push(fetch(`${apiBaseUrl}?page=${i}`).then(res => res.json()));
            }

            // Uso Promise.all para ejecutar todas las peticiones en paralelo.
            // Esto es mas rapido que pedirlas una por una esperando a que la anterior termine.
            const additionalPagesData = await Promise.all(pagePromises);

            // Se une los resultados de todas las páginas en nuestro array principal.
            additionalPagesData.forEach(pageData => {
                // .concat() sirve para unir dos arrays.
                allCharacters = allCharacters.concat(pageData.results);
            });
            
            loadingMessage.style.display = 'none'; // Oculto el mensaje de carga final.
            applyFiltersAndRender(); // Se renderiza todo.

        } catch (error) {
            console.error('Hubo un problema al obtener todos los personajes:', error);
            gallery.innerHTML = '<p>No se pudieron cargar los personajes. Recargue la página.</p>';
        }
    }


    function applyFiltersAndRender() {
        const nameQuery = nameFilter.value.toLowerCase();
        const statusQuery = statusFilter.value;

        const filteredCharacters = allCharacters.filter(character => {
            const nameMatch = character.name.toLowerCase().includes(nameQuery);
            const speciesMatch = character.species.toLowerCase().includes(nameQuery);
            const statusMatch = statusQuery ? character.status === statusQuery : true;
            return (nameMatch || speciesMatch) && statusMatch;
        });
        displayCharacters(filteredCharacters);
    }
    
    function displayCharacters(characters) {
        gallery.innerHTML = '';
        if (characters.length === 0) {
            gallery.innerHTML = '<p>No se encontraron personajes con esos criterios.</p>';
            return;
        }
        characters.forEach(character => {
            const votes = characterVotes[character.id] || { likes: 0, dislikes: 0 };
            const score = votes.likes - votes.dislikes;
            const card = document.createElement('div');
            card.classList.add('character-card');
            card.innerHTML = `
                <img src="${character.image}" alt="Imagen de ${character.name}">
                <div class="character-info">
                    <h2>${character.name}</h2>
                    <div class="status">
                        <span class="status-icon ${character.status}"></span>
                        <p>${character.status} - ${character.species}</p>
                    </div>
                </div>
                <div class="vote-section">
                    <div class="buttons">
                        <button class="vote-btn like-btn" data-id="${character.id}">Like (${votes.likes})</button>
                        <button class="vote-btn dislike-btn" data-id="${character.id}">Dislike (${votes.dislikes})</button>
                    </div>
                    <p class="score" id="score-${character.id}">Puntaje: ${score}</p>
                </div>
            `;
            gallery.appendChild(card);
        });
    }

    function updateCard(characterId) {
        const votes = characterVotes[characterId];
        const score = votes.likes - votes.dislikes;
        const scoreElement = document.getElementById(`score-${characterId}`);
        if (scoreElement) {
            scoreElement.textContent = `Puntaje: ${score}`;
            scoreElement.classList.add('score-updated');
            setTimeout(() => { scoreElement.classList.remove('score-updated'); }, 500);
        }
        const likeButton = gallery.querySelector(`.like-btn[data-id='${characterId}']`);
        const dislikeButton = gallery.querySelector(`.dislike-btn[data-id='${characterId}']`);
        if (likeButton) likeButton.textContent = `Like (${votes.likes})`;
        if (dislikeButton) dislikeButton.textContent = `Dislike (${votes.dislikes})`;
    }
    
    function updateTotalVotesDisplay() {
        let totalLikes = 0;
        let totalDislikes = 0;
        Object.values(characterVotes).forEach(vote => {
            totalLikes += vote.likes;
            totalDislikes += vote.dislikes;
        });
        totalLikesCount.textContent = totalLikes;
        totalDislikesCount.textContent = totalDislikes;
    }

    gallery.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('vote-btn')) {
            const characterId = target.dataset.id;
            if (!characterVotes[characterId]) {
                characterVotes[characterId] = { likes: 0, dislikes: 0 };
            }
            if (target.classList.contains('like-btn')) {
                characterVotes[characterId].likes++;
            } else if (target.classList.contains('dislike-btn')) {
                characterVotes[characterId].dislikes++;
            }
            updateCard(characterId);
            updateTotalVotesDisplay();
            saveVotesToLocalStorage();
        }
    });

    nameFilter.addEventListener('input', applyFiltersAndRender);
    statusFilter.addEventListener('change', applyFiltersAndRender);

    loadVotesFromLocalStorage();
    fetchCharacters();
});