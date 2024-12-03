/* eslint-disable quotes, padded-blocks, indent, no-trailing-spaces, semi, arrow-spacing, function-paren-newline, comma-spacing, eol-last */

import addWordForm from "./AddWordForm";
import {
  createWord,
        deleteWord, GetCommunityWords, getSingleCard, GetWord, updateWord 
      } from "../apiConnectFunctions/apiWords";
import showCards from "../DomWholeFrameBuilder/DomWordCardBuilder";
import {
      getCardInCategory, createCategory, updateCategory, GetCategory,
      deleteCategory
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
                    GetWord(user.uid).then((words) => showCards(words, user, true));
                  });
                }
              }
            
            //  SECTION FOR EDITING Cards
            if (e.target.id.includes('edit-card-btn')) {
                const [, firebaseKey] = e.target.id.split('--');
                getSingleCard(firebaseKey).then((cardObj) => addWordForm(cardObj, user, true));
            }
            //  SECTION FOR FILTERING ON CATEGORIES
            if (e.target.id.includes('catFilterButton')) {
              const [, CategoryName] = e.target.id.split('--');
              getCardInCategory(CategoryName, user.uid).then((filterWords) => showCards(filterWords, user, true, false, true));
            }
            //  SORTING BUTTON ACTION (oldest first)
            if (e.target.id.includes('sort-dateOld-btn')) {
              GetWord(user.uid)
                .then((words) => {
                  // Sort the fetched words
                  const sortedArray = words.sort((a, b) => new Date(a.created) - new Date(b.created));
                  // Re-render the sorted cards
                  showCards(sortedArray, user, true);
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
                  showCards(sortedArray, user, true);
                })
                .catch((error) => {
                  console.error('Error sorting words:', error);
                });
            }   
            //  SORTING FOR ALPABETICAL
            if (e.target.id.includes('sort-alph-btn')) {
              GetWord(user.uid)
                .then((words) => {
                  // Sort the fetched words
                  const sortedArray = words.sort((a, b) => a.wordName.localeCompare(b.wordName)); // Alphabetical order
                  // Re-render the sorted cards
                  showCards(sortedArray, user, true);
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
            }
            //  SECTION FOR DELETING CATEGORY
            if (e.target.id.includes('delete-category-btn')) {
                // eslint-disable-next-line no-alert
                if (window.confirm('Want to delete?')) {
                  console.warn('Category deleted', e.target.id);
                  const [, firebasekey] = e.target.id.split('__');
                  deleteCategory(firebasekey).then(() => {
                    GetCategory(user.uid).then((Category) => showCategory(Category, user));
                  });
                }
            } 

            //  IF PRIVATE -> GO PUBLIC BUTTON
            if (e.target.id.includes('goPublic-card-btn')) {
              const [, firebaseKey] = e.target.id.split('--');
              const payload = {
                communityStatus: "public",
                firebaseKey
              };
      
              updateWord(payload).then(() => {
                GetWord(user.uid).then((Words) => showCards(Words, user, true));
              })
            }
            //  IF PUBLIC -> GO PRIVATE BUTTON
            if (e.target.id.includes('goPrivate-card-btn')) {
              const [, firebaseKey] = e.target.id.split('--');
              const payload = {
                communityStatus: "private",
                firebaseKey
              };
      
              updateWord(payload).then(() => {
                GetWord(user.uid).then((Words) => showCards(Words, user, true));
              })
            }

            //  IF PUBLIC -> GO PRIVATE BUTTON FOR COMMUNITY PAGE JUST SO PAGE DONT RESET
            if (e.target.id.includes('goPrivateCOM-card-btn')) {
              const [, firebaseKey] = e.target.id.split('--');
              const payload = {
                communityStatus: "private",
                firebaseKey
              };
      
              updateWord(payload).then(() => {
                GetCommunityWords(user.uid).then((Words) => showCards(Words, user));
              })
            }

            //  COMMUNITY SORTING BUTTON ACTION (oldest first) 
            if (e.target.id.includes('sort-COM-dateOld-btn')) {
              GetCommunityWords()
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

            //  COMMUNITY SORTING BUTTON ACTION (newest first)
            if (e.target.id.includes('sort-COM-dateNew-btn')) {
              GetCommunityWords()
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
            //  COMMUNITY SORTING FOR ALPABETICAL
            if (e.target.id.includes('sort-COM-alph-btn')) {
              GetCommunityWords()
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

            //  SECTION FOR FILTERING ON CATEGORIES
            if (e.target.id.includes('catCOMFilterButton')) {
              const [, CategoryName] = e.target.id.split('--');
              getCardInCategory(CategoryName).then((filterWords) => showCards(filterWords, user));
            }

            //  SECTION FOR COPYING OTHERS CARDS
            if (e.target.id.includes('Copy-Community-card-btn')) {
              const [, firebaseKey] = e.target.id.split('--');
              getSingleCard(firebaseKey).then((item) => {
                const payload = {
                  wordName: item.wordName ,
                  Category: item.Category ,
                  communityStatus: 'private',
                  definition: item.definition,
                  uid: user.uid,
                  created: new Date().toLocaleString('en-US', {
                    weekday: 'short',  
                    year: '2-digit',   
                    month: 'short',   
                    day: 'numeric',    
                    hour: '2-digit',  
                    minute: '2-digit', 
                    hour12: true 
                  })
                }
                // eslint-disable-next-line no-alert
                if (window.confirm('Confirm Copy?')) {
                  createWord(payload).then(({ name }) => {
                    const patchPayload = { firebaseKey: name };
                  
                  updateWord(patchPayload).then(() => {
                    GetCommunityWords().then((Words) => showCards(Words, user));
                  })
                  })
                }
            });
            }

            //  SECTION FOR STUDYING CURRENT DOM CARDS TODO:
            if (e.target.id.includes('study-card-btn')) {
              const element = document.querySelector('.card-subtitle');
              const text = element ? element.innerText : 'No element found';
              getCardInCategory(text, user.uid).then((filterWords) => showCards(filterWords, user, false, true));
            }
})
};

export default allEvents;