import { dataHandler } from "./dataHandler.js";
import { simulationEngine } from "./simulationEngine.js";
import { email } from "./simulacoes/js/email.js";
import { google } from "./simulacoes/js/google.js";
import { instagram } from "./simulacoes/js/instagram.js";
import { telefone } from "./simulacoes/js/telefone.js";
import { uber } from "./simulacoes/js/uber.js";
import { youtube } from "./simulacoes/js/youtube.js";

const app = {
  ...dataHandler,
  ...simulationEngine,
  ...youtube,
  ...uber,
  ...instagram,
  ...email,
  ...google,
  ...telefone,

  // 1. Dados
  data: {
    apps: [
      {
        id: "telefone",
        name: "Telefone",
        icon: "call",
        color: "#22c55e",
        desc: "Fazer ligações",
        oldTech: "Telefone fixo antigo",
      },
      {
        id: "youtube",
        name: "YouTube",
        icon: "play_circle",
        color: "#dc2626",
        desc: "Assistir vídeos",
        oldTech: "Televisão e Videocassete",
      },
      {
        id: "uber",
        name: "Uber",
        icon: "directions_car",
        color: "#000000",
        desc: "Solicitar corridas",
        oldTech: "Táxi e Telefonista",
      },
      {
        id: "mensagens",
        name: "Mensagens",
        icon: "chat",
        color: "#3b82f6",
        desc: "Enviar textos",
        oldTech: "Telegramas",
      },
      {
        id: "email",
        name: "E-mail",
        icon: "mail",
        color: "#ef4444",
        desc: "Correspondência digital",
        oldTech: "Correio Postal",
      },
      {
        id: "navegador",
        name: "Navegador",
        icon: "public",
        color: "#eab308",
        desc: "Pesquisar na internet",
        oldTech: "Biblioteca e Enciclopédia",
      },
    ],
    golpes: [
      {
        id: "telefone",
        name: "Golpes por Telefone",
        alert: "Ligação de falsos atendentes.",
        exemplos: [
          '"Aqui é do banco, sua conta foi bloqueada, me informe sua senha."',
          '"Você ganhou um prêmio, transfira uma taxa para liberar."',
        ],
        tips: [
          "Desligue imediatamente, não converse.",
          "O banco nunca pede sua senha por telefone.",
          "Ligue de volta usando o número atrás do seu cartão.",
        ],
      },
      {
        id: "mensagens",
        name: "Golpes no WhatsApp/SMS",
        alert: "Links maliciosos e falsos conhecidos.",
        exemplos: [
          '"Mãe, meu celular quebrou, anota meu número novo."',
          '"Sua encomenda foi taxada, clique aqui para pagar."',
        ],
        tips: [
          "Nunca faça PIX urgente para conhecidos sem antes ligar e ouvir a voz deles.",
          "Não clique em links SMS de números desconhecidos.",
        ],
      },
      {
        id: "email",
        name: "Phishing por Email",
        alert: "E-mails falsos pedindo dados.",
        exemplos: [
          '"Sua conta Netflix será cancelada, atualize seu cartão."',
          '"Aviso da Receita Federal: pendência no CPF."',
        ],
        tips: [
          "Verifique o remetente: o e-mail parece oficial?",
          "Órgãos do governo não enviam cobranças por e-mail.",
          "Não clique em links; acesse o site oficial pelo navegador.",
        ],
      },
      {
        id: "navegador",
        name: "Sites e Lojas Falsas",
        alert: "Promoções boas demais para ser verdade.",
        exemplos: [
          '"Queima de estoque: Geladeira por R$ 300,00."',
          '"Site idêntico ao oficial, mas com URL estranha."',
        ],
        tips: [
          "Desconfie de preços extremamente baixos.",
          "Compre apenas em lojas conhecidas.",
          "Verifique se o site possui um cadeado de segurança na barra superior.",
        ],
      },
    ],
  },

  // 2. Validação e Navegação
  login(bypass = false) {
    const emailInput = document.getElementById("login-email");
    const passInput = document.getElementById("login-password");
    const emailError = document.getElementById("email-error");
    const passError = document.getElementById("password-error");

    let isValid = true;

    // Se NÃO for bypass, fazemos a validação normal
    if (!bypass) {
      // Reseta erros
      emailInput.classList.remove("input-error");
      passInput.classList.remove("input-error");
      emailError.classList.add("hidden");
      passError.classList.add("hidden");

      // Validação Email
      const emailVal = emailInput.value.trim();
      if (!emailVal.includes("@") || !emailVal.includes(".")) {
        emailError.classList.remove("hidden");
        emailInput.classList.add("input-error");
        isValid = false;
      }

      // Validação Senha
      if (passInput.value.length < 6) {
        passError.classList.remove("hidden");
        passInput.classList.add("input-error");
        isValid = false;
      }
    }

    // Se for bypass OU se passar na validação normal
    if (bypass || isValid) {
      document.getElementById("login-view").classList.remove("active");
      document.getElementById("app-view").classList.add("active");

      if (this.renderTutoriais) this.renderTutoriais();
      if (this.renderGlossario) this.renderGlossario();
      if (this.renderGolpesGrid) this.renderGolpesGrid();

      // Limpa os campos após entrar
      emailInput.value = "";
      passInput.value = "";
    }
  },

  logout() {
    document.getElementById("app-view").classList.remove("active");
    document.getElementById("login-view").classList.add("active");
  },

  switchTab(tabId, btnElement) {
    document
      .querySelectorAll(".tab-content")
      .forEach((tab) => tab.classList.remove("active"));
    document
      .querySelectorAll(".nav-item")
      .forEach((btn) => btn.classList.remove("active"));

    document.getElementById(tabId).classList.add("active");
    if (btnElement) btnElement.classList.add("active");
  },

  // 3. Renderização e Lógica da Aba Golpes
  renderGolpesGrid() {
    const container = document.getElementById("golpes-grid");
    if (!container) return;

    const golpesDisponiveis = this.data.apps.filter((app) =>
      this.data.golpes.find((g) => g.id === app.id),
    );

    container.innerHTML = golpesDisponiveis
      .map(
        (app) => `
          <div class="card card-interactive text-center" onclick="app.openGolpe('${app.id}')" style="border: 4px solid #ffd2cf;">
              <div class="icon-circle" style="background-color: ${app.color}">
                  <span class="material-symbols-outlined">${app.icon}</span>
              </div>
              <h3 style="font-size: 16px; margin-bottom: 4px; color: #b91c1c;">${app.name}</h3>
              <p style="font-size: 12px; color: #666;">Precauções</p>
          </div>
      `,
      )
      .join("");
  },

  openGolpe(appId) {
    const appData = this.data.apps.find((a) => a.id === appId);
    const golpeData = this.data.golpes.find((g) => g.id === appId);
    if (!appData || !golpeData) return;

    const header = document.getElementById("golpe-header");
    header.style.backgroundColor = "#dc2626";
    document.getElementById("golpe-title").innerText =
      "Golpes no " + appData.name;
    document.getElementById("golpe-icon").innerHTML =
      `<span class="material-symbols-outlined
" style="color: #dc2626">${appData.icon}</span>`;

    const content = document.getElementById("golpe-content");
    content.innerHTML = `
          <h2 class="title" style="color: #991b1b; margin-bottom: 16px;">${golpeData.name}</h2>
          <p class="mb-md" style="font-size: 18px;">${golpeData.alert}</p>
          
          <div class="card mb-lg" style="background-color: #fef2f2; border: 3px solid #fca5a5; border-radius: 12px;">
              <h3 style="color: #991b1b; display:flex; align-items:center; gap:8px; margin-bottom:12px;">
                  <span class="material-symbols-outlined">campaign</span> Exemplos de como eles abordam:
              </h3>
              <ul style="padding-left: 20px; color: #7f1d1d; line-height: 1.6;">
                  ${golpeData.exemplos.map((ex) => `<li style="margin-bottom: 8px;"><em>${ex}</em></li>`).join("")}
              </ul>
          </div>

          <div class="card" style="background-color: #f0fdf4; border: 3px solid #86efac; border-radius: 12px;">
              <h3 style="color: #166534; display:flex; align-items:center; gap:8px; margin-bottom:12px;">
                  <span class="material-symbols-outlined">check_circle</span> O que você deve fazer:
              </h3>
              <ul style="padding-left: 20px; color: #15803d; line-height: 1.6; font-size: 16px;">
                  ${golpeData.tips.map((tip) => `<li style="margin-bottom: 10px;">${tip}</li>`).join("")}
              </ul>
          </div>
      `;

    document.getElementById("golpe-detail-view").classList.remove("hidden");
  },

  closeGolpe() {
    document.getElementById("golpe-detail-view").classList.add("hidden");
  },

  // Lógica do parceiro
  nextSimStep(appId, stepNumber) {
    if (appId === "youtube" && stepNumber === 2) {
      this.openYoutubeVideo();
    }
  },
};

window.app = app;
