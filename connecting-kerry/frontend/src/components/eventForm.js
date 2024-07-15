import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EventRegisterSchema } from "../validations/eventRegValidation";
import styles from "../styles/eventForm.module.css";

export default function EventForm({ onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EventRegisterSchema),
    mode: "onTouched",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.calendarForm}>
      <div className={styles.formSection}>
        <div className={styles.formGroup}>
          <label>Event Title* </label>
          <input
            type="text"
            {...register("title")}
            placeholder="Event Title"
            className={styles.calendarInput}
          />
          {errors.title && (
            <p className={styles.error}>{errors.title.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>Description* </label>
          <input
            type="text"
            {...register("description")}
            placeholder="Description"
            className={styles.calendarInput}
          />
          {errors.description && (
            <p className={styles.error}>{errors.description.message}</p>
          )}
        </div>
      </div>
      <div className={styles.formSection}>
        <div className={styles.formGroup}>
          <label>Start Date* </label>
          <input
            type="date"
            {...register("startDate")}
            placeholder="Start Date"
            className={styles.calendarInput}
          />
          {errors.startDate && (
            <p className={styles.error}>{errors.startDate.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>End Date* </label>
          <input
            type="date"
            {...register("endDate")}
            placeholder="End Date"
            className={styles.calendarInput}
          />
          {errors.endDate && (
            <p className={styles.error}>{errors.endDate.message}</p>
          )}
        </div>
      </div>
      <div className={styles.formSection}>
        <div className={styles.formGroup}>
          <label>Registration Deadline* </label>
          <input
            type="date"
            {...register("registrationDate")}
            placeholder="Registration Deadline"
            className={styles.calendarInput}
          />
          {errors.registrationDate && (
            <p className={styles.error}>{errors.registrationDate.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>Location* </label>
          <input
            type="text"
            {...register("location")}
            placeholder="Location"
            className={styles.calendarInput}
          />
          {errors.location && (
            <p className={styles.error}>{errors.location.message}</p>
          )}
        </div>
      </div>
      <div className={styles.formSection}>
        <div className={styles.formGroup}>
          <label>Minimum Participants* </label>
          <input
            type="number"
            {...register("minimumParticipants")}
            placeholder="Minimum Participants"
            className={styles.calendarInput}
          />
          {errors.minimumParticipants && (
            <p className={styles.error}>{errors.minimumParticipants.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>Maximum Participants* </label>
          <input
            type="number"
            {...register("maximumParticipants")}
            placeholder="Maximum Participants"
            className={styles.calendarInput}
          />
          {errors.maximumParticipants && (
            <p className={styles.error}>{errors.maximumParticipants.message}</p>
          )}
        </div>
      </div>
      <div className={styles.formSection}>
        <div className={styles.formGroup}>
          <label>Upload Image* </label>
          <input
            type="file"
            {...register("image")}
            accept="image/*"
            className={styles.calendarInput}
          />
          {errors.image && (
            <p className={styles.error}>{errors.image.message}</p>
          )}
        </div>
      </div>
      <div className={styles.formButtons}>
        <button type="submit" className={styles.calendarSubmitButton}>
          Add Event
        </button>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
