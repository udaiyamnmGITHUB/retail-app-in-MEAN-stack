
mongo host:port/db -u user -p pass

mongo ds149567.mlab.com:49567/northwind -u udaiyamnm -p udaiyamnm


mongoimport.exe -h ds157549.mlab.com:57549 -d northwind -c customers -u udaiyamnm -p udaiyamnm --file ./json/customers.json --jsonArray

mongoimport.exe -h ds157549.mlab.com:57549 -d northwind -c categories -u udaiyamnm -p udaiyamnm --file ./json/categories.json --jsonArray
mongoimport.exe -h ds157549.mlab.com:57549 -d northwind -c employee_territories -u udaiyamnm -p udaiyamnm --file ./json/employee_territories.json --jsonArray
mongoimport.exe -h ds157549.mlab.com:57549 -d northwind -c employees -u udaiyamnm -p udaiyamnm --file ./json/employees.json --jsonArray
mongoimport.exe -h ds157549.mlab.com:57549 -d northwind -c northwind -u udaiyamnm -p udaiyamnm --file ./json/northwind.json --jsonArray
mongoimport.exe -h ds157549.mlab.com:57549 -d northwind -c order_details -u udaiyamnm -p udaiyamnm --file ./json/order_details.json --jsonArray
mongoimport.exe -h ds157549.mlab.com:57549 -d northwind -c orders -u udaiyamnm -p udaiyamnm --file ./json/orders.json --jsonArray
mongoimport.exe -h ds157549.mlab.com:57549 -d northwind -c products -u udaiyamnm -p udaiyamnm --file ./json/products.json --jsonArray
mongoimport.exe -h ds157549.mlab.com:57549 -d northwind -c regions -u udaiyamnm -p udaiyamnm --file ./json/regions.json --jsonArray
mongoimport.exe -h ds157549.mlab.com:57549 -d northwind -c shippers -u udaiyamnm -p udaiyamnm --file ./json/shippers.json --jsonArray
mongoimport.exe -h ds157549.mlab.com:57549 -d northwind -c suppliers -u udaiyamnm -p udaiyamnm --file ./json/suppliers.json --jsonArray
mongoimport.exe -h ds157549.mlab.com:57549 -d northwind -c categories -u udaiyamnm -p udaiyamnm --file ./json/categories.json --jsonArray
mongoimport.exe -h ds157549.mlab.com:57549 -d northwind -c territories -u udaiyamnm -p udaiyamnm --file ./json/territories.json --jsonArray
mongoimport.exe -h ds157549.mlab.com:57549 -d northwind -c test -u udaiyamnm -p udaiyamnm --file ./json/test.json --jsonArray




SELECT person, SUM(score), AVG(score), MIN(score), MAX(score), COUNT(*) 
FROM demo 
WHERE score > 0 AND person IN('bob','jake') 
GROUP BY person;



db.demo.group({
    "key": {
        "person": true
    },
    "initial": {
        "sumscore": 0,
        "sumforaverageaveragescore": 0,
        "countforaverageaveragescore": 0,
        "countstar": 0
    },
    "reduce": function(obj, prev) {
        prev.sumscore = prev.sumscore + obj.score - 0;
        prev.sumforaverageaveragescore += obj.score;
        prev.countforaverageaveragescore++;
        prev.minimumvaluescore = isNaN(prev.minimumvaluescore) ? obj.score : Math.min(prev.minimumvaluescore, obj.score);
        prev.maximumvaluescore = isNaN(prev.maximumvaluescore) ? obj.score : Math.max(prev.maximumvaluescore, obj.score);
        if (true != null) if (true instanceof Array) prev.countstar += true.length;
        else prev.countstar++;
    },
    "finalize": function(prev) {
        prev.averagescore = prev.sumforaverageaveragescore / prev.countforaverageaveragescore;
        delete prev.sumforaverageaveragescore;
        delete prev.countforaverageaveragescore;
    },
    "cond": {
        "score": {
            "$gt": 0
        },
        "person": {
            "$in": ["bob", "jake"]
        }
    }
});