// Função para atualizar o relógio
function updateClock() {
    const now = new Date();
    const seconds = now.getSeconds() + now.getMilliseconds() / 1000; // segundos com fração
    const minutes = now.getMinutes() + (seconds / 60); // minutos com fração
    const hours = (now.getHours() % 12) + (minutes / 60); // horas com fração
    
    // Calcular os ângulos dos ponteiros
    const secondAngle = seconds * 6; // 6 graus por segundo, 0° aponta para 12h
    const minuteAngle = minutes * 6; // 6 graus por minuto
    const hourAngle = hours * 30; // 30 graus por hora
    
    // Aplicar rotação aos ponteiros
    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');
    
    function setRotation(element, angle) {
    if (element) {
        element.style.transform = `rotate(${angle}deg)`;
    }}
    
    setRotation(hourHand, hourAngle);
    setRotation(minuteHand, minuteAngle);
    setRotation(secondHand, secondAngle);
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
                0 0 80px rgba(255, 215, 0, 0.3),
                inset 0 0 80px rgba(255, 215, 0, 0.15)
            `;
        });

        clock.addEventListener('mouseleave', function() {
            this.style.boxShadow = `
                0 0 50px rgba(255, 215, 0, 0.2),
                inset 0 0 50px rgba(255, 215, 0, 0.1)
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
    
    // Inicializar controles de cor
    initColorPickers();
    
    // Inicializar drawer inferior
    initBottomDrawer();

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

// Inicializa os inputs de cor e vincula mudanças aos ponteiros
function initColorPickers() {
    const hourColorInput = document.getElementById('hour-color');
    const minuteColorInput = document.getElementById('minute-color');
    const secondColorInput = document.getElementById('second-color');
    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');

    if (hourColorInput && hourHand) {
        // aplica cor inicial
        setHandColor(hourHand, hourColorInput.value, 'hour');
        hourColorInput.addEventListener('input', (e) => {
            setHandColor(hourHand, e.target.value, 'hour');
        });
    }

    if (minuteColorInput && minuteHand) {
        setHandColor(minuteHand, minuteColorInput.value, 'minute');
        minuteColorInput.addEventListener('input', (e) => {
            setHandColor(minuteHand, e.target.value, 'minute');
        });
    }

    if (secondColorInput && secondHand) {
        setHandColor(secondHand, secondColorInput.value, 'second');
        secondColorInput.addEventListener('input', (e) => {
            setHandColor(secondHand, e.target.value, 'second');
        });
    }
}

// Aplica uma cor sólida mantendo leve efeito de luz
function setHandColor(handEl, hexColor, type) {
    const light = lightenHex(hexColor, 0.25);
    handEl.style.background = `linear-gradient(to top, ${hexColor}, ${light})`;
}

// Utilitário simples: clarear cor hex
function lightenHex(hex, amount) {
    const { r, g, b } = hexToRgb(hex);
    const nr = Math.round(r + (255 - r) * amount);
    const ng = Math.round(g + (255 - g) * amount);
    const nb = Math.round(b + (255 - b) * amount);
    return rgbToHex(nr, ng, nb);
}

function hexToRgb(hex) {
    const clean = hex.replace('#', '');
    const bigint = parseInt(clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean, 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

function rgbToHex(r, g, b) {
    const toHex = (v) => v.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Drawer inferior: abre/fecha e gerencia acessibilidade
function initBottomDrawer() {
    const toggleBtn = document.getElementById('drawer-toggle');
    const drawer = document.getElementById('about-drawer');
    if (!toggleBtn || !drawer) return;

    const openDrawer = () => {
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.querySelector('.drawer-caret')?.replaceChildren(document.createTextNode('▾'));
    };

    const closeDrawer = () => {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.querySelector('.drawer-caret')?.replaceChildren(document.createTextNode('▴'));
    };

    const toggle = () => {
        if (drawer.classList.contains('open')) {
            closeDrawer();
        } else {
            openDrawer();
        }
    };

    toggleBtn.addEventListener('click', toggle);

    // Fechar com ESC quando aberto
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('open')) {
            closeDrawer();
            toggleBtn.focus();
        }
    });
}
