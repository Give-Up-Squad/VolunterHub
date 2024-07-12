// src/components/Calendar.js

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Modal from "./modal.js";
import Styles from "../styles/calendar.module.css";
import useActivities from "../hooks/useActivities.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EventRegisterSchema } from "../validations/eventRegValidation";

export default function Calendar() {
  const { activities, loading, error } = useActivities();
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(EventRegisterSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (!loading && activities.length) {
      const formattedActivities = activities.map((activity) => ({
        id: activity.activity_id,
        title: activity.activity_name,
        start: activity.activity_start_date,
        end: activity.activity_end_date,
        description: activity.description,
        deadline: activity.activity_deadline,
        status: activity.activity_status,
        availableParticipants: activity.available_participants,
        minimumParticipants: activity.minimum_participants,
        maximumParticipants: activity.maximum_participants,
      }));
      setEvents(formattedActivities);
    }
  }, [loading, activities]);

  const onSubmit = (data) => {
    const eventToAdd = {
      title: data.title,
      start: data.startDate,
      end: data.endDate,
      description: data.description,
      registrationDate: data.registrationDate,
      minimumParticipants: data.minimumParticipants,
      maximumParticipants: data.maximumParticipants,
    };
    setEvents((prevEvents) => [...prevEvents, eventToAdd]);
    reset();
    setIsModalOpen(false);
  };

  return (
    <div className={Styles.calendarContainer}>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className={Styles.calendarForm}>
          <label>Event Title: </label>
          <input
            type="text"
            {...register("title")}
            placeholder="Event Title"
            className={Styles.calendarInput}
          />
          {errors.title && <p className={Styles.error}>{errors.title.message}</p>}

          <label>Description: </label>
          <input
            type="text"
            {...register("description")}
            placeholder="Description"
            className={Styles.calendarInput}
          />
          {errors.description && <p className={Styles.error}>{errors.description.message}</p>}

          <label>Start Date: </label>
          <input
            type="datetime-local"
            {...register("startDate")}
            placeholder="Start Date"
            className={Styles.calendarInput}
          />
          {errors.startDate && <p className={Styles.error}>{errors.startDate.message}</p>}

          <label>End Date: </label>
          <input
            type="datetime-local"
            {...register("endDate")}
            placeholder="End Date"
            className={Styles.calendarInput}
          />
          {errors.endDate && <p className={Styles.error}>{errors.endDate.message}</p>}

          <label>Registration Deadline: </label>
          <input
            type="datetime-local"
            {...register("registrationDate")}
            placeholder="Registration Deadline"
            className={Styles.calendarInput}
          />
          {errors.registrationDate && <p className={Styles.error}>{errors.registrationDate.message}</p>}

          <label>Minimum Participants: </label>
          <input
            type="number"
            {...register("minimumParticipants")}
            placeholder="Minimum Participants"
            className={Styles.calendarInput}
          />
          {errors.minimumParticipants && <p className={Styles.error}>{errors.minimumParticipants.message}</p>}

          <label>Maximum Participants: </label>
          <input
            type="number"
            {...register("maximumParticipants")}
            placeholder="Maximum Participants"
            className={Styles.calendarInput}
          />
          {errors.maximumParticipants && <p className={Styles.error}>{errors.maximumParticipants.message}</p>}

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
