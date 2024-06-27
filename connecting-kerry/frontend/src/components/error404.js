// Error404.js
import React from 'react';
import Styles from '../styles/error404.module.css';

function Error404() {
  return (
    <div>
      <h1>404 Error</h1>
      <section className={Styles['error-container']}>
        <span className={`${Styles['digit']} ${Styles['four']}`}><span className={Styles['screen-reader-text']}>4</span></span>
        <span className={`${Styles['digit']} ${Styles['zero']}`}><span className={Styles['screen-reader-text']}>0</span></span>
        <span className={`${Styles['digit']} ${Styles['four']}`}><span className={Styles['screen-reader-text']}>4</span></span>
      </section>
      <div className={Styles['link-container']}>
        <a target="_blank" href="https://www.silocreativo.com/en/creative-examples-404-error-css/" className={Styles['more-link']}>Home Page</a>
      </div>
    </div>
  );
}

export default Error404;
