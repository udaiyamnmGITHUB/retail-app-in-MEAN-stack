var mapFun = function(){
    
    emit(this.OrderID, {UnitPrice : this.UnitPrice,  Quantity:this.Quantity , Discount:this.Discount} )
}
    
var redFun = function(OrderID, obj){
    var temp = 0;
    for(var i=0; i < obj.length ; i++){
        var total =  parseFloat(obj[i].UnitPrice) *   parseFloat(obj[i].Quantity) * ( 1 - parseFloat(obj[i].Discount));
        temp = temp + total;
    }
    return temp
}

var final = function(key, value){
     return value
}
db.order_details.mapReduce(mapFun, redFun, {out: {inline: 1} , sort : this.OrderID,	finalize : final})