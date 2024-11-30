/* eslint-disable quotes, indent, no-trailing-spaces, semi, arrow-spacing, function-paren-newline, comma-spacing, eol-last */

import { GetWord } from "../apiConnectFunctions/apiWords"
import showCards from "../DomWholeFrameBuilder/DomWordCardBuilder"
import showCategory from "../DomWholeFrameBuilder/DomCategoryCardBuilder";
import { GetCategory } from "../apiConnectFunctions/apiCategory";

const navigationEvents = (user) => {
    document.querySelector('#myCards')
        .addEventListener(
            'click', 
            () => {
                // Ensure GetWord is called when the button is clicked
                GetWord(user.uid)
                    .then((Words) => {
                        // Show cards after fetching the data
                        showCards(Words, user);
                    })
                    .catch((error) => {
                        console.error('Error fetching words:', error);
                    });
            }
        );

    document.querySelector('#addCategory')
        .addEventListener(
            'click', 
            () => {
                // Ensure GetWord is called when the button is clicked
                GetCategory(user.uid)
                    .then((Words) => {
                        // Show cards after fetching the data
                        showCategory(Words);
                    })
                    .catch((error) => {
                        console.error('Error fetching words:', error);
                    });
            }
        );
    
    document.querySelector('#search-form')
        .addEventListener(
            'submit', (e) => {
                e.preventDefault();

                const searchQuery = document.querySelector('#search-input').value.toLowerCase();

                GetWord(user.uid)
                .then((words) => {
                  // Filter words based on the search query
                  const filteredWords = words.filter((word) => word.wordName.toLowerCase().includes(searchQuery) // Check if wordName matches
                    || word.definition.toLowerCase().includes(searchQuery) // Check if definition matches
                  );
                  // Re-render the filtered results
                  showCards(filteredWords, user);
                })
                .catch((error) => {
                  console.error('Error during search:', error);
                });
        })  

        // THIS SECTION IS FOR THE DYNAMIC FILTERING DROP DOWN ITS VERY COMPLICATED//
        // //////////////////////////////////////////////////////////////////////////
        const searchInput = document.querySelector('#search-input');
        const dropdownResults = document.querySelector('#dropdown-results');
        
        // Listen for input events
        searchInput.addEventListener('input', (e) => {
          const searchQuery = e.target.value.toLowerCase().trim(); // Get the search query
        
          if (searchQuery) {
            GetWord(user.uid)
              .then((words) => {
                // Filter words that match the search query
                const filteredWords = words.filter((word) => word.wordName.toLowerCase().includes(searchQuery) 
                || word.definition.toLowerCase().includes(searchQuery)
                );
        
                // Populate the dropdown with filtered results
                dropdownResults.innerHTML = filteredWords
                  .map((word) => `<a class="dropdown-item" href="#">${word.wordName}</a>`)
                  .join('');
        
                dropdownResults.style.display = filteredWords.length ? 'block' : 'none';
              })
              .catch((error) => {
                console.error('Error fetching words:', error);
              });
          } else {
            dropdownResults.style.display = 'none'; // Hide dropdown if input is empty
          }
        });
        
        // Handle dropdown item clicks
        dropdownResults.addEventListener('click', (e) => {
          if (e.target.classList.contains('dropdown-item')) {
            searchInput.value = e.target.textContent; // Set the clicked word in the input
            dropdownResults.style.display = 'none'; // Hide the dropdown
          }
        });
        
        // Hide dropdown when clicking outside
        document.addEventListener('click', (e) => {
          if (!e.target.closest('#search-form')) {
            dropdownResults.style.display = 'none';
          }
        });
        // THIS SECTION  ABOVE IS FOR THE DYNAMIC FILTERING DROP DOWN ITS VERY COMPLICATED//
        // //////////////////////////////////////////////////////////////////////////
}
export default navigationEvents