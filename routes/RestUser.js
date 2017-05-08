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


router.post('/authentication',function (req,res,next) {
    User.getUserByLogin(req.body.login,function (err, user) {
        console.dir(user[0]);
        if(err){throw  err};

        if(user[0].login != req.body.login){
            console.dir("login  requared");
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        }else if(user[0].password !== req.body.password){
            console.dir("password");
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        }else {

            var token = jwt.sign(user, app.get('superSecret'),{
                expiresInMinutes: 1440
            });
            console.dir("token");
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });
        }
    });
});


router.use(function(req, res, next) {

    console.dir("lol");    // check header or url parameters or post parameters for token
    var token = req.body.token;
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

module.exports = router;