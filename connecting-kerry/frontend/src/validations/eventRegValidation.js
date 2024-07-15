
import * as yup from "yup";

export const EventRegisterSchema = yup.object().shape({
  title: yup.string().required("Event title is required"),
  description: yup.string().required("Description is required"),
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
    .max(yup.ref('startDate'), "Registration deadline has to be less than start date")
    .test(
      "is-later",
      "Registration deadline has to be at least 4 days before start date",
      function (value) {
        const startDate = this.parent.startDate;
        return startDate && value && new Date(startDate) - new Date(value) >= 4 * 24 * 60 * 60 * 1000;
      }
    ),
  minimumParticipants: yup
    .number()
    .required("Minimum participants is required")
    .positive("Minimum participants must be a positive number")
    .integer("Minimum participants must be an integer")
    .max(yup.ref('maximumParticipants'), "Minimum participants cannot be bigger than maximum participants"),
  maximumParticipants: yup
    .number()
    .required("Maximum participants is required")
    .positive("Maximum participants must be a positive number")
    .integer("Maximum participants must be an integer"),
});
