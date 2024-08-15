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
    .typeError("Invalid date")
    .required("Date is required")
    .min(
      new Date(new Date().setDate(new Date().getDate() + 3)),
      "Event date must be at least 3 days from today"
    ),
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
    .mixed()
    .test("is-date", "Registration deadline is required", (value) => {
      if (value === "" || value === null || value === undefined) {
        return false;
      }
      const date = new Date(value);
      return !isNaN(date.getTime());
    })
    .test(
      "min-date",
      "Registration deadline cannot be in the past",
      function (value) {
        if (!value) return true; // Skip validation if the date is invalid or empty
        return new Date(value) >= new Date();
      }
    )
    .test(
      "max-date",
      "Registration deadline must be before the event date",
      function (value) {
        const eventDate = this.parent.date;
        if (!value || !eventDate) return true; // Skip validation if the date is invalid or empty
        return new Date(value) <= new Date(eventDate);
      }
    )
    .test(
      "registrationDate",
      "Registration deadline has to be at least 2 days before the event date",
      function (value) {
        const eventDate = this.parent.date;
        if (!value || !eventDate) return true; // Skip validation if the date is invalid or empty
        return (
          new Date(value) <=
          new Date(
            new Date(eventDate).setDate(new Date(eventDate).getDate() - 2)
          )
        );
      }
    ),
  minimumParticipants: yup
    .number()
    .typeError("Invalid number")
    .required("Minimum participants is required")
    .positive("Minimum participants must be a positive number")
    .integer("Minimum participants must be an integer"),
  maximumParticipants: yup
    .number()
    .typeError("Invalid number")
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
