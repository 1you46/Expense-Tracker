let addItem = document.getElementById("add-btn");
let total = document.getElementById("total");
let expenseList = document.getElementById("items");
let resetBtn = document.getElementById("reset-items")
let totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;
total.textContent = `${totalPrice} PKR`;
let savedItems = JSON.parse(localStorage.getItem("items")) || [];
savedItems.forEach(item => appendNewItem(item.name, item.price));
addItem.addEventListener("click", function () {
  let nameInput = document.getElementById("name").value.trim();
  let priceInput = parseFloat(document.getElementById("price").value);
  if (nameInput === "" || isNaN(priceInput) || priceInput <= 0) {
    alert("Please enter a valid name and price.");
  }
  appendNewItem(nameInput, priceInput);
  totalPrice += priceInput;
  total.textContent = `${totalPrice} PKR`;
  localStorage.setItem("totalPrice", totalPrice);
  let newItem = { name: nameInput, price: priceInput };
  savedItems.push(newItem);
  localStorage.setItem("items", JSON.stringify(savedItems));
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
});
function appendNewItem(name, price) {
  let listItem = document.createElement("div");
  listItem.classList.add("list-item");
  let nameElem = document.createElement("p");
  nameElem.classList.add("list-item-name");
  nameElem.textContent = `Name: ${name}`;
  let priceElem = document.createElement("p");
  priceElem.classList.add("list-item-price");
  priceElem.textContent = `Price: PKR ${price}`;
  listItem.appendChild(nameElem);
  listItem.appendChild(priceElem);
  expenseList.appendChild(listItem);
}
resetBtn.addEventListener("click", function(){
 localStorage.removeItem("items");
 localStorage.removeItem("totalPrice");
 expenseList.innerHTML = "";
 totalPrice = 0;
 total.textContent = "0 PKR";
})
