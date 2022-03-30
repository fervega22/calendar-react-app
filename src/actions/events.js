import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

//Crear nuevo evento
export const eventStartAddNew = (event) => {
    return async( dispatch, getState ) =>{

        //obtiene los states (Redux)
        const {uid, name} = getState().auth; 

        try {
            //Se envia el evento al endpoint            
            const resp = await fetchConToken('events', event, 'POST' );
            const body = await resp.json();

            if( body.ok ){
                event.id = body.evento.id;
                event.user = {
                    _id : uid,
                    name
                }
                dispatch(eventAddNew(event));

            }else{                            
                Swal.fire("Error", "Ocurrió algo inesperado. Intentelo nuevamente.", "error");
            }

        } catch (error) {
            Swal.fire("Error", "Ocurrió algo inesperado. Intentelo nuevamente.", "error");
        }
    }
}

//Almacenar evento en los states (redux)
const eventAddNew = (event) =>({
    type: types.eventAddNew,
    payload: event
});

//Setea activo el evento en los state (redux)
export const eventSetActive = (event) =>({
    type: types.eventSetActive,
    payload: event
});

//Limpia el ActiveEvent del state (redux)
export const eventClearActiveEvent = () =>({
    type: types.eventClearActiveEvent
});

//Actualiza el evento 
export const eventStartUpdate = (event) => {
    return async(dispatch) => {

        try {
            //se manda los campos al endpoint
            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();

            if(body.ok){
                dispatch(eventUpdated(event));
            }else{
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            Swal.fire('Error', 'Ocurrió un error inesperado.', 'error');
        }
    }
}

//Se actualiza el evento en el state (redux)
const eventUpdated = (event) =>({
    type: types.eventUpdated,
    payload: event
});

//Eliminar un evento
export const eventStartDelete = () => {
    return async(dispatch, getState) => {

        //obtiene el id del evento del state (redux)
        const { id } = getState().calendar.activeEvent;

        try {
            //Se mando el evento a endpoint
            const resp = await fetchConToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();

            if(body.ok){
                dispatch(eventDeleted());
            }else{
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            Swal.fire('Error', 'Ocurrió un error inesperado.', 'error');
        }

    }
}

//Se elimina el evento en el state (redux)
const eventDeleted = () =>({
    type: types.eventDeleted
});

//Obtener todos los eventos
export const eventStartLoading = () => {
    return async(dispatch) => {
        try {
            //se llama al endpoint
            const resp = await fetchConToken('events');
            const body = await resp.json();

            const events = prepareEvents(body.eventos);

            dispatch(eventLoaded(events));

        } catch (error) {
            Swal.fire("Error", "Ocurrió algo inesperado. Intentelo nuevamente.", "error");
        }
    }
}

//Almacena en state los eventos (redux)
const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});

//Limpia los eventos del state (redux)
export const eventLogout = () => ({
    type: types.eventLogout
});