export let tablaFrecuencia = [];
export let resultadosFrecuencia = {};
let miGrafico;

export function obtenerDatos() {
  const input = document.getElementById("datos-frecuencia").value;
  if (!input.trim()) return alert("Por favor ingresa los datos."), null;

  const datos = input
    .split(",")
    .map((n) => parseFloat(n.trim()))
    .filter((n) => !isNaN(n));

  if (datos.length === 0) return alert("No se ingresaron números válidos."), null;

  return datos;
}

export function calcularTabla(datos) {
  datos.sort((a, b) => a - b);
  const n = datos.length;
  const min = Math.min(...datos);
  const max = Math.max(...datos);
  const rango = max - min;
  const k = Math.round(1 + 3.322 * Math.log10(n));
  const ancho = Math.ceil(rango / k);

  let intervalos = [];
  let inicio = min;
  let acumulada = 0;

  for (let i = 0; i < k; i++) {
    const fin = i === k - 1 ? max : inicio + ancho;
    const frec = datos.filter((x) =>
      i === k - 1 ? x >= inicio && x <= fin : x >= inicio && x < fin
    ).length;
    acumulada += frec;
    intervalos.push({
      Intervalo: `${inicio} - ${fin}`,
      MarcaClase: ((inicio + fin) / 2).toFixed(2),
      Frecuencia: frec,
      FrecuenciaRelativa: (frec / n).toFixed(2),
      FrecuenciaAcumulada: acumulada,
    });
    inicio = fin;
  }

  resultadosFrecuencia = {
    "Cantidad de datos": n,
    Mínimo: min,
    Máximo: max,
    Rango: rango,
    "Número de intervalos (k)": k,
    "Ancho de intervalo": ancho,
    "Sumatoria Frecuencia Relativa": intervalos
      .reduce((acc, fila) => acc + parseFloat(fila.FrecuenciaRelativa), 0)
      .toFixed(2),
  };

  tablaFrecuencia = intervalos;
  return { intervalos, resultadosFrecuencia };
}

export function crearTablaHTML(intervalos, resultados) {
  let tablaHTML = `
  <div class="info-estadistica">
    <p><strong>Cantidad de datos:</strong> ${resultados["Cantidad de datos"]}</p>
    <p><strong>Mínimo:</strong> ${resultados.Mínimo}</p>
    <p><strong>Máximo:</strong> ${resultados.Máximo}</p>
    <p><strong>Rango:</strong> ${resultados.Rango}</p>
  </div>
  <table border="1" style="width:100%;text-align:center;">
    <tr>
      <th>Intervalo</th><th>Marca de Clase</th>
      <th>Frecuencia</th><th>Frecuencia Relativa</th><th>Frecuencia Acumulada</th>
    </tr>`;

  intervalos.forEach((fila) => {
    tablaHTML += `<tr>
      <td>${fila.Intervalo}</td>
      <td>${fila.MarcaClase}</td>
      <td>${fila.Frecuencia}</td>
      <td>${fila.FrecuenciaRelativa}</td>
      <td>${fila.FrecuenciaAcumulada}</td>
    </tr>`;
  });

  return tablaHTML + "</table>";
}

export function crearGrafico(intervalos) {
  const etiquetas = intervalos.map((f) => f.MarcaClase);
  const datosGrafico = intervalos.map((f) => f.Frecuencia);
  const ctx = document.getElementById("grafico").getContext("2d");
  if (miGrafico) miGrafico.destroy();

  miGrafico = new Chart(ctx, {
    type: "bar",
    data: {
      labels: etiquetas,
      datasets: [{ data: datosGrafico, backgroundColor: "rgba(54,162,235,0.6)" }],
    },
    options: { responsive: true, plugins: { legend: { display: false } } },
  });
}

export function generarTablaFrecuencia() {
  const datos = obtenerDatos();
  if (!datos) return;
  const { intervalos, resultadosFrecuencia: resultados } = calcularTabla(datos);
  document.getElementById("tabla-generada").innerHTML = crearTablaHTML(intervalos, resultados);
  crearGrafico(intervalos);
}
