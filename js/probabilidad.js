const btnsProb = document.querySelectorAll(".btn-prob");
const resultadoProb = document.getElementById("resultado-prob");
const tituloProb = document.getElementById("titulo-prob");
const contenidoProb = document.getElementById("contenido-prob");

btnsProb.forEach(btn => {
    btn.addEventListener("click", () => {
        const tipo = btn.dataset.tipo;
        mostrarProb(tipo);
    });
});

function mostrarProb(tipo) {
    resultadoProb.classList.remove("oculto");

    switch (tipo) {
        case "simple":
            tituloProb.textContent = "🎯 Probabilidad Simple";
            contenidoProb.innerHTML = `
        <p>Introduce el número de casos favorables y el total de casos posibles:</p>
        <input id="favorables" type="number" placeholder="Casos favorables">
        <input id="posibles" type="number" placeholder="Casos posibles">
        <button onclick="calcSimple()">Calcular</button>
        <p id="resSimple"></p>
      `;
            break;

        case "compuesta":
            tituloProb.textContent = "⚖️ Probabilidad Compuesta";
            contenidoProb.innerHTML = `
        <p>Introduce la probabilidad del evento A y del evento B:</p>
        <input id="probA" type="number" placeholder="P(A)" step="0.01">
        <input id="probB" type="number" placeholder="P(B)" step="0.01">
        <button onclick="calcCompuesta()">Calcular</button>
        <p id="resCompuesta"></p>
      `;
            break;

        case "condicional":
            tituloProb.textContent = "🔗 Probabilidad Condicional";
            contenidoProb.innerHTML = `
        <p>Introduce P(A∩B) y P(B):</p>
        <input id="interseccion" type="number" placeholder="P(A∩B)" step="0.01">
        <input id="probBcond" type="number" placeholder="P(B)" step="0.01">
        <button onclick="calcCondicional()">Calcular</button>
        <p id="resCondicional"></p>
      `;
            break;

        case "bayes":
            tituloProb.textContent = "🧩 Regla de Bayes";
            contenidoProb.innerHTML = `
        <p>Introduce los siguientes valores:</p>
        <input id="probB_dadoA" type="number" placeholder="P(B|A)" step="0.01">
        <input id="probA" type="number" placeholder="P(A)" step="0.01">
        <input id="probB" type="number" placeholder="P(B)" step="0.01">
        <button onclick="calcBayes()">Calcular</button>
        <p id="resBayes"></p>
      `;
            break;
    }
}

// =============================
// FUNCIONES DE CÁLCULO
// =============================
function calcSimple() {
    const f = parseFloat(document.getElementById("favorables").value);
    const p = parseFloat(document.getElementById("posibles").value);
    if (p <= 0 || isNaN(f) || isNaN(p)) return alert("Ingresa valores válidos");
    const resultado = (f / p).toFixed(4);
    document.getElementById("resSimple").textContent = `P(E) = ${resultado}`;
}

function calcCompuesta() {
    const a = parseFloat(document.getElementById("probA").value);
    const b = parseFloat(document.getElementById("probB").value);
    if (isNaN(a) || isNaN(b)) return alert("Ingresa valores válidos");
    const resultado = (a * b).toFixed(4);
    document.getElementById("resCompuesta").textContent = `P(A y B) = ${resultado}`;
}

function calcCondicional() {
    const inter = parseFloat(document.getElementById("interseccion").value);
    const pb = parseFloat(document.getElementById("probBcond").value);
    if (pb <= 0 || isNaN(inter) || isNaN(pb)) return alert("Ingresa valores válidos");
    const resultado = (inter / pb).toFixed(4);
    document.getElementById("resCondicional").textContent = `P(A|B) = ${resultado}`;
}

function calcBayes() {
    const b_a = parseFloat(document.getElementById("probB_dadoA").value);
    const a = parseFloat(document.getElementById("probA").value);
    const b = parseFloat(document.getElementById("probB").value);
    if (b <= 0 || isNaN(b_a) || isNaN(a) || isNaN(b)) return alert("Ingresa valores válidos");
    const resultado = ((b_a * a) / b).toFixed(4);
    document.getElementById("resBayes").textContent = `P(A|B) = ${resultado}`;
}
