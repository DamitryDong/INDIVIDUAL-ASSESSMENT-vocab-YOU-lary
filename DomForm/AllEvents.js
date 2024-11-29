/* eslint-disable quotes, indent, no-trailing-spaces, semi, arrow-spacing, function-paren-newline, comma-spacing, eol-last */

import addWordForm from "./AddWordForm";
import { deleteWord, getSingleCard, GetWord } from "../apiConnectFunctions/apiWords";
import showCards from "../DomWholeFrameBuilder/DomWordCardBuilder";

const allEvents = (user) => {
    document.querySelector('#main-container').addEventListener('click', (e) => {
            e.preventDefault();
            
            //  SECTION TO PULL OUT FORM FROM DOM
            if (e.target.id.includes('add-card-btn')) {
                addWordForm({}, user);
            }

            //  SECTION FOR DELETE IF
            if (e.target.id.includes('delete-card-btn')) {
                // eslint-disable-next-line no-alert
                if (window.confirm('Want to delete?')) {
                  console.warn('Card deleted', e.target.id);
                  const [, firebaseKey] = e.target.id.split('--');
                  deleteWord(firebaseKey).then(() => {
                    GetWord(user.uid).then(showCards);
                  });
                }
              }
            
            //  SECTION FOR EDITING BOOK
            if (e.target.id.includes('edit-card-btn')) {
                const [, firebaseKey] = e.target.id.split('--');
                getSingleCard(firebaseKey).then((cardObj) => addWordForm(cardObj, user));
            }
        }
    )
};

export default allEvents;