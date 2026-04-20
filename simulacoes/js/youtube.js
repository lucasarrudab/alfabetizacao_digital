export const youtube = {
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
  openYoutubeSearch() {
    const feed = document.getElementById("yt-feed-scroll");
    const search = document.getElementById("yt-search-screen");
    const player = document.getElementById("yt-video-player-screen");

    if (feed && search) {
      feed.classList.add("hidden");
      player.classList.add("hidden");
      search.classList.remove("hidden");
      setTimeout(() => document.getElementById("yt-search-input").focus(), 100);
    }

    document.getElementById("yt-step-label").innerText = "Passo 3:";
    document.getElementById("yt-step-text").innerText =
      "Digite o que você quer assistir ou escolha uma sugestão abaixo.";
  },
  closeYoutubeSearch() {
    const feed = document.getElementById("yt-feed-scroll");
    const search = document.getElementById("yt-search-screen");

    if (feed && search) {
      search.classList.add("hidden");
      feed.classList.remove("hidden");
    }
    document.getElementById("yt-step-label").innerText = "Passo 1:";
    document.getElementById("yt-step-text").innerText =
      "Toque na imagem do vídeo para começar a assistir.";
  },
};
