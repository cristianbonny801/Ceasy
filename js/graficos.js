const btnGenerar = document.getElementById("btnGenerarGrafico");
const graficosdescarga = document.getElementById("btnDescargarGrafico");
let graficosAvanzados;

btnGenerar.addEventListener("click", () => {
    const datosInput = document.getElementById("datosGrafico").value;
    const tipo = document.getElementById("tipoGrafico").value;
    const ctx = document.getElementById("chartCanvas").getContext("2d");

    if (!datosInput.trim()) {
        alert("Por favor ingresa los datos separados por comas.");
        return;
    }

    const valores = datosInput.split(",").map(n => parseFloat(n.trim())).filter(n => !isNaN(n));

    if (valores.length === 0) {
        alert("No se detectaron números válidos.");
        return;
    }

    if (graficosAvanzados) graficosAvanzados.destroy();

    graficosAvanzados = new Chart(ctx, {
        type: tipo,
        data: {
            labels: valores.map((_, i) => `Dato ${i + 1}`),
            datasets: [{
                label: "Valores",
                data: valores,
                backgroundColor: ["#38bdf8", "#0ea5e9", "#3b82f6", "#93c5fd", "#bae6fd"],
                borderColor: "#0f172a",
                borderWidth: 1.5,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true, labels: { color: "#0f172a" } }
            },
            scales: {
                x: { ticks: { color: "#334155" } },
                y: { ticks: { color: "#334155" } }
            }
        }
    });
});

graficosdescarga.addEventListener("click", () => {
    if (!graficosAvanzados) return alert("Primero genera un gráfico.");
    const link = document.createElement("a");
    link.download = "grafico_ceasy.png";
    link.href = document.getElementById("chartCanvas").toDataURL("image/png");
    link.click();
});;
