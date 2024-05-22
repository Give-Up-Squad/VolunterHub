import React from "react";
import styles from "../styles/aboutUs.module.css";
import Navbar from "./navbar";
import Footer from "./footer";
import Disclaimer  from "./disclaimer"
import EventForm from "./eventForm";
import Landing from "./landing";
function About() {
  return (
    <div>
      <Landing />
      <main>
        <div className={styles.container}>
          <div className={styles.aboutUsContainer}>
            <h1>About</h1>
            {/* About Us text*/}
            <p>What is Lorem Ipsum?</p>

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Why do we use it?
            </p>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
            <p>
              The standard chunk of Lorem Ipsum used since the 1500s is
              reproduced below for those interested. Sections 1.10.32 and
              1.10.33 from " de Finibus Bonorum et Malorum" by Cicero are also
              reproduced in their exact original form, accompanied by English
              versions from the 1914 translation by H. Rackham.
            </p>
          </div>
          {/* Images on the right hand side of the page*/}
          <aside className={styles.picturesContainer}>
            <img src="/images/beachCleaning.jpg" width="100%"></img>
            <img src="/images/personPhone.jpg" width="100%"></img>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default About;
