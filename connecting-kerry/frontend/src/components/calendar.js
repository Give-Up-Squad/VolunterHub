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
import { useNavigate } from "react-router-dom";

export default function Calendar() {
  const { user, loading: userLoading, error: userError } = useUser();
  const {
    activities: blueActivities,
    loading: blueLoading,
    error: blueError,
    refetchActivities,
  } = useActivities();
  const [greenActivities, setGreenActivities] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { formatDateForDB } = useDateFormat();
  const [greenLoading, setGreenLoading] = useState(true);
  const [greenError, setGreenError] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const combineDateAndTime = (date, time) => {
    if (!date || !time) {
      console.error("Invalid date or time:", date, time);
      return null;
    }

    const dateString = formatDate(date);
    const timeString = time;

    const combinedDateString = `${dateString}T${timeString}:00`;

    const combinedDate = new Date(combinedDateString);

    if (isNaN(combinedDate.getTime())) {
      console.error("Invalid date created:", combinedDate);
      return null;
    }

    const year = String(combinedDate.getFullYear()).padStart(4, "0");
    const month = String(combinedDate.getMonth() + 1).padStart(2, "0");
    const day = String(combinedDate.getDate()).padStart(2, "0");
    const hours = String(combinedDate.getHours()).padStart(2, "0");
    const minutes = String(combinedDate.getMinutes()).padStart(2, "0");
    const seconds = "00";

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const fetchGreenActivities = async () => {
    if (!user) return; // No need to fetch if user is not defined

    setGreenLoading(true);
    try {
      let apiUrl = "";
      if (user.roles !== "Volunteer") {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/activities/organisation/${user.org_id}`;
      } else {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/activities/volunteer/${user.volunteer_id}?status=Upcoming`;
      }

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          setGreenActivities([]);
        } else {
          throw new Error("Failed to fetch green activities");
        }
      } else {
        const data = await response.json();
        console.log("Green Activities data:", data.activities);

        let filteredActivities = data.activities;

        // Apply filtering for non-volunteer users
        if (user.roles !== "Volunteer") {
          filteredActivities = filteredActivities.filter(
            (activity) =>
              activity.activity_status !== "Cancelled" &&
              activity.activity_approval_status === "Approved"
          );
        }
        console.log("Filtered activities:", filteredActivities);
        setGreenActivities(filteredActivities);
      }
    } catch (err) {
      console.error(err);
      setGreenError(err.message);
    } finally {
      setGreenLoading(false);
    }
  };

  useEffect(() => {
    if (userLoading) return; // Wait until user data is loaded
    if (!user) return; // Ensure user is available

    fetchGreenActivities();
  }, [user, userLoading]);

  useEffect(() => {
    if (!blueLoading && !greenLoading) {
      const filteredBlueActivities = blueActivities.filter(
        (activity) => activity.activity_status !== "Cancelled"
      );

      const formattedBlueActivities = filteredBlueActivities.map(
        (activity) => ({
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
          location: activity.activity_location,
          image: activity.activity_image,
          activity_approval_status: activity.activity_approval_status,
          backgroundColor: "#0000FF", // Blue color for not applied/created
          type: "blue",
        })
      );

      const formattedGreenActivities = greenActivities.map((activity) => ({
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
        location: activity.activity_location,
        image: activity.activity_image,
        activity_approval_status: activity.activity_approval_status,
        backgroundColor: "#32CD32", // Green color for applied/created
        type: "green",
      }));

      setEvents([...formattedBlueActivities, ...formattedGreenActivities]);
    }
  }, [blueLoading, greenLoading, blueActivities, greenActivities]);

  const handleAddEvent = async (data) => {
    if (
      data.title &&
      data.description &&
      data.date &&
      data.startTime &&
      data.endTime &&
      data.registrationDate &&
      data.minimumParticipants &&
      data.maximumParticipants &&
      data.location
    ) {
      const approvalStatus = user.roles === "Admin" ? "Approved" : "Pending";
      const eventToAdd = {
        activity_name: data.title,
        activity_description: data.description,
        activity_start_date: combineDateAndTime(data.date, data.startTime),
        activity_end_date: combineDateAndTime(data.date, data.endTime),
        activity_deadline: formatDateForDB(data.registrationDate),
        max_participants: data.maximumParticipants,
        min_participants: data.minimumParticipants,
        available_participants: data.maximumParticipants,
        org_id: user.org_id,
        activity_status: "Upcoming",
        activity_location: data.location,
        activity_image: data.image,
        activity_approval_status: approvalStatus,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
      };
      console.log("Adding event:", eventToAdd);

      setIsLoading(true);

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
        fetchGreenActivities();
        setEvents((prevEvents) => [...prevEvents, eventToAdd]);
        setIsFormOpen(false);
        navigate("/loading", {
          state: { loadingText: "Adding activity..." },
        });

        setTimeout(() => {
          navigate("/applications", { replace: true });
        }, 1000);
      } catch (error) {
        console.error("Error adding event:", error.message);
        alert("Error adding event: " + error.message);
      } finally {
        setIsLoading(false);
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
      activity_location: extendedProps.location,
      activity_image: extendedProps.image,
      ...extendedProps,
    });
    setIsModalOpen(true);
  };

  if (userLoading) {
    return <div className={Styles.loading}>Loading user data...</div>;
  }

  if (!user) {
    return <div className={Styles.error}>User is not logged in.</div>;
  }

  return (
    <div className={Styles.calendarContainer}>
      {isLoading && <div className={Styles.loading}>Adding event...</div>}
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
      <div className={Styles.legend}>
        <div className={Styles.legendItem}>
          <div
            className={Styles.colorBox}
            style={{ backgroundColor: "#32CD32" }}
          ></div>
          <span className={Styles.legendSpan}>Your Activities</span>
        </div>
        <div className={Styles.legendItem}>
          <div
            className={Styles.colorBox}
            style={{ backgroundColor: "#0000FF" }}
          ></div>
          <span className={Styles.legendSpan}>Other Activities</span>
        </div>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: isMobileView
            ? "dayGridMonth,listMonth myCustomButton today prev,next"
            : user.roles !== "Volunteer"
            ? "myCustomButton today prev,next"
            : "today prev,next",
          center: "title",
          end: isMobileView
            ? ""
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
