/**
 * Created by emergency on 5/5/2017.
 */
var db = require('../dbconnection');

var Role = {

    getRoleForUser: function (idUser) {
        return db.query("")
    },

    addUserInBlackList: function (User,callback) {
        return db.query("INSERT INTO blacklist(id_user) VALUE (?)",[User.id],callback);
    },

    deleteUserWithBlackList:function (idUser,callback) {
        return db.query("DELETE FROM blacklist WHERE id_user = ?",[idUser],callback)
    }

};

module.exports = BlackList;
