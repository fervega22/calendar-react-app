import React from 'react'

//Evento en el calendario
export const CalendarEvents = ({event}) => {

  const {title, user} = event;

  return (
    <div>
        <strong>{title}</strong>
        <span>-{user.name}</span>
    </div>
  )
}
