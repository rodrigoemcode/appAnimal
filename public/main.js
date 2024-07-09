async function carregarAnimais() {
    const response = await axios.get('http://localhost:8000/animais');
    const animais = response.data;
    const lista = document.getElementById('lista-animais')

    lista.innerHTML = '';

    animais.forEach(animal => {
        const item = document.createElement('li');
        const linha = `${animal.nome} - ${animal.cor} - ${animal.sexo} - ${animal.idade}`;
        item.innerText = linha; 
        lista.appendChild(item);
    });
}

function manipularFormulario() {
    const form_animal = document.getElementById('form-animal');
    const input_nome = document.getElementById('nome');

    form_animal.onsubmit = async (event) => {
        event.preventDefault();
        const nome_animal = input_nome.value;
        
        await axios.post('http://localhost:8000/animais', { // Corrigido 'animaiss' para 'animais'
            nome: nome_animal,
            idade: 4,
            sexo: 'M',
            cor: 'Cinza'
        });

        alert(`Animal adicionado com sucesso! ${nome_animal}`);
        carregarAnimais(); // Atualiza a lista de animais
    }
}

function app() {
    console.log('App iniciada');
    carregarAnimais();
    manipularFormulario();
}

document.addEventListener('DOMContentLoaded', app);
