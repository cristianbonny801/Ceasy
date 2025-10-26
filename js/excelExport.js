import { resultadosBasicos } from "./estadisticaBasica.js";
import { resultadosFrecuencia, tablaFrecuencia } from "./tablaFrecuencia.js";

export function descargarExcelBasico() {
  if (!Object.keys(resultadosBasicos).length)
    return alert("Primero calcula los resultados antes de descargar.");

  const ws = XLSX.utils.json_to_sheet([resultadosBasicos]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Estadística básica");
  XLSX.writeFile(wb, "estadistica_basica.xlsx");
}

export function descargarExcelFrecuencia() {
  if (!tablaFrecuencia.length)
    return alert("Primero genera la tabla antes de descargar.");

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(tablaFrecuencia), "Tabla");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet([resultadosFrecuencia]), "Resumen");
  XLSX.writeFile(wb, "tabla_frecuencia.xlsx");
}
