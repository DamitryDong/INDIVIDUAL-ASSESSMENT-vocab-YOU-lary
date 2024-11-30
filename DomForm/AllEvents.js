/* eslint-disable quotes, indent, no-trailing-spaces, semi, arrow-spacing, function-paren-newline, comma-spacing, eol-last */

import addWordForm from "./AddWordForm";
import { deleteWord, getSingleCard, GetWord } from "../apiConnectFunctions/apiWords";
import showCards from "../DomWholeFrameBuilder/DomWordCardBuilder";
import {
      getCardInCategory, createCategory, updateCategory, GetCategory
      } from "../apiConnectFunctions/apiCategory";
import showCategory from "../DomWholeFrameBuilder/DomCategoryCardBuilder";

const allEvents = (user) => {
    document.querySelector('#main-container').addEventListener('click', (e) => {
            e.preventDefault();
            
            //  SECTION TO PULL OUT ADD CARD FORM FROM DOM
            if (e.target.id.includes('add-card-btn')) {
                addWordForm({}, user);
            }

            //  SECTION FOR DELETE Cards
            if (e.target.id.includes('delete-card-btn')) {
                // eslint-disable-next-line no-alert
                if (window.confirm('Want to delete?')) {
                  console.warn('Card deleted', e.target.id);
                  const [, firebaseKey] = e.target.id.split('--');
                  deleteWord(firebaseKey).then(() => {
                    GetWord(user.uid).then((words) => showCards(words, user));
                  });
                }
              }
            
            //  SECTION FOR EDITING Cards
            if (e.target.id.includes('edit-card-btn')) {
                const [, firebaseKey] = e.target.id.split('--');
                getSingleCard(firebaseKey).then((cardObj) => addWordForm(cardObj, user));
            }

            if (e.target.id.includes('catFilterButton')) {
              const [, CategoryName] = e.target.id.split('--');
              getCardInCategory(CategoryName).then((filterWords) => showCards(filterWords, user));
            }
            //  SORTING BUTTON ACTION (oldest first)
            if (e.target.id.includes('sort-dateOld-btn')) {
              GetWord(user.uid)
                .then((words) => {
                  // Sort the fetched words
                  const sortedArray = words.sort((a, b) => new Date(a.created) - new Date(b.created));
                  // Re-render the sorted cards
                  showCards(sortedArray, user);
                })
                .catch((error) => {
                  console.error('Error sorting words:', error);
                });
            }    

            //  SORTING BUTTON ACTION (newest first)
            if (e.target.id.includes('sort-dateNew-btn')) {
              GetWord(user.uid)
                .then((words) => {
                  // Sort the fetched words
                  const sortedArray = words.sort((a, b) => new Date(b.created) - new Date(a.created));
                  // Re-render the sorted cards
                  showCards(sortedArray, user);
                })
                .catch((error) => {
                  console.error('Error sorting words:', error);
                });
            }   

            if (e.target.id.includes('sort-alph-btn')) {
              GetWord(user.uid)
                .then((words) => {
                  // Sort the fetched words
                  const sortedArray = words.sort((a, b) => a.wordName.localeCompare(b.wordName)); // Alphabetical order
                  // Re-render the sorted cards
                  showCards(sortedArray, user);
                })
                .catch((error) => {
                  console.error('Error sorting words:', error);
                });
            }   

            //  SECTION TO PULL OUT CATEGORY CHANGE FORM CARD FORM FROM DOM 
            if (e.target.id.includes('add-category-btn')) {
              const payload = {
                CategoryName: document.querySelector('#category-input').value,
                uid: user.uid,
              }
              createCategory(payload).then(({ name }) => { 
                const patchPayLoad = { firebasekey: name }; 
                //  after we created the load, we pull the name (firebasekey and insert it back in)
                updateCategory(patchPayLoad).then(() => {
                  GetCategory(user.uid).then((Category) => showCategory(Category, user));
              })
            });
            //  SECTION FOR DELETING CATEGORY TODO:
            if (e.target.id.includes('aaaaa')) {
                // eslint-disable-next-line no-alert
                if (window.confirm('Want to delete?')) {
                  console.warn('Card deleted', e.target.id);
                  const [, firebaseKey] = e.target.id.split('--');
                  deleteWord(firebaseKey).then(() => {
                    GetWord(user.uid).then((words) => showCards(words, user));
                  });
                }
            } 
            }
            }
    )
};

export default allEvents;