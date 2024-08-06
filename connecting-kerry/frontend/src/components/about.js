import React from "react";
import styles from "../styles/aboutUs.module.css";

function About() {
  return (
    <div>
      <main>
        <div className={styles.container}>
          <div className={styles.aboutUsContainer}>
            <h1>About Us</h1>
            <p className={styles.privacyText}>
              Welcome to Connecting Kerry, your go-to platform for making a
              positive impact in the beautiful County Kerry. At Connecting
              Kerry, we believe in the power of community and the importance of
              giving back. Our mission is to connect enthusiastic volunteers
              with meaningful opportunities that benefit our local area and its
              residents.
            </p>
            <h1>Who We Are</h1>
            <p>
              Connecting Kerry is a dedicated volunteering hub based in the
              heart of County Kerry. We are passionate about fostering a sense
              of community spirit and enabling individuals to contribute to
              causes they care about. Whether you are a local resident or a
              visitor, our platform offers a variety of volunteering
              opportunities that cater to all interests and skills.
            </p>
            <h1>What We Do</h1>
            <p>
              We provide an easy-to-use platform where users can find and apply
              for volunteer roles, and organizations can upload and promote
              their events. Our events cover a wide range of activities,
              ensuring there's something for everyone. From beach clean-ups and
              environmental conservation efforts to assisting the elderly and
              supporting local festivals, Connecting Kerry helps you find the
              perfect way to give back.
            </p>
            <h1>Our Mission</h1>
            <p>
              Our mission is simple: to connect volunteers with opportunities
              that make a difference. We aim to support local organizations in
              their efforts to improve our community, while also providing
              volunteers with rewarding experiences that enrich their lives.
            </p>
            <h1>How It Works</h1>
            <p>
              <strong>For Volunteers:</strong>
              <ul>
                <li>
                  Explore Opportunities: Browse through a diverse array of
                  events and causes that need your help.
                </li>
                <li>
                  Apply Easily: Sign up for events that match your interests and
                  availability with just a few clicks.
                </li>
                <li>
                  Make a Difference: Join fellow volunteers in making a tangible
                  impact on our community.
                </li>
              </ul>
              <strong>For Organizations:</strong>
              <ul>
                <li>
                  Post Events: Share your events and volunteer needs with a wide
                  audience.
                </li>
                <li>
                  Find Help: Connect with passionate volunteers who are eager to
                  support your cause.
                </li>
                <li>
                  Grow Your Impact: Benefit from the collective efforts of our
                  vibrant volunteering community.
                </li>
              </ul>
            </p>
            <h1>Get Involved</h1>
            <p>
              Join us in making County Kerry an even better place to live, work,
              and visit. Whether you're looking to contribute your time and
              skills or need volunteers for your event, Connecting Kerry is here
              to help. Together, we can create a stronger, more connected
              community.
            </p>
            <p>
              Thank you for being a part of Connecting Kerry. Let's make a
              difference, one event at a time!
            </p>
            <p>
              Feel free to contact us for more information or to get started
              with volunteering today!
            </p>
            <p>
              <strong>Contact Us</strong>
              <br />
              Email:{" "}
              <a href="mailto:connecting.kerry123@gmail.com">
                connecting.kerry123@gmail.com
              </a>
              <br />
              Phone: +353 123 4567
              <br />
              Follow us on social media: Facebook, Twitter, Instagram
            </p>
            <p>Connecting Kerry - Bringing Community Together.</p>
          </div>
          <aside className={styles.picturesContainer}>
            <img src="/images/beachCleaning.jpg" alt="Beach Cleaning" />
            <img src="/images/personPhone.jpg" alt="Person on Phone" />
            <img src="/images/handing.jpg" alt="Handing out boxes with food" />
            <img src="/images/teamwork.jpg" alt="Teamwork" />
            <img src="/images/helping.jpeg" alt="Helping" />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default About;
