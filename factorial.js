
(function () {
	var addon = require('./build/Release/factorial.node');
	// function factorial(n) {
 //    	if (n === 0){
 //      		return 1;
 //    	}
 //    	return n * factorial(n - 1);
 //  	}
	var express   	= require('express');
	var app 		= express();
	var mongod    	= require('mongodb');
	var http		= require('http');
	var bodyParser	= require('body-parser');
	var Server 		= http.createServer(app);
	var MongoClient = mongod.MongoClient;
	MongoClient.connect('mongodb://localhost:27017/LiveAuction', { useNewUrlParser: true }, function (err, database) {
		if (err) {
		  	console.log(err);
		}
		else {
		  	db = module.exports = database.db('cppaddon');//exports the database DiceGame from local
		  	console.log("Database Connected");
		  	MongoID = module.exports = mongod.ObjectID;//To declare ObjectId of mongodb 
		}
	});
	app.use(bodyParser.json({limit: '50mb', extended: true}));
	app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
	app.use(function(req, res, next) {
	  	// Website you wish to allow to connect
	    res.setHeader('Access-Control-Allow-Origin', '*');

	    // Request methods you wish to allow
	    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	    // Request headers you wish to allow
	    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	    // Set to true if you need the website to include cookies in the requests sent
	    // to the API (e.g. in case you use sessions)
	    res.setHeader('Access-Control-Allow-Credentials', true);

	    // Pass to next layer of middleware
	    next();
	});

	app.post('/login', function (req, res) {
		if(req.body.email && req.body.password){
			var email = req.body.email;
			var password = req.body.password;
			db.collection('users').findOne({email:email,password:password},function(err,userDetail){
				if(!err && userDetail){
					res.send({msg:"Login successful!",err:false});
				}else{
					res.send({msg:"Invalid email or password!",err:true});
				}
			})
		}else{
			res.send({msg:"Invalid email or password!",err:true});
		}
	})
	app.post('/signup', function (req, res) {
		if(req.body.email && req.body.password){
			var email = req.body.email;
			var password = req.body.password;
			db.collection('users').findOne({email:email},function(err,userDetail){
				if(!err && userDetail){
					res.send({msg:"This email is already taken!",data:{},err:true});
				}else{
					db.collection('users').insertOne({email:email,password:password},function(err){
						if(!err){
							res.send({msg:"Signup successful!",err:false});
						}else{
							res.send({msg:"Something went wrong please try again later!",err:true});
						}
					})
				}
			})
		}else{
			res.send({msg:"Invalid email or password!",err:true});
		}
	})
	app.post('/getfactorial',function(req,res){
		var number = (req.body.number)?Number(req.body.number):0;
		if(number && (number % 1 === 0)){
			if(number != 0){
				var sendfactorial = addon.factorial(number);
				console.log("sendfactorial--->",sendfactorial);
				// var sendfactorial = factorial(number);
				if(sendfactorial){
					res.send({msg:"Factorial of "+number+" is '"+sendfactorial.toString()+"'",err:true,factorial:sendfactorial});
				}else{
					res.send({msg:"Factorial of "+number+" is '"+sendfactorial.toString()+"'",err:true,factorial:sendfactorial});
				}
			}else if(number == 0){
				res.send({msg:"Please enter number between 1 & 170!",err:true,factorial:0})	
			}else{
				res.send({msg:"Please enter smaller number then 170!",err:true,factorial:0})	
			}
		}else{
			res.send({msg:"Please enter Integer number only!",err:true,factorial:0})
		}
	})

	Server.listen(3005, function () {
	  console.log('Express server listening on port ' + 3005);
	});
}());