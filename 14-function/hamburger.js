function Hamburger(size) {
  this.total = {};

  switch (size) {
    case 'SIZE_SMALL':
      this.total = {price: 50, cal: 20}
      break;
    case 'SIZE_MEDIUM':
      this.total = {price: 75, cal: 30}
      break;
    case 'SIZE_BIG':
      this.total = {price: 100, cal: 40}
      break;
    default:
      this.total = {price: 75, cal: 30}
      break;
  }

  this.addTopping = function (type) {
    switch (type) {
      case 'TOPPING_CHEESE':
        this.total.price += 10;
        this.total.cal += 20;
        break;
      case 'TOPPING_SALAD':
        this.total.price += 20;
        this.total.cal += 5;
        break;
      case 'TOPPING_POTATO':
        this.total.price += 15;
        this.total.cal += 10;
        break;
      case 'TOPPING_SEASONING':
        this.total.price += 15;
        break;
      case 'TOPPING_MAYO':
        this.total.price += 20;
        this.total.cal += 5;
        break;
      default:
        break;
    }
  }

  this.getPrice = function () {
    return this.total.price;
  }

  this.getCallories = function () {
    return this.total.cal;
  }
}

const hamburger = new Hamburger('SIZE_SMALL');

// добавка из майонеза

hamburger.addTopping('TOPPING_MAYO');

hamburger.addTopping('TOPPING_POTATO');



console.log("Price with sauce: " + hamburger.getPrice());

console.log("Callories with sauce: " + hamburger.getCallories());