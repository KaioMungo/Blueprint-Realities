class Prompt:
    def __init__(self, metragem, orcamento, paleta_cores, estilo, img):
        self.metragem = metragem
        self.orcamento = orcamento
        self.paleta_cores = paleta_cores
        self.estilo = estilo
        self.img = img
    
    def gerar_prompt(self):
        prompt = (
        "Decore o comodo a partir desta imagem e com base nas seguintes especificações fornecidas pelo usuário: "
        "o espaço possui aproximadamente {METRAGEM} m², com um orçamento estimado de {ORCAMENTO}, "
        "seguindo uma paleta de cores composta por {PALETA_DE_CORES} e inspirado no estilo {ESTILO_DE_DESIGN}. "
        "A imagem deve refletir um ambiente funcional, bem distribuído e visualmente harmônico, com móveis, acabamentos, "
        "iluminação e elementos decorativos que respeitem o orçamento e aproveitem ao máximo a metragem disponível. "
        "O resultado final deve transmitir a atmosfera desejada, destacando o estilo e as cores escolhidas, e apresentar uma "
        "proposta de design realista e viável para reforma ou decoração completa do imóvel, mantendo a estrutura original do comodo "
        "alterando somente a decoração."
        )

        return prompt.format(
            METRAGEM=self.metragem,
            ORCAMENTO=self.orcamento,
            PALETA_DE_CORES=self.paleta_cores,
            ESTILO_DE_DESIGN=self.estilo
        )