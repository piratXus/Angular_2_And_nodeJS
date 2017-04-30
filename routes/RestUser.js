/**
 * Created by piratXus on 27.04.2017.
 */
var express = require('express');
var router = express.Router();
var User = require('../DAO/UserDAO');
var BlackList = require('../DAO/BlackListDAO');

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

router.get('/blacklist/:id',function (req,res,next) {
    BlackList.isExistBlackList(req.params.id,function (err,rows) {
        if(err){
            res.json(err);
        }else {
            res.json(rows);
        }
    });

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
module.exports = router;