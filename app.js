var cors = require('cors');
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());

const categories = {"levis" : [{1 : ["shirt", "live", 2500, 15, "M"]}]};

//Display categories
app.get("/categories", function(req, res){
	//res.send(Object.keys(categories));
	res.status(200).send(Object.keys(categories));
});


//all Products
app.get("/allProducts", function(req, res){
	//res.send(Object.keys(categories));
	res.status(200).send(categories);
});

//Display a product
app.get("/categories/:id", function(req,res){
	var id = req.params.id;
	var br = Object.keys(categories);
	for (var i = 0; i < Object.keys(categories).length; i++){
		var brand = categories[br[i]];

		var arr = brand;
		var len = arr.length;
		var flag = 0;
		for (var j = 0; j < len; j++){
			var dic = arr[j];

			console.log(dic);
			for (var k in dic){
				if (k == id){
					res.status(200).send(dic[k]);
					flag = 1;
					break;
				}
			}
			if(flag == 1)
				break;
		}
	}
	if(flag == 0)
		res.status(400).send("No product");
})

//Add category
app.post("/addCategory", function(req, res){
	categories[req.body.categ] = [];
	console.log(req.body.categ);
	res.status(200).send(req.body.categ);
})

//Add product
app.post("/addProduct", function(req, res){
	console.log(req.body);
	var brand1 = req.body.categ;
	var id1 = req.body.id;
	var product1 = req.body.product;
	var status1 = req.body.status;
	var price1 = req.body.price;
	var tax1 = req.body.tax;
	var addInfo1 = req.body.addInfo;
	const arr1 = [product1, status1, price1, tax1, addInfo1];
	const dic1 = {};
	dic1[id1] = arr1;

	var br = Object.keys(categories);
	var flag = 0;
	for (var i = 0; i < Object.keys(categories).length; i++){
		var brand = categories[br[i]];

		var arr = brand;
		var len = arr.length;
		for (var j = 0; j < len; j++){
			var dic = arr[j];

			console.log(dic);
			for (var k in dic){
				if (k == id1){
					res.status(404).send("Cannot add product with existing id");
					flag = 1;
					break;
				}
			}
			if(flag == 1)
				break;
		}
	}


	if(flag == 0){
		var temp = categories[brand1];
		temp.push(dic1);
		categories[brand1] = temp;
		console.log(categories);
		res.status(200).send(categories);
	}
});


//Update product
app.put("/updateProduct", function(req, res){
	console.log(req.body);
	var brand1 = req.body.categ;
	var id1 = req.body.id;
	var product1 = req.body.product;
	var status1 = req.body.status;
	var price1 = req.body.price;
	var tax1 = req.body.tax;
	var addInfo1 = req.body.addInfo;
	const arr1 = [product1, status1, price1, tax1, addInfo1];
	const dic1 = {};
	dic1[id1] = arr1;

	var br = Object.keys(categories);
	var flag = 0;
	for (var i = 0; i < Object.keys(categories).length; i++){
		var brand = categories[br[i]];

		var arr = brand;
		var len = arr.length;
		for (var j = 0; j < len; j++){
			var dic = arr[j];

			console.log(dic);
			for (var k in dic){
				if (k == id1){
					categories[br[i]][j][k] = arr1;
					res.status(200).send(categories[br[i]][j][k]);
					flag = 1;
					break;
				}
			}
			if(flag == 1)
				break;
		}
	}


	if(flag == 0){
		res.status(404).send("No product found");
	}
})




app.listen(3000);