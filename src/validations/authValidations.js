import Swal from 'sweetalert2';
import validator from 'validator';

//Validaciones del login
export const loginValidations = (email, password) => {

    if(!validator.isEmail(email)){             
        Swal.fire('Error', 'Formato de correo no válido', 'error'); 
        return false;
    }
    
    if(validator.isEmpty(email) ){
        Swal.fire("Error", "El campo email es obligatorio", "error");
        return false;
    }

    if(password.length < 6){
        Swal.fire('Error', 'La contraseña debe ser de al menos 6 carácteres', 'error');
        return false;
    }

    return true;
}

//Validaciones del registro de usuarios
export const registerValidations = (name, email, password1, password2) => {

    if(!validator.isAlpha(name)){             
        Swal.fire('Error', 'En el campo nombre sólo puede ingresar letras', 'error'); 
        return false;
    }

    if(!validator.isEmail(email)){             
        Swal.fire('Error', 'El formato del correo no es válido', 'error'); 
        return false;
    }

    if(password1.length < 6){
        Swal.fire('Error', 'La contraseña debe ser de al menos 6 carácteres', 'error');
        return false;
    }

    if(password1 !== password2){
        Swal.fire("Error", "Las contraseñas deben coincidir", "error");
        return false;
    }

    if(validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(password1) || validator.isEmpty(password2)){
        Swal.fire("Error", "Todos los campos son obligatorios", "error");
        return false;
    }

    return true;
}