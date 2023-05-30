import { useEffect, useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Loading, useGetList } from 'react-admin';

const localizer = dayjsLocalizer(dayjs);

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

export const MyCalendar = () => {
  const [events, setEvents] = useState<any[]>();
  const [selectedEvent, setSelectedEvent] = useState<any>(null); // State to hold the selected event
  const [openModal, setOpenModal] = useState(false); // State to control the modal open/close

  const { data, total, isLoading, error } = useGetList('rents', {
    pagination: { page: 1, perPage: 10 },
    sort: { field: 'startDate', order: 'DESC' },
  });

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/rents-calendar');
        const json = await response.json();
        const eventList = json?.map((rent) => ({
          id: rent.id,
          title: `Bike ${rent.bikeId} - Client ${rent.clientId}`,
          start: new Date(rent.startDate),
          end: new Date(rent.endDate),
          resourceId: rent.bikeId,
        }));
        setEvents(eventList);
      } catch (e: any) {
        console.log('error fetching rents-calendar: ', e.message);
      }
    })();
  }, []);

  useEffect(() => {
    const eventList = data?.map((rent) => ({
      id: rent.id,
      title: `Bike ${rent.bikeId} - Client ${rent.clientId}`,
      start: new Date(rent.startDate),
      end: new Date(rent.endDate),
      resourceId: rent.bikeId,
    }));

    setEvents(eventList);
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <p>ERROR</p>;
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        style={{ height: 500 }}
      />

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <div>
              <p>{`ID: ${selectedEvent.id}`}</p>
              <p>{`Title: ${selectedEvent.title}`}</p>
              <p>{`Start: ${selectedEvent.start.toString()}`}</p>
              <p>{`End: ${selectedEvent.end.toString()}`}</p>
              <p>{`Resource ID: ${selectedEvent.resourceId}`}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyCalendar;
