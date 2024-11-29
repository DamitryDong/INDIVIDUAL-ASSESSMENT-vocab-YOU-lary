/* eslint-disable quotes, indent, no-trailing-spaces, semi, arrow-spacing, function-paren-newline, comma-spacing, eol-last */

import clearDom from "../utils/clearDom";
import renderToDOM from "../utils/renderToDom";

const showCategory = (array) => {
    clearDom();
    
    let domstring = ''
    domstring += '<button type="button" class="btn btn-success" id="add-category-btn">add category</button>'
    array.forEach((item) =>{
        domstring += `<div class="card w-50">
            <div class="card-body">
                <h5 class="card-title">${item.CategoryName}</h5>
                <a href="#" class="btn btn-primary">Button</a>
            </div>
            </div>
        `
        }
    )
    renderToDOM('#form-container',domstring);
}

export default showCategory