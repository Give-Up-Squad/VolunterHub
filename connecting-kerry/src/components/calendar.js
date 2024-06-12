// src/components/Calendar.js

import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from './modal.js';
import Styles from '../styles/calendar.module.css';

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('/events.json')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prevEvent => ({ ...prevEvent, [name]: value }));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.date) {
      setEvents(prevEvents => [...prevEvents, newEvent]);
      setNewEvent({ title: '', date: '' });
      setIsModalOpen(false); 
    } else {
      alert('Please fill out form details before submitting.');
    }
  };

  return (
    
    <div>
      <div className={Styles.addEventButton}>
        <button onClick={() => setIsModalOpen(true)}>Add Event to Calendar</button>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleAddEvent} className={Styles.calendarForm}>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="date"
            placeholder="Event Date"
            value={newEvent.date}
            onChange={handleInputChange}
          />
          <button type="submit">Add Event</button>
        </form>
      </Modal>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: 'dayGridMonth timeGridWeek,timeGridDay',
        }}
        height={'90vh'}
        events={events}
      />
    </div>
  );
}
