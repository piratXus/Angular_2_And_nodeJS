/**
 * Created by piratXus on 27.04.2017.
 */
var express = require('express');
var router = express.Router();
var User = require('../DAO/UserDAO');
var BlackList = require('../DAO/BlackListDAO');
var jwt    = require('jsonwebtoken');
var app = express();

router.post('/blacklist',function(req,res,next){
    BlackList.addUserInBlackList(req.body,function(err,count){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(req.body);
        }
    });
});

router.get('/blacklist/:id',function (req,res,next) {
    BlackList.isExistBlackList(req.params.id,function (err,rows) {
        if(err){
            res.json(err);
        }else {
            res.json(rows);
        }
    });

});

router.delete('/blacklist/:id',function(req,res,next){

    BlackList.deleteUserWithBlackList(req.params.id,function(err,count){

        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(count);
        }

    });
});

router.get('/user/:id?',function(req,res,next){

    if(req.params.id){

        User.getUserById(req.params.id,function(err,rows){

            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
    else{



        User.getAllUsers(function(err,rows){

            if(err)
            {
                res.json(err);
            }
            else
            {
                res.json(rows);
            }

        });
    }
});



router.get('/user/:id?',function(req,res,next){

    if(req.params.id){

        User.getUserById(req.params.id,function(err,rows){

            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
    else{



        User.getAllUsers(function(err,rows){

            if(err)
            {
                res.json(err);
            }
            else
            {
                res.json(rows);
            }

        });
    }
});

router.post('/user/',function(req,res,next){

    User.addUser(req.body,function(err,count){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(req.body);
        }
    });
});

router.delete('/user/:id',function(req,res,next){

    User.deleteUser(req.params.id,function(err,count){

        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(count);
        }

    });
});
router.put('/user/:id',function(req,res,next){

    User.updateUser(req.params.id,req.body,function(err,rows){

        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});



function createToken(user) {
    var secretKey = "token";
    return jwt.sign(user, secretKey, {
        expiresIn: 60 * 60 * 5
    });
}

    router.post('/authentication', function (req, res, next) {
        User.getUserByLogin(req.body.login, function (err, user) {
            if (!req.body.login || !req.body.password) {
                return res.status(400).send("You must send the username and the password");
            }
            if (!user[0]) {
                return res.status(401).send("The username is not existing");
            }
            if (user[0].password !== req.body.password) {
                return res.status(401).send("The username or password don't match");
            } else {
                return res.status(201).send({
                    id_token: createToken(user[0])
                });
            }
        });
    });

module.exports = router;