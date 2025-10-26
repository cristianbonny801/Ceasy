const buscarGlosario = document.getElementById("buscarGlosario");
const glosarioCards = document.querySelectorAll(".glosario-card");

buscarGlosario.addEventListener("input", () => {
    const filtro = buscarGlosario.value.toLowerCase().trim();

    glosarioCards.forEach(card => {
        const palabra = card.dataset.palabra.toLowerCase();
        const titulo = card.querySelector("h3").textContent.toLowerCase();
        const definicion = card.querySelector("p").textContent.toLowerCase();

        if (palabra.includes(filtro) || titulo.includes(filtro) || definicion.includes(filtro)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
 });
