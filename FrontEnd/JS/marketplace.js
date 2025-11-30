const catalog = {
    sofa: {
        title: "Sofá",
        price: "R$ 2.059,99",
        desc: "Sofá Beny com Chaise Esquerda.",
        img: "../img/sofa.png",
        link: "https://www.amazon.com.br/Chaise-Esquerda-Lugares-Linho-Madeira/dp/B0DVLMQ2ZP?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&th=1"
    },
    mesa: {
        title: "Mesa de Centro",
        price: "R$ 3.566,99",
        desc: "Mesa de Centro Redonda de Mármore.",
        img: "../img/mesa_de_centro.png",
        link: "https://www.amazon.com.br/Redonda-M%C3%A1rmore-Estrutura-Almofadas-Ajust%C3%A1veis/dp/B0CGZC993Z?th=1"
    },
    poltrona: {
        title: "Poltrona",
        price: "R$ 1.731,09",
        desc: "Poltrona de Madeira Linho Cru Amy.",
        img: "../img/poltrona.png",
        link: "https://www.leroymerlin.com.br/poltrona-de-madeira-linho-cru-amy--cru_1570450756"
    },
    tapete: {
        title: "Tapete Geométrico",
        price: "R$ 799,00",
        desc: "Tapete Classic Angra 28 2,00x2,50.",
        img: "../img/tapete.png",
        link: "https://www.rededecor.com.br/estilo/geometrico/tapete-classic-angra-28-2-00x2-50?variant_id=3203"
    },
    lustre: {
        title: "Lustre",
        price: "R$ 1.422,98",
        desc: "Lustres Dourados de 6 Luzes Para Sala de Jantar.",
        img: "../img/lustre.png",
        link: "https://www.amazon.com.br/dourados-Ilumina%C3%A7%C3%A3o-pendente-Lumin%C3%A1rias-Restaurante/dp/B0D7C4VPMF"
    },
    rack: {
        title: "Rack Suspenso",
        price: "R$ 846,29",
        desc: "Rack Suspenso Para TV 75 Flutuante Madeira Castanho TECCA.",
        img: "../img/rack.png",
        link: "https://www.pontofrio.com.br/rack-suspenso-para-tv-75-flutuante-madeira-castanho-tecca/p/1572915022?utm_medium=cpc&IdSku=1572915022&idLojista=211709&tipoLojista=3P"
    }
};

function openItem(id) {
    const item = catalog[id];
    if (!item) return alert("Item não encontrado!");

    document.getElementById("modal-img").src = item.img;
    document.getElementById("modal-title").innerText = item.title;
    document.getElementById("modal-desc").innerText = item.desc;
    document.getElementById("modal-price").innerText = "Preço: " + item.price;
    document.getElementById("modal-link").href = item.link;

    document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}

document.addEventListener("click", (e) => {
    const modal = document.getElementById("modal");
    if (e.target === modal) {
        closeModal();
    }
});
