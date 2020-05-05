/** @format */

const navlayout = require("./navbarContent");
const prodRepo = require("../repo/product");

module.exports = async ({ cartId, carts }) => {
  let div = "";
  let grandTotal = 0;
  let counter = 1;
  const cart = carts.find((singleCart) => {
    return singleCart.cartId === cartId;
  });
  console.log(cart);
  const products = cart["products"];
  console.log(products.length);
  if (products.length == 0) {
    div = `<b>Cart Empty</b>`;
    return navlayout({ div });
  }

  for (let product of products) {
    const productDetail = await prodRepo.findByid(product.productId);
    let subTotal = productDetail.productprice * product.count;
    grandTotal = grandTotal + subTotal
    div =
      div +
      `<tr>
      <td>${counter}</td>
      <td>${productDetail.productname}</td>
      <td>${product.count}</td>
      <td>${productDetail.productprice}</td>
      <td>${product.count} X ${productDetail.productprice}</td>
      <td>₹${subTotal}</td>
      <td><form method="post" action="/cart/${cartId}/${product.productId}/remove"><button class="button">Remove</button></form></td>
      </tr>`;
      counter = counter +1;
  }

  let htmlVal = `
  <div><table class="table">
  <thead>
  <tr>
  <th>Sr no.</th>
  <th>Product</th>
  <th>Quantity</th>
  <th>Price</th>
  <th>SubTotal</th>
  <th>Total</th>
  <th></th>
  </tr>
  </thead>
  <tfoot>
  <tr>
  <th></th>
  <th></th>
  <th></th>
  <th></th>
  <th>Grant Total</th>
  <th><b>₹${grandTotal}</b></th>
  
  </tr></tfoot><tbody>${div}</tbody></table></div>`;

  return navlayout({div:htmlVal});
};
