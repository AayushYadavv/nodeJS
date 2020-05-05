/** @format */

const repo = require("./repo.js");
class cartRepo extends repo {
  async getByCartId(id) {
    const cartDetail = await this.getAll();
    const cartfound = cartDetail.find((cart) => {
      return cart.cartId == id;
    });
    return cartfound;
  }

  async getAllOtherProducts(cartId, productId) {
    const foundCart = await this.getByCartId(cartId);
    const products = foundCart.products;
    const otherProducts = products.filter((product) => {
      return product.productId !== productId;
    });
    return otherProducts;
  }

  async removeFromCart({cartId,removeProductId}){
    const cartDetail = await this.getAll();
    const cartPresent = cartDetail.find((cart) => {
      return cart.cartId === cartId;
    });
        const otherProducts = await this.getAllOtherProducts(cartId, removeProductId);
        cartPresent["products"] = []
        otherProducts.forEach((product) => {
          cartPresent["products"].push(product);
        });
        await this.update(cartPresent);
        return;

  }
  async findProductInCart(cartId, productId) {
    const foundCart = await this.getByCartId(cartId);
    const products = await foundCart.products;
    const foundProduct = products.find((product) => {
      return product["productId"] === productId;
    });
    if (foundProduct) {
      return foundProduct;
    }
    return false;
  }

  async addProductToCart({ cartId, productId }) {
    const cartDetail = await this.getAll();
    const cartPresent = cartDetail.find((cart) => {
      return cart.cartId === cartId;
    });
    if (cartPresent) {
      const findProduct = await this.findProductInCart(cartId, productId);

      if (findProduct) {
        let prodObj = {};
        prodObj["productId"] = productId;
        prodObj["count"] = parseInt(findProduct["count"]) + 1;
        cartPresent["products"] = [];
        cartPresent["products"].push(prodObj);
        const otherProducts = await this.getAllOtherProducts(cartId, productId);
        otherProducts.forEach((product) => {
          cartPresent["products"].push(product);
        });
        await this.update(cartPresent);
        return;
      }
      let prodObj = {};
      prodObj["productId"] = productId;
      prodObj["count"] = 1;
      cartPresent.products.push(prodObj);
      await this.update(cartPresent);
      return;
    }

    let obj = { cartId };
    let prodObj = {};
    prodObj["productId"] = productId;
    prodObj["count"] = 1;
    obj.products = [];
    obj.products.push(prodObj);
    cartDetail.push(obj);
    await this.writeAll(cartDetail);
  }
}

module.exports = new cartRepo("cart.json");
