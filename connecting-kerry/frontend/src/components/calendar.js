import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from './modal.js';
import Styles from '../styles/calendar.module.css';

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', startDate: '', endDate: '', registrationDate: '', minimumParticipants: '', maximumParticipants: '' });
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
    if (newEvent.title && newEvent.description && newEvent.startDate && newEvent.endDate && newEvent.registrationDate && newEvent.minimumParticipants && newEvent.maximumParticipants) {
      const eventToAdd = {
        title: newEvent.title,
        start: newEvent.startDate,
        end: newEvent.endDate,
        description: newEvent.description,
        registrationDate: newEvent.registrationDate,
        minimumParticipants: newEvent.minimumParticipants,
        maximumParticipants: newEvent.maximumParticipants,
      };
      setEvents(prevEvents => [...prevEvents, eventToAdd]);
      setNewEvent({ title: '', description: '', startDate: '', endDate: '', registrationDate: '', minimumParticipants: '', maximumParticipants: ''});
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
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleInputChange}
          />
          <br></br>
          <label>Description: </label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newEvent.description}
            onChange={handleInputChange}
          />
          <br></br>
          <label>Start Date: </label>
          <input
            type="date"
            name="startDate"
            placeholder="Start Date"
            value={newEvent.startDate}
            onChange={handleInputChange}
          />
          <br></br>
          <label>End Date: </label>
          <input
            type="date"
            name="endDate"
            placeholder="End Date"
            value={newEvent.endDate}
            onChange={handleInputChange}
          />
          <br></br>
          <label>Registration Deadline: </label>
          <input
            type="date"
            name="registrationDate"
            placeholder="Registration Deadline"
            value={newEvent.registrationDate}
            onChange={handleInputChange}
          />
          <br></br>
          <label>Minimum Participants: </label>
          <input
            type="number"
            name="minimumParticipants"
            placeholder="Minimum Participants"
            value={newEvent.minimumParticipants}
            onChange={handleInputChange}
          />
          <br></br>
          <label>Maximum Participants: </label>
          <input
            type="number"
            name="maximumParticipants"
            placeholder="Maximum Participants"
            value={newEvent.maximumParticipants}
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
