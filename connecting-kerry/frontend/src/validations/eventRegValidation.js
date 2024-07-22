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
  date: yup
    .date()
    .required("Date is required")
    .min(new Date(), "Date cannot be in the past"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup
    .string()
    .required("End time is required")
    .test("is-greater", "End time must be after start time", function (value) {
      const { startTime } = this.parent;
      return (
        new Date(`1970-01-01T${value}`) > new Date(`1970-01-01T${startTime}`)
      );
    }),
  registrationDate: yup
    .date()
    .required("Registration deadline is required")
    .min(new Date(), "Registration deadline cannot be in the past")
    .max(yup.ref("date"), "Registration deadline must be before the event date")
    .test(
      "registrationDate",
      "Registration deadline has to be at least 2 days before the event date",
      function (value) {
        const eventDate = this.parent.date;
        return (
          eventDate &&
          new Date(value) <=
            new Date(
              new Date(eventDate).setDate(new Date(eventDate).getDate() - 2)
            )
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
    .min(
      yup.ref("minimumParticipants"),
      "Maximum participants cannot be less than minimum participants"
    ),
  location: yup.string().required("Location is required"),
  image: yup.string().required("Image selection is required"),
});
