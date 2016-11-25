var mapFun = function(){
    
    emit(this.OrderID, {UnitPrice : this.UnitPrice,  Quantity:this.Quantity , Discount:this.Discount} )
}
    
var redFun = function(OrderID, obj){
    for(var i=0; i < obj.length ; i++){
        var total =  parseInt(obj[i].UnitPrice) *   parseInt(obj[i].Quantity) * ( 1 - parseInt(obj[i].Discount));
    }
    return total
}

var final = function(key, value){
     return value
}
db.order_details.mapReduce(mapFun, redFun, {out: {inline: 1} , sort : this.OrderID,	finalize : final})

