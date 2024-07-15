import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Modal from "./modal.js";
import EventCard from "./eventCard";
import EventForm from "./eventForm";
import Styles from "../styles/calendar.module.css";
import useActivities from "../hooks/useActivities.js";
import useDateFormat from "../hooks/useDates.js";

export default function Calendar() {
  const { formatDate, formatDateTime } = useDateFormat();
  const { activities, loading, error } = useActivities();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    console.log("Loading:", loading);
    console.log("Activities:", activities);
    if (!loading && activities.length) {
      const formattedActivities = activities.map((activity) => ({
        id: activity.activity_id,
        title: activity.activity_name, // Ensure 'title' is set for FullCalendar events
        start: activity.activity_start_date,
        end: activity.activity_end_date,
        extendedProps: {
          description: activity.activity_description,
          deadline: activity.activity_deadline,
          status: activity.activity_status,
          available_participants: activity.available_participants,
          min_participants: activity.min_participants,
          max_participants: activity.max_participants,
          location: activity.location,
          image: activity.image,
        },
      }));
      console.log("Formatted Activities:", formattedActivities);
      setEvents(formattedActivities);
    }
  }, [loading, activities]);

  useEffect(() => {
    console.log("Events state:", events);
  }, [events]);

  const handleAddEvent = (data) => {
    if (
      data.title &&
      data.description &&
      data.startDate &&
      data.endDate &&
      data.registrationDate &&
      data.minimumParticipants &&
      data.maximumParticipants &&
      data.location
    ) {
      const eventToAdd = {
        id: events.length + 1,
        title: data.title,
        start: data.startDate,
        end: data.endDate,
        description: data.description,
        registrationDate: data.registrationDate,
        minimumParticipants: data.minimumParticipants,
        maximumParticipants: data.maximumParticipants,
        location: data.location,
        image: data.image,
      };
      setEvents((prevEvents) => [...prevEvents, eventToAdd]);
      setIsFormOpen(false);
    } else {
      alert("Please fill out all form details before submitting.");
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
        ) : null}
      </Modal>
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <EventForm
          onSubmit={handleAddEvent}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "myCustomButton dayGridMonth,timeGridWeek,timeGridDay listMonth",
        }}
        customButtons={{
          myCustomButton: {
            text: "Add Event",
            click: () => setIsFormOpen(true),
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
