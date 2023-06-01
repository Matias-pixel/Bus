const oscuro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "dark");
    document.querySelector("#dl-icon").setAttribute("class", "bi bi-sun-fill");
}

const claro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "light");
    document.querySelector("#dl-icon").setAttribute("class", "bi bi-moon-fill");
}

const cambiarTema = () => {
    document.querySelector("body").getAttribute("data-bs-theme") === "light" ?
    oscuro() : claro ();
}