import React from "react";
import styles from "../styles/aboutUs.module.css";

function Privacy() {
  return (
    <div>
      <main>
        <div className={styles.container}>
          <div className={styles.aboutUsContainer}>
            <h1>Introduction</h1>
            <p className={styles.privacyText}>
                Introduction
                 Welcome to our volunteer program! Before you sign up and start contributing your time and skills, 
                 it's important that you review and understand the following disclaimer in accordance with the General Data Protection 
                 Regulation (GDPR) in Ireland.
            </p>
            <h1>Volunteer Responsibilities</h1>
            <p>
                As a volunteer, you agree to:
                •	Perform your duties to the best of your abilities
                •	Follow all instructions and guidelines provided by the organization
                •	Notify the organization 48 hours of any changes to your availability or contact information 
                •	Refrain from engaging in any illegal or unethical activities while representing the organization

            </p>
            <h1>Data Protection and Privacy</h1>
            <p>
                The organization is committed to protecting your personal data and complying with GDPR. We will only collect and use your personal 
                information for valid purposes related to your volunteer role, such as contact details and emergency contacts.
                 Your data will be kept secure, accurate, and up to date. We will retain your data for up to 3 years after your last contact, 
                 unless otherwise required by law. You have the right to access, rectify, or erase your personal data, and to lodge a complaint 
                 with the Data Protection Commission if you have concerns about how your information is handled. The organization 
                 will not share your data with third parties without your consent, unless required by law.
            </p>
            <h1>Liability and Insurance</h1>
            <p>
                The organization does not provide any form of insurance coverage for its volunteers. 
                You are responsible for your own health, safety, and well-being while participating in volunteer activities. 
                The organization will not be held liable for any injuries, accidents, or damages that may occur during your volunteer service.
            </p>
            <h1>Termination of Volunteer Service</h1>
            <p>
                The organization reserves the right to terminate your volunteer service at any time, for any reason, 
                without prior notice. Reasons for termination may include, but are not 
            </p>
            <h1>Acknowledgement and Acceptance</h1>
            <p>
            By signing up as a volunteer, you acknowledge that you have read, understood, 
            and agree to the terms and conditions outlined in this disclaimer. 
            You understand that your volunteer service is at-will, and that the organization is not obligated to 
            continue your involvement. If you have any questions or concerns about this disclaimer or the organization's 
            data protection practices, please contact the volunteer coordinator at [insert contact information] or the Data Protection Officer 
            at [insert contact information].

            </p>

          </div>
          
        </div>
      </main>
    </div>
  );
}

export default Privacy;