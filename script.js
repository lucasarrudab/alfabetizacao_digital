const app = {
    // 1. Navegação SPA
    login() {
        document.getElementById('login-view').classList.remove('active');
        document.getElementById('app-view').classList.add('active');
        this.renderDashboard();
        this.renderTutoriais();
        this.renderGolpes();
    },

    logout() {
        // Esconde o app e volta para a tela de login
        document.getElementById('app-view').classList.remove('active');
        document.getElementById('login-view').classList.add('active');
    },

    switchTab(tabId, btnElement) {
        // Esconde todas as abas
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        // Remove active dos botões
        document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));

        // Mostra aba selecionada
        document.getElementById(tabId).classList.add('active');
        btnElement.classList.add('active');
    },

    // 2. Dados Extraídos do seu React
    data: {
        apps: [
            { id: 'telefone', name: 'Telefone', icon: 'call', color: '#22c55e', desc: 'Fazer ligações para família', oldTech: 'Telefone fixo antigo' },
            { id: 'youtube', name: 'YouTube', icon: 'play_circle', color: '#dc2626', desc: 'Assistir vídeos', oldTech: 'Televisão e Videocassete',
                tutorial: 'O YouTube é como ter uma TV ilimitada. Você escolhe o que assistir e quando.'},
            { id: 'uber', name: 'Uber', icon: 'directions_car', color: '#000000', desc: 'Solicitar corridas', oldTech: 'Táxi e Telefonista',
                tutorial: 'Como chamar um táxi, mas você vê onde o carro está pelo telefone.' }
        ],
        golpes: [
            { title: 'Golpes por Telefone', icon: 'phone_in_talk', color: '#fee2e2', textcolor: '#dc2626', desc: 'Se passando por órgãos do governo.', tips: ['Desligue imediatamente', 'Nunca forneça dados pessoais'] },
            { title: 'Phishing por Email', icon: 'mail', color: '#ffedd5', textcolor: '#ea580c', desc: 'Emails falsos pedindo senhas.', tips: ['Não clique em links', 'Exclua e marque como spam'] }
        ]
    },

    // 3. Renderização Dinâmica
    renderDashboard() {
        const container = document.querySelector('#tab-home .grid-2');
        container.innerHTML = this.data.apps.map(app => `
            <div class="card card-interactive text-center" onclick="app.openTutorial('${app.id}')">
                <div class="icon-circle" style="background-color: ${app.color}">
                    <span class="material-symbols-outlined">${app.icon}</span>
                </div>
                <h3 style="font-size: 16px; margin-bottom: 4px;">${app.name}</h3>
                <p style="font-size: 12px; color: #666;">${app.desc}</p>
            </div>
        `).join('');
    },

    renderTutoriais() {
        const container = document.getElementById('tutoriais-list');
        container.innerHTML = this.data.apps.map(app => `
            <div class="card card-interactive" onclick="app.openTutorial('${app.id}')" style="display: flex; gap: 16px; align-items: center;">
                <div class="icon-circle" style="background-color: ${app.color}; margin: 0; width: 50px; height: 50px;">
                    <span class="material-symbols-outlined" style="font-size: 24px;">${app.icon}</span>
                </div>
                <div>
                    <h3 style="font-size: 18px;">${app.name}</h3>
                    <div class="old-tech-badge">${app.oldTech}</div>
                </div>
                <span class="material-symbols-outlined" style="margin-left: auto; color: #9ca3af;">chevron_right</span>
            </div>
        `).join('');
    },

    renderGolpes() {
        const container = document.getElementById('golpes-list');
        container.innerHTML = this.data.golpes.map(golpe => `
            <div class="card" style="border-top: 4px solid ${golpe.textcolor};">
                <h3 style="display: flex; align-items: center; gap: 8px; color: ${golpe.textcolor}; margin-bottom: 8px;">
                    <span class="material-symbols-outlined">${golpe.icon}</span> ${golpe.title}
                </h3>
                <p class="mb-md">${golpe.desc}</p>
                <div style="background: #f0fdf4; padding: 12px; border-radius: 8px;">
                    <strong style="color: #166534; display: block; margin-bottom: 8px;">✓ O Que Fazer:</strong>
                    <ul style="color: #15803d; font-size: 14px; padding-left: 20px;">
                        ${golpe.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    },

    // 4. Detalhe do Tutorial
    openTutorial(appId) {
        const appData = this.data.apps.find(a => a.id === appId);
        if(!appData) return;

        // Configura o Cabeçalho
        const header = document.getElementById('detail-header');
        header.style.backgroundColor = appData.color;
        document.getElementById('detail-title').innerText = appData.name;
        document.getElementById('detail-icon').innerHTML = `<span class="material-symbols-outlined" style="color: ${appData.color}">${appData.icon}</span>`;

        // Configura o Conteúdo
        const content = document.getElementById('detail-content');
        content.innerHTML = `
            <div class="card mb-lg" style="border-left: 4px solid #3b82f6;">
                <h3 style="color: #1e3a8a; margin-bottom: 8px;">Conectando ao que Você Conhece</h3>
                <p><strong>Tecnologia Antiga:</strong> ${appData.oldTech}</p>
                <p style="margin-top: 8px;">${appData.tutorial || 'Tutorial detalhado em construção.'}</p>
            </div>
            
            <h2 class="mb-md">Passo a Passo</h2>
            <div class="card mb-md">
                <h3 class="flex-center gap-sm mb-md"><span style="background: ${appData.color}; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px;">1</span> Abra o Aplicativo</h3>
                <p>Procure o ícone na sua tela inicial e toque uma vez.</p>
            </div>
        `;

        document.getElementById('tutorial-detail-view').classList.remove('hidden');
    },

    closeTutorial() {
        document.getElementById('tutorial-detail-view').classList.add('hidden');
    }
};