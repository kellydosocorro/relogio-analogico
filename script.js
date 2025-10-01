// Função para atualizar o relógio
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Calcular os ângulos dos ponteiros
    const secondAngle = (seconds * 6) - 90; // 6 graus por segundo
    const minuteAngle = (minutes * 6) + (seconds * 0.1) - 90; // 6 graus por minuto + suavização
    const hourAngle = ((hours % 12) * 30) + (minutes * 0.5) - 90; // 30 graus por hora + suavização
    
    // Aplicar rotação aos ponteiros
    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');
    
    if (hourHand) hourHand.style.transform = `rotate(${hourAngle}deg)`;
    if (minuteHand) minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
    if (secondHand) secondHand.style.transform = `rotate(${secondAngle}deg)`;
}

// Função para o botão seguir
function initFollowButton() {
    const followBtn = document.getElementById('follow-btn');
    
    if (followBtn) {
        followBtn.addEventListener('click', function() {
            if (this.classList.contains('following')) {
                // Se já está seguindo, deixar de seguir
                this.classList.remove('following');
                this.textContent = 'Seguir';
                showNotification('Você deixou de seguir este perfil', 'unfollow');
            } else {
                // Se não está seguindo, começar a seguir
                this.classList.add('following');
                this.textContent = 'Seguindo';
                showNotification('Você agora está seguindo este perfil!', 'follow');
            }
        });
    }
}

// Função para mostrar notificações
function showNotification(message, type) {
    // Remove notificação anterior se existir
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'follow' ? 'linear-gradient(45deg, #00b894, #00a085)' : 'linear-gradient(45deg, #fd79a8, #e84393)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-weight: 600;
        transform: translateX(350px);
        transition: transform 0.3s ease-in-out;
        max-width: 300px;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(350px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Função para adicionar efeitos visuais ao relógio
function addClockEffects() {
    const clock = document.querySelector('.clock');
    
    if (clock) {
        // Efeito de brilho no hover
        clock.addEventListener('mouseenter', function() {
            this.style.boxShadow = `
                0 0 80px rgba(255, 255, 255, 0.2),
                inset 0 0 80px rgba(255, 255, 255, 0.1)
            `;
        });
        
        clock.addEventListener('mouseleave', function() {
            this.style.boxShadow = `
                0 0 50px rgba(255, 255, 255, 0.1),
                inset 0 0 50px rgba(255, 255, 255, 0.05)
            `;
        });
    }
}

// Função para inicializar tudo quando a página carregar
function init() {
    // Atualizar o relógio imediatamente
    updateClock();
    
    // Atualizar o relógio a cada segundo
    setInterval(updateClock, 1000);
    
    // Inicializar botão seguir
    initFollowButton();
    
    // Adicionar efeitos visuais
    addClockEffects();
    
    console.log('Relógio analógico inicializado com sucesso!');
}

// Aguardar o DOM carregar completamente
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Função utilitária para debug
function debugClock() {
    const now = new Date();
    console.log(`Hora atual: ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
}
