//Funcion para validar correo
//Usando expresiones regulares para obtener esta entrada valida:
// *n Cantidad de caracteres* + @ + *n cantidad de caracteres + . + ncantidad de caracteres
//la unica restriccion es que no puede haber ningun espacio ni tampoco mas de un arroba(@)
function validarCorreo(correo) { 
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return expresion.test(correo); 
}
//Funcion para validar texto con solo letras
//Usando expresiones regulares para obtener esta entrada valida:
//Una cadena que solamente verifique mayusculas, minusculas y espacios en blanco
function soloLetras(texto) { 
    const expresion = /^[A-Za-z\s]+$/; 
    return expresion.test(texto); 
}
//Funcion para validar texto con longitud definida
//Usando una funcion .length para obtener la longitud de la cadena y compararla con el numero maximo de longitud requerido
function validarLongitud(numero, maxLongitud) { 
    return String(numero).length == maxLongitud; 
}
//Funcion para calcular edad
//Usando variables de fecha, y un dato de tipo date proporcionado
//La variable edad se calcula restandole el año de la fecha ingresada al año actual
//Despues se calcula el mes de la misma manera, y en caso de que el mes ingresado sea el mismo que el mes actual
//se resta un año a la edad a mostrar. Si la edad resulta ser menor a 0 solo se mostrara 0 años
function calcularEdad(fechaNacimiento) { 
    const nacimiento = new Date(fechaNacimiento); 
    const hoy = new Date(); 
    let edad = hoy.getFullYear() - nacimiento.getFullYear(); 
    const mes = hoy.getMonth() - nacimiento.getMonth(); 
    if (mes <= 0) { 
        edad--; 
    }
    if (edad<0){
        return 0;
    }
    return edad; 
}
//Funcion para validar si es mayor de edad
//Se manda a llamar la funcion calcular edad y se compara con la mayoria de edad
function esMayorDeEdad(fechaNacimiento) { 
    return calcularEdad(fechaNacimiento) >= 18; 
}
//Funcion para validar contraseñas
//Usando expresiones regulares se obtienen 5 variables para determinar que le hace falta a la contraseña antes de ser valida
//Se revisan los requerimientos de la contraseña uno por uno para validarlo
function validarPassword(contrasena) { 
    const tieneMayuscula = /[A-Z]/.test(contrasena); 
    const tieneMinuscula = /[a-z]/.test(contrasena); 
    const tieneNumero = /[0-9]/.test(contrasena); 
    const tieneEspecial = /[^A-Za-z0-9]/.test(contrasena); 
    const tieneLongitud = contrasena.length >= 8; 

    if (!tieneMayuscula){
        return 1;
    } else if (!tieneMinuscula){
        return 2;
    } else if (!tieneNumero){
        return 3;
    } else if (!tieneEspecial){
        return 4;
    } else if (!tieneLongitud){
        return 5;
    } else {
        return 6;
    }
}
//Funcion para validar si es un robot
//Se muestra una operacion matematica y debe de resolverla para que sea validada
function validarRobot(respuesta) { 
    return respuesta==67;
}