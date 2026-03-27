// NAVEGACIÓN ENTRE PÁGINAS
function irA(pageId) {
    // Ocultar todas las páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Mostrar página seleccionada
    document.getElementById(pageId).classList.add('active');
    
    // Actualizar nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
    
    // Resetear scroll
    window.scrollTo(0, 0);
}

// REVELAR MENSAJE
function revelarMensaje() {
    const mensaje = document.getElementById('mensaje-revelado');
    if (mensaje.style.display === 'none') {
        mensaje.style.display = 'block';
    } else {
        mensaje.style.display = 'none';
    }
}

// CONTADOR DE FUEGOS ARTIFICIALES
let contadorClics = 0;

// CREAR FUEGOS ARTIFICIALES
function crearFuegos() {
    contadorClics++;
    document.getElementById('clics').textContent = contadorClics;
    
    const colors = [
        '#ff006e',  // neon pink
        '#ff69b4',  // hot pink
        '#da70d6',  // violeta
        '#00f5ff',  // cyan
        '#9d4edd',  // purple
        '#ff1744',  // red
        '#f50057',  // deep pink
        '#c100f2'   // purple neon
    ];
    
    // Crear múltiples proyectiles desde diferentes puntos
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            crearExplosion(colors);
        }, i * 200);
    }
    
    // Sonido visual (parpadeo)
    const btn = document.querySelector('.btn-sorpresa');
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 100);
}

function crearExplosion(colors) {
    const container = document.getElementById('canvas-fuegos');
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;
    
    // Número de partículas
    const numPartículas = 30;
    
    for (let i = 0; i < numPartículas; i++) {
        const partícula = document.createElement('div');
        partícula.className = 'particula';
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 8 + 2;
        
        partícula.style.left = centerX + 'px';
        partícula.style.top = centerY + 'px';
        partícula.style.width = size + 'px';
        partícula.style.height = size + 'px';
        partícula.style.background = color;
        partícula.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        
        // Ángulo aleatorio
        const ángulo = (Math.PI * 2 * i) / numPartículas;
        const velocidad = Math.random() * 200 + 150;
        
        const tx = Math.cos(ángulo) * velocidad;
        const ty = Math.sin(ángulo) * velocidad;
        
        partícula.style.setProperty('--tx', tx + 'px');
        partícula.style.setProperty('--ty', ty + 'px');
        
        partícula.style.animation = `explode ${Math.random() * 1 + 0.8}s ease-out forwards`;
        
        container.appendChild(partícula);
        
        // Eliminar partícula después de la animación
        setTimeout(() => {
            partícula.remove();
        }, 1800);
    }
}

// Efectos adicionales
document.addEventListener('DOMContentLoaded', () => {
    // Crear partículas de fondo
    crearPartículasDeFondo();
    
    // Teclado shortcut para navegar
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            const paginas = ['inicio', 'dedicatoria', 'sorpresa'];
            const paginaActual = document.querySelector('.page.active').id;
            const indice = paginas.indexOf(paginaActual);
            if (indice < paginas.length - 1) {
                irA(paginas[indice + 1]);
            }
        } else if (e.key === 'ArrowLeft') {
            const paginas = ['inicio', 'dedicatoria', 'sorpresa'];
            const paginaActual = document.querySelector('.page.active').id;
            const indice = paginas.indexOf(paginaActual);
            if (indice > 0) {
                irA(paginas[indice - 1]);
            }
        }
    });
});

function crearPartículasDeFondo() {
    const container = document.querySelector('.particles');
    const numPartículas = 50;
    
    for (let i = 0; i < numPartículas; i++) {
        const partícula = document.createElement('div');
        partícula.style.position = 'absolute';
        partícula.style.width = Math.random() * 4 + 1 + 'px';
        partícula.style.height = partícula.style.width;
        partícula.style.background = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`;
        partícula.style.borderRadius = '50%';
        partícula.style.left = Math.random() * 100 + '%';
        partícula.style.top = Math.random() * 100 + '%';
        partícula.style.pointerEvents = 'none';
        partícula.style.animation = `float ${Math.random() * 20 + 10}s infinite linear`;
        
        container.appendChild(partícula);
    }
}

// Efecto de audio visual en interacciones (opcional)
function playClickSound() {
    // Puedes agregar sonido aquí si deseas
    // const audio = new Audio('click.mp3');
    // audio.play().catch(e => console.log('Audio no disponible'));
}

// Mensaje animado
document.querySelectorAll('.corazon').forEach(heart => {
    heart.addEventListener('click', function() {
        // Crear evento de clic visual
        const rect = this.getBoundingClientRect();
        crearExplosionEnPunto(rect.x + rect.width / 2, rect.y + rect.height / 2);
    });
});

function crearExplosionEnPunto(x, y) {
    const colors = ['#ff006e', '#ff69b4', '#da70d6', '#00f5ff'];
    
    for (let i = 0; i < 15; i++) {
        const span = document.createElement('span');
        span.style.position = 'fixed';
        span.style.left = x + 'px';
        span.style.top = y + 'px';
        span.style.fontSize = '1rem';
        span.style.pointerEvents = 'none';
        span.style.zIndex = '1000';
        span.textContent = '💖';
        
        const ángulo = (Math.PI * 2 * i) / 15;
        const velocidad = Math.random() * 100 + 50;
        
        const tx = Math.cos(ángulo) * velocidad;
        const ty = Math.sin(ángulo) * velocidad;
        
        span.style.setProperty('--tx', tx + 'px');
        span.style.setProperty('--ty', ty + 'px');
        span.style.animation = `explode 1s ease-out forwards`;
        
        document.body.appendChild(span);
        
        setTimeout(() => {
            span.remove();
        }, 1000);
    }
}

// Prevenir selección de texto en botones
document.querySelectorAll('button').forEach(btn => {
    btn.style.userSelect = 'none';
});

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
