/**
 * Created by piratXus on 27.04.2017.
 */
var db = require('../dbconnection');

var User = {

    getAllUsers:function(callback){
        return db.query("SELECT * FROM users",callback);
    },

    getUserById: function (id,callback) {
      return db.query("SELECT * FROM users WHERE id = ?",[id],callback);
    },

    getUserByLogin: function (login, callback) {
        return db.query("SELECT * FROM  users WHERE login = ?",[login],callback);
    },

    addUser: function (User,callback) {
        return db.query("INSERT INTO users(login,name,surname) VALUE (?,?,?)",[User.login,User.name,User.surname],callback);
    },

    deleteUser: function (id,callback) {
        return db.query("DELETE FROM users WHERE id = ?",[id],callback);
    },

    updateUser: function (id,User,callback) {
        return db.query("UPDATE users set name = ?,  surname = ? WHERE id = ?",[User.name,User.surname,id],callback);
    },

    isExistBlackList: function (id,callback) {
        return db.query("SELECT exists( select * FROM users WHERE id = ?);",[id],callback)
    },

    addUserInBlackList: function (id,callback) {
        return db.query("INSERT INTO blacklist(idUser) VALUE (?)",[id],callback);
    }


};

module.exports = User;