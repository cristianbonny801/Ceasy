import { procesarDatos, seleccionarTipo } from "./estadisticaBasica.js";
import { generarTablaFrecuencia } from "./tablaFrecuencia.js";
import { descargarExcelBasico, descargarExcelFrecuencia } from "./excelExport.js";

document.getElementById("btnProcesar").addEventListener("click", procesarDatos);
document.getElementById("btnPoblacional").addEventListener("click", () => seleccionarTipo("poblacional"));
document.getElementById("btnMuestral").addEventListener("click", () => seleccionarTipo("muestral"));

document.querySelector("#btnDescargarCalculadora").addEventListener("click", descargarExcelBasico);
document.querySelector("#btnDescargar").addEventListener("click", descargarExcelFrecuencia);

document.querySelector("#inputs-frecuencia button").addEventListener("click", generarTablaFrecuencia);

