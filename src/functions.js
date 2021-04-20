import { donutShopMenu, customerOrder } from "./class.js";

/*Global Variables*/
let total = (a, b) => a + b;
let remove = (a, b) => a - b;
let menu = [];
let customerOrders = [];
let shopRevenue = 0;

/*Creates Menu*/
export async function createMenu() {
  let response = await fetch(
    "https://donutshop-api.herokuapp.com/inventory?id=624"
  );
  let donutShopInventory = await response.json();
  donutShopInventory.donuts.forEach((element) => menu.push(element));
}
export function start() {
  let option = 0;
  do {
    option = parseInt(
      prompt(
        "Welcome to Les Petits Beignets!\nWhat would you like to do?\n 1. Order Donuts\n 2. Add Donuts\n 3. Create New Donut\n 4. Print Shop Revenue\n 5. See Inventory\n 6. Alter Donut Price \n 7. Refund Order \n 8. Exit"
      )
    );
    /*Main menu switch*/
    switch (option) {
      case 1:
        orderDonuts();
        break;
      case 2:
        addDonuts();
        break;
      case 3:
        createNewDonut();
        break;
      case 4:
        printShopRevenue();
        break;
      case 5:
        printShopMenu();
        break;
      case 6:
        updateDonutPrice();
        break;
      case 7:
        refundOrder();
        break;
      case 8:
        exit();
        break;
    }
  } while (option != 8);
}
/*Order Donut export function*/
export function orderDonuts() {
  /*Create order array*/
  let order = [];

  /*Get order and name for order from user*/
  order = takeOrder();

  fetch("https://donutshop-api.herokuapp.com/place-order?id=624", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: order.donutName,
      count: order.donutAmountOrdered
    })
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.error(err);
    });
}
/*export Function to get the user order*/
export function takeOrder() {
  let responseArray = [];
  let numArray = [];
  let order = [];
  let valid = null;
  let response = null;
  let num = -1;
  let donutNameList = [];

  menu.forEach((element) => donutNameList.push(element.type + "\n"));
  let donutOrderNum = prompt("How many donut types would you like to order?"); //Comment from Kaleb -> Kaleb mentioned it might be better to word this as "How many donut types would you like to order? as this gets the number of donuts on order"
  for (let i = 0; i < donutOrderNum; i++) {
    response = prompt(
      "Available Donuts: \n" +
        donutNameList.join("") +
        "\n" +
        "Please enter a donut type"
    );
    responseArray.push(response);
    num = parseInt(prompt("Please enter an amount"));
    numArray.push(num);
  }
  return order;
}
/*export Function to refund order*/
export async function refundOrder() {
  let donutOrderTypes = prompt(
    "Sorry you weren't satisfied with your order! What was the donut type you ordered?"
  );
  let donutOrderAmount = prompt("How many of that did you order?");

  fetch("https://donutshop-api.herokuapp.com/refund?id=624", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: donutOrderTypes,
      count: donutOrderAmount
    })
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.error(err);
    });
}
/*export Function to get order name from user*/
export function orderName() {
  let name = prompt("Whats the name for this order?");
  return name;
}
/*export Function to check order name from user and see if it is valid*/
export function nameChecker(nameIndex) {
  if (nameIndex == -1) {
    alert("An order under this name does not exist");
    return false;
  } else {
    return true;
  }
}

/*export Function to check if price is valid for changing the price of a donut*/
export function priceChecker(name, price) {
  let donutNameIndex = menu.findIndex((element) => element.type == name);
  if (donutNameIndex == -1 || price < 0) {
    return false;
  } else {
    return true;
  }
}
/*export Function to calculate shop revenue*/
export function calculateShopRevenue(total) {
  return (shopRevenue += total);
}
/*export Function to refund (subtract) shop revenue*/
export function refundShopRevenue(total) {
  return (shopRevenue -= total);
}
/*export Function to print the shop revenue*/
export async function printShopRevenue() {
  let response = await fetch(
    "https://donutshop-api.herokuapp.com/revenue?id=624"
  );
  let bank = await response.json();
  alert("Revenue: $" + bank.revenue.toFixed(2));
  //alert("Shop Revenue: $" + shopRevenue.toFixed(2));
}
/*export Function to update the donut amount*/
export function updateDonutAmount(type, amount) {
  let index = menu.findIndex((element) => element.type == type);
  amount.forEach((element) => (menu[index].donutQuantity = element));
}
/*export Function to update the donut price based on user input*/
export function updateDonutPrice() {
  let donutNameList = [];
  menu.forEach((element) => donutNameList.push(element.type + "\n"));
  let donutNameResponse = prompt(
    "Which donut would you like to change the price of?\n" +
      donutNameList.join("")
  );
  let donutPriceResponse = parseInt(
    prompt("What would you like to change the price to?")
  );

  fetch("https://donutshop-api.herokuapp.com/edit-donut?id=624", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: donutNameResponse,
      price: donutPriceResponse
    })
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.error(err);
    });
}
/*export Function to add donuts to inventory*/
export function addDonuts() {
  let donutNameList = [];
  menu.forEach((element) => donutNameList.push(element.type + "\n"));
  let donutTypeResponse = prompt(
    "Which donut would you like to add to?\n" + donutNameList.join("")
  );
  let donutAmountResponse = parseInt(
    prompt("How many donuts would you like to add?\n")
  );

  fetch("https://donutshop-api.herokuapp.com/add-donuts?id=624", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: donutTypeResponse,
      count: donutAmountResponse
    })
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.error(err);
    });
}
/*export Function to create an entirely new donut*/
export function createNewDonut() {
  let donutType = prompt("Enter a new donut name.");
  let donutPrice = parseInt(prompt("Enter a new donut price."));
  let donutAmount = parseInt(prompt("Enter a new donut amount."));

  fetch("https://donutshop-api.herokuapp.com/create-donut-type?id=624", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: donutType,
      price: donutPrice,
      count: donutAmount
    })
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.error(err);
    });

  menu.push(new donutShopMenu(donutType, donutPrice, donutAmount));
  alert("You have created a new donut");
}
/*This prints the Donut Shop Menu*/
export async function printShopMenu() {
  let response = await fetch(
    "https://donutshop-api.herokuapp.com/inventory?id=624"
  );
  let donutShopInventory = await response.json();
  donutShopInventory.donuts.forEach((element) => console.log(element));
  //alert("Les Petits Beignets Menu: \n\n" + menu.join(""));*/
}
/*This exits the application*/
export function exit() {
  alert("Thanks for visiting Les Petits Beignets! \nHave a great day!");
}
