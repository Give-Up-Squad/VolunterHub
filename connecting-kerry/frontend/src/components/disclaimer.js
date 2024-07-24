import React from "react";
import { useState } from "react";
import Styles from "../styles/disclaimer.module.css";

function Disclaimer() {
  const [handle18, setHandle18] = useState(false);
  const [handleGarda, setHandleGarda] = useState(false);
  const [handleLiability, setHandleLiability] = useState(false);

  return (
    <div className={Styles.container}>
      <h2>Disclaimer notice on Garda Vetting Confirmation</h2>

      <p>
        By clicking "I agree" below, you acknowledge and agree to the following.
      </p>

      <p>
        1. You have undergone Garda vetting and that you consent to the use of
        this inforation for the purposes of volunteering through our platform.
      </p>
      <p>
        2. You have read and understood the above statement and that you consent
        to its terms
      </p>
      <label for="termsAgreement">I agree</label>
      <input type="checkbox" id="termsAgreement" />
    </div>
  );
}

export default Disclaimer;
