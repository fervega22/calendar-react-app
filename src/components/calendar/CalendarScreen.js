import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvents } from './CalendarEvents';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const listEvents = useSelector(state => state.calendar.events);

    const {activeEvent} = useSelector(state => state.calendar);

    const {uid} = useSelector(state => state.auth);

    //Carga los eventos sólo cuando se carga el componente luego del inicio de sesión 
    useEffect(() => {

        dispatch(eventStartLoading());

    }, [dispatch])
    

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month' );

    //Abrir modal con 2 clicks
    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    }

    //Seleccionar un evento 
    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    }

    //Setea la opcion de vista del calendario (mes - semana - día)
    const onViewChange = (e) =>{
        setLastView(e);
        localStorage.setItem('lastView', e);
    }
    
    //Estilos de los eventos
    const eventStyleGetter = ( event, start, end, isSelected) => {
        const style = {
            backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'            
        }

        return {
            style
        }
    }

    //Limpiar state
    const onSelectSlot = (e) => {

        dispatch(eventClearActiveEvent());
    }

    return (
        <div className='calendar-screen'>
            <Navbar />

            <Calendar
                localizer={localizer}
                events={listEvents}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                selectable={true}
                onView={onViewChange}
                view={lastView}
                components={{
                    event: CalendarEvents
                }}

            />

            <AddNewFab />

            {
                ( activeEvent ) &&  <DeleteEventFab />
            }

            <CalendarModal />
        </div>
    )
}
