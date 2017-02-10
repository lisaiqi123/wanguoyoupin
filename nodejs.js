/**
 * Created by Administrator on 2016/12/21.
 */

//引入集合模块
var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://127.0.0.1:27017/1608");
db.connection.on("err",function () {
    console.log("连接数据库失败");
});
db.connection.on("open",function () {
    console.log("连接数据库成功");
});
var Schema = mongoose.Schema;
//购物车集合
var newSchema = new Schema({
    name:{type:"String"},
    img:{type:"String"},
    price:{type:"Number"},
    count:{type:"Number"}
},{
    connection:"food"
});
var msg = mongoose.model("food",newSchema);

//注册集合
var newSchema1 = new Schema({
    name:{type:"String"},
    password:{type:"Number"},
},{
    connection:"userinfo"
});
var user = mongoose.model("userinfo",newSchema1);
//引入express模块
var express = require("express");
var app = new express();
//注册
app.get("/regist",function (req,res) {
    var name = req.query.name;
    var password = req.query.password;
    user.find({
        name:name
    },null,function (err,data) {
        if(err){
            console.log(err);
        }else{
            if(data.length > 0){
                res.send('{"err":"1","msg":"用户名存在"}')
            }else{
                user.create({
                    name:name,
                    password:password
                },function (err,data) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log(data);
                        res.send('{"err":"0","msg":"注册成功"}');
                    }
                })
            }
        }
    })
})
//登录
app.get("/login",function (req,res) {
    var name = req.query.name;
    var password = req.query.password;
    user.find({
        name:name
    },null,function (err,data) {
        if(err){
            console.log(err);
        }else{
            if(data.length > 0){
                var name1 = data[0].name;
                var pwd1 = data[0].password;
                if(name1 == name && pwd1 == password){
                    res.send('{"err":"0","msg":"登录成功"}');
                }else{
                    res.send('{"err":"1","msg":"用户名或密码输入错误"}');
                }
            }else{
                res.send('{"err":"1","msg":"用户名不存在，请先注册"}');
            }
        }
    })
})
//进入首页
app.get("/",function (req,res) {
    console.log(__dirname);
    res.sendFile(__dirname+"/index.html");
})
//除了购物车的其他添加
app.get("/add",function (req,res) {
    var name = req.query.name;
    var img = req.query.img;
    var price = req.query.price;
    var count = req.query.count;
    msg.find({
        name:name
    },null,function (err,data) {
        if(err){
            console.log(err);
        }else{
            if(data.length > 0){
                var count1 = parseInt(data[0].count) + 1;
                msg.update({
                    name:name
                },{count:count1},function (err) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("加件数修改成功");
                        res.send({"err":"0","msg":"加件数修改成功"});
                    }
                })
            }else{
                msg.create({
                    name:name,
                    img:img,
                    price:price,
                    count:count
                },function (err,data) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log(data);
                        res.send('{"err":"0","msg":"加后成功"}');
                    }
                })
            }
        }
    })
})
app.get("/minus",function (req,res) {
    var name = req.query.name;
    var count = req.query.count;
    if(count <= 0){
        msg.remove({name:name},function (err,data) {
            if(err){
                console.log(err);
            }else{
                msg.find(function (err,data) {
                    if(err){
                        res.send({"err":"1","msg":"读取失败"});
                    }else{
                        console.log(data);
                        res.send(data);
                    }
                })
            }
        })
    }else{
        msg.update({
            name:name
        },{count:count},function (err) {
            if(err){
                console.log(err);
            }else{
                console.log("修改成功");
                res.send({"err":"1","msg":"减后件数修改成功"});
            }
        })
    }
})
//购物车页面的添加
app.get("/addShopping",function (req,res) {
    var name = req.query.name;
    var img = req.query.img;
    var price = req.query.price;
    var count = req.query.count;
    msg.find({
        name:name
    },null,function (err,data) {
        if(err){
            console.log(err);
        }else{
            if(data.length > 0){
                msg.update({
                    name:name
                },{count:count},function (err) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("加件数修改成功");
                        res.send({"err":"0","msg":"加件数修改成功"});
                    }
                })
            }else{
                msg.create({
                    name:name,
                    img:img,
                    price:price,
                    count:count
                },function (err,data) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log(data);
                        res.send('{"err":"0","msg":"加后成功"}');
                    }
                })
            }
        }
    })
})
app.get("/huoqu",function (req,res) {
    msg.find(function (err,data) {
        if(err){
            res.send({"err":"1","msg":"读取失败"});
        }else{
            res.send(data);
        }
    })
})


//为了html文件中的引入文件解析
app.all("*",function (req,res) {
    var reg = /\.[a-z]+$/;
    if(reg.test(req.path)){
        res.sendFile(__dirname + req.path);
    }else{
        res.send("<h1>404</h1>");
    }
})
//连接服务器
app.listen(8888,"localhost",function (err) {
    if(err){
        console.log(err);
    }else{
        console.log("服务器连接成功");
    }
})


