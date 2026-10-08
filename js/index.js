document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. CARGAR USUARIO EN EL NAVBAR (DESDE LOGIN)
  // ==========================================
  const userNameDisplay = document.getElementById("userNameDisplay");
  
  // Obtiene el correo guardado en login.js
  const usuarioSesion = sessionStorage.getItem("usuarioLogueado") || "Usuario Invitado";
  
  if (userNameDisplay) {
    userNameDisplay.textContent = usuarioSesion;
  }

  // Cerrar sesión
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      sessionStorage.removeItem("usuarioLogueado");
    });
  }

  // ==========================================
  // 2. INTERACTIVIDAD DEL SIDEBAR Y NAVBAR
  // ==========================================
  
  // Botón Hamburguesa: colapsar / expandir Sidebar
  const btnToggleSidebar = document.getElementById("btnToggleSidebar");
  const sidebar = document.getElementById("sidebar");

  if (btnToggleSidebar && sidebar) {
    btnToggleSidebar.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
    });
  }

  // Menú desplegable del usuario en Navbar
  const btnUserMenu = document.getElementById("btnUserMenu");
  const userDropdown = document.getElementById("userDropdown");

  if (btnUserMenu && userDropdown) {
    btnUserMenu.addEventListener("click", (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle("show");
    });

    document.addEventListener("click", () => {
      userDropdown.classList.remove("show");
    });
  }

  // ==========================================
  // 3. CONTROL DE VISTAS (BIENVENIDA / FORMULARIOS)
  // ==========================================
  const seccionBienvenida = document.getElementById("seccion-bienvenida");
  const seccionUsuarios = document.getElementById("seccion-usuarios");
  const seccionAlumnos = document.getElementById("seccion-alumnos");

  const linkMenuUsuarios = document.getElementById("linkMenuUsuarios");
  const linkMenuAlumnos = document.getElementById("linkMenuAlumnos");

  function mostrarSeccion(seccionActiva) {
    seccionBienvenida.classList.add("oculto");
    seccionUsuarios.classList.add("oculto");
    seccionAlumnos.classList.add("oculto");

    seccionActiva.classList.remove("oculto");
  }

  if (linkMenuUsuarios) {
    linkMenuUsuarios.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarSeccion(seccionUsuarios);
    });
  }

  if (linkMenuAlumnos) {
    linkMenuAlumnos.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarSeccion(seccionAlumnos);
    });
  }

  // ==========================================
  // 4. VALIDACIÓN DE FORMULARIO DE USUARIOS
  // ==========================================
  const formUsuario = document.getElementById("formUsuario");

  if (formUsuario) {
    formUsuario.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombreUsuario").value.trim();
      const correo = document.getElementById("correoUsuario").value.trim();
      const password = document.getElementById("passwordUsuario").value;

      if (!soloLetras(nombre)) {
        alert("El nombre de usuario solo debe contener letras y espacios.");
        return;
      }

      if (!validarCorreo(correo)) {
        alert("El correo electrónico no es válido.");
        return;
      }

      const resPass = validarPassword(password);
      switch (resPass) {
        case 1:
          alert("La contraseña debe tener al menos una letra mayúscula.");
          return;
        case 2:
          alert("La contraseña debe tener al menos una letra minúscula.");
          return;
        case 3:
          alert("La contraseña debe tener al menos un número.");
          return;
        case 4:
          alert("La contraseña debe tener al menos un carácter especial.");
          return;
        case 5:
          alert("La contraseña debe tener al menos 8 caracteres.");
          return;
        case 6:
          break;
      }

      alert(`Usuario "${nombre}" registrado correctamente.`);
      formUsuario.reset();
    });
  }

  // ==========================================
  // 5. VALIDACIÓN DE ALUMNOS Y MODAL DE EDAD
  // ==========================================
  const formAlumno = document.getElementById("formAlumno");
  const modalEdad = document.getElementById("modalEdad");
  const modalTitulo = document.getElementById("modalTitulo");
  const modalMensaje = document.getElementById("modalMensaje");
  const btnCerrarModal = document.getElementById("btnCerrarModal");

  if (formAlumno) {
    formAlumno.addEventListener("submit", (e) => {
      e.preventDefault();

      const numControl = document.getElementById("numControl").value.trim();
      const nombreAlumno = document.getElementById("nombreAlumno").value.trim();
      const fechaNacimiento = document.getElementById("edadAlumno").value;

      if (!validarLongitud(numControl, 6) || isNaN(numControl)) {
        alert("El número de control debe tener exactamente 6 dígitos numéricos.");
        return;
      }

      if (!soloLetras(nombreAlumno)) {
        alert("El nombre del alumno solo puede contener letras y espacios.");
        return;
      }

      if (!fechaNacimiento) {
        alert("Por favor seleccione la fecha de nacimiento.");
        return;
      }

      const edadCalculada = calcularEdad(fechaNacimiento);
      const esMayor = esMayorDeEdad(fechaNacimiento);

      modalTitulo.textContent = `Resultado: ${nombreAlumno}`;
      if (esMayor) {
        modalMensaje.innerHTML = `No. Control: <strong>${numControl}</strong><br>Edad calculada: <strong>${edadCalculada} años</strong>.<br><br><span style="color: #16a34a; font-weight: bold;">El alumno es MAYOR de edad.</span>`;
      } else {
        modalMensaje.innerHTML = `No. Control: <strong>${numControl}</strong><br>Edad calculada: <strong>${edadCalculada} años</strong>.<br><br><span style="color: #dc2626; font-weight: bold;">El alumno es MENOR de edad.</span>`;
      }

      modalEdad.classList.add("active");
    });
  }

  if (btnCerrarModal && modalEdad) {
    btnCerrarModal.addEventListener("click", () => {
      modalEdad.classList.remove("active");
      formAlumno.reset();
    });
  }
});