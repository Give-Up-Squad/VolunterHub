import React, { Component } from "react";
import Styles from "../styles/reviewPage.module.css";
export default function accountReview(){
    
    return(
        
        <div>
            <h1 className={Styles.reviewHeading}>Your account is under review.</h1>
            <p className={Styles.reviewText}>After your account has been approved you will be able to use all the features and 
                apply for your first event!
                <br></br><a href="/">Click to go back to main page</a></p>
            
        </div>
    )
}
