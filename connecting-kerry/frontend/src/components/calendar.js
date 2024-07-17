// Calendar.js
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
import { useUser } from "../contexts/userContext/index.js";

export default function Calendar() {
  const { user, loading: userLoading, error: userError } = useUser();
  const { activities, loading, error } = useActivities();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { formatDateForDB } = useDateFormat();

  useEffect(() => {
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
        activity_approval_status: activity.activity_approval_status,
      }));
      setEvents(formattedActivities);
    }
  }, [loading, activities]);

  const handleAddEvent = async (data) => {
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
        activity_name: data.title,
        activity_description: data.description,
        activity_start_date: formatDateForDB(data.startDate),
        activity_end_date: formatDateForDB(data.endDate),
        activity_deadline: formatDateForDB(data.registrationDate),
        max_participants: data.maximumParticipants,
        min_participants: data.minimumParticipants,
        available_participants: data.maximumParticipants,
        org_id: user.org_id,
        activity_status: "Upcoming",
        activity_location: data.location,
        activity_image: data.image,
        activity_approval_status: "Pending",
      };
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/activities/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            },
            body: JSON.stringify(eventToAdd),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to add event");
        }

        const responseData = await response.json();
        console.log("Event added successfully:", responseData);
        setEvents((prevEvents) => [...prevEvents, eventToAdd]);
        setIsFormOpen(false);
      } catch (error) {
        console.error("Error adding event:", error.message);
        alert("Error adding event: " + error.message);
      }
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
    console.log("info", info);
    console.log("extendedProps", extendedProps);
    setSelectedEvent({
      activity_id: info.event.id,
      activity_name: info.event.title,
      activity_start_date: info.event.start,
      activity_end_date: info.event.end,
      activity_description: extendedProps.description,
      activity_deadline: extendedProps.deadline,
      activity_status: extendedProps.status,
      ...extendedProps,
    });
    setIsModalOpen(true);
  };

  return (
    <div className={Styles.calendarContainer}>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedEvent ? (
          <EventCard activity={selectedEvent} closeModal={closeModal} />
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
