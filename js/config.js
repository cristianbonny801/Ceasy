// ==================== CONFIGURACIÓN ====================
const toggleThemeBtn = document.getElementById("toggle-theme");
const fontSizeInput = document.getElementById("font-size");
const fontSizeLabel = document.getElementById("font-size-label");
const primaryColorInput = document.getElementById("primary-color");
const saveBtn = document.getElementById("save-settings");
const saveMessage = document.getElementById("save-message");

// 🌗 Alternar tema
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  toggleThemeBtn.textContent = isDark
    ? "Cambiar a Modo Claro ☀️"
    : "Cambiar a Modo Oscuro 🌙";
});

// 🔤 Ajustar tamaño de fuente
fontSizeInput.addEventListener("input", (e) => {
  const size = e.target.value + "px";
  document.documentElement.style.fontSize = size;
  fontSizeLabel.textContent = size;
});

// 🎨 Cambiar color principal
primaryColorInput.addEventListener("input", (e) => {
  const color = e.target.value;
  document.documentElement.style.setProperty("--primary", color);
});

// 💾 Guardar configuración
saveBtn.addEventListener("click", () => {
  const settings = {
    darkMode: document.body.classList.contains("dark-mode"),
    fontSize: fontSizeInput.value,
    primaryColor: primaryColorInput.value
  };
  localStorage.setItem("userSettings", JSON.stringify(settings));
  saveMessage.style.display = "block";
  saveMessage.textContent = "✅ Configuración guardada correctamente.";
  setTimeout(() => (saveMessage.style.display = "none"), 2000);
});

// 🚀 Cargar configuración guardada
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("userSettings");
  if (saved) {
    const { darkMode, fontSize, primaryColor } = JSON.parse(saved);
    if (darkMode) {
      document.body.classList.add("dark-mode");
      toggleThemeBtn.textContent = "Cambiar a Modo Claro ☀️";
    }
    if (fontSize) {
      document.documentElement.style.fontSize = fontSize + "px";
      fontSizeInput.value = fontSize;
      fontSizeLabel.textContent = fontSize + "px";
    }
    if (primaryColor) {
      document.documentElement.style.setProperty("--primary", primaryColor);
      primaryColorInput.value = primaryColor;
    }
  }
});
