const express = require("express");
const router = express.Router();

router.get('/', function (req, res) {
    res.send('Employee home page is ready');
});

router.get('/addEmployee', function(req, res) {
  res.send('addEmployee');
});
// define the about route
router.post('/getEmployeeList', function(req, res) {
  res.send('getEmployeeList');
});

module.exports = router;