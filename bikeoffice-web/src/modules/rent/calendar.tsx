import React from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = dayjsLocalizer(dayjs);

const events = [
    {
      id: 1,
      title: 'Event 1',
      start: new Date(2023, 4, 26, 10, 0), // May 26, 2023, 10:00 AM
      end: new Date(2023, 4, 26, 12, 0), // May 26, 2023, 12:00 PM
    },
    {
      id: 2,
      title: 'Event 2',
      start: new Date(2023, 4, 27, 14, 0), // May 27, 2023, 2:00 PM
      end: new Date(2023, 4, 27, 16, 0), // May 27, 2023, 4:00 PM
    },
    // Add more events as needed
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

const handleSelectEvent = (event) => {
    // Handle event selection
    console.log('Selected event:', event);
  };

export const MyCalendar = () => (
  <div style={{marginTop: '20px'}}>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      onSelectEvent={handleSelectEvent}
      eventPropGetter={eventStyleGetter}
      style={{ height: 500 }}
    />
  </div>
);

export default MyCalendar;
