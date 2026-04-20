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

  nextSimStep(appId, stepNumber) {
    if (appId === "youtube" && stepNumber === 2) {
      this.openYoutubeVideo();
    }
  },
};

window.app = app;
