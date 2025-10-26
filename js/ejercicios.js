const botonesEjercicio = document.querySelectorAll(".btn-ejercicio");
const resultadoEjercicio = document.getElementById("resultado-ejercicio");
const tituloEjercicio = document.getElementById("titulo-ejercicio");
const contenidoEjercicio = document.getElementById("contenido-ejercicio");
const btnFinalizar = document.getElementById("btnFinalizar");

botonesEjercicio.forEach(btn => {
  btn.addEventListener("click", () => {
    const tipo = btn.closest(".ej-card").dataset.ejercicio;
    mostrarEjercicio(tipo);
  });
});

function mostrarEjercicio(tipo) {
  // Mostrar contenedor
  resultadoEjercicio.classList.remove("oculto");

  // Cambiar título según el tipo de ejercicio
  switch (tipo) {
    case "media":
      tituloEjercicio.textContent = "📊 Media Aritmética";
      contenidoEjercicio.innerHTML = `
        <p>Introduce los datos separados por comas:</p>
        <input type="text" id="datosMedia" placeholder="Ej: 2,4,6,8">
        <button onclick="calcularMedia()">Calcular</button>
        <p id="resMedia"></p>
      `;
      break;

    case "mediana":
      tituloEjercicio.textContent = "📈 Mediana";
      contenidoEjercicio.innerHTML = `
        <p>Introduce los datos separados por comas:</p>
        <input type="text" id="datosMediana" placeholder="Ej: 1,3,3,6,7,8,9">
        <button onclick="calcularMediana()">Calcular</button>
        <p id="resMediana"></p>
      `;
      break;

    case "moda":
      tituloEjercicio.textContent = "📉 Moda";
      contenidoEjercicio.innerHTML = `
        <p>Introduce los datos separados por comas:</p>
        <input type="text" id="datosModa" placeholder="Ej: 1,2,2,3,4">
        <button onclick="calcularModa()">Calcular</button>
        <p id="resModa"></p>
      `;
      break;

    case "desviacion":
      tituloEjercicio.textContent = "🧮 Desviación Estándar";
      contenidoEjercicio.innerHTML = `
        <p>Introduce los datos separados por comas:</p>
        <input type="text" id="datosDesviacion" placeholder="Ej: 2,4,4,4,5,5,7,9">
        <button onclick="calcularDesviacion()">Calcular</button>
        <p id="resDesviacion"></p>
      `;
      break;
  }
}

// Ocultar ejercicio al finalizar
btnFinalizar.addEventListener("click", () => {
  resultadoEjercicio.classList.add("oculto");
});
