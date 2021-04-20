/*Donut Inventory Class --> Donut Types, Donut Pricing, Donut Quantity*/
export class donutShopMenu {
  constructor(donutTypes, donutPricing, donutQuantity) {
    this.donutTypes = donutTypes;
    this.donutPricing = donutPricing;
    this.donutQuantity = donutQuantity;
  }
}
/*Customer Order Class*/
export class customerOrder {
  constructor(donutName, donutAmountOrdered, donutOrderTotal, customerName) {
    this.donutName = donutName;
    this.donutAmountOrdered = donutAmountOrdered;
    this.donutOrderTotal = donutOrderTotal;
    this.customerName = customerName;
  }
}
