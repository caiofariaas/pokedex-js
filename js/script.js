// Declaração e seleção das classes no HTML

const pokeName = document.querySelector('.pokemon__name');
const pokeNumber = document.querySelector('.pokemon__number');
const pokeImg = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

// Seleção de pokemon inicial

let searchPoke = 1;

// Aqui armazenamos o retorno completo da API
// Usamos async para declaram a função como assíncrona
// Dentro de uma função async, você pode usar a palavra-chave await para pausar a execução da função até que a promessa seja resolvida ou rejeitada.

const fetchPokemon = async (pokemon) =>{
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(APIresponse.status == 200){
        const data =  await APIresponse.json();
        return data
    }
}

// Função para renderizar o pokemon na tela

const renderPokemon = async (pokemon) =>{

// Declaramos antes para a função não ficar em vazio enquanto o pokemon não é carregado

    pokeName.innerHTML = "Loading...";
    pokeNumber.innerHTML = '';

// usamos o await aqui para esperar que todas as informações da func fetchPoke

    const data = await fetchPokemon(pokemon);

// Aqui é um if que verifica se existe algo na variável data, caso não exista ele entra no else e printa 'none'

    if(data){

// Carrega os itens do pokemon na tela

        pokeImg.style.display = 'block';
        pokeName.innerHTML = data.name;
        pokeNumber.innerHTML = data.id;

// Caminho dos Gifs no retorno da API

        pokeImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

// Para após pesquisar o input ser limpo

        input.value = ''
        searchPoke = data.id;
    }
    else{
        pokeImg.style.display = 'none';
        pokeName.innerHTML = 'Not found :(';
        pokeNumber.innerHTML = '';
        input.value = ''
    }
}

// aqui colocamos um EventListener para o 'submit' do form
// que chama a func renderPokemon()

form.addEventListener('submit', (event) =>{
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

// btnPrev chama a função renderPokemon e volta ao pokemon anterior

btnPrev.addEventListener('click', () =>{
    if (searchPoke > 1){
        searchPoke -= 1;
        renderPokemon(searchPoke);
    }
});

// btnNext chama a função renderPokemon e volta ao pokemon anterior

btnNext.addEventListener('click', () =>{
    searchPoke += 1;
    renderPokemon(searchPoke);
});



renderPokemon(searchPoke);