function validarLogin(){
    const formulario =  document.getElementById("formulario");
    const mensaje = document.getElementById("mensaje");

    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const correo = document.getElementById("correo").value.trim();
        const password = document.getElementById("contrasena").value;

        // Validar correo
        if (!validarCorreo(correo)) {
            mensaje.textContent = "El correo electrónico no es válido.";
            return;
        }

        // Validar contraseña
        const variable = validarPassword(password);

        switch(variable){
            case 1:
                mensaje.textContent = "La contraseña debe tener al menos una letra mayúscula";
                return;
            case 2:
                mensaje.textContent = "La contraseña debe tener al menos una letra minúscula";
                return;
            case 3:
                mensaje.textContent = "La contraseña debe tener al menos un número";
                return;
            case 4:
                mensaje.textContent = "La contraseña debe tener al menos un carácter especial";
                return;
            case 5:
                mensaje.textContent = "La contraseña debe tener al menos 8 caracteres";
                return;
            case 6:
                window.location.href = "index.html";
        }
    });
}