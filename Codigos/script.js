// header visible on page load
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.main-header').classList.add('visible');
});

// 1. Scroll suave al hacer clic en "Inicio"
document.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    if (this.textContent.trim().toLowerCase() === 'inicio') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
});

// Validación de formulario y mensaje de confirmación animado
const form = document.getElementById('contactoForm');
if (form) {
  const exito = document.getElementById('form-exito');
  form.addEventListener('submit', function(e) {
    let valid = true;

    // Limpia errores anteriores
    form.querySelectorAll('.error').forEach(span => span.textContent = '');

    // Validación de nombre
    const nombre = form.nombre;
    if (!nombre.value.trim()) {
      nombre.nextElementSibling.textContent = 'Por favor, ingresa tu nombre.';
      valid = false;
      nombre.classList.add('input-error');
    } else {
      nombre.classList.remove('input-error');
    }

    // Validación de correo
    const correo = form.correo;
    if (!correo.value.trim()) {
      correo.nextElementSibling.textContent = 'Por favor, ingresa tu correo.';
      valid = false;
      correo.classList.add('input-error');
    } else if (!/\S+@\S+\.\S+/.test(correo.value)) {
      correo.nextElementSibling.textContent = 'Ingresa un correo válido.';
      valid = false;
      correo.classList.add('input-error');
    } else {
      correo.classList.remove('input-error');
    }

    // Validación de celular
    const celular = form.celular;
    if (!celular.value.trim()) {
      celular.nextElementSibling.textContent = 'Por favor, ingresa tu celular.';
      valid = false;
      celular.classList.add('input-error');
    } else if (!/^\d{10}$/.test(celular.value)) {
      celular.nextElementSibling.textContent = 'El celular debe tener 10 dígitos.';
      valid = false;
      celular.classList.add('input-error');
    } else {
      celular.classList.remove('input-error');
    }

    // Validación de mensaje
    const mensaje = form.mensaje;
    if (!mensaje.value.trim()) {
      mensaje.nextElementSibling.textContent = 'Por favor, escribe tu mensaje.';
      valid = false;
      mensaje.classList.add('input-error');
    } else {
      mensaje.classList.remove('input-error');
    }

    // Efecto shake en campos con error
    form.querySelectorAll('.input-error').forEach(input => {
      input.classList.remove('shake');
      void input.offsetWidth; // trigger reflow
      input.classList.add('shake');
    });

    if (!valid) {
      e.preventDefault();
      return;
    }

    // Si es válido, muestra el mensaje de éxito animado
    if (exito) {
      exito.style.display = 'flex';
      exito.classList.add('exito-animado');
      setTimeout(() => {
        exito.style.display = 'none';
        exito.classList.remove('exito-animado');
      }, 4000);
    }
    form.reset();
    e.preventDefault(); // Quita esto si usas backend real
  });

  // Limpia el efecto shake al escribir
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', function() {
      this.classList.remove('input-error', 'shake');
      if (this.nextElementSibling && this.nextElementSibling.classList.contains('error')) {
        this.nextElementSibling.textContent = '';
      }
    });
  });
}

// 3. Botón para volver arriba
const btnUp = document.createElement('button');
btnUp.textContent = '↑';
btnUp.setAttribute('tabindex', '0');
btnUp.style.position = 'fixed';
btnUp.style.bottom = '30px';
btnUp.style.right = '30px';
btnUp.style.display = 'none';
btnUp.style.padding = '10px 15px';
btnUp.style.fontSize = '24px';
btnUp.style.borderRadius = '50%';
btnUp.style.background = '#314652';
btnUp.style.color = '#fff';
btnUp.style.border = 'none';
btnUp.style.cursor = 'pointer';
btnUp.style.zIndex = '1000';
document.body.appendChild(btnUp);

window.addEventListener('scroll', () => {
  btnUp.style.display = window.scrollY > 200 ? 'block' : 'none';
});

btnUp.setAttribute('title', 'Volver arriba');

btnUp.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 4. Animaciones suaves al hacer scroll (fade-in)
document.querySelectorAll('.fade-in').forEach(el => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  });
  observer.observe(el);
});

// 5. Modo oscuro
document.getElementById('darkModeBtn').onclick = function() {
  document.body.classList.toggle('dark-mode');
};

// 6. Lightbox para imágenes
document.querySelectorAll('.lightbox-img').forEach(img => {
  img.onclick = function() {
    const modal = document.getElementById('lightbox-modal');
    modal.style.display = 'flex';
    modal.querySelector('img').src = this.src;
  };
});
const lightboxModal = document.getElementById('lightbox-modal');
if (lightboxModal) {
  lightboxModal.onclick = function() {
    lightboxModal.setAttribute('tabindex', '0');
    this.style.display = 'none';
  };
}

// 7. Barra de progreso de lectura
window.addEventListener('scroll', function() {
  const bar = document.getElementById('progress-bar');
  if (bar) {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    bar.style.width = scrolled + "%";
  }
});

// 8. Efecto de hover en botones
document.querySelectorAll('.buttons a').forEach(btn => {
  btn.addEventListener('mouseover', () => {
    btn.style.backgroundColor = '#2196f3';
    btn.style.color = '#fff';
  });
  btn.addEventListener('mouseout', () => {
    btn.style.backgroundColor = '';
    btn.style.color = '';
  });
});
// 9. Efecto de clic en botones
document.querySelectorAll('.buttons a').forEach(btn => {
  btn.addEventListener('mousedown', () => {
    btn.style.transform = 'scale(0.95)';
  });
  btn.addEventListener('mouseup', () => {
    btn.style.transform = 'scale(1)';
  });
});

// 10. Efecto de desplazamiento suave al hacer clic en enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 10. FAQ con preguntas y respuestas desplegables
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.setAttribute('tabindex', '0');
  btn.addEventListener('click', function() {
    this.classList.toggle('active');
    const answer = this.nextElementSibling;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  });
});

// 11. Carga de página con animación
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'none';
});

// 12. Efecto de parpadeo en el título principal
const mainTitle = document.querySelector('h1');

// 13. Sección de logros o estadísticas animadas
document.querySelectorAll('.contador').forEach(el => {
  let final = +el.dataset.numero;
  let count = 0;
  let step = Math.ceil(final / 100);
  function update() {
    count += step;
    if (count > final) count = final;
    el.textContent = count;
    if (count < final) setTimeout(update, 20);
  }
  update();
});

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark-mode');
}

// 14. Animación de los contadores en la sección de estadísticas
function animarContadores() {
  document.querySelectorAll('.contador').forEach(el => {
    const final = +el.dataset.numero;
    let count = 0;
    const step = Math.ceil(final / 100);
    el.textContent = '0';
    const actualizar = () => {
      count += step;
      if (count > final) count = final;
      el.textContent = count;
      if (count < final) {
        requestAnimationFrame(actualizar);
      }
    };
    actualizar();
  });
}

// 15. Para que solo se anime cuando la sección sea visible 
const estadisticas = document.querySelector('.estadisticas');
if (estadisticas) {
  let animado = false;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animado) {
        animarContadores();
        animado = true;
      }
    });
  }, { threshold: 0.3 });
  observer.observe(estadisticas);
}

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });
}

// 16. Configurando particles.js en mi JS
particlesJS('particles-js', {
  particles: {
    number: { value: 60, density: { enable: true, value_area: 800 } },
    color: { value: "#0d223a" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 4, random: true },
    line_linked: { enable: true, distance: 150, color: "#2f3196", opacity: 0.8, width: 1 },
    move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out" }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" }
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});

window.addEventListener('load', function() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'none';
  }
});

// 17. Efecto de parpadeo en el título principal
if (mainTitle) {
  setInterval(() => {
    mainTitle.classList.toggle('blink');
  }, 1000);
}

// 18. Buscador de texto en toda la página
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.search-form');
  const input = document.getElementById('buscador');
  const noResultMsg = document.getElementById('no-result-msg');
  let lastHighlights = [];

  function removeHighlights() {
    lastHighlights.forEach(span => {
      const parent = span.parentNode;
      parent.replaceChild(document.createTextNode(span.textContent), span);
      parent.normalize();
    });
    lastHighlights = [];
  }

  // 19. Resaltar texto en toda la página al buscar
  function highlightAll(root, text) {
    if (!text) return 0;
    let found = 0;
    const regex = new RegExp(`(${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while ((node = treeWalker.nextNode())) {
      if (
        node.parentNode &&
        node.nodeValue.trim() &&
        !['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'INPUT', 'TEXTAREA', 'BUTTON', 'SELECT', 'OPTION'].includes(node.parentNode.nodeName)
      ) {
        const matches = node.nodeValue.match(regex);
        if (matches) {
          found += matches.length;
          const parts = node.nodeValue.split(regex);
          const frag = document.createDocumentFragment();
          for (let i = 0; i < parts.length; i++) {
            if (i % 2 === 0) {
              frag.appendChild(document.createTextNode(parts[i]));
            } else {
              const s = document.createElement('span');
              s.className = 'highlight-search';
              s.textContent = parts[i];
              lastHighlights.push(s);
              frag.appendChild(s);
            }
          }
          node.parentNode.replaceChild(frag, node);
        }
      }
    }
    return found;
  }

function buscarYMostrarMensaje() {
  removeHighlights();
  const texto = input.value.trim().toLowerCase();
  let found = 0;
  if (texto.length > 0) {
    found = highlightAll(document.body, texto);
  }
  if (noResultMsg) {
    noResultMsg.style.display = (texto.length > 0 && found === 0) ? 'block' : 'none';
  }

  // 20. Animación de artículos al buscar
  document.querySelectorAll('.articulo').forEach(art => {
    if (texto === '' || art.textContent.toLowerCase().includes(texto)) {
      art.classList.add('visible-busqueda');
    } else {
      art.classList.remove('visible-busqueda');
    }
  });
}

  if (form && input) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      buscarYMostrarMensaje();
    });

    input.addEventListener('input', function() {
      buscarYMostrarMensaje();
    });
  }
});

// 21. Cerrar mensaje de "No se encontraron resultados"
const cerrarNoResult = document.getElementById('cerrar-noresult');
if (cerrarNoResult && noResultMsg) {
  cerrarNoResult.onclick = () => { noResultMsg.style.display = 'none'; };
}

// 22. Banner de cookies
document.addEventListener('DOMContentLoaded', function() {
  const banner = document.getElementById('cookie-banner');
  const aceptar = document.getElementById('aceptar-cookies');
  const cerrar = document.getElementById('cerrar-cookies');
  if (!localStorage.getItem('cookiesAceptadas')) {
    banner.classList.add('show');
  }
  aceptar.onclick = function() {
    localStorage.setItem('cookiesAceptadas', 'true');
    banner.classList.remove('show');
  };
  cerrar.onclick = function() {
    banner.classList.remove('show');
  };
}); 

// 23. Mostrar todos los artículos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.articulo').forEach(art => {
    art.classList.add('visible-busqueda');
  });
});
