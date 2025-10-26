const btnMenu = document.getElementById("btnMenu");
const sidebar = document.querySelector(".sidebar");

// Crear fondo semitransparente
const overlay = document.createElement("div");
overlay.classList.add("overlay");
document.body.appendChild(overlay);

// Abrir / cerrar menú
btnMenu.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Cerrar al hacer clic fuera
overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});
