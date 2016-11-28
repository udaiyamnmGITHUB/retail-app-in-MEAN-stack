var mapOrderDetailsCol = function(){
    
    emit(this.OrderID, {"UnitPrice" : this.UnitPrice,  "Quantity":this.Quantity , "Discount":this.Discount, "ShippedDate" : null} )
}

var mapOrderCol = function(){
    
    emit(this.OrderID, {"ShippedDate" : this.ShippedDate, "UnitPrice" : null,  "Quantity":null , "Discount":null,} )
}
    
var reduceFun = function(OrderID, values){
    var result = {
      "subTotal" : null,
      "ShippedDate" : null
    };
     
     values.forEach(function(value) {
        var temp = 0;

         for(var i=0; i < value.length ; i++){

                var total =  parseFloat(value.UnitPrice) *   parseFloat(value.Quantity) * ( 1 - parseFloat(value.Discount));

                temp = temp + total;

          }

          
        result.subTotal = value.subTotal; 
           
      if(value.ShippedDate) {
         result.ShippedDate = value.ShippedDate;
       }

    });
    return result;
}

res = db.order_details.mapReduce(mapOrderDetailsCol, reduceFun, {out: {reduce : 'joined'}});
res = db.orders.mapReduce(mapOrderCol, reduceFun, {out: {reduce : 'joined'}});