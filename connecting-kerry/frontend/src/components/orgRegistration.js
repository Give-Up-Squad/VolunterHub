import { React, useEffect, useState } from "react";
import styles from "../styles/registerForms.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { OrgRegistrationSchema } from "../validations/orgRegValidation";
import LoadingPage from "./loadingPage";

const OrganisationRegistration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(OrgRegistrationSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    setValue("roles", "Organisation");
  }, [setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    navigate("/loading", { state: { loadingText: "Creating account..." } });
    try {
      const userCredentials = await doCreateUserWithEmailAndPassword(
        data.email,
        data.password
      );
      const user = userCredentials.user;
      console.log("Organisation registered successfully:", user);

      const authToken = await user.getIdToken();
      sessionStorage.setItem("authToken", authToken);

      const email = data.email.toLowerCase();
      const backendData = {
        username: null,
        email: email,
        is_garda_vetted: "Pending",
        roles: data.roles,
        dob: null,
        forename: null,
        surname: null,
        org_name: data.orgName,
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(backendData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to register organisation");
      }

      const responseData = await response.json();
      console.log("Backend response:", responseData);

      navigate("/review", { replace: true });
    } catch (error) {
      setLoading(false);
      console.error("Error registering organisation:", error.message);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingPage loadingText="Creating account..." />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
          <h2>Organisation Registration</h2>
          <div className={styles.content}>
            <div className={styles.inputField}>
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                required
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </div>
            <div className={styles.inputField}>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                required
              />
              {errors.password && (
                <p className={styles.error}>{errors.password.message}</p>
              )}
            </div>
            <div className={styles.inputField}>
              <input
                type="text"
                {...register("orgName")}
                placeholder="Organisation Name"
                required
              />
              {errors.orgName && (
                <p className={styles.error}>{errors.orgName.message}</p>
              )}
            </div>
            <input type="hidden" {...register("roles")} value="Organisation" />

            <div className={styles.termsandConSection}>
              <label htmlFor="confirmTerms">
                Please confirm that you have read{" "}
                <a href="/privacy">Terms and Conditions</a>
              </label>
              <input
                type="checkbox"
                id="confirmTerms"
                {...register("confirmTerms", {
                  required: "You must accept the terms and conditions",
                })}
              />
            </div>
            {errors.confirmTerms && (
              <p className={styles.error}>{errors.confirmTerms.message}</p>
            )}
            <a href="/login" className={styles.loginLink}>
              Already have an account? Login here
            </a>
          </div>
          <div className={styles.action}>
            <button type="submit">Register</button>
          </div>
        </form>
      )}
    </>
  );
};

export default OrganisationRegistration;
