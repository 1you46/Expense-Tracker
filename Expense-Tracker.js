//Variables
let addItem = document.getElementById("add-btn");
let total = document.getElementById("total");
let expenseList = document.getElementById("items");
let resetBtn = document.getElementById("reset-items")
let totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;
total.textContent = `${totalPrice} PKR`;
let savedItems = JSON.parse(localStorage.getItem("items")) || [];
savedItems.forEach(item => appendNewItem(item.name, item.price, item.date, item.id));//Saved items in local storage
function dateFunction(){ //Date Function
  let DateOne = new Date();
  let stringDate = DateOne.toLocaleString() 
  return stringDate;
}
addItem.addEventListener("click", function () { //Adding items
  let stringDate = dateFunction();
  let nameInput = document.getElementById("name").value.trim();
  let priceInput = parseFloat(document.getElementById("price").value);
  if (nameInput === "" || isNaN(priceInput) || priceInput <= 0) {
    alert("Please enter a valid name and price.");   //Invlaid Input Catching
    return;
  }
  let id = crypto.randomUUID();
  appendNewItem(nameInput, priceInput, stringDate, id); //Append New Item Calling
  totalPrice += priceInput;  //Total price logic
  total.textContent = `${totalPrice} PKR`;
  localStorage.setItem("totalPrice", totalPrice);   
  localStorage.setItem("stringDate", stringDate);  //Local storage Logic
  let newItem = { name: nameInput, price: priceInput, date: stringDate, id: id };
  savedItems.push(newItem);
  localStorage.setItem("items", JSON.stringify(savedItems));
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
}); 
function appendNewItem(name, price, date, id) {   //Append New Item Function
  let listItem = document.createElement("div");
  listItem.classList.add("list-item");
  listItem.dataset.id = id; 
  let nameElem = document.createElement("p");
  nameElem.classList.add("list-item-name");
  nameElem.textContent = `Name / نوم : ${name}`;
  let dateElem = document.createElement("p");
  dateElem.classList.add("date");
  dateElem.textContent = date;
  let priceElem = document.createElement("p");
  priceElem.classList.add("list-item-price");
  priceElem.textContent = `Price / قیمت : PKR ${price}`;
  let removeBtn = document.createElement("button");
  removeBtn.textContent = "-";
  removeBtn.classList.add("remove-btn");
  removeBtn.addEventListener("click", function () {  //Remove individual List Item Logic
    expenseList.removeChild(listItem);
    totalPrice -= price;
    total.textContent = `${totalPrice} PKR`;
    localStorage.setItem("totalPrice", totalPrice);
    savedItems = savedItems.filter(item => item.id !== id);
    localStorage.setItem("items", JSON.stringify(savedItems));
  })
  listItem.appendChild(nameElem);
  listItem.appendChild(dateElem);
  listItem.appendChild(priceElem);
  listItem.appendChild(removeBtn);
  expenseList.appendChild(listItem);
}
resetBtn.addEventListener("click", function(){    //Remove All Items Logic
 localStorage.removeItem("items");  
 localStorage.removeItem("totalPrice");
 localStorage.removeItem("stringDate")
 expenseList.innerHTML = "";
 totalPrice = 0;
 total.textContent = "0 PKR";
})
