import { data } from "./data.js";

const app = {
  // 1. Navegação SPA
  login() {
    document.getElementById("login-view").classList.remove("active");
    document.getElementById("app-view").classList.add("active");
    this.renderTutoriais();
    this.renderGolpes();
    this.renderGlossario();
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

  // 2. Renderização Dinâmica
  renderTutoriais() {
    const container = document.getElementById("tutoriais-list");
    if (!container) return;

    container.innerHTML = data.apps
      .map(
        (appItem) => `
            <div class="card card-interactive" onclick="app.openTutorial('${appItem.id}')" style="display: flex; gap: 16px; align-items: center;">
                <div class="icon-circle" style="background-color: ${appItem.color}; margin: 0; width: 50px; height: 50px;">
                    <span class="material-symbols-outlined" style="font-size: 24px;">${appItem.icon}</span>
                </div>
                <div>
                    <h3 style="font-size: 18px;">${appItem.name}</h3>
                    <div class="old-tech-badge">${appItem.oldTech}</div>
                </div>
                <span class="material-symbols-outlined" style="margin-left: auto; color: #9ca3af;">chevron_right</span>
            </div>
        `,
      )
      .join("");
  },

  generateGlossarioHTML(list) {
    return list
      .map(
        (item) => `
        <div class="card" style="display: flex; gap: 16px; align-items: flex-start; margin-bottom: 12px;">
            <div class="icon-circle" style="background-color: ${item.color}; margin: 0; width: 48px; height: 48px; flex-shrink: 0;">
                <span class="material-symbols-outlined" style="font-size: 24px;">${item.icon}</span>
            </div>
            <div>
                <h3 style="font-size: 18px; color: #1f2937; margin-bottom: 4px;">${item.term}</h3>
                <p style="color: #4b5563; font-size: 15px; line-height: 1.5;">${item.definition}</p>
            </div>
        </div>
    `,
      )
      .join("");
  },

  openGlossarioCategory(category) {
    let filteredList = [];
    let title = "";

    if (category === "all") {
      filteredList = data.glossario;
      title = "Todos os Símbolos";
    } else {
      filteredList = data.glossario.filter(
        (item) => item.category === category,
      );
      title =
        category === "basic"
          ? "Parte 1: Símbolos Básicos"
          : "Parte 2: Redes Sociais";
    }

    document.getElementById("glossario-category-title").innerText = title;
    document.getElementById("glossario-category-content").innerHTML =
      this.generateGlossarioHTML(filteredList);
    document.getElementById("glossario-detail-view").classList.remove("hidden");
  },

  closeGlossarioCategory() {
    document.getElementById("glossario-detail-view").classList.add("hidden");
  },

  searchGlossario(query) {
    const searchTerm = query.toLowerCase().trim();
    const categoriesDiv = document.getElementById("glossario-categories");
    const resultsDiv = document.getElementById("glossario-search-results");

    if (searchTerm === "") {
      categoriesDiv.classList.remove("hidden");
      resultsDiv.classList.add("hidden");
      return;
    }

    const filteredList = data.glossario.filter(
      (item) =>
        item.term.toLowerCase().includes(searchTerm) ||
        item.definition.toLowerCase().includes(searchTerm),
    );

    categoriesDiv.classList.add("hidden");
    resultsDiv.classList.remove("hidden");

    resultsDiv.innerHTML =
      filteredList.length === 0
        ? `<p class="text-center text-muted mt-lg">Nenhum símbolo encontrado para "${query}".</p>`
        : this.generateGlossarioHTML(filteredList);
  },

  renderGlossario() {},

  renderGolpes() {
    const container = document.getElementById("golpes-list");
    if (!container) return;

    container.innerHTML = data.golpes
      .map(
        (golpe) => `
            <div class="card" style="border-top: 4px solid ${golpe.textcolor};">
                <h3 style="display: flex; align-items: center; gap: 8px; color: ${golpe.textcolor}; margin-bottom: 8px;">
                    <span class="material-symbols-outlined">${golpe.icon}</span> ${golpe.title}
                </h3>
                <p class="mb-md">${golpe.desc}</p>
                <div style="background: #f0fdf4; padding: 12px; border-radius: 8px;">
                    <strong style="color: #166534; display: block; margin-bottom: 8px;">✓ O Que Fazer:</strong>
                    <ul style="color: #15803d; font-size: 14px; padding-left: 20px;">
                        ${golpe.tips.map((tip) => `<li>${tip}</li>`).join("")}
                    </ul>
                </div>
            </div>
        `,
      )
      .join("");
  },

  // 3. Sistema de Tutorial e Simulação
  openTutorial(appId) {
    const appData = data.apps.find((a) => a.id === appId);
    if (!appData) return;

    const header = document.getElementById("detail-header");
    header.style.backgroundColor = appData.color;
    document.getElementById("detail-title").innerText = appData.name;
    document.getElementById("detail-icon").innerHTML =
      `<span class="material-symbols-outlined" style="color: ${appData.color}">${appData.icon}</span>`;

    const content = document.getElementById("detail-content");
    content.innerHTML = `
            <div class="card mb-lg" style="border-left: 4px solid #3b82f6;">
                <h3 style="color: #1e3a8a; margin-bottom: 8px;">Conectando ao que Você Conhece</h3>
                <p><strong>Tecnologia Antiga:</strong> ${appData.oldTech}</p>
                <p style="margin-top: 8px;">${appData.tutorial || "Tutorial detalhado em construção."}</p>
            </div>
            
            <h2 class="mb-md">Passo a Passo</h2>
            <div class="card mb-md">
                <h3 class="flex-center gap-sm mb-md">
                  <span style="background: ${appData.color}; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px;">1</span> 
                  Abra o Aplicativo
                </h3>
                <p>Procure o ícone na sua tela inicial e toque no botão abaixo para começar.</p>
            </div>

            <button
                class="btn w-full mt-md btn-large"
                style="background-color: ${appData.color}; color: white;"
                onclick="app.startAppSimulation('${appData.id}')"
            >
                <span class="material-symbols-outlined">play_arrow</span> Iniciar Simulação Prática
            </button>
        `;

    document.getElementById("tutorial-detail-view").classList.remove("hidden");
  },

  closeTutorial() {
    document.getElementById("tutorial-detail-view").classList.add("hidden");
  },

  async loadSimulation(appId) {
    const container = document.getElementById("simulation-container");

    try {
      const response = await fetch(`simulacoes/html/${appId}.html`);
      if (!response.ok)
        throw new Error("Não foi possível encontrar o arquivo da simulação.");

      const html = await response.text();
      container.innerHTML = html;
      const simViewId = `sim-${appId}-view`;
      const simView = document.getElementById(simViewId);
      if (simView) {
        simView.classList.remove("hidden");
      }

      const feedScroll = document.getElementById("yt-feed-scroll");
      if (feedScroll) feedScroll.scrollTop = 0;
    } catch (err) {
      console.error("Erro ao carregar a simulação:", err);
      alert("A simulação para este aplicativo ainda está sendo construída!");
      document.getElementById("splash-screen-view").classList.add("hidden");
    }
  },

  async startAppSimulation(appId) {
    const appData = data.apps.find((a) => a.id === appId);
    if (!appData) return;

    const splash = document.getElementById("splash-screen-view");
    document.getElementById("splash-icon").innerText = appData.icon;
    document.getElementById("splash-name").innerText = appData.name;
    splash.style.backgroundColor = appData.color;

    this.closeTutorial();
    splash.classList.remove("hidden");

    // Carrega o arquivo HTML dinamicamente
    await this.loadSimulation(appId);

    // Remove o splash após um tempo para dar a sensação de carregamento do app
    setTimeout(() => {
      splash.classList.add("hidden");
    }, 1500);
  },

  closeSimulation(simId) {
    const sim = document.getElementById(simId);
    if (sim) sim.classList.add("hidden");
    document.getElementById("simulation-container").innerHTML = ""; // Limpa para economizar memória
  },

  nextSimStep(appId, stepNumber) {
    if (appId === "youtube" && stepNumber === 2) {
      this.openYoutubeVideo();
    }
  },

  lastYtScroll: 0,
  handleYoutubeScroll(element) {
    const currentScroll = element.scrollTop;
    const navBar = document.getElementById("yt-bottom-nav-bar");
    if (!navBar) return;

    if (currentScroll > this.lastYtScroll + 5) {
      navBar.classList.add("nav-hidden");
    } else if (currentScroll < this.lastYtScroll - 5) {
      navBar.classList.remove("nav-hidden");
    }
    this.lastYtScroll = currentScroll;
  },
  openYoutubeVideo() {
    const feed = document
      .getElementById("yt-feed-scroll")
      .classList.add("hidden");
    const player = document
      .getElementById("yt-video-player-screen")
      .classList.remove("hidden");

    if (feed && player) {
      feed.classList.add("hidden");
      player.classList.remove("hidden");
    }
    document.getElementById("yt-step-label").innerText = "Passo 2:";
    document.getElementById("yt-step-text").innerText =
      "Você está assistindo! Experimente dar um 'Joinha' ou 'Compartilhar' abaixo.";
  },

  closeYoutubeVideo() {
    const feed = document
      .getElementById("yt-feed-scroll")
      .classList.add("hidden");
    const player = document
      .getElementById("yt-video-player-screen")
      .classList.remove("hidden");
    if (feed && player) {
      player.classList.add("hidden");
      feed.classList.remove("hidden");
    }
    document.getElementById("yt-step-label").innerText = "Passo 1:";
    document.getElementById("yt-step-text").innerText =
      "Toque na imagem do vídeo para começar a assistir.";
  },
  likeYoutube() {
    const icon = document.getElementById("yt-like-icon");
    const count = document.getElementById("yt-like-count");

    if (icon.style.fontVariationSettings === "'FILL' 1") {
      icon.style.fontVariationSettings = "'FILL' 0";
      icon.style.color = "inherit";
    } else {
      icon.style.fontVariationSettings = "'FILL' 1";
      icon.style.color = "#2563eb";
      alert(
        "Você deu um 'Joinha'!\n\nIsso é como dar um elogio ao criador do vídeo. Ajuda o YouTube a entender que esse vídeo é bom e deve ser mostrado para mais pessoas.",
      );
    }
  },
  subscribeYoutube() {
    const btn = document.querySelector(".yt-subscribe-btn");

    if (btn.innerText === "Inscrever-se") {
      btn.innerText = "Inscrito";
      btn.style.backgroundColor = "#f2f2f2";
      btn.style.color = "#0f0f0f";

      alert(
        "Muito bem! Você se 'Inscreveu'.\n\nIsso é como assinar um jornal ou revista: agora o YouTube vai te avisar sempre que este canal postar um vídeo novo. \n\nFique tranquilo: no YouTube, se inscrever em canais é sempre gratuito!",
      );
    } else {
      btn.innerText = "Inscrever-se";
      btn.style.backgroundColor = "#0f0f0f";
      btn.style.color = "white";
    }
  },
  shareYoutube() {
    alert(
      "Você clicou em 'Compartilhar'!\n\nNo mundo real, isso abriria uma lista com seus contatos do WhatsApp. É assim que você envia um vídeo engraçado ou uma notícia importante para seus filhos e amigos.",
    );
  },
};

window.app = app;
