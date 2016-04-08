function Pizza (toppings, pizzaSize) {
  this.toppings = toppings.slice();
  this.size = pizzaSize;
}

Pizza.prototype.getPrice = function () {
  //all toppings cost $.40, and the rest is by area of pizza.
  var radius = this.size / 2;
  var pi = 3.14159;
  area = pi * Math.pow(radius, 2);
  var price = area * .10;
  price += this.toppings.length * .40;
  return price.toFixed(2);
}

Pizza.prototype.getName = function() {
    var string = "";
    string = string.concat(this.size + " inch pizza with ");
    for (var i = 0; i < this.toppings.length; i++) {
      string = string.concat(this.toppings[i]);
    }

}



$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();

    var toppings = [];
    var size = parseInt($("#size").val());
    $("input:checkbox[name=toppings]:checked").each(function(){
        toppings.push($(this).val());
    });
    var newPizza = new Pizza (toppings, size);
    alert ("$" + newPizza.getPrice());
  });
});
