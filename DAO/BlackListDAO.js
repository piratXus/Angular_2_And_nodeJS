/**
 * Created by piratXus on 30.04.2017.
 */
var db = require('../dbconnection');

var BlackList = {

    isExistBlackList: function (idUser,callback) {
        return db.query("select count(*) AS 'count' FROM blacklist WHERE id_user = ?",[idUser],callback)
    },

    addUserInBlackList: function (id,callback) {
        return db.query("INSERT INTO blacklist(idUser) VALUE (?)",[id],callback);
    },

    deleteUserWithBlackList:function (idUser,callback) {
        return db.query("DELETE FROM blacklist WHERE idUser = ?",[idUser],callback)
    }

};

module.exports = BlackList;