const form = document.getElementById('form-atividade');
const tabelaAtividades = document.getElementById('tabela-atividades');
const imgAprovado = '🎉'; // Emoji festejando para notas altas
const imgReprovado = '😞'; // Emoji decepcionado para notas baixas
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = 7; // Nota mínima fixa de 7 para aprovação
const btnInteragir = document.getElementById('btn-interagir'); // Botão para interagir com emojis

let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault();
    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));

        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td class="emoji">${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += '</tr>';

        linhas += linha;
    }

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaTabela() {
    tabelaAtividades.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('resultado-aprovacao').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
    let somaDasNotas = 0;
    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }
    return somaDasNotas / notas.length;
}

// Função para mudar a cor dos emojis ao clicar no botão
btnInteragir.addEventListener('click', function() {
    const emojis = document.querySelectorAll('.emoji');
    emojis.forEach(emoji => {
        const nota = parseFloat(emoji.previousElementSibling.textContent);
        if (nota >= notaMinima) {
            emoji.style.color = 'green'; // Verde para aprovado
        } else {
            emoji.style.color = 'red'; // Vermelho para reprovado
        }
    });
});
