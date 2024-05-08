import React from 'react';
import styles from '../mystyle.module.css';

//div.classname and press tab for a shortcut, div# for id
// all functions have to be capital letter
//https://www.w3schools.com/react/react_css.asp

const websiteLinks = [
  "Home",
  "Volunteer",
  "Opportunities"
];

function Navbar(Links) {

  return (
    <header>
    <div className={styles.navbarContainer}>
        <div id={styles.navbarTitle}>
            <h1>Connecting Kerry</h1>
        </div>

        <section>
          <ul className={styles.navbarButtons}>
            {websiteLinks.map((link) =>(
              <li>{link}</li>))}
              <button>Button</button>
          </ul>
        </section>
    </div>
    </header>
  )
}


export default Navbar;