/* eslint-disable quotes, indent, no-trailing-spaces, semi, arrow-spacing, function-paren-newline, comma-spacing, eol-last */

import { GetWord } from "../apiConnectFunctions/apiWords"
import showCards from "../DomWholeFrameBuilder/DomWordCardBuilder"
import showCategory from "../DomWholeFrameBuilder/DomCategoryCardBuilder";
import GetCategory from "../apiConnectFunctions/apiCategory";

const navigationEvents = (user) => {
    document.querySelector('#myCards')
        .addEventListener(
            'click', 
            () => {
                // Ensure GetWord is called when the button is clicked
                GetWord(user.uid)
                    .then((Words) => {
                        // Show cards after fetching the data
                        showCards(Words);
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
    }
export default navigationEvents