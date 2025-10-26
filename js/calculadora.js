const display = document.getElementById("display");

function appendNumber(num) {
    if (display.value === "0" || display.value === "Error") display.value = "";
    display.value += num;
}

function appendOperator(op) {
    const lastChar = display.value.slice(-1);
    if ("+-*/".includes(lastChar)) return;
    display.value += op;
}

function clearDisplay() {
    display.value = "0";
}

function deleteLast() {
    display.value = display.value.slice(0, -1) || "0";
}

function calculate() {
    try {
        const result = eval(display.value);
        display.value = result;
    } catch {
        display.value = "Error";
    }
}

// ===============================
// 🧠 Capturar teclas del teclado
// ===============================
document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!isNaN(key)) {
        // Números (0-9)
        appendNumber(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
        // Operadores
        appendOperator(key);
    } else if (key === "Enter" || key === "=") {
        // Calcular
        e.preventDefault(); // Evita recargar la página
        calculate();
    } else if (key === "Backspace") {
        // Borrar último
        deleteLast();
    } else if (key === "Escape" || (typeof key === "string" && key.toLowerCase() === "c")) {
        clearDisplay();
    
    // Limpiar pantalla
    clearDisplay();
} else if (key === ".") {
    appendNumber(".");
}
});
