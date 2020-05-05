/** @format */

const navlayout = require("../navbarContent");
module.exports = ({ products }) => {
  const htmlProd = products
    .map((product) => {
      return `
      
      <div class="column is-one-quarter">
      <form method="post"  encType="multipart/form-data" action="/products/${product.id}/cart">
    <div class="card">
    
    
    
        <div class="card-image">
          <figure class="image is-2by3">
            <img src="data:image/png;base64,${product.imageFile}" alt="Placeholder image">
          </figure>
        </div>
      
       
        
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-6">${product.productname}</p>
              <p class="subtitle is-6">₹${product.productprice}</p>
            <button><i class="fas fa-cart-arrow-down">Add to Cart</i></button>
            </div>
          </div>
        </div>
        
      </div>
      </form>
      </div>
      `;
    })
    .join(" ");

  const div = `
  <div class="columns is-multiline">${htmlProd}</div>`;

  return navlayout({div});
};
