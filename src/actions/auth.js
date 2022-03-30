import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { eventLogout } from "./events";

//loguear al usuario
export const startLogin = (email, password) => {

    return async(dispatch) => {
        
        const resp = await fetchSinToken( 'auth', {email, password }, 'POST' );
        const body = await resp.json();

        if( body.ok ){
            //Guarda el token del usuario en localStorage
            localStorage.setItem('token', body.token);
            //Guarda la hora en que se genero
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
    
        }else{
            Swal.fire('Error', body?.msg || body.errors.email?.msg || 'Algo salió mal', 'error');
        }       
    }
}

//Generar nuevo usuario
export const startRegister = (name, email, password) => {
    return async(dispatch) => {

        const resp = await fetchSinToken( 'auth/new', { name, email, password }, 'POST' );
        const body = await resp.json();

        if( body.ok ){
            //Guarda el token del usuario en localStorage
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
    
        }else{
            Swal.fire('Error', body.msg || body.errors.email?.msg || 'Algo salió mal', 'error');
        }       

    }
}

//REvisa el checking 
export const startChecking = () => {
    return async(dispatch) => {

        const resp = await fetchConToken( 'auth/renew');
        const body = await resp.json();

        if( body.ok ){
            //Guarda el token del usuario en localStorage
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
    
        }else{
            dispatch(checkingFinish());
        }       

    }
}

//para que el reducer setee el checking en false en el state (Redux)
const checkingFinish = () => ({ type: types.authCheckingFinish});

//para que el reducer almacene el usuario en el state (Redux)
const login = (user) => ({

    type: types.authLogin,
    payload: user

});

//Desloguea al usurio 
export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch( logout() );
        dispatch( eventLogout() );
    }
};

const logout = () => ({ type: types.authLogout });