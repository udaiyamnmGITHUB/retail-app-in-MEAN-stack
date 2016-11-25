
db.products.find({"Discontinued" : "0"}, {"ProductID":1,  "ProductName":1, "Discontinued":1, "_id":0}).sort({"ProductName":1})

