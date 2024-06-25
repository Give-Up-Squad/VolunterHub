// import React from "react";
// import { useState } from "react";
// import styles from "../styles/volEventsDisplay.module.css";
// import EventCard from "./eventCard";
// import {data} from './data.tsx';

// export default function VolEventsDisplay() {

//     const downloadEvent=()=>{
//         const jsondata = `data:text/json;chatset=utf-8,${encodeURIComponent(
//           JSON.stringify(data)
//         )}`
//         const link = document.createElement('a')
//         link.href = jsondata
//         link.download = 'data.txt';
//         link.click();
//       }

//   return (
//     <div className={styles.volEventsDisplay}>
//       <h1>Volunteering Events</h1>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Username</th>
//             <th>View Document</th>
//             <th>Approve Status</th>
//           </tr>
//         </thead>
//         <tbody>
//             <td>Alan</td>
//             <td>Download Document</td>
//             <td><input type="checkbox"></input></td>
//         </tbody>
//       </table>

//     </div>
//   );
// }
