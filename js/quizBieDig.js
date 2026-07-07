// Feedback visual al seleccionar
document.addEventListener('DOMContentLoaded', function() {
    const respuestas = { p1: "b", p2: "c", p3: "b", p4: "c" };

    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.addEventListener('change', function() {
            const nombre = this.name;
            const correcta = respuestas[nombre];

            document.querySelectorAll(`input[name="${nombre}"]`).forEach(radio => {
                radio.parentElement.style.background = 'black';
                radio.parentElement.style.color = 'white';
            });

            if (this.value === correcta) {
                this.parentElement.style.background = '#C8B6FF';
                this.parentElement.style.color = 'black';
            } else {
                this.parentElement.style.background = '#ff4444';
                this.parentElement.style.color = 'white';
                document.querySelector(`input[name="${nombre}"][value="${correcta}"]`)
                    .parentElement.style.background = '#C8B6FF';
            }
        });
    });
});


// verificar respuestas

function verificar() {
    let correctas = 0;

    if (document.querySelector('input[name="p1"]:checked')?.value === "b") correctas++;
    if (document.querySelector('input[name="p2"]:checked')?.value === "c") correctas++;
    if (document.querySelector('input[name="p3"]:checked')?.value === "b") correctas++;
    if (document.querySelector('input[name="p4"]:checked')?.value === "c") correctas++;

    let mensaje = "";
    if (correctas === 4) mensaje = "¡Perfecto! 🎉 4/4 correctas";
    else if (correctas >= 2) mensaje = `¡Bien! ${correctas}/4 correctas`;
    else mensaje = `Sigue intentando, ${correctas}/4 correctas`;

    document.getElementById("resultado").textContent = mensaje;
}
