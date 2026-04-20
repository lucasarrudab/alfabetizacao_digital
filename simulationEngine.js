import { data } from "./data.js";

export const simulationEngine = {
  async loadSimulation(appId) {
    const container = document.getElementById("simulation-container");
    try {
      const response = await fetch(`simulacoes/html/${appId}.html`);
      if (!response.ok) throw new Error("Arquivo não encontrado");
      const html = await response.text();
      container.innerHTML = html;

      const simView = document.getElementById(`sim-${appId}-view`);
      if (simView) simView.classList.remove("hidden");
    } catch (err) {
      console.error(err);
      alert("Simulação em construção!");
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
    await this.loadSimulation(appId);
    setTimeout(() => {
      splash.classList.add("hidden");
    }, 1500);
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

  closeSimulation(simId) {
    const sim = document.getElementById(simId);
    if (sim) sim.classList.add("hidden");
    document.getElementById("simulation-container").innerHTML = "";
  },
};
