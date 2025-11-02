const url = 'http://localhost:5000/gallery'

async function getImages() {
    const imagesContainer = document.getElementById('cards_grid_container')

    let api = await fetch(url, {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
        }
    })

    if(api.ok) {
        const response = await api.json()

        imagesContainer.innerHTML = ''

        if (response.length === 0) {
            imagesContainer.innerHTML = '<h1>Sem imagens salvas :(</h1>'
        }

        response.forEach(img => {
            imagesContainer.innerHTML += `
                <div class="image_IA"><img src="${img.image}" alt="Imagem"></div>
            `
        });
        return
    }

    alert('Erro ao mostrar as imagens')
}

getImages()