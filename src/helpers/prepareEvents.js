import moment from "moment";

//Se le da el formato adecuado para la libreria pueda procesar 
//y mostrar correctamente los eventos en el calendario
export const prepareEvents = ( events = [] ) => {
    return events.map(
        (e) => ({
            ...e,
            end: moment(e.end).toDate(),
            start: moment(e.start).toDate()
        })
    );
}