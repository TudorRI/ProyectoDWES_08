document.addEventListener("DOMContentLoaded", function () {
    const dropdownBtn = document.getElementById("dropdownBtn");
    const dropdownContent = document.getElementById("dropdownContent");
    const closeDropdown = document.getElementById("closeDropdown");

    // Alternar menú al hacer clic en el botón
    dropdownBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        dropdownContent.classList.toggle("show");
    });

    // Cerrar el menú al hacer clic en el botón de "Cerrar"
    closeDropdown.addEventListener("click", function () {
        dropdownContent.classList.remove("show");
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener("click", function (event) {
        if (!dropdownContent.contains(event.target) && !dropdownBtn.contains(event.target)) {
            dropdownContent.classList.remove("show");
        }
    });

    // Cerrar con la tecla "Escape"
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            dropdownContent.classList.remove("show");
        }
    });
});
