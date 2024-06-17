import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from './modal.js';
import Styles from '../styles/calendar.module.css';

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', startDate: '', endDate: '', registrationDate: '', minimumPatricipants: '',maximumPatricipants: '' });
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
    if (newEvent.title && newEvent.description && newEvent.startDate && newEvent.endDate && newEvent.registrationDate && newEvent.minimumPatricipants && newEvent.maximumPatricipants) {
      setEvents(prevEvents => [...prevEvents, newEvent]);
      setNewEvent({ title: '', description: '', startDate: '', endDate: '', registrationDate: '', minimumPatricipants: '', maximumPatricipants: ''});
      setIsModalOpen(false); 
    } else {
      alert('Please fill out form details before submitting.');
    }
  };

  return (
    
    <div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleAddEvent} className={Styles.calendarForm}>
        
        <br></br>
        <label>Event Title: </label>
          <input
            type="text"
            name="Event Title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleInputChange}
          />

          <br></br>
          <label>Description: </label>
          <input
            type="text"
            name="Description"
            placeholder="Description"
            value={newEvent.description}
            onChange={handleInputChange}
          />
          <br></br>
          <label>Start Date: </label>
          <input
            type="date"
            name="Start Date"
            placeholder="Start Date"
            value={newEvent.startDate}
            onChange={handleInputChange}
          />

          <br></br>
          <label>End Date: </label>
          <input
            type="date"
            name="End Date"
            placeholder="End Date"
            value={newEvent.endDate}
            onChange={handleInputChange}
          />

          <br></br>
          <label>Registration Deadline: </label>
          <input
            type="date"
            name="Registration Deadline"
            placeholder="Registration Deadline"
            value={newEvent.registrationDate}
            onChange={handleInputChange}
          />
          <br></br>
          <label>Minimum Patricipants: </label>
          <input
            type="number"
            name="minimumPatricipants"
            placeholder="minimumPatricipants"
            value={newEvent.minimumPatricipants}
            onChange={handleInputChange}
          />
          <br></br>
          <label>Maximum Patricipants: </label>
          <input
            type="number"
            name="Minimum Patricipants"
            placeholder="Minimum Patricipants"
            value={newEvent.maximumPatricipants}
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
          end: 'myCustomButton dayGridMonth timeGridWeek,timeGridDay',
        }}
        customButtons={{
          myCustomButton: {
              text: 'Add a new Event to Calendar',
              click: function() {
                setIsModalOpen(true);
              },
          },
      }}
        height={'90vh'}
        events={events}
        
      />
    </div>
  );
}
