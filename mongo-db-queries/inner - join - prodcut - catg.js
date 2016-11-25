
db.products.aggregate([

{$lookup: 
    {
        from: "categories",
        localField: "CategoryID",
        foreignField: "CategoryID",
        as :  "prodcut"
    }
},

{
    $project:
        {
         "ProductID":1,
         "ProductName":1,
         "SupplierID":1,
         "CategoryID":1,
         "QuantityPerUnit":1,
         "UnitPrice":1,
         "Discontinued":1,
         "_id":0   
        }
},

{
    $match:{"Discontinued":"0"}
},
{
    $sort:{"ProductName":1}
}

])
