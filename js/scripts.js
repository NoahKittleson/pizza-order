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
    string = string.concat(this.size + " inch pizza with ");
    for (var i = 0; i < this.toppings.length; i++) {
      string = string.concat(this.toppings[i] + " ");
    }
    return string;
}

var pizzaOrder = [];

$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();

    var orderCost = 0;
    var toppings = [];
    var size = parseInt($("#size").val());
    $("input:checkbox[name=toppings]:checked").each(function(){
        toppings.push($(this).val());
    });
    var newPizza = new Pizza (toppings, size);
    pizzaOrder.push(newPizza);
    $(".order").show();
    $(".order").empty();
    for (var i = 0; i < pizzaOrder.length; i++) {
      orderCost += pizzaOrder[i].getPrice();
      $(".order").append("<li>" + pizzaOrder[i].getName() + " - $"+ pizzaOrder[i].getPrice().toFixed(2) + "</li>")
    }
    $(".order").append("<p>Total: $" + orderCost.toFixed(2) + "</p>")
  });
});
