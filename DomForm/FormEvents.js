/* eslint-disable quotes, indent, no-trailing-spaces, semi, arrow-spacing, function-paren-newline, comma-spacing, eol-last, no-multi-spaces */
import showCards from "../DomWholeFrameBuilder/DomWordCardBuilder";
import { createWord, GetWord, updateWord } from "../apiConnectFunctions/apiWords";

const formEvents = (user) => { 
    document.querySelector('#main-container').addEventListener('click', (e) => {
      e.preventDefault();

      // Normal Card it 
      if (e.target.id.includes('Cardit')) {
        const payload = {
          Category: document.querySelector('#CategoryOnCardForm').value,
          definition: document.querySelector('#definition').value,
          uid: user.uid,
          wordName: document.querySelector('#wordName').value,
          communityStatus: "private",
          created: new Date().toLocaleString('en-US', {
            weekday: 'short',  // Abbreviated weekday (e.g., "Mon")
            year: '2-digit',   // Short year (e.g., "24" for 2024)
            month: 'short',    // Abbreviated month (e.g., "Nov")
            day: 'numeric',    // Day of the month (e.g., "29")
            hour: '2-digit',   // Hour in 12-hour format
            minute: '2-digit', // Minute in 2-digit format (e.g., "05")
            hour12: true       // Use 12-hour format with AM/PM
          }
          ), // Local date and time, e.g., "11/29/2024, 12:34:56 PM"
        };
        createWord(payload).then(({ name }) => {
          const patchPayload = { firebaseKey: name };
          
          // Rerun the showCards so we have cards back up
          updateWord(patchPayload).then(() => {
            GetWord(user.uid).then((Words) => showCards(Words, user, true));
          });
        });
      }

      // Update-Card 
      if (e.target.id.includes('update-card')) {
        const [, firebaseKey] = e.target.id.split('--');
        const payload = {
          Category: document.querySelector('#CategoryOnCardForm').value,
          definition: document.querySelector('#definition').value,
          wordName: document.querySelector('#wordName').value,
          firebaseKey,
        };

        updateWord(payload).then(() => {
          GetWord(user.uid).then((Words) => showCards(Words, user, true));
        })
      }
    });
  };
  
  export default formEvents;
