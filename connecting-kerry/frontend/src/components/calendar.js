import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Modal from "./modal.js";
import EventCard from "./eventCard";
import Styles from "../styles/calendar.module.css";
import useActivities from "../hooks/useActivities.js";
import useDateFormat from "../hooks/useDates.js";

export default function Calendar() {
  const { formatDate, formatDateTime } = useDateFormat();
  const { activities, loading, error } = useActivities();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
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
    if (!loading && activities.length) {
      const formattedActivities = activities.map((activity) => ({
        id: activity.activity_id,
        title: activity.activity_name,
        start: formatDateTime(activity.activity_start_date),
        end: formatDateTime( activity.activity_end_date),
        description: activity.activity_description,
        deadline: formatDateTime(activity.activity_deadline),
        status: activity.activity_status,
        availableParticipants: activity.available_participants,
        minimumParticipants: activity.min_participants,
        maximumParticipants: activity.max_participants,
      }));
      setEvents(formattedActivities);
    }
  }, [loading, activities, formatDateTime]);

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
        id: events.length + 1, // Assuming a simple incremental id for new events
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

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const handleViewClick = (info) => {
    const activity = info.event.extendedProps;
    console.log(activity); 
    setSelectedEvent(activity);
    setIsModalOpen(true);
  };

  return (
    <div className={Styles.calendarContainer}>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedEvent ? (
          <EventCard {...selectedEvent} closeModal={closeModal} />
        ) : (
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
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Modal>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "myCustomButton dayGridMonth,timeGridWeek,timeGridDay listWeek",
        }}
        customButtons={{
          myCustomButton: {
            text: "Add Event",
            click: () => setIsModalOpen(true),
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
        eventClick={handleViewClick}
      />
    </div>
  );
}
