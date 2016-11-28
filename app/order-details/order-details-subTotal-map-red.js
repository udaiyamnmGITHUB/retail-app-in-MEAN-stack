var orderDetailsMapFun = function () {

    emit(this.OrderID, { UnitPrice: this.UnitPrice, Quantity: this.Quantity, Discount: this.Discount })
}

var orderDetailsRedFun = function (OrderID, obj) {
    var temp = 0;
    for (var i = 0; i < obj.length; i++) {
        var total = parseFloat(obj[i].UnitPrice) * parseFloat(obj[i].Quantity) * (1 - parseFloat(obj[i].Discount));
        temp = temp + total;
    }
    return temp
}

var command = {
    map: orderDetailsMapFun.toString(), // a function for mapping
    reduce: orderDetailsRedFun.toString(), // a function  for reducing
    sort: { "OrderID": 1 }, // sorting on field_3 (also makes the reducing process faster)
    out: { inline: 1 }  // doesn't create a new collection, includes the result in the output obtained
};

module.exports = command;
