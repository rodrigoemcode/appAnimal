async function carregarAnimais() {
    try {
        const response = await axios.get('http://localhost:8000/animais');
        const animais = response.data;
        const lista = document.getElementById('lista-animais');

        lista.innerHTML = '';

        animais.forEach(animal => {
            const item = document.createElement('li');
            item.className = 'list-group-item d-flex justify-content-between align-items-center';
            const linha = `${animal.nome} - ${animal.cor} - ${animal.sexo} - ${animal.idade}`;
            item.innerText = linha;

            const btnExcluir = document.createElement('button');
            btnExcluir.className = 'btn btn-danger btn-sm ms-2';
            btnExcluir.innerText = 'Excluir';
            btnExcluir.onclick = async () => {
                await axios.delete(`http://localhost:8000/animais/${animal.id}`);
                carregarAnimais();
            };

            item.appendChild(btnExcluir);
            lista.appendChild(item);
        });
    } catch (error) {
        console.error("Erro ao carregar animais:", error);
    }
}

function manipularFormulario() {
    const form_animal = document.getElementById('form-animal');
    const input_nome = document.getElementById('nome');

    form_animal.onsubmit = async (event) => {
        event.preventDefault();
        const nome_animal = input_nome.value;
        
        try {
            await axios.post('http://localhost:8000/animais', {
                nome: nome_animal,
                idade: 4,
                sexo: 'M',
                cor: 'Cinza'
            });

            alert(`Animal adicionado com sucesso! ${nome_animal}`);
            carregarAnimais();
            input_nome.value = ''; // Limpa o campo de entrada
        } catch (error) {
            console.error("Erro ao adicionar animal:", error);
        }
    }
}

function app() {
    console.log('App iniciada');
    carregarAnimais();
    manipularFormulario();
}

document.addEventListener('DOMContentLoaded', app);
