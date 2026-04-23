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
  /* Data vai pro data.js */
  login(isBypass = false) {
    const emailInput = document.getElementById("login-email");
    const passInput = document.getElementById("login-password");
    const emailError = document.getElementById("email-error");
    const passError = document.getElementById("password-error");

    let isValid = true;

    if (!isBypass) {
      emailInput.classList.remove("input-error");
      passInput.classList.remove("input-error");
      emailError.classList.add("hidden");
      passError.classList.add("hidden");

      const emailVal = emailInput.value.trim();
      if (!emailVal.includes("@") || !emailVal.includes(".")) {
        emailError.classList.remove("hidden");
        emailInput.classList.add("input-error");
        isValid = false;
      }

      if (passInput.value.length < 6) {
        passError.classList.remove("hidden");
        passInput.classList.add("input-error");
        isValid = false;
      }
    }

    if (isValid) {
      document.getElementById("login-view").classList.remove("active");
      document.getElementById("app-view").classList.add("active");

      if (this.renderTutoriais) this.renderTutoriais();
      if (this.renderGlossario) this.renderGlossario();
      if (this.renderGolpes) this.renderGolpes();

      if (emailInput) emailInput.value = "";
      if (passInput) passInput.value = "";
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
};

window.app = app;
