document.addEventListener('DOMContentLoaded', function () {

    // Resalta el li activo
    const links = document.querySelectorAll('.Navegacion li a');
    links.forEach(link => {
        if (window.location.href.includes(link.getAttribute('href'))) {
            link.parentElement.style.background = '#FFD6FF';
        }
    });

    // Quiz aleatorio
    window.quizAleatorio = function () {
        const paginas = [
            "Bienestar-Digital.html#Quizz",
            "Ciberseguridad.html#Quizz",
            "Habitos-Saludables.html#Quizz",
            "Gestion-del-Tiempo.html#Quizz",
            "Inteligencia-Artificial-y-Etica-Digital.html#Quizz"
        ];
        window.location.href = paginas[Math.floor(Math.random() * paginas.length)];
    }

    // Buscador
    const iconoBuscar = document.getElementById('iconoBuscar');
    const inputBuscar = document.getElementById('inputBuscar');

    function buscar() {
        const texto = inputBuscar.value.toLowerCase();

        // Si hay .contenido (index.html) filtra las secciones
        const secciones = document.querySelectorAll('.contenido');
        if (secciones.length > 0) {
            secciones.forEach(seccion => {
                const titulo = seccion.querySelector('.TituloCont p').textContent.toLowerCase();
                const cajas = seccion.querySelectorAll('.CajaIzq p');
                let encontrado = titulo.includes(texto);
                cajas.forEach(caja => {
                    if (caja.textContent.toLowerCase().includes(texto)) encontrado = true;
                });
                seccion.style.display = encontrado || texto === '' ? 'flex' : 'none';
            });
            return;
        }

        // Si hay .ContPrincipal (páginas de contenido) busca en párrafos y títulos
        const parrafos = document.querySelectorAll('.ContPrincipal p, .ContPrincipal h3');
        parrafos.forEach(el => {
            const contiene = el.textContent.toLowerCase().includes(texto);
            el.style.background = contiene && texto !== '' ? '#FFD6FF' : 'transparent';
        });
    }

    if (iconoBuscar) iconoBuscar.addEventListener('click', buscar);
    if (inputBuscar) inputBuscar.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') buscar();
    });

    // Barra de progreso
    const cuerpo = document.querySelector('.Cuerpo');
    const barra = document.getElementById('barraProg');

    if (cuerpo && barra) {
        cuerpo.addEventListener('scroll', function () {
            const scrollTop = cuerpo.scrollTop;
            const scrollHeight = cuerpo.scrollHeight - cuerpo.clientHeight;
            const progreso = (scrollTop / scrollHeight) * 100;
            barra.style.width = progreso + '%';
        });
    }

    // Animacion suave al hacer scroll
    const elementos = document.querySelectorAll('.contenido, .ContPrincipal, .Quizz, .Linkimg, .CajaIzq');
    elementos.forEach(el => el.classList.add('aparece'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elementos.forEach(el => observer.observe(el));

});