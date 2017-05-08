/**
 * Created by emergency on 5/5/2017.
 */
var db = require('../dbconnection');

var Role = {

    getRoleForUser: function (idUser,callback) {
        return db.query("select role from roles where id=(select id_role from role_has_user where id_user = ?)",[idUser,callback]);
    }

};

module.exports = Role;
