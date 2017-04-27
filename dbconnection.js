/**
 * Created by piratXus on 27.04.2017.
 */
var mySql = require('mysql');
var connection = mySql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'virus194',
    database: 'userBlackList'
});

module.exports = connection;