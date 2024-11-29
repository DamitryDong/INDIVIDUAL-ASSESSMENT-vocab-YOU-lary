/* eslint-disable quotes, indent, no-trailing-spaces, semi, arrow-spacing, function-paren-newline, comma-spacing, eol-last */
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
        };
        createWord(payload).then(({ name }) => {
          const patchPayload = { firebaseKey: name };
          
          // Rerun the showCards so we have cards back up
          updateWord(patchPayload).then(() => {
            GetWord(user.uid).then((Words) => showCards(Words));
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
          GetWord(user.uid).then((Words) => showCards(Words));
        })
      }
    });
  };
  
  export default formEvents;
