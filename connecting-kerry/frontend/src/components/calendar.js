// src/components/Calendar.js

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
import { useUser } from "../contexts/userContext/index.js";

export default function Calendar() {
  const { user, loading: userLoading, error: userError } = useUser();
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
        title: activity.activity_name,
        start: activity.activity_start_date,
        end: activity.activity_end_date,
        description: activity.activity_description,
        deadline: activity.activity_deadline,
        status: activity.activity_status,
        max_participants: activity.max_participants,
        min_participants: activity.min_participants,
        available_participants: activity.available_participants,
        location: activity.location,
        image: activity.image,
      }));
      console.log("Formatted Activities:", formattedActivities);
      setEvents(formattedActivities);
    }
  }, [loading, activities]);

  console.log("User:", user);
  useEffect(() => {
    console.log("Selected Event:", selectedEvent);
  }, [selectedEvent]);

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
        title: data.title,
        start: data.startDate,
        end: data.endDate,
        description: data.description,
        deadline: data.registrationDate,
        max_participants: data.maximumParticipants,
        min_participants: data.minimumParticipants,
        available_participants: data.maximumParticipants,
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
    const { extendedProps } = info.event;
    setSelectedEvent({
      activity_name: info.event.title,
      activity_start_date: info.event.start,
      activity_end_date: info.event.end,
      ...extendedProps,
    });
    setIsModalOpen(true);
  };

  return (
    <div className={Styles.calendarContainer}>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedEvent ? (
          <EventCard
            activity_name={selectedEvent.activity_name}
            activity_description={selectedEvent.description}
            activity_start_date={selectedEvent.activity_start_date}
            activity_end_date={selectedEvent.activity_end_date}
            activity_deadline={selectedEvent.deadline}
            activity_status={selectedEvent.status}
            max_participants={selectedEvent.max_participants}
            min_participants={selectedEvent.min_participants}
            available_participants={selectedEvent.available_participants}
            closeModal={closeModal}
          />
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
          end:
            user.roles !== "Volunteer"
              ? "myCustomButton dayGridMonth,timeGridWeek,timeGridDay listMonth"
              : "dayGridMonth,timeGridWeek,timeGridDay listMonth",
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
