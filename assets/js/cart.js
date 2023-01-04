// the cart with the selected items from the shop
let shoppingCartDescription = document.getElementById(
  "shopping-cart-description"
);
let shoppingCart = document.getElementById("shopping-cart");
let totalBill = document.getElementById("total-bill");

// get the data from localStorage
let container = JSON.parse(localStorage.getItem("data")) || [];

// calculate the total number of selected items and display it on the screen as a cart amount
let totalNumberSelectedItems = () => {
  let cartAmount = document.getElementById("cart-amount");

  cartAmount.innerHTML = container
    .map((item) => item.noItems)
    .reduce((firstNumber, nextNumber) => firstNumber + nextNumber, 0);
};

totalNumberSelectedItems();

// create the shopping cart with selected items or display empty cart
let createShoppingCart = () => {
  if (container.length !== 0) {
    shoppingCartDescription.innerHTML = `
    <div class="go-back-shop">
      <a href="shop.html">
        <i class="bi bi-arrow-left-circle"></i>
        <p>Go back to the shop page</p>
      </a>
    </div>
    
    <h2>Products added to the shopping cart</h2>

    <button onclick="deleteShoppingCart()" class="button-empty-cart">Empty Shopping Cart</button>
    `;
    return (shoppingCart.innerHTML = container
      .map((item) => {
        let { id, noItems } = item;
        let search = productsData.find((item) => item.id == id) || [];
        let { image, name, price } = search;
        return `
      <div class="card">
        <img src=${image} width="200"/>

        <div class="description-card">
          <h3 class="title-card">${name}</h3>
          <h3 class="price-card">&euro; ${price}</h3>

          <div class="quantity-buttons">
            <i onclick="decrementQuantity(${id})" class="bi bi-dash"></i>
            <span class="quantity" id="${id}">${noItems}</span>
            <i onclick="incrementQuantity(${id})" class="bi bi-plus" ></i>
          </div>
        </div>

        <div class="total-bill">
        <h2>&euro; ${noItems * search.price}</h2>
        </div>

        <div class="delete-btn">
          <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    shoppingCartDescription.innerHTML = `
    <h2>Your shopping cart is empty</h2>
    <a class="button-shop-link" href="shop.html">
      <button class="button-shop">Go to the shop</button>
    </a>
    `;
    totalBill.innerHTML = ``;
  }
};

createShoppingCart();

// decrement the quantity when you click the '-'
let decrementQuantity = (id) => {
  let selectedItem = id;

  // search if the item we selected already exist by id (the number of item selected > 1) or not
  let searchItem = container.find((item) => item.id == selectedItem);

  // if the container is blank than do nothing
  if (searchItem == undefined) {
    return;
  }
  // if the number of item selected is 0 than the decrement will always be 0 else the number of item will decrease by 1
  else if (searchItem.noItems === 0) {
    return;
  } else {
    searchItem.noItems -= 1;
  }

  // call the function update() when you click the '-'
  updateQuantity(selectedItem);

  // search for the item that have 0 noItems and delete it than update the shopping cart => it will delete automatically the product from our cart when the quantity will be 0
  container = container.filter((item) => item.noItems !== 0);
  createShoppingCart();

  // save the data in the localStorage
  localStorage.setItem("data", JSON.stringify(container));
};

// increment the quantity when you click the '+'
let incrementQuantity = (id) => {
  let selectedItem = id;

  // search if the item we selected already exist by id (the number of item selected > 1) or not
  let searchItem = container.find((item) => item.id == selectedItem);

  // if the number of item selected is undefined than the noItems: 1 else the number of item will increase by 1
  if (searchItem === undefined) {
    // add in the container the selected item with it's id and the number of it
    container.push({
      id: id,
      noItems: 1,
    });
  } else {
    searchItem.noItems += 1;
  }

  createShoppingCart();
  // call the function update() when you click the '+'
  updateQuantity(selectedItem);

  // save the data in the localStorage
  localStorage.setItem("data", JSON.stringify(container));
};

// update the quantity when you clik the '-' or '+'
let updateQuantity = (id) => {
  // search the item by id and put the number of items on the screen
  let searchItem = container.find((item) => item.id == id);

  document.getElementById(id).innerHTML = searchItem.noItems;

  // call the totalNumberSelectedItems() function when the updateQuantity function is running
  totalNumberSelectedItems();

  totalAmount();
};

// remove an item when you click the close button 'x'
let removeItem = (id) => {
  let selectedItem = id;

  // remove item
  container = container.filter((item) => item.id !== selectedItem);

  createShoppingCart();

  totalAmount();

  // call the totalNumberSelectedItems() function when the updateQuantity function is running
  totalNumberSelectedItems();

  // save the data in the localStorage
  localStorage.setItem("data", JSON.stringify(container));
};

// calculate the total bill
let totalAmount = () => {
  if (container.length !== 0) {
    let amount = container
      .map((item) => {
        let { id, noItems } = item;

        let search = productsData.find((item) => item.id == id) || [];

        // total bill for a category product
        return noItems * search.price;
      })
      // total bill
      .reduce((firstItem, nextItem) => firstItem + nextItem, 0);
    totalBill.innerHTML = `
      <h2>TOTAL: &euro; ${amount}</h2>
      <button onclick="checkoutOrder()" class="button-checkout">Checkout</button>
      `;
  } else {
    return;
  }
};

totalAmount();

// delete the entire shopping cart
let deleteShoppingCart = () => {
  container = [];

  createShoppingCart();

  // call the totalNumberSelectedItems() function when the updateQuantity function is running
  totalNumberSelectedItems();

  // save the data in the localStorage
  localStorage.setItem("data", JSON.stringify(container));

  shoppingCart.innerHTML = ``;
  shoppingCartDescription.innerHTML = `
    <h2>Your shopping cart is empty</h2>
    <a class="button-shop-link" href="shop.html">
      <button class="button-shop">Go to the shop</button>
    </a>
    `;
  totalBill.innerHTML = ``;
};

// checkout order
let checkoutOrder = () => {
  container = [];

  createShoppingCart();

  totalNumberSelectedItems();

  // save the data in the localStorage
  localStorage.setItem("data", JSON.stringify(container));

  shoppingCartDescription.innerHTML = `
  <div class="go-back-shop">
      <a href="shop.html">
        <i class="bi bi-arrow-left-circle"></i>
        <p>Go back to the shop page</p>
      </a>
  </div>

  <h2>Thank you for your order</h2>
  `;

  shoppingCart.innerHTML = ``;

  totalBill.innerHTML = ``;
};
