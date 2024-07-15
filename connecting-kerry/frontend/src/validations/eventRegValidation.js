// src/validations/eventRegValidation.js

import * as yup from "yup";

export const EventRegisterSchema = yup.object().shape({
  title: yup
    .string()
    .required("Event title is required")
    .min(3, "Event title must have at least 3 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long"),
  startDate: yup
    .date()
    .required("Start date is required")
    .min(new Date(), "Start date cannot be in the past"),
  endDate: yup
    .date()
    .required("End date is required")
    .min(yup.ref('startDate'), "End date cannot be less than start date"),
  registrationDate: yup
    .date()
    .required("Registration deadline is required")
    .max(yup.ref('startDate'), "Registration deadline must be before start date")
    .test(
      "registrationDate",
      "Registration deadline has to be at least 4 days before start date",
      function(value) {
        const startDate = this.parent.startDate;
        return (
          startDate &&
          new Date(value) <= new Date(startDate.setDate(startDate.getDate() - 4))
        );
      }
    ),
  minimumParticipants: yup
    .number()
    .required("Minimum participants is required")
    .positive("Minimum participants must be a positive number")
    .integer("Minimum participants must be an integer"),
  maximumParticipants: yup
    .number()
    .required("Maximum participants is required")
    .positive("Maximum participants must be a positive number")
    .integer("Maximum participants must be an integer")
    .min(yup.ref('minimumParticipants'), "Maximum participants cannot be less than minimum participants"),
  location: yup
  .string()
  .required("Location is required")
});
