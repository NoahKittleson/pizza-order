function Pizza (toppings, pizzaSize) {
  this.toppings = toppings.slice();
  this.size = pizzaSize;
}

Pizza.prototype.getPrice = function () {
  //all toppings cost $.40, and the rest is by area of pizza.
  var radius = this.size / 2;
  var pi = 3.14159;
  area = pi * Math.pow(radius, 2);
  var price = area * .03;
  price += this.toppings.length * .40;
  return price;
}

Pizza.prototype.getName = function() {
    var string = "";
    string = string.concat(this.size + " inch pizza ");
    if (this.toppings.length > 0) {
      string = string.concat("with ");
      for (var i = 0; i < this.toppings.length; i++) {
        if (this.toppings.length > 1) {
          if (i === this.toppings.length - 1) {
            string = string.concat("& " + this.toppings[i]);
          } else {
            string = string.concat(this.toppings[i] + ", ");
          }
        } else {
          string = string.concat(this.toppings[i]);
        }
      }
    }
    return string;
}

function Order (pizzaArray, totalPrice) {
  this.pizzas = pizzaArray;
  this.orderCost = totalPrice;
}

Order.prototype.addPizza = function (pizza) {
  this.pizzas.push(pizza);
  this.orderCost += pizza.getPrice();
}

Order.prototype.getPrice = function () {
  return this.orderCost.toFixed(2);
}

//UI CODE
var pizzaOrder = new Order ([], 0);

$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    //read input
    var orderCost = 0;
    var toppings = [];
    var size = parseInt($("#size").val());
    $("input:checkbox[name=toppings]:checked").each(function(){
      toppings.push($(this).val());
    });
    var newPizza = new Pizza (toppings, size);
    pizzaOrder.addPizza(newPizza);
    //display input
    $(".order").show();
    clearOrder();
    for (var i = 0; i < pizzaOrder.pizzas.length; i++) {
      $(".order").children("ul").last().append("<li>" + pizzaOrder.pizzas[i].getName() + " - $" + pizzaOrder.pizzas[i].getPrice().toFixed(2) + "</li>")
    }
    $(".order").append("<p>Total: $" + pizzaOrder.getPrice() + "</p>")
  });

  $("#placeOrder").click(function() {
    alert("Your Pizzas are ordered.  Don't worry about inputting address or payment info, we'll find ya!\n\n" + pizzaOrder.pizzas.length + " pizzas\nPrice: $" + pizzaOrder.getPrice());
    location.reload();
  });
});

function clearOrder() {
  $(".order").children("ul").first().empty();
  $(".order").children("p").last().empty();
}
