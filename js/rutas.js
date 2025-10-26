const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

// Función para mostrar solo la sección activa
function mostrarSeccion(id) {
  sections.forEach(sec => {
    sec.style.display = sec.id === id ? "block" : "none";
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });

  history.pushState(null, null, `#${id}`);
}

// Click en links
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const id = link.getAttribute("href").substring(1);
    mostrarSeccion(id);
  });
});

// Mostrar la sección según hash al cargar
window.addEventListener("load", () => {
  const hash = window.location.hash.substring(1) || "inicio";
  mostrarSeccion(hash);
});

// Opcional: cambiar sección con back/forward del navegador
window.addEventListener("hashchange", () => {
  const hash = window.location.hash.substring(1);
  if (hash) mostrarSeccion(hash);
});

mostrarSeccion("tabla-frecuencia");
generarTablaFrecuencia();

