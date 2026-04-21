export const data = {
  apps: [
    {
      id: "telefone",
      name: "Telefone",
      icon: "call",
      color: "#22c55e",
      desc: "Fazer ligações para família",
      oldTech: "Telefone fixo antigo",
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: "play_circle",
      color: "#dc2626",
      desc: "Assistir vídeos",
      oldTech: "Televisão e Videocassete",
      tutorial:
        "O YouTube é como ter uma TV ilimitada. Você escolhe o que assistir e quando.",
    },
    {
      id: "uber",
      name: "Uber",
      icon: "directions_car",
      color: "#000000",
      desc: "Solicitar corridas",
      oldTech: "Táxi e Telefonista",
      tutorial:
        "Como chamar um táxi, mas você vê onde o carro está pelo telefone.",
    },
    {
      id: "google",
      name: "Pesquisa Google",
      icon: "travel_explore",
      color: "#4285F4",
      desc: "Aprenda a pesquisar qualquer coisa na internet",
      oldTech: "Enciclopédia Barsa ou Lista Telefônica",
      tutorial:
        "O Google é a porta de entrada para a internet. Antigamente, procurávamos livros ou catálogos para saber de algo. Hoje, basta escrever o que queremos na 'Barra de Pesquisa' e o Google encontra para nós.",
    },
  ],
  glossario: [
    {
      id: "wifi",
      category: "basic",
      term: "Wi-Fi (Arco de ondas)",
      icon: "wifi",
      color: "#3b82f6",
      definition:
        "Conexão de internet sem fio. Permite usar a internet no celular sem gastar o seu plano de dados da operadora.",
    },
    {
      id: "download",
      category: "basic",
      term: "Download (Seta para baixo)",
      icon: "download",
      color: "#10b981",
      definition:
        "Ato de trazer um arquivo, foto ou aplicativo da internet para ficar salvo dentro do seu telefone.",
    },
    {
      id: "settings",
      category: "basic",
      term: "Configurações (Engrenagem)",
      icon: "settings",
      color: "#6b7280",
      definition:
        "Onde você altera o volume, brilho da tela e outras funções mecânicas do telefone.",
    },
    {
      id: "like",
      category: "social",
      term: "Curtir (Coração ou Joinha)",
      icon: "favorite",
      color: "#ef4444",
      definition:
        "Serve para mostrar que você gostou de uma foto, vídeo ou comentário feito por outra pessoa.",
    },
    {
      id: "share",
      category: "social",
      term: "Compartilhar (Seta torta)",
      icon: "share",
      color: "#8b5cf6",
      definition:
        "Pega algo que você está vendo (como um vídeo) e envia para outra pessoa no WhatsApp ou Facebook.",
    },
    {
      id: "profile",
      category: "social",
      term: "Perfil (Bonequinho)",
      icon: "person",
      color: "#f59e0b",
      definition:
        "A sua 'identidade' naquele aplicativo. Onde ficam sua foto e suas informações pessoais.",
    },
  ],
  golpes: [
    {
      title: "Golpes por Telefone",
      icon: "phone_in_talk",
      color: "#fee2e2",
      textcolor: "#dc2626",
      desc: "Se passando por órgãos do governo.",
      tips: ["Desligue imediatamente", "Nunca forneça dados pessoais"],
    },
    {
      title: "Phishing por Email",
      icon: "mail",
      color: "#ffedd5",
      textcolor: "#ea580c",
      desc: "Emails falsos pedindo senhas.",
      tips: ["Não clique em links", "Exclua e marque como spam"],
    },
  ],
};
