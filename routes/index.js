var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/:time", function(req, res) {
  var time = req.params.time;
  var timeToNumber = Number(time);
  var newTime;
  var outputDate;
  var convertedTime = new Date(time).getTime()/1000;
  function unixToNatural(unix) {
    var unix = new Date(timeToNumber * 1000);
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var year = unix.getFullYear();
    var month = months[unix.getMonth()];
    var date = unix.getDate();
    var fullYear = `${month} ${date}, ${year}`;
    outputDate = { naturalDate : fullYear, unixDate : timeToNumber }
    return outputDate
  }
  // checking if input is unix
  if(Number.isInteger(timeToNumber)) {
    unixToNatural(timeToNumber);
  }
  // checking if natural language is valid date
  else if(Number.isInteger(convertedTime)) {
    outputDate = { naturalDate : time, unixDate : convertedTime }
  }
  else {
    outputDate = { naturalDate : null, unixDate : null }
  }
  res.json(outputDate);
});

module.exports = router;
