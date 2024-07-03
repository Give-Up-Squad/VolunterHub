import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "./modal.js";
import Styles from "../styles/calendar.module.css";

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    registrationDate: "",
    minimumParticipants: "",
    maximumParticipants: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/events.json")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (
      newEvent.title &&
      newEvent.description &&
      newEvent.startDate &&
      newEvent.endDate &&
      newEvent.registrationDate &&
      newEvent.minimumParticipants &&
      newEvent.maximumParticipants
    ) {
      const eventToAdd = {
        title: newEvent.title,
        start: newEvent.startDate,
        end: newEvent.endDate,
        description: newEvent.description,
        registrationDate: newEvent.registrationDate,
        minimumParticipants: newEvent.minimumParticipants,
        maximumParticipants: newEvent.maximumParticipants,
      };
      setEvents((prevEvents) => [...prevEvents, eventToAdd]);
      setNewEvent({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        registrationDate: "",
        minimumParticipants: "",
        maximumParticipants: "",
      });
      setIsModalOpen(false);
    } else {
      alert("Please fill out form details before submitting.");
    }
  };

  return (
    <div className={Styles.calendarContainer}>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleAddEvent} className={Styles.calendarForm}>
          <label>Event Title: </label>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleInputChange}
            className={Styles.calendarInput}
          />
          <label>Description: </label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newEvent.description}
            onChange={handleInputChange}
            className={Styles.calendarInput}
          />
          <label>Start Date: </label>
          <input
            type="date"
            name="startDate"
            placeholder="Start Date"
            value={newEvent.startDate}
            onChange={handleInputChange}
            className={Styles.calendarInput}
          />
          <label>End Date: </label>
          <input
            type="date"
            name="endDate"
            placeholder="End Date"
            value={newEvent.endDate}
            onChange={handleInputChange}
            className={Styles.calendarInput}
          />
          <label>Registration Deadline: </label>
          <input
            type="date"
            name="registrationDate"
            placeholder="Registration Deadline"
            value={newEvent.registrationDate}
            onChange={handleInputChange}
            className={Styles.calendarInput}
          />
          <label>Minimum Participants: </label>
          <input
            type="number"
            name="minimumParticipants"
            placeholder="Minimum Participants"
            value={newEvent.minimumParticipants}
            onChange={handleInputChange}
            className={Styles.calendarInput}
          />
          <label>Maximum Participants: </label>
          <input
            type="number"
            name="maximumParticipants"
            placeholder="Maximum Participants"
            value={newEvent.maximumParticipants}
            onChange={handleInputChange}
            className={Styles.calendarInput}
          />
          <div className={Styles.formButtons}>
            <button type="submit" className={Styles.calendarSubmitButton}>
              Add Event
            </button>
            <button
              type="button"
              className={Styles.cancelButton}
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "myCustomButton dayGridMonth timeGridWeek,timeGridDay",
        }}
        customButtons={{
          myCustomButton: {
            text: "Add Event",
            click: function () {
              setIsModalOpen(true);
            },
          },
        }}
        height={"90vh"}
        events={events}
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
          list: "List",
        }}
        themeSystem="standard"
      />
    </div>
  );
}
