import React, { useState } from 'react';
import styles from '../styles/updateProfile.module.css';

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    firstName: 'dey-dey',
    lastName: 'bootdey',
    company: '',
    email: 'janesemail@gmail.com',
    timeZone: 'Central Time (US & Canada)',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={`${styles.container} bootstrap snippets bootdey`}>
      <h1 className={styles.textPrimary}>Edit Profile</h1>
      <hr />
      <div className="row">
        {/* left column */}
        <div className="col-md-3">
          
        </div>
        {/* edit form column */}
        <div className="col-md-9 personal-info">
          
          <h3>Personal info</h3>
          <form className="form-horizontal" role="form">
            <div className={styles.formGroup}>
              <label className={`col-lg-3 ${styles.controlLabel}`}>First name:</label>
              <div className="col-lg-8">
                <input
                  className={styles.formControl}
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={`col-lg-3 ${styles.controlLabel}`}>Last name:</label>
              <div className="col-lg-8">
                <input
                  className={styles.formControl}
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={`col-lg-3 ${styles.controlLabel}`}>Company:</label>
              <div className="col-lg-8">
                <input
                  className={styles.formControl}
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={`col-lg-3 ${styles.controlLabel}`}>Email:</label>
              <div className="col-lg-8">
                <input
                  className={styles.formControl}
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={`col-lg-3 ${styles.controlLabel}`}>Time Zone:</label>
              <div className="col-lg-8">
                <select
                  id="user_time_zone"
                  className={styles.formControl}
                  name="timeZone"
                  value={formData.timeZone}
                  onChange={handleChange}
                >
                  <option value="Hawaii">(GMT-10:00) Hawaii</option>
                  <option value="Alaska">(GMT-09:00) Alaska</option>
                  <option value="Pacific Time (US & Canada)">
                    (GMT-08:00) Pacific Time (US & Canada)
                  </option>
                  <option value="Arizona">(GMT-07:00) Arizona</option>
                  <option value="Mountain Time (US & Canada)">
                    (GMT-07:00) Mountain Time (US & Canada)
                  </option>
                  <option value="Central Time (US & Canada)">
                    (GMT-06:00) Central Time (US & Canada)
                  </option>
                  <option value="Eastern Time (US & Canada)">
                    (GMT-05:00) Eastern Time (US & Canada)
                  </option>
                  <option value="Indiana (East)">(GMT-05:00) Indiana (East)</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
