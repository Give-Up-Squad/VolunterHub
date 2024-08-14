import React from "react";
import styles from "../styles/footer.module.css";
import { useAuth } from "../contexts/authContext";
import { useUser } from "../contexts/userContext";

function Footer() {
  const { userLoggedIn } = useAuth();
  const { user } = useUser();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.row} ${styles.primary}`}>
        <div className={styles.column}>
          <img
            src="/images/logo-no-background.png"
            width="250"
            alt="Connecting Kerry Logo"
            className={styles.imageLogoFooter}
          ></img>
        </div>
        <div className={styles.column}>
          <h2>Services</h2>
          <ul className={styles.links}>
            <li>
              <a className={styles.footerLink} href="/">
                Home
              </a>
            </li>
            <li>
              <a className={styles.footerLink} href="/about">
                About
              </a>
            </li>
            {userLoggedIn && (
              <>
                {user &&
                  user.roles === "Volunteer" &&
                  user.is_garda_vetted === "Approved" && (
                    <li>
                      <a className={styles.footerLink} href="/volunteer">
                        Volunteer
                      </a>
                    </li>
                  )}
                {user && user.roles === "Admin" && (
                  <>
                    <li>
                      <a className={styles.footerLink} href="/approvals">
                        Approvals
                      </a>
                    </li>
                    <li>
                      <a className={styles.footerLink} href="/users">
                        All Users
                      </a>
                    </li>
                  </>
                )}
                {user && user.is_garda_vetted === "Approved" && (
                  <>
                    <li>
                      <a className={styles.footerLink} href="/calendar">
                        My Calendar
                      </a>
                    </li>
                    <li>
                      <a className={styles.footerLink} href="/applications">
                        {user.roles === "Volunteer"
                          ? "My Applications"
                          : "My Events"}
                      </a>
                    </li>
                  </>
                )}

                <li>
                  <a className={styles.footerLink} href="/profile">
                    My Profile
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className={styles.column}>
          <h2>Social Media</h2>
          <ul className={styles.links}>
            <a
              className={styles.footerLink}
              target="_blank"
              href="https://www.facebook.com/profile.php?id=61560397315033&mibextid=LQQJ4d&rdid=qdT0q2nURnbmhtB0&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FcNf9SyMPnHm6SRoc%2F%3Fmibextid%3DLQQJ4d"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                height="35"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <br></br>
            <a
              className={styles.footerLink}
              target="_blank"
              href="https://x.com/CKerry2024"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                height="35"
              >
                <path d="M23.643 4.937c-.835.372-1.732.623-2.675.735a4.725 4.725 0 0 0 2.062-2.606 9.587 9.587 0 0 1-2.971 1.134 4.785 4.785 0 0 0-8.166 4.344c-3.978-.198-7.533-2.106-9.901-5.006a4.78 4.78 0 0 0-.647 2.405 4.771 4.771 0 0 0 2.123 3.976 4.74 4.74 0 0 1-2.163-.598v.059a4.778 4.778 0 0 0 3.832 4.679 4.77 4.77 0 0 1-2.158.083 4.78 4.78 0 0 0 4.464 3.315 9.607 9.607 0 0 1-5.934 2.036 9.785 9.785 0 0 1-1.145-.067 13.567 13.567 0 0 0 7.358 2.154c8.83 0 13.665-7.325 13.665-13.669 0-.209 0-.418-.015-.626a9.721 9.721 0 0 0 2.381-2.471l.002-.003z" />
              </svg>
            </a>
            <br></br>
            <a
              className={styles.footerLink}
              target="_blank"
              href="https://www.instagram.com/connectingkerry/?igsh=MWZ6eDcxdGdoemdhMw%3D%3D&utm_source=qr"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                height="35"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.327 3.608 1.302.975.975 1.24 2.242 1.302 3.608.058 1.266.07 1.646.07 4.857 0 3.204-.012 3.584-.07 4.85-.062 1.366-.327 2.633-1.302 3.608-.975.975-2.242 1.24-3.608 1.302-1.266.058-1.646.07-4.857.07-3.204 0-3.584-.012-4.85-.07-1.366-.062-2.633-.327-3.608-1.302-.975-.975-1.24-2.242-1.302-3.608-.058-1.266-.07-1.646-.07-4.857 0-3.204.012-3.584.07-4.85.062-1.366.327-2.633 1.302-3.608.975-.975 2.242-1.24 3.608-1.302 1.266-.058 1.646-.07 4.857-.07m0-2.163c-3.259 0-3.667.014-4.947.072-1.392.063-2.965.334-4.093 1.462-1.128 1.128-1.399 2.701-1.462 4.093-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.063 1.392.334 2.965 1.462 4.093 1.128 1.128 2.701 1.399 4.093 1.462 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.392-.063 2.965-.334 4.093-1.462 1.128-1.128 1.399-2.701 1.462-4.093.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.063-1.392-.334-2.965-1.462-4.093-1.128-1.128-2.701-1.399-4.093-1.462-1.28-.058-1.688-.072-4.947-.072z" />
                <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.324c-2.298 0-4.162-1.864-4.162-4.162s1.864-4.162 4.162-4.162 4.162 1.864 4.162 4.162-1.864 4.162-4.162 4.162zm6.406-11.845c-.796 0-1.441.645-1.441 1.441 0 .796.645 1.441 1.441 1.441.796 0 1.441-.645 1.441-1.441 0-.796-.645-1.441-1.441-1.441z" />
              </svg>
            </a>
          </ul>
        </div>
      </div>
      <div className={styles.termsAndConText}>
        <p>
          © 2024 Connecting Kerry. All Rights Reserved.{" "}
          <a href="/privacy">Terms and Conditions.</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
