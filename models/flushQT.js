// Dependencies
//====================================================
// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/config.json");

var user = sequelize.define("user", {
    
    userName: Sequelize.STRING,
    userId: Sequelize.STRING,
    password: Sequelize.STRING,

});

var restroom = sequelize.define("restroom", {
    
    location: Sequelize.STRING,
    rateRestroom: Sequelize.STRING,
    howClean: Sequelize.STRING,
    tmi: Sequelize.STRING
    
    
});


// Syncs with DB
flushQT.sync();
// Makes the Character Model available for other files (will also create a table)
module.exports = flushQT;

