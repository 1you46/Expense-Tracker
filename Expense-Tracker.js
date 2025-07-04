//Variables
let addItem = document.getElementById("add-btn")
let total = document.getElementById("total")
let expenseList = document.getElementById("items")
let itemName = "hello"
let price = 0;
let totalPrice = parseInt(total.textContent)
function appendNewItem() {
    let listItem = document.createElement("div")
    listItem.classList.add("list-item")
    let ListItemName = document.createElement("p")
    ListItemName.classList.add("list-item-name")
    ListItemName.textContent = `Name  :  ${itemName}`
    let ListItemPrice = document.createElement("p")
    ListItemPrice.classList.add("list-item-price")
    ListItemPrice.textContent = `Price  :  PKR  ${price}`
    listItem.appendChild(ListItemName)
    listItem.appendChild(ListItemPrice)
    expenseList.appendChild(listItem)
}
addItem.addEventListener("click", function(){
    let nameInput = document.getElementById("name").value
    let priceInput = parseFloat(document.getElementById("price").value)
    if (nameInput == "" || priceInput == 0 || isNaN(priceInput)){
        alert("No name or price entered!")
    } 
    else{
        priceInput
        price = priceInput
        itemName = nameInput
        appendNewItem()
        totalPrice += price
        total.textContent = `${totalPrice} PKR`
    }
})