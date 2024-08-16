import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EventRegisterSchema } from "../validations/eventRegValidation";
import styles from "../styles/eventForm.module.css";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { storage } from "../firebase/firebase";

export default function EventForm({ onSubmit, onCancel }) {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const listRef = ref(storage, "volunteerImages/");
        const res = await listAll(listRef);
        const urls = await Promise.all(
          res.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            const metadata = await getMetadata(itemRef);
            return { url, name: metadata.name };
          })
        );
        setImageUrls(urls);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EventRegisterSchema),
    mode: "onTouched",
  });

  const handleImageChange = (e) => {
    const selectedImage = e.target.value;
    setSelectedImageUrl(selectedImage);
  };

  const combineDateAndTime = (date, time) => {
    if (!date || !time) return null;

    const combinedDate = new Date(`${date}T${time}:00`);

    const year = combinedDate.getFullYear();
    const month = String(combinedDate.getMonth() + 1).padStart(2, "0");
    const day = String(combinedDate.getDate()).padStart(2, "0");
    const hours = String(combinedDate.getHours()).padStart(2, "0");
    const minutes = String(combinedDate.getMinutes()).padStart(2, "0");
    const seconds = "00";
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const onSubmitHandler = (data) => {
    const startDate = combineDateAndTime(data.date, data.startTime);
    const endDate = combineDateAndTime(data.date, data.endTime);

    if (!startDate || !endDate) {
      console.error("Invalid date or time value");
      return;
    }

    const formattedData = {
      ...data,
      startDate: startDate,
      endDate: endDate,
    };

    onSubmit(formattedData);
  };

  if (loading) {
    return <p>Loading images...</p>;
  }

  if (error) {
    return <p>Error loading images: {error}</p>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className={styles.calendarForm}
    >
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
          <label>Date* </label>
          <input
            type="date"
            {...register("date")}
            placeholder="Date"
            className={styles.calendarInput}
          />
          {errors.date && <p className={styles.error}>{errors.date.message}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Start Time* </label>
          <input
            type="time"
            {...register("startTime")}
            placeholder="Start Time"
            className={styles.calendarInput}
          />
          {errors.startTime && (
            <p className={styles.error}>{errors.startTime.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>End Time* </label>
          <input
            type="time"
            {...register("endTime")}
            placeholder="End Time"
            className={styles.calendarInput}
          />
          {errors.endTime && (
            <p className={styles.error}>{errors.endTime.message}</p>
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
            maxlength="3"
            max="100"
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
          <label>Select Image* </label>
          <select
            {...register("image")}
            className={styles.calendarInput}
            onChange={handleImageChange}
            style={{ marginBottom: "30px" }}
          >
            <option value="">Select an image</option>
            {imageUrls.map((image, index) => (
              <option key={index} value={image.url}>
                {image.name}
              </option>
            ))}
          </select>
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
          {errors.image && (
            <p className={styles.error}>{errors.image.message}</p>
          )}
        </div>
        {selectedImageUrl && (
          <img
            src={selectedImageUrl}
            alt="Selected"
            className={styles.selectedImage}
          />
        )}
      </div>
    </form>
  );
}
