export const google = {
  focusGoogleSearch() {
    const input = document.getElementById("g-main-input");
    const stepLabel = document.getElementById("g-step-label");
    const stepText = document.getElementById("g-step-text");

    if (input && stepLabel && stepText) {
      stepLabel.innerText = "Passo 2:";
      stepText.innerText =
        "No mundo real, o teclado abriria agora. Toque na lupa (ou na barra) para pesquisar.";

      input.value = "Receita de bolo de cenoura";
      input.style.color = "#1a73e8";
      input.parentElement.onclick = () => window.app.executeGoogleSearch();
    }
  },

  executeGoogleSearch() {
    document.getElementById("g-home-screen").classList.add("hidden");
    document.getElementById("g-images-screen").classList.add("hidden");
    document.getElementById("g-results-screen").classList.remove("hidden");

    document.getElementById("g-step-label").innerText = "Passo 3:";
    document.getElementById("g-step-text").innerText =
      "Estes são os sites encontrados! Os textos em AZUL são os links. Toque na aba 'Imagens' lá em cima.";
  },

  openGoogleImages() {
    document.getElementById("g-results-screen").classList.add("hidden");
    document.getElementById("g-images-screen").classList.remove("hidden");

    document.getElementById("g-step-label").innerText = "Passo 4:";
    document.getElementById("g-step-text").innerText =
      "Aqui estão apenas fotos! Toque em qualquer foto ou site para finalizar.";
  },

  finishGoogleSim() {
    alert(
      "Parabéns! Você completou a simulação do Google.\n\nVocê aprendeu a:\n1. Tocar na barra para pesquisar\n2. Identificar os links azuis (sites)\n3. Filtrar os resultados usando as abas (como a aba de Imagens).\n\nA internet inteira está na palma da sua mão!",
    );

    window.app.closeSimulation("sim-google-view");
  },
};
