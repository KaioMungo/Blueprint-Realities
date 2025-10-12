const fileInput = document.getElementById('file');
const fileNameDisplay = document.getElementById('file_name');

fileInput.addEventListener('change', () => {
    const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'Nenhum arquivo selecionado';
    fileNameDisplay.textContent = fileName;
});

const form = document.getElementById('formulario');
form.addEventListener('submit', uploadFile);

async function uploadFile(event) {
    event.preventDefault();

    const orcamento = document.getElementById('orcamento').value;
    const metragem = document.getElementById('metragem').value;
    const paleta_cores = document.getElementById('paleta_cores').value;
    const estilo = document.getElementById('estilo').value;
    const file = fileInput.files[0];

    if (!orcamento || !metragem || !paleta_cores || !estilo || !file) {
        alert('Todos os campos devem ser preenchidos e uma imagem deve ser selecionada.');
        return;
    }

    const formData = new FormData();
    formData.append('orcamento', orcamento);
    formData.append('metragem', metragem);
    formData.append('paleta_cores', paleta_cores);
    formData.append('estilo', estilo);
    formData.append('img', file);

    // CORREÇÃO: Renomeado de 'URL' para 'apiURL' para não conflitar com o objeto global 'URL'
    const apiURL = 'http://localhost:5000/gerar-imagem';

    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert('Erro: ' + (errorData.error || 'Erro desconhecido'));
            return;
        }

        const blob = await response.blob();
        // CORREÇÃO: Chama o método createObjectURL no objeto global URL
        const imageUrl = URL.createObjectURL(blob); 

        // --- Início da Lógica de Exibição (Otimizada) ---
        
        // Remove a necessidade da lógica duplicada no final da função
        const container = document.getElementById('resultado_imagem');
        let imgResult = document.getElementById('imgResult');
        
        if (!imgResult) {
            imgResult = document.createElement('img');
            imgResult.id = 'imgResult';
            // Se você quer que a imagem apareça no container 'resultado_imagem'
            container.appendChild(imgResult);
        }

        imgResult.src = imageUrl;
        imgResult.alt = 'Imagem gerada';
        
        // --- Fim da Lógica de Exibição ---

    } catch (error) {
        alert('Erro na requisição: ' + error.message);
    }
}

async function saveInformations() {
    const budget = document.getElementById('orcamento').value
    const color_palette = document.getElementById('paleta_cores').value
    const footage = document.getElementById('metragem').value
    const style = document.getElementById('estilo').value

    const URL = 'http://localhost:5000/cards'

    let api = await fetch(URL, {
        method:'POST',
        body:JSON.stringify({
            "budget": budget,
            "color_palette": color_palette,
            "footage": footage,
            "style": style
        }),
        headers:{
            'Content-Type':'application/json',
        }
    })

    if(api.ok) {
        alert('Saved informations')
        return
    }

    let responseError = await api.json()
    
    if(responseError.error){
        alert(responseError.error)
    }
}