function calcularPromedio(array) {
  let suma = 0;
  for (let i = 0; i < array.length; i++) {
    suma += array[i];
  }
  return suma / array.length;
}

function calcularVarianza(array) {
  let media = calcularPromedio(array);
  let sumaCuadrados = 0;
  for (let i = 0; i < array.length; i++) {
    let diferencia = array[i] - media;
    sumaCuadrados += diferencia * diferencia;
  }
  return sumaCuadrados / array.length; // varianza poblacional
}

function calcularDesviacionEstandar(array) {
  return Math.sqrt(calcularVarianza(array));
}

function calcularCoeficienteVariacion(array) {
  let media = calcularPromedio(array);
  let desviacion = calcularDesviacionEstandar(array);
  return (desviacion / media) * 100;
}

let resultados = {}; // Guardamos resultados globalmente para exportar

function procesarDatos() {
  let input = document.getElementById("entradaNumeros").value;
  let numeros = input.split(",").map(num => parseFloat(num.trim()));

  if (numeros.some(isNaN) || numeros.length === 0) {
    alert("⚠️ Ingresa solo números válidos separados por comas.");
    return;
  }

  let promedio = calcularPromedio(numeros).toFixed(2);
  let varianza = calcularVarianza(numeros).toFixed(2);
  let desviacion = calcularDesviacionEstandar(numeros).toFixed(2);
  let coefVariacion = calcularCoeficienteVariacion(numeros).toFixed(2) + "%";

  // Mostrar en pantalla
  document.getElementById("promedio").innerText = promedio;
  document.getElementById("varianza").innerText = varianza;
  document.getElementById("desviacion").innerText = desviacion;
  document.getElementById("coefVariacion").innerText = coefVariacion;

  // Guardar resultados
  resultados = {
    Promedio: promedio,
    Varianza: varianza,
    "Desviación Estándar": desviacion,
    "Coef. de Variación": coefVariacion
  };
}
function descargarExcel() {
  console.log(XLSX); 
  if (!resultados || Object.keys(resultados).length === 0) {
    alert("⚠️ Primero calcula los resultados antes de descargar.");
    return;
  }

  let ws = XLSX.utils.json_to_sheet([resultados]);
  let wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Resultados");
  XLSX.writeFile(wb, "resultados_estadisticos.xlsx");
}
