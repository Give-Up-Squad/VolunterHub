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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EventRegisterSchema } from "../validations/eventRegValidation";

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
    location: "",
    image: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(EventRegisterSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (!loading && activities.length) {
      const formattedActivities = activities.map((activity) => ({
        id: activity.activity_id,
        title: activity.activity_name,
        start: formatDateTime(activity.activity_start_date),
        end: formatDateTime(activity.activity_end_date),
        description: activity.activity_description,
        deadline: formatDateTime(activity.activity_deadline),
        status: activity.activity_status,
        availableParticipants: activity.available_participants,
        minimumParticipants: activity.min_participants,
        maximumParticipants: activity.max_participants,
        location: activity.location,
        image: activity.image,
      }));
      setEvents(formattedActivities);
    }
  }, [loading, activities, formatDateTime]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

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
        id: events.length + 1, // Assuming a simple incremental id for new events
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
      setNewEvent({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        registrationDate: "",
        minimumParticipants: "",
        maximumParticipants: "",
        location: "",
        image: "",
      });
      setIsModalOpen(false);
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
    setSelectedEvent(activity);
    setIsModalOpen(true);
  };

  return (
    <div className={Styles.calendarContainer}>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedEvent ? (
          <EventCard {...selectedEvent} closeModal={closeModal} />
        ) : (
          <form onSubmit={handleSubmit(handleAddEvent)} className={Styles.calendarForm}>
            <label>Event Title* </label>
            <input
              type="text"
              {...register("title")}
              placeholder="Event Title"
              className={Styles.calendarInput}
            />
            {errors.title && (
              <p className={Styles.error}>{errors.title.message}</p>
            )}
            <label>Description* </label>
            <input
              type="text"
              {...register("description")}
              placeholder="Description"
              className={Styles.calendarInput}
            />
            {errors.description && (
              <p className={Styles.error}>{errors.description.message}</p>
            )}
            <label>Start Date* </label>
            <input
              type="date"
              {...register("startDate")}
              placeholder="Start Date"
              className={Styles.calendarInput}
            />
            {errors.startDate && (
              <p className={Styles.error}>{errors.startDate.message}</p>
            )}
            <label>End Date* </label>
            <input
              type="date"
              {...register("endDate")}
              placeholder="End Date"
              className={Styles.calendarInput}
            />
            {errors.endDate && (
              <p className={Styles.error}>{errors.endDate.message}</p>
            )}
            <label>Registration Deadline* </label>
            <input
              type="date"
              {...register("registrationDate")}
              placeholder="Registration Deadline"
              className={Styles.calendarInput}
            />
            {errors.registrationDate && (
              <p className={Styles.error}>{errors.registrationDate.message}</p>
            )}
            <label>Minimum Participants* </label>
            <input
              type="number"
              {...register("minimumParticipants")}
              placeholder="Minimum Participants"
              className={Styles.calendarInput}
            />
            {errors.minimumParticipants && (
              <p className={Styles.error}>{errors.minimumParticipants.message}</p>
            )}
            <label>Maximum Participants* </label>
            <input
              type="number"
              {...register("maximumParticipants")}
              placeholder="Maximum Participants"
              className={Styles.calendarInput}
            />
            {errors.maximumParticipants && (
              <p className={Styles.error}>{errors.maximumParticipants.message}</p>
            )}
            <label>Location* </label>
            <input
              type="text"
              {...register("location")}
              placeholder="Location"
              className={Styles.calendarInput}
            />
            {errors.location && (
              <p className={Styles.error}>{errors.location.message}</p>
            )}
            <label>Upload Image* </label>
            <input
              type="file"
              {...register("image")}
              accept="image/*"
              className={Styles.calendarInput}
            />
            {errors.image && (
              <p className={Styles.error}>{errors.image.message}</p>
            )}
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
