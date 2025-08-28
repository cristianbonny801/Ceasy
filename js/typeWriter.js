function typeWriter(elementId, speed = 50) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    element.textContent = ''; // limpiar texto antes de iniciar
    let i = 0;
    const interval = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(interval);
    }, speed);
}

// Ejecutar al cargar la página
window.addEventListener('load', () => {
    typeWriter('titulo', 100);      // velocidad título
    typeWriter('descripcion', 30);  // velocidad párrafo
});
