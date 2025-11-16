// Perguntas (id = nome do campo)
const perguntas = [
  {
    id: "estilo",
    titulo: "1. Qual estilo te atrai mais?",
    op: ["Moderno", "Rústico", "Minimalista", "Industrial", "Contemporâneo"],
  },
  {
    id: "cores",
    titulo: "2. Quais cores você prefere?",
    op: ["Neutras (branco, bege, cinza)", "Escuras (preto, chumbo, marrom)", "Vibrantes (vermelho, amarelo, azul)"],
  },
  {
    id: "minimalismo",
    titulo: "3. Quanto minimalismo combina com você?",
    op: ["Alto", "Médio", "Baixo"],
  },
  {
    id: "personalidade",
    titulo: "4. Qual sua personalidade decorativa?",
    op: ["calma", "criativa", "sofisticada"],
  },
  {
    id: "materiais",
    titulo: "5. Que tipo de materiais prefere?",
    op: ["naturais (madeira, linho, algodão)", "metais e superfícies frias", "luxo (veludo, mármore, detalhes dourados)"],
  },
  {
    id: "luz",
    titulo: "6. Como gosta da iluminação?",
    op: ["suave", "neutra", "forte"],
  },
  {
    id: "mobilia",
    titulo: "7. Qual tipo de mobília combina mais com você?",
    op: ["reta", "curvas", "robusta"],
  },
];

const wrapper = document.getElementById("quiz-wrapper");
const STORAGE_PREFIX = "quiz_"; // prefixo para evitar colisões
let atualIndex = 0;

// cria markup das perguntas (uma por vez, mas montamos todas para facilitar seleção)
function buildQuiz() {
  wrapper.innerHTML =
    perguntas
      .map((p, idx) => {
        const optionsHtml = p.op
          .map((o) => {
            // label amigável: manter apenas capitalização simples
            const label = o.charAt(0).toUpperCase() + o.slice(1);
            return `<label style="display:block; margin-bottom:6px;" class="option-card">
                    <input type="radio" name="${p.id}" value="${o}" /> ${label}
                  </label>`;
          })
          .join("");
        // container de cada pergunta
        return `<div class="question" id="q-${p.id}" data-idx="${idx}">
                  <p class="question_title"><strong>${p.titulo}</strong></p>
                  ${optionsHtml}
                  <div class="nav-buttons">
                    ${
                      idx > 0
                        ? `<button data-action="voltar" class="btn_last">Voltar</button>`
                        : `<span></span>`
                    }
                    ${
                      idx < perguntas.length - 1
                        ? `<button data-action="proxima" class="btn_next">Próxima</button>`
                        : `<button data-action="enviar" class="btn_send">Enviar</button>`
                    }
                  </div>
                </div>`;
      })
      .join("") +
    `<div style="text-align:center; margin-top:10px;"><button id="reset" class="btn_reset">Reiniciar Quiz</button></div>`;

  // adiciona listeners aos inputs e botões
  perguntas.forEach((p) => {
    const container = document.getElementById(`q-${p.id}`);
    // marcar opções salvas
    const saved = localStorage.getItem(STORAGE_PREFIX + p.id);
    if (saved) {
      const radio = container.querySelector(
        `input[name="${p.id}"][value="${saved}"]`
      );
      if (radio) radio.checked = true;
    }
    // listener para salvar quando o usuário marca uma opção
    container.querySelectorAll(`input[name="${p.id}"]`).forEach((r) => {
      r.addEventListener("change", () => {
        localStorage.setItem(STORAGE_PREFIX + p.id, r.value);
      });
    });

    // botões de navegação
    const btnNext = container.querySelector('[data-action="proxima"]');
    if (btnNext) btnNext.addEventListener("click", () => handleProxima(p.id));
    const btnPrev = container.querySelector('[data-action="voltar"]');
    if (btnPrev) btnPrev.addEventListener("click", () => handleVoltar());
    const btnEnviar = container.querySelector('[data-action="enviar"]');
    if (btnEnviar) btnEnviar.addEventListener("click", gerarResultado);
  });

  document.getElementById("reset").addEventListener("click", resetQuiz);
  showQuestion(atualIndex);
}

function showQuestion(index) {
  // oculta todas e mostra a atual
  document
    .querySelectorAll(".question")
    .forEach((q) => q.classList.remove("active"));
  const qEl = document.querySelectorAll(".question")[index];
  if (qEl) qEl.classList.add("active");
  atualIndex = index;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleProxima(currentId) {
  // salva (garante) e avança
  const sel = document.querySelector(`input[name="${currentId}"]:checked`);
  if (!sel) {
    alert("Selecione uma opção para continuar.");
    return;
  }
  localStorage.setItem(STORAGE_PREFIX + currentId, sel.value);
  if (atualIndex < perguntas.length - 1) showQuestion(atualIndex + 1);
}

function handleVoltar() {
  // salva a seleção atual antes de voltar (se existir)
  const cur = perguntas[atualIndex];
  if (cur) {
    const sel = document.querySelector(`input[name="${cur.id}"]:checked`);
    if (sel) localStorage.setItem(STORAGE_PREFIX + cur.id, sel.value);
  }
  if (atualIndex > 0) showQuestion(atualIndex - 1);
}

function gerarResultado() {
  // lê todas as respostas do localStorage (fallback ao DOM)
  const respostas = {};
  for (let p of perguntas) {
    let val = localStorage.getItem(STORAGE_PREFIX + p.id);
    if (!val) {
      // tenta pegar do DOM (se usuário marcar e localStorage falhar por algum motivo)
      const sel = document.querySelector(`input[name="${p.id}"]:checked`);
      if (sel) val = sel.value;
    }
    if (!val) {
      // caso ainda falte, levar usuário para a pergunta faltante
      const idxFaltante = perguntas.findIndex(
        (pp) =>
          !localStorage.getItem(STORAGE_PREFIX + pp.id) &&
          !document.querySelector(`input[name="${pp.id}"]:checked`)
      );
      if (idxFaltante >= 0) {
        alert(
          "Você precisa responder todas as perguntas. Vou te levar para a pergunta faltante."
        );
        showQuestion(idxFaltante);
        return;
      }
    }
    respostas[p.id] = val;
  }

  // se tudo OK, mostra relatório detalhado
  const resultado = document.getElementById("resultado");
  resultado.style.display = "block";

  resultado.innerHTML = buildRelatorioDetalhado(respostas);

  // opcional: limpar quiz (se quiser que o usuário recomece)
  // Abaixo eu escondo o quiz para mostrar o resultado
  wrapper.style.display = "none";
  window.scrollTo({ top: 0, behavior: "smooth" });

  // limpa localStorage (se preferir manter, comente a linha seguinte)
  // localStorage.clear(); // -> eu deixei comentado para debug; descomente se quiser apagar
}

// cria conteúdo mais rico para o relatório
function buildRelatorioDetalhado(r) {
  // mapeamentos para textos mais amigáveis
  const estiloText = {
    Moderno: "Moderno — linhas limpas, formas geométricas, uso equilibrado de materiais como vidro, metal e madeira.",
    Industrial: "Industrial — aspecto urbano, matérias como metal/concreto e estrutura aparente.",
    Minimalista: "Minimalista — essencialidade visual, poucos elementos, paleta neutra e superfícies contínuas.",
    Rústico: "Rústico — texturas naturais, madeira bruta e sensação acolhedora.",
    Contemporâneo: "Contemporâneo — aparência atual e fluida, combinação de texturas suaves, tons neutros e detalhes pontuais de cor."
  };
  const corText = {
    Neutras: "Neutras — ótimo para quem busca calma e versatilidade.",
    Escuras: "Escuras — adicionam profundidade e sofisticação.",
    Vibrantes: "Vibrantes — transmitem energia e personalidade.",
  };
  const minText = {
    Alto: "Alto — foco em simplicidade, espaço e poucas peças selecionadas.",
    Médio: "Médio — equilíbrio entre funcionalidade e decoração.",
    Baixo: "Baixo — riqueza de objetos, camadas e mais personalidade.",
  };
  const persText = {
    calma: "Calma — priorize iluminação quente, tons suaves e texturas confortáveis.",
    criativa: "Criativa — misture padrões, formas e objetos únicos.",
    sofisticada: "Sofisticada — escolha materiais nobres e design refinado.",
  };

  // sugestões práticas combinadas (exemplos)
  const sugestoes = [];
  sugestoes.push(
    `<li><strong>Resumo do estilo:</strong> ${
      estiloText[r.estilo] || r.estilo
    }</li>`
  );
  sugestoes.push(
    `<li><strong>Paleta ideal:</strong> ${corText[r.cores.split(" ")[0]] || r.cores}</li>`
  );
  sugestoes.push(
    `<li><strong>Minimalismo:</strong> ${
      minText[r.minimalismo] || r.minimalismo
    }</li>`
  );
  sugestoes.push(
    `<li><strong>Personalidade:</strong> ${
      persText[r.personalidade] || r.personalidade
    }</li>`
  );
  sugestoes.push(
    `<li><strong>Materiais:</strong> Use os materiais de forma estratégica (ex: almofadas, mesa, detalhes).</li>`
  );
  sugestoes.push(
    `<li><strong>Iluminação:</strong> ${
      r.luz === "suave"
        ? "Luminárias com luz quente e difusa"
        : r.luz === "neutra"
        ? "Iluminação funcional e equilíbrio entre natural e artificial"
        : "Iluminação mais direta em pontos focais"
    }</li>`
  );
  sugestoes.push(
    `<li><strong>Mobília:</strong> Prefira móveis com linhas ${r.mobilia} para harmonizar com seu estilo.</li>`
  );

  // sugestões de "próximos passos" e shopping / moodboard
  const proximos = `
        <h3>Próximos passos:</h3>
        <ul>
          <li>Crie um moodboard com imagens que reforcem o estilo descrito.</li>
          <li>Escolha 2-3 peças-chave (tapete, luminária, quadro) para começar as mudanças.</li>
          <li>Considere uma paleta de 1 cor base, 1 cor de destaque e 2 neutros.</li>
        </ul>
      `;

  return `
        <h2>Relatório personalizado</h2>
        <ul>
          ${sugestoes.join("")}
        </ul>
        ${proximos}
        <div style="margin-top:12px"><button id="voltarEditar" class="btn_result">Voltar e Editar</button><button id="limparRespostas" class="btn_result">Limpar respostas</button><button id="baixarPDF" class="btn_result">Baixar PDF</button></div>
      `;
}

// reinicia quiz (limpa localStorage e volta ao início)
function resetQuiz() {
  if (!confirm("Deseja realmente reiniciar o quiz e apagar respostas salvas?"))
    return;
  perguntas.forEach((p) => localStorage.removeItem(STORAGE_PREFIX + p.id));
  wrapper.style.display = "";
  atualIndex = 0;
  buildQuiz();
  showQuestion(0);
  document.getElementById("resultado").style.display = "none";
}

// listeners para botões do relatório (delegação depois de gerar)
document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "voltarEditar") {
    // mostra quiz e vai para a primeira pergunta faltante (ou início)
    document.getElementById("resultado").style.display = "none";
    wrapper.style.display = "";
    // encontrar primeira pergunta sem resposta
    const idx = perguntas.findIndex(
      (p) => !localStorage.getItem(STORAGE_PREFIX + p.id)
    );
    showQuestion(idx >= 0 ? idx : 0);
  }
  if (e.target && e.target.id === "limparRespostas") {
    if (!confirm("Limpar todas as respostas salvas?")) return;
    perguntas.forEach((p) => localStorage.removeItem(STORAGE_PREFIX + p.id));
    alert("Respostas removidas. Você pode recomeçar o quiz.");
    wrapper.style.display = "";
    document.getElementById("resultado").style.display = "none";
    atualIndex = 0;
    buildQuiz();
    showQuestion(0);
  }
  if (e.target && e.target.id === "baixarPDF") {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "pt", "a4");

    const largura = pdf.internal.pageSize.getWidth();
    let y = 60;

    // -------- 🎨 CAPA DO PDF --------
    pdf.setFillColor(245, 245, 245);
    pdf.rect(0, 0, largura, 300, "F");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(26);
    pdf.setTextColor(40, 40, 40);
    pdf.text("Relatório do Quiz de Estilo de Decoração", largura / 2, 150, {
      align: "center",
    });

    pdf.setFontSize(14);
    pdf.setFont("helvetica", "normal");
    pdf.text(
      "Resultado personalizado baseado nas suas respostas",
      largura / 2,
      180,
      { align: "center" }
    );

    pdf.addPage();
    y = 40;

    // ------- CABEÇALHO --------
    pdf.setFontSize(18);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(50, 50, 50);
    pdf.text("Seu Perfil Decorativo", 40, y);
    y += 30;

    // linhas separadoras
    pdf.setDrawColor(180, 180, 180);
    pdf.setLineWidth(1);
    pdf.line(40, y, largura - 40, y);
    y += 25;

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(60, 60, 60);

    // ------- DADOS DO QUIZ --------
    perguntas.forEach((p) => {
      const resposta = localStorage.getItem("quiz_" + p.id) || "Não respondido";

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(13);
      pdf.text(p.titulo, 40, y);
      y += 18;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      const linhas = pdf.splitTextToSize(resposta, largura - 80);
      pdf.text(linhas, 40, y);
      y += linhas.length * 16 + 10;

      // divisor suave
      pdf.setDrawColor(220, 220, 220);
      pdf.setLineWidth(0.6);
      pdf.line(40, y, largura - 40, y);

      y += 20;

      // cria nova página caso esteja cheio
      if (y > 720) {
        pdf.addPage();
        y = 40;
      }
    });

    // ------- RECOMENDAÇÕES ESTILIZADAS --------
    pdf.addPage();
    y = 50;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.setTextColor(40, 40, 40);
    pdf.text("Sugestões Personalizadas", 40, y);
    y += 30;

    pdf.setDrawColor(180, 180, 180);
    pdf.line(40, y, largura - 40, y);
    y += 25;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.setTextColor(60, 60, 60);

    const sugestoes = [
      "Monte um moodboard com referências do seu estilo.",
      "Escolha 1 cor base, 1 cor de destaque e 2 tons neutros.",
      "Invista em peças-chave como tapete, luminária ou quadro principal.",
      "Aplique materiais e iluminação compatíveis com suas respostas.",
      "Use proporção e equilíbrio entre estética e funcionalidade.",
    ];

    sugestoes.forEach((s) => {
      const texto = pdf.splitTextToSize("• " + s, largura - 80);
      pdf.text(texto, 40, y);
      y += texto.length * 16 + 10;
    });

    // ------- RODAPÉ --------
    const footerY = pdf.internal.pageSize.getHeight() - 40;
    pdf.setFontSize(10);
    pdf.setTextColor(120, 120, 120);
    pdf.text(
      "Relatório gerado automaticamente pelo Quiz de Estilo de Decoração",
      largura / 2,
      footerY,
      { align: "center" }
    );

    pdf.save("relatorio_estilo_decoracao.pdf");
  }
});

// inicializa
buildQuiz();
