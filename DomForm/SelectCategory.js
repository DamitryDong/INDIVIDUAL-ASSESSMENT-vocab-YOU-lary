/* eslint-disable quotes, indent, no-trailing-spaces, semi, arrow-spacing, function-paren-newline, comma-spacing, eol-last */

import { GetCategory } from "../apiConnectFunctions/apiCategory";
import renderToDOM from "../utils/renderToDom";

const selectCategory = (CategoryfromWord, user) => {
    let domString = `
      <label for="author">Select a Category (must make new Category if there's none)</label>
      <select class="form-control" id="CategoryOnCardForm" required>
        <option value="">Select a Category</option>`;
  
    GetCategory(user.uid).then((CategoryArray) => {
      CategoryArray.forEach((Category) => {
        domString += `
          <option value="${Category.CategoryName}" 
            ${CategoryfromWord === Category.CategoryName ? 'selected' : ''}>
            ${Category.CategoryName}
          </option>`;
      });
  
      domString += '</select>';
      
      renderToDOM('#select-Category', domString); // Render the dropdown
    }).catch((error) => {
      console.error('Error fetching categories:', error);
    });
  };
  
  export default selectCategory;