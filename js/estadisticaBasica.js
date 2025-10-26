export let resultadosBasicos = {};
let tipoCalculo = "poblacional";

export function seleccionarTipo(tipo) {
    tipoCalculo = tipo;
    const botones = document.querySelectorAll(".toggle-buttons button");
    botones.forEach((btn) => btn.classList.remove("active"));
    const boton = document.getElementById(tipo === "poblacional" ? "btnPoblacional" : "btnMuestral");
    if (boton) boton.classList.add("active");
}

// --- Funciones estadísticas ---
function calcularPromedio(array) {
    return array.reduce((a, b) => a + b, 0) / array.length;
}

function calcularVarianza(array, tipo = "poblacional") {
    const media = calcularPromedio(array);
    const sumaCuadrados = array.reduce((acc, x) => acc + (x - media) ** 2, 0);
    return tipo === "muestral" && array.length > 1
        ? sumaCuadrados / (array.length - 1)
        : sumaCuadrados / array.length;
}

function calcularDesviacionEstandar(array, tipo = "poblacional") {
    return Math.sqrt(calcularVarianza(array, tipo));
}

function calcularCoeficienteVariacion(array, tipo = "poblacional") {
    return (calcularDesviacionEstandar(array, tipo) / calcularPromedio(array)) * 100;
}

function calcularMediana(array) {
    let datos = [...array].sort((a, b) => a - b);
    const mid = Math.floor(datos.length / 2);
    return datos.length % 2 === 0 ? (datos[mid - 1] + datos[mid]) / 2 : datos[mid];
}

function calcularModa(array) {
    const frec = {};
    for (const n of array) frec[n] = (frec[n] || 0) + 1;
    const max = Math.max(...Object.values(frec));
    return Object.keys(frec)
        .filter((n) => frec[n] === max)
        .join(", ");
}

function calcularCuartiles(array) {
    let datos = [...array].sort((a, b) => a - b);
    let Q1 = calcularMediana(datos.slice(0, Math.floor(datos.length / 2)));
    let Q2 = calcularMediana(datos);
    let Q3 = calcularMediana(datos.slice(Math.ceil(datos.length / 2)));
    return { Q1, Q2, Q3 };
}

// --- Procesar datos y mostrar ---
export function procesarDatos() {
    try {
        let input = document.getElementById("entradaNumeros").value;
        let numeros = input
            .split(",")
            .map((n) => parseFloat(n.trim()))
            .filter((n) => !isNaN(n));

        if (numeros.length === 0) throw new Error("Ingresa al menos un número válido.");

        const promedio = calcularPromedio(numeros).toFixed(2);
        const varianza = calcularVarianza(numeros, tipoCalculo).toFixed(2);
        const desviacion = calcularDesviacionEstandar(numeros, tipoCalculo).toFixed(2);
        const coefVariacion = calcularCoeficienteVariacion(numeros, tipoCalculo).toFixed(2) + "%";
        const mediana = calcularMediana(numeros).toFixed(2);
        const moda = calcularModa(numeros);
        const minimo = Math.min(...numeros);
        const maximo = Math.max(...numeros);
        const rango = maximo - minimo;
        const { Q1, Q2, Q3 } = calcularCuartiles(numeros);

        const infoDiv = document.getElementById("info-estadistica");
        infoDiv.innerHTML = "";

        const resumen = [
            ["Cantidad de datos", numeros.length],
            ["Mínimo", minimo],
            ["Máximo", maximo],
            ["Rango", rango],
            ["Promedio", promedio],
            ["Varianza", varianza],
            ["Desviación Estándar", desviacion],
            ["Coeficiente de Variación", coefVariacion],
            ["Mediana", mediana],
            ["Moda", moda],
            ["Cuartil 1 (Q1)", Q1.toFixed(2)],
            ["Cuartil 2 (Q2)", Q2.toFixed(2)],
            ["Cuartil 3 (Q3)", Q3.toFixed(2)],
        ];

        resumen.forEach(([titulo, valor]) => {
            const p = document.createElement("p");
            p.innerHTML = `<strong>${titulo}:</strong> ${valor}`;
            infoDiv.appendChild(p);
        });

        resultadosBasicos = {
            "Tipo de cálculo": tipoCalculo,
            "Cantidad de datos": numeros.length,
            "Mínimo": minimo,
            "Máximo": maximo,
            "Rango": rango,
            "Promedio": promedio,
            "Varianza": varianza,
            "Desviación Estándar": desviacion,
            "Coeficiente de Variación": coefVariacion,
            "Mediana": mediana,
            "Moda": moda,
            Q1: Q1.toFixed(2),
            Q2: Q2.toFixed(2),
            Q3: Q3.toFixed(2),
        };
    } catch (error) {
        alert(error.message);
    }
}
