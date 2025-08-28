// ===== SELECCIÓN DE TIPO DE CÁLCULO =====
let tipoCalculo = "poblacional";

function seleccionarTipo(tipo) {
  tipoCalculo = tipo;

  const botones = document.querySelectorAll(".toggle-buttons button");
  botones.forEach(btn => btn.classList.remove("active"));

  const boton = document.getElementById(
    tipo === "poblacional" ? "btnPoblacional" : "btnMuestral"
  );
  if (boton) boton.classList.add("active");
}

// ===== FUNCIONES ESTADÍSTICAS =====
function calcularPromedio(array) {
  let suma = 0;
  for (let i = 0; i < array.length; i++) {
    suma += array[i];
  }
  return suma / array.length;
}

function calcularVarianza(array, tipo = "poblacional") {
  let media = calcularPromedio(array);
  let sumaCuadrados = 0;
  for (let i = 0; i < array.length; i++) {
    sumaCuadrados += (array[i] - media) ** 2;
  }
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

// ===== PROCESAR DATOS =====
let resultados = {};

function procesarDatos() {
  try {
    let input = document.getElementById("entradaNumeros").value;
    let numeros = input
      .split(",")
      .map(n => n.trim())
      .filter(Boolean)
      .map(n => {
        if (isNaN(n)) throw new Error(`"${n}" no es un número válido`);
        return parseFloat(n);
      });

    if (numeros.length === 0) throw new Error("Ingresa al menos un número.");

    const promedio = calcularPromedio(numeros).toFixed(2);
    const varianza = calcularVarianza(numeros, tipoCalculo).toFixed(2);
    const desviacion = calcularDesviacionEstandar(numeros, tipoCalculo).toFixed(2);
    const coefVariacion = calcularCoeficienteVariacion(numeros, tipoCalculo).toFixed(2) + "%";

    document.getElementById("promedio").innerText = promedio;
    document.getElementById("varianza").innerText = varianza;
    document.getElementById("desviacion").innerText = desviacion;
    document.getElementById("coefVariacion").innerText = coefVariacion;

    resultados = {
      Promedio: promedio,
      Varianza: varianza,
      "Desviación Estándar": desviacion,
      "Coef. de Variación": coefVariacion,
      "Tipo de cálculo": tipoCalculo
    };

  } catch (error) {
    alert("⚠️ " + error.message);
  }
}

// ===== DESCARGAR EXCEL =====
function descargarExcel() {
  if (!resultados || Object.keys(resultados).length === 0) {
    alert("⚠️ Primero calcula los resultados antes de descargar.");
    return;
  }

  const ws = XLSX.utils.json_to_sheet([resultados]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Resultados");
  XLSX.writeFile(wb, "resultados_estadisticos.xlsx");
}
