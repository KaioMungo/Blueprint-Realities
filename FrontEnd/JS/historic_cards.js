async function getCards() {
    const URL = 'http://localhost:5000/cards'
    const cardsContainer = document.getElementById('cards_grid_container')

    let api = await fetch(URL, {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
        }
    })

    if(api.ok) {
        const response = await api.json()

        cardsContainer.innerHTML = ''

        if (response.length === 0) {
            cardsContainer.innerHTML = '<h1>Sem cards salvos :(</h1>'
        }

        response.forEach(card => {
            cardsContainer.innerHTML += `
                <div class="default_card">
                    <h3 class="card_title">Informações (ID: ${card.id})</h3>
                    <div class="card_body">
                        <p class="summary">Orçamento: ${card.budget}</p>
                        <p class="summary">Paleta de cor: ${card.color_palette}</p>
                        <p class="summary">Metragem: ${card.footage}m²</p>
                        <p class="summary">Estilo: ${card.style}</p>
                    </div>
                    <p class="data_info">Criado em: 13/10/2025</p>
                    <div class="card_actions">
                        <a href="../HTML/prompt.html" class="btn btn_edit">Editar</a>
                        <a href="#" class="btn btn_delete">Excluir</a>
                    </div>
                </div>
            `
        });
        return
    }

    alert('Erro ao listar os cards')
}

getCards()