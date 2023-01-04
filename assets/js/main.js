// Vanilla Cosmetics shop
let products = document.getElementById("products-list");

// create a container for the selected items and get the data from the localStorage
let container = JSON.parse(localStorage.getItem("data")) || [];

// create the products list from shop in js
let createShop = () => {
  return (products.innerHTML = productsData
    .map((item) => {
      let { id, name, description, price, image } = item;

      // search for the items that exist
      let searchItem = container.find((item) => item.id == id) || [];

      return `
    <div class="product-item" id="product-item-id-${id}">
        <img
        src="${image}"
        width="200"
        />
        <div class="product-details">
            <h4>${name}</h4>
            <p>
             ${description}
            </p>
            <div class="price-quantity">
                <h4>&euro; ${price}</h4>
                  <div class="quantity-buttons">
                      <i onclick="decrementQuantity(${id})" class="bi bi-dash"></i>
                      <span class="quantity" id="${id}">${
        searchItem.noItems === undefined ? 0 : searchItem.noItems
      }</span>
                      <i onclick="incrementQuantity(${id})" class="bi bi-plus" ></i>
                  </div>
            </div>
        </div>
    </div>
    `;
    })
    .join(""));
};

createShop();

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

  // search for the item that have 0 noItems and delete it
  container = container.filter((item) => item.noItems !== 0);

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
};

// calculate the total number of selected items and display it on the screen as a cart amount
let totalNumberSelectedItems = () => {
  let cartAmount = document.getElementById("cart-amount");

  cartAmount.innerHTML = container
    .map((item) => item.noItems)
    .reduce((firstNumber, nextNumber) => firstNumber + nextNumber, 0);
};

totalNumberSelectedItems();
