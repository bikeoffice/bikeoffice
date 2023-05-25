import React from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = dayjsLocalizer(dayjs);

const events = [
  // Add your events here
];

const eventStyleGetter = (event) => {
  const style = {
    backgroundColor: '#F0F2F5',
    color: '#333333',
    borderRadius: '4px',
    border: 'none',
    display: 'block',
    padding: '4px',
  };

  return {
    style,
  };
};

export const MyCalendar = () => (
  <div>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      eventPropGetter={eventStyleGetter}
      style={{ height: 500 }}
    />
  </div>
);

export default MyCalendar;
