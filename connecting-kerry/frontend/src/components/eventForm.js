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

  if (loading) {
    return <p>Loading images...</p>;
  }

  if (error) {
    return <p>Error loading images: {error}</p>;
  }

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
            type="datetime-local"
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
            type="datetime-local"
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
            type="datetime-local"
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
