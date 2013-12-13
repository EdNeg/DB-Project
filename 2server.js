// Express is the web framework 
var express = require('express');
//var mysql = require('mysql');
var pg = require('pg').native;
var logfmt = require("logfmt");
var http = require('http');

var app = express();
app.use(logfmt.requestLogger());


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.configure(function () {
  app.use(express.bodyParser());
  app.use(allowCrossDomain);
  app.use(app.router);
});


// Server starts running when listen is called.
var port = process.env.PORT || 3412;
process.env.PWD = process.cwd();
app.use(express.static(process.env.PWD));
app.listen(port, function(){
	console.log("server listening at port " + port);
});

//http.createServer(app).listen(port, function () {
   /// console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//});




//Mysql Database Connection

/*
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'ADMIN',
	port : 3306,
	database : 'boricuabaydb'


});*/


// Postgres Database connection string: pg://<username>:<password>@host:port/dbname 

var conString = "pg://rgogqzpjvbmvuq:8AfsdO0anC3CJQz0BfD67e7fbS@ec2-54-225-103-9.compute-1.amazonaws.com:5432/d3m3opu022njhi";

/*
var connection = new pg.Client(conString);
connection.connect();*/


/*
connection.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }*/
//Test connection within console
/*
pg.connect(conString, function(err, client, done) {
  client.query('SELECT * FROM "bbCategory"', function(err, result) {
    done();
    if(err) return console.error(err);
    console.log(result.rows);
  });
});*/


/*
var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/boricuabay'
  , client
  , query;

connection = new pg.Client(connectionString);
connection.connect();*/

// Let heroku app know where to start
app.get('/', function(req, res) {
  //res.send('Hello Worldy!');
  res.sendfile(__dirname + '/index.html');
  
});


// REST Operations
// Idea: Data is created, read, updated, or deleted through a URL that 
// identifies the resource to be created, read, updated, or deleted.
// The URL and any other input data is sent over standard HTTP requests.
// Mapping of HTTP with REST 
// a) POST - Created a new object. (Database create operation)
// b) GET - Read an individual object, collection of object, or simple values (Database read Operation)
// c) PUT - Update an individual object, or collection  (Database update operation)
// d) DELETE - Remove an individual object, or collection (Database delete operation)

// REST Operation - HTTP GET to read all products
/*
app.get('/DB-Project/products', function(req, res) {
	console.log("GET PRODUCTS");
	
	connection.query("Select * from bbProduct as p " + 
	"inner join bbBidProduct as b on b.productID = p.productID;", function(err, rows, result) {
  if (err) throw err;*/

	/*
	for (i = 0; i<rows.length; i++){
			console.log('The result is: ', rows[i]);
		}*/
	
 /*
  var response = {"products" : rows};
   res.json(response);
   
 });
 });*/
 

//PRODUCTS ORDERED BY NAME
app.get('/DB-Project/productsName', function(req, res) {
	console.log("GET PRODUCTS ORDERED BY NAME");
	pg.connect(conString, function(err, client, done) {	
	client.query('Select * from "bbProduct" as p ' + 
	'inner join "bbBidProduct" as b on b."productID" = p."productID" order by p."productName"' , function(err, result) {
  if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The result is: ', rows[i]);
		}*/
	
  var response = {"productsName" : result.rows};
  res.json(response);
  
});
});
});

//PRODUCTS ORDERED BY BRAND
app.get('/DB-Project/productsBrand', function(req, res) {
	console.log("GET PRODUCTS ORDERED BY BRAND");
	pg.connect(conString, function(err, client, done) {	
	client.query('Select * from "bbProduct" as p ' + 
	'inner join "bbBidProduct" as b on b."productID" = p."productID" order by p.brand;', function(err, result) {
  if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The result is: ', rows[i]);
		}*/
	
  var response = {"productsBrand" : result.rows};
  res.json(response);
  
});
});
});

//PRODUCTS ORDERED BY PRICE
app.get('/DB-Project/productsPrice', function(req, res) {
	console.log("GET PRODUCTS ORDERED BY PRICE");
	pg.connect(conString, function(err, client, done) {	

	client.query('Select * from "bbProduct" as p ' + 
	'inner join "bbBidProduct" as b on b."productID" = p."productID" order by b."bidStartingPrice";', function(err, result) {
  if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The result is: ', rows[i]);
		}*/
	
  var response = {"productsPrice" : result.rows};
  res.json(response);
  


});
});
});


// REST Operation - HTTP GET to read a product based on its id
app.get('/DB-Project/products/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET product: " + id);
		pg.connect(conString, function(err, client, done) {	
var query = client.query('Select * from "bbProduct" as p natural join "bbBidProduct" ' + 
							'natural join "bbTag" ' +
							'natural join "bbSubCategory" ' + 
							'natural join "bbCategory" ' + 
							'natural join "bbSell" ' +
							'natural join "bbUser" ' +
							'where p."productID" = ' + id, function(err, result){
		if (err) throw err;

	/*
	for (i = 0; i<rows.length; i++){
			console.log('The solution is: ', rows[i]);
		}*/
	

	var len = result.rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Product noty found.");
	}
	else {	
  		var response = {"product" : result.rows[0]};
		//connection.end();
  		res.json(response);
  	}
 });

});
});

	


// REST Operation - HTTP GET to read a product based on its nAME
app.get('/DB-Project/productSearch/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET product by name: " + id);
		pg.connect(conString, function(err, client) {	
		var query = client.query('SELECT * FROM "bbProduct" natural join "bbBidProduct" where "productName" ilike ' + "'%" + id + "%';" ,function(err, result){
		
			if (err) throw err;
	
	var len =result.rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Product not found.");
	}
	else {	
  		var response = {"productSearch" : result.rows};
		//connection.end();
  		res.json(response);
  	}
});	
});
});



// REST Operation - HTTP GET to read products by tagID
app.get('/DB-Project/productsTag/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET product with tagID: " + id);
		pg.connect(conString, function(err, client, done) {	
		var query = client.query('Select * from "bbProduct" natural join "bbBidProduct" natural join "bbTag" where "tagID" = ' + id, function(err, result){
		if (err) throw err;

	/*
	for (i = 0; i<rows.length; i++){
			console.log('The solution is: ', rows[i]);
		}*/
	var len =result.rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Product noty found.");
	}
	else {	
  		var response = {"tag" : result.rows};
		//connection.end();
  		res.json(response);
  	}
 });

});
});

/*
// REST Operation - HTTP PUT to updated a product based on its id
app.put('/DB-Project/products/:id', function(req, res) {
	var id = req.params.id;
		console.log("PUT product: " + id);

	if ((id < 0) || (id >= productNextId)){
		// not found
		res.statusCode = 404;
		res.send("Product not found.");
	}
	else if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('brand')
  	|| !req.body.hasOwnProperty('model') || !req.body.hasOwnProperty('bidPrice') || !req.body.hasOwnProperty('description') || !req.body.hasOwnProperty('insstPrice') 
  	|| !req.body.hasOwnProperty('dimensions') || !req.body.hasOwnProperty('imgSrc')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for product.');
  	}
	else {
		var target = -1;
		for (var i=0; i < productList.length; ++i){
			if (productList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Product not found.");			
		}	
		else {
			var theProduct= productList[target];
			theProduct.name = req.body.name;
			theProduct.model = req.body.model;
			theProduct.brand = req.body.brand;
			theProduct.bidPrice = req.body.bidPrice;
			theProduct.instPrice = req.body.instPrice;
			theProduct.description = req.body.description;
			theProduct.dimensions = req.body.dimensions;
			theProduct.imgSrc= req.body.imgSrc;
			var response = {"product" : theProduct};
  			res.json(response);		
  		}
	}
});*/


// REST Operation - HTTP DELETE to delete a product based on its id
app.del('/DB-Project/products/:id', function(req, res) {
	var id = req.params.id;
		console.log("DELETE product: " + id);

	if ((id < 0) || (id >= productNextId)){
		// not found
		res.statusCode = 404;
		res.send("Product not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < productList.length; ++i){
			if (productList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Product not found.");			
		}	
		else {
			productList.splice(target, 1);
  			res.json(true);
  		}		
	}
});

// REST Operation - HTTP POST to add a new a product
app.post('/DB-Project/products/:id', function(req, res) {
	var id = req.params.id;
	console.log("POST");

  	if(!req.body.hasOwnProperty('productName') || !req.body.hasOwnProperty('brand')
  	|| !req.body.hasOwnProperty('model') || !req.body.hasOwnProperty('bidStartingPrice') || !req.body.hasOwnProperty('productDesc') || !req.body.hasOwnProperty('productPrice') 
  	|| !req.body.hasOwnProperty('dimensions') || !req.body.hasOwnProperty('startDate') || !req.body.hasOwnProperty('endDate') || !req.body.hasOwnProperty('productPhoto')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for product.');
  	}
	pg.connect(conString, function(err, client, done) {	
	var query = client.query('INSERT INTO "bbProduct" ("productName","productDesc","productPhoto","productPrice",' +
	  		'model,brand,dimensions,tagID) VALUES (' +  req.body.productName + ', '+ req.body.productDesc + 
	  		', ' + req.body.productPhoto + ', ' + req.body.productPrice + ', ' + req.body.model + ', ' + req.body.brand + ', ' + req.body.dimensions + ', 1)');	 //FIX!!!!
	var getquery = client.query('SET @last_insert_id_in_bbProduct = LAST_INSERT_ID()');	
	var query1 = client.query('INSERT INTO "bbBidProduct" (`productID`,`bidStartingPrice`,`startDate`,`endDate`) ' +
			'VALUES (@last_insert_id_in_bbProduct, "' + req.body.bidStartingPrice + '", "'+ req.body.startDate + 
	  		'", "' + req.body.endDate + '")'); 
	var query2 = client.query('INSERT INTO "bbSell" (`userID`,`productID`,`sQuantity`) ' +
			'VALUES ("'+id+'", @last_insert_id_in_bbProduct, NULL)'); 
	
  	res.json(true);
});
});

////Try this if not change parameters to ""






//--------------------------------------Category---------------------------------------------------------------//
	
	



// REST Operations
// Idea: Data is created, read, updated, or deleted through a URL that 
// identifies the resource to be created, read, updated, or deleted.
// The URL and any other input data is sent over standard HTTP requests.
// Mapping of HTTP with REST 
// a) POST - Created a new object. (Database create operation)
// b) GET - Read an individual object, collection of object, or simple values (Database read Operation)
// c) PUT - Update an individual object, or collection  (Database update operation)
// d) DELETE - Remove an individual object, or collection (Database delete operation)

// REST Operation - HTTP GET to read all categories
app.get('/DB-Project/categories', function(req, res) {
	console.log("GET ALL CATEGORIES");
	pg.connect(conString, function(err, client, done) {
	client.query('Select * FROM "bbCategory"', function(err, result) {
  if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The result is: ', rows[i]);
		}*/
  
  var response = {"categories" : result.rows};
  res.json(response);
});
});
});


// REST Operation - HTTP GET to read a category based on its id
app.get('/DB-Project/categories/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET category: " + id);
		pg.connect(conString, function(err, client, done) {
	client.query('SELECT * FROM "bbCategory" WHERE "categoryID" = ' + id, function(err, result){
		if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The solution is: ', rows[i]);
		}*/
	
	
	
	var len = result.rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Category not found.");
	}
	else {	
  		var response = {"category" : result.rows[0]};
		//connection.end();
  		res.json(response);
  	}
 });	
});
});

// REST Operation - HTTP PUT to updated a category based on its id
app.put('/DB-Project/categories/:id', function(req, res) {
	var id = req.params.id;
		console.log("PUT category: " + id);

	if ((id < 0) || (id >= categoryNextId)){
		// not found
		res.statusCode = 404;
		res.send("Category not found.");
	}
	else if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('iconSrc')){			//<-----------------------------------------------------------------------!!!!!!!!
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for category.');
  	}
	else {
		var target = -1;
		for (var i=0; i < categoryList.length; ++i){
			if (categoryList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Category not found.");			
		}	
		else {
			var theCategory= categoryList[target];
			theCategory.name = req.body.name;
			theCategory.iconSrc = req.body.iconSrc;
			//theCategory.subCats = req.body.subCats;
			var response = {"category" : theCategory};
  			res.json(response);		
  		}
	}
});

// REST Operation - HTTP DELETE to delete a category based on its id
app.del('/DB-Project/categories/:id', function(req, res) {
	var id = req.params.id;
		console.log("DELETE category: " + id);

	if ((id < 0) || (id >= categoryNextId)){
		// not found
		res.statusCode = 404;
		res.send("Category not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < categoryList.length; ++i){
			if (categoryList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Category not found.");			
		}	
		else {
			categoryList.splice(target, 1);
  			res.json(true);
  		}		
	}
});

// REST Operation - HTTP POST to add a new a category
app.post('/DB-Project/categories', function(req, res) {
	console.log("POST");

  	if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('iconSrc')) {			//<--------------------------------------------------------------------!!!!!!
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for category.');
  	}

  	var newCategory = new Category(req.body.name, req.body.imgSrc);
  	console.log("New Category: " + JSON.stringify(newCategory));
  	newCategory.id = categoryNextId++;
  	categoryList.push(newCategory);
  	res.json(true);
});

//--------------------------------------Books SubCategories---------------------------------------------------------------//
	

// REST Operations
// Idea: Data is created, read, updated, or deleted through a URL that 
// identifies the resource to be created, read, updated, or deleted.
// The URL and any other input data is sent over standard HTTP requests.
// Mapping of HTTP with REST 
// a) POST - Created a new object. (Database create operation)
// b) GET - Read an individual object, collection of object, or simple values (Database read Operation)
// c) PUT - Update an individual object, or collection  (Database update operation)
// d) DELETE - Remove an individual object, or collection (Database delete operation)

// REST Operation - HTTP GET to read all Books
app.get('/DB-Project/Books', function(req, res) {
	console.log("GET ALL BOOKS SUBCATEGORIES");
	pg.connect(conString, function(err, client, done) {
	client.query('Select * from "bbSubCategory" where "categoryID" = '+1+';', function(err, result) {
  if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The result is: ', rows[i]);
		}*/
	
  var response = {"books" : result.rows};
  res.json(response);
});
});
});


// REST Operation - HTTP GET to read a subCat based on its id
app.get('/DB-Project/Books/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET subCat: " + id);
		pg.connect(conString, function(err, client, done) {
	var query = client.query('SELECT * FROM "bbSubCategory" WHERE "subCategoryID" = ' + id, function(err, result){
		if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The solution is: ', rows[i]);
		}*/
	
	
	
	var len =result.rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Category not found.");
	}
	else {	
  		var response = {"book" : result.rows[0]};
		//connection.end();
  		res.json(response);
  	}
 });	
});
});

// REST Operation - HTTP PUT to updated a subCat based on its id
app.put('/DB-Project/Books/:id', function(req, res) {
	var id = req.params.id;
		console.log("PUT subCat: " + id);

	if ((id < 0) || (id >= subCatNextId)){
		// not found
		res.statusCode = 404;
		res.send("SubCat not found.");
	}
	else if(!req.body.hasOwnProperty('name')){			//<-----------------------------------------------------------------------!!!!!!!!
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for subCat.');
  	}
	else {
		var target = -1;
		for (var i=0; i < subCatList.length; ++i){
			if (subCatList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("SubCat not found.");			
		}	
		else {
			var theSubCat= subCatList[target];
			theSubCat.name = req.body.name;
			theSubCat.Books = req.body.Books;
			var response = {"subCat" : theSubCat};
  			res.json(response);		
  		}
	}
});

// REST Operation - HTTP DELETE to delete a subCat based on its id
app.del('/DB-Project/Books/:id', function(req, res) {
	var id = req.params.id;
		console.log("DELETE subCat: " + id);

	if ((id < 0) || (id >= subCatNextId)){
		// not found
		res.statusCode = 404;
		res.send("SubCat not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < subCatList.length; ++i){
			if (subCatList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("SubCat not found.");			
		}	
		else {
			subCatList.splice(target, 1);
  			res.json(true);
  		}		
	}
});

// REST Operation - HTTP POST to add a new a subCat
app.post('/DB-Project/Books', function(req, res) {
	console.log("POST");

  	if(!req.body.hasOwnProperty('name')) {			//<--------------------------------------------------------------------!!!!!!
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for subCat.');
  	}

  	var newSubCat = new SubCat(req.body.name);
  	console.log("New SubCat: " + JSON.stringify(newSubCat));
  	newSubCat.id = subCatNextId++;
  	subCatList.push(newSubCat);
  	res.json(true);
});



//--------------------------------------Electronics---------------------------------------------------------------//
	
	
// REST Operations
// Idea: Data is created, read, updated, or deleted through a URL that 
// identifies the resource to be created, read, updated, or deleted.
// The URL and any other input data is sent over standard HTTP requests.
// Mapping of HTTP with REST 
// a) POST - Created a new object. (Database create operation)
// b) GET - Read an individual object, collection of object, or simple values (Database read Operation)
// c) PUT - Update an individual object, or collection  (Database update operation)
// d) DELETE - Remove an individual object, or collection (Database delete operation)

// REST Operation - HTTP GET to read all Electronics
app.get('/DB-Project/Electronics', function(req, res) {
	console.log("GET ALL ELECTRONICS SUBCATEGORIES");
	pg.connect(conString, function(err, client, done) {
	client.query('Select * from "bbSubCategory" where "categoryID" = '+2+';', function(err, result) {
  if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The result is: ', rows[i]);
		}*/
	
  var response = {"electronics" : result.rows};
  res.json(response);
});
});
});


// REST Operation - HTTP GET to read a subCat based on its id
app.get('/DB-Project/Electronics/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET subCat: " + id);
		pg.connect(conString, function(err, client, done) {
	client.query('SELECT * FROM "bbSubCategory" WHERE "subCategoryID" = ' + id, function(err, result){
		if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The solution is: ', rows[i]);
		}*/
	
	
	
	var len =result.rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Category not found.");
	}
	else {	
  		var response = {"electronic" : result.rows[0]};
		//connection.end();
  		res.json(response);
  	}
 });	
});
});

// REST Operation - HTTP PUT to updated a electCat based on its id
app.put('/DB-Project/Electronics/:id', function(req, res) {
	var id = req.params.id;
		console.log("PUT electCat: " + id);

	if ((id < 0) || (id >= electCatNextId)){
		// not found
		res.statusCode = 404;
		res.send("ElectCat not found.");
	}
	else if(!req.body.hasOwnProperty('name')){			//<-----------------------------------------------------------------------!!!!!!!!
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for electCat.');
  	}
	else {
		var target = -1;
		for (var i=0; i < electCatList.length; ++i){
			if (electCatList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("electCat not found.");			
		}	
		else {
			var theElectCat= electCatList[target];
			theElectCat.name = req.body.name;
			theElectCat.iconSrc = req.body.iconSrc;
			//theElectCat.electCats = req.body.electCats;
			var response = {"electCat" : theElectCat};
  			res.json(response);		
  		}
	}
});

// REST Operation - HTTP DELETE to delete a electCat based on its id
app.del('/DB-Project/Electronics/:id', function(req, res) {
	var id = req.params.id;
		console.log("DELETE electCat: " + id);

	if ((id < 0) || (id >= electCatNextId)){
		// not found
		res.statusCode = 404;
		res.send("electCat not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < electCatList.length; ++i){
			if (electCatList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("electCat not found.");			
		}	
		else {
			electCatList.splice(target, 1);
  			res.json(true);
  		}		
	}
});

// REST Operation - HTTP POST to add a new a electCat
app.post('/DB-Project/Electronics', function(req, res) {
	console.log("POST");

  	if(!req.body.hasOwnProperty('name')) {			//<--------------------------------------------------------------------!!!!!!
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for electCat.');
  	}

  	var newElectCat = new ElectCat(req.body.name);
  	console.log("New ElectCat: " + JSON.stringify(newElectCat));
  	newElectCat.id = electCatNextId++;
  	electCatList.push(newElectCat);
  	res.json(true);
});



//--------------------------------------Computers---------------------------------------------------------------//
	

// REST Operations
// Idea: Data is created, read, updated, or deleted through a URL that 
// identifies the resource to be created, read, updated, or deleted.
// The URL and any other input data is sent over standard HTTP requests.
// Mapping of HTTP with REST 
// a) POST - Created a new object. (Database create operation)
// b) GET - Read an individual object, collection of object, or simple values (Database read Operation)
// c) PUT - Update an individual object, or collection  (Database update operation)
// d) DELETE - Remove an individual object, or collection (Database delete operation)

// REST Operation - HTTP GET to read all Computers
app.get('/DB-Project/Computers', function(req, res) {
	console.log("GET ALL COMPUTER SUBCATEGORIES");
	pg.connect(conString, function(err, client, done) {
	client.query('Select * from "bbSubCategory" where "categoryID" = '+3+';', function(err, result) {
  if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The result is: ', rows[i]);
		}*/
	
  var response = {"computers" : result.rows};
  res.json(response);
});
});
});


// REST Operation - HTTP GET to read a compCat based on its id
app.get('/DB-Project/Computers/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET compCat: " + id);
		pg.connect(conString, function(err, client, done) {
	client.query('SELECT * FROM "bbSubCategory" WHERE "subCategoryID" = ' + id, function(err, result){
		if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The solution is: ', rows[i]);
		}*/
	
	
	
	var len =result.rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Category not found.");
	}
	else {	
  		var response = {"computer" : result.rows[0]};
		//connection.end();
  		res.json(response);
  	}
 });	
});
});

// REST Operation - HTTP PUT to updated a compCat based on its id
app.put('/DB-Project/Computers/:id', function(req, res) {
	var id = req.params.id;
		console.log("PUT compCat: " + id);

	if ((id < 0) || (id >= compCatNextId)){
		// not found
		res.statusCode = 404;
		res.send("CompCat not found.");
	}
	else if(!req.body.hasOwnProperty('name')){			//<-----------------------------------------------------------------------!!!!!!!!
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for compCat.');
  	}
	else {
		var target = -1;
		for (var i=0; i < compCatList.length; ++i){
			if (compCatList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("compCat not found.");			
		}	
		else {
			var theCompCat= compCatList[target];
			theCompCat.name = req.body.name;
			theCompCat.iconSrc = req.body.iconSrc;
			//theCompCat.compCats = req.body.compCats;
			var response = {"compCat" : theCompCat};
  			res.json(response);		
  		}
	}
});

// REST Operation - HTTP DELETE to delete a compCat based on its id
app.del('/DB-Project/Computers/:id', function(req, res) {
	var id = req.params.id;
		console.log("DELETE compCat: " + id);

	if ((id < 0) || (id >= compCatNextId)){
		// not found
		res.statusCode = 404;
		res.send("compCat not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < compCatList.length; ++i){
			if (compCatList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("compCat not found.");			
		}	
		else {
			compCatList.splice(target, 1);
  			res.json(true);
  		}		
	}
});

// REST Operation - HTTP POST to add a new a compCat
app.post('/DB-Project/Computers', function(req, res) {
	console.log("POST");

  	if(!req.body.hasOwnProperty('name')) {			//<--------------------------------------------------------------------!!!!!!
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for compCat.');
  	}

  	var newCompCat = new CompCat(req.body.name);
  	console.log("New CompCat: " + JSON.stringify(newCompCat));
  	newCompCat.id = compCatNextId++;
  	compCatList.push(newCompCat);
  	res.json(true);
});

//--------------------------------------Clothings---------------------------------------------------------------//
	

// REST Operations
// Idea: Data is created, read, updated, or deleted through a URL that 
// identifies the resource to be created, read, updated, or deleted.
// The URL and any other input data is sent over standard HTTP requests.
// Mapping of HTTP with REST 
// a) POST - Created a new object. (Database create operation)
// b) GET - Read an individual object, collection of object, or simple values (Database read Operation)
// c) PUT - Update an individual object, or collection  (Database update operation)
// d) DELETE - Remove an individual object, or collection (Database delete operation)

// REST Operation - HTTP GET to read all Clothings
app.get('/DB-Project/Clothing', function(req, res) {
	console.log("GET ALL CLOTHING SUBCATEGORIES");
	pg.connect(conString, function(err, client, done) {
	client.query('Select * from "bbSubCategory" where "categoryID" = '+4+';', function(err, result) {
  if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The result is: ', rows[i]);
		}*/
	
  var response = {"clothing" : result.rows};
  res.json(response);
});
});
});


// REST Operation - HTTP GET to read a clothCat based on its id
app.get('/DB-Project/Clothing/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET clothCat: " + id);
		pg.connect(conString, function(err, client, done) {

	client.query('SELECT * FROM "bbSubCategory" WHERE "subCategoryID" = ' + id, function(err, result){
		if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The solution is: ', rows[i]);
		}*/
	
	
	
	var len =result.rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Category not found.");
	}
	else {	
  		var response = {"clothing" : result.rows[0]};
		//connection.end();
  		res.json(response);
  	}
 });	
});
});

// REST Operation - HTTP PUT to updated a clothCat based on its id
app.put('/DB-Project/Clothing/:id', function(req, res) {
	var id = req.params.id;
		console.log("PUT clothCat: " + id);

	if ((id < 0) || (id >= clothCatNextId)){
		// not found
		res.statusCode = 404;
		res.send("clothCat not found.");
	}
	else if(!req.body.hasOwnProperty('name')){			//<-----------------------------------------------------------------------!!!!!!!!
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for clothCat.');
  	}
	else {
		var target = -1;
		for (var i=0; i < clothCatList.length; ++i){
			if (clothCatList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("clothCat not found.");			
		}	
		else {
			var theClothCat= clothCatList[target];
			theClothCat.name = req.body.name;
			theClothCat.iconSrc = req.body.iconSrc;		// may cause problems
			//theCompCat.compCats = req.body.compCats;
			var response = {"clothCat" : theClothCat};
  			res.json(response);		
  		}
	}
});

// REST Operation - HTTP DELETE to delete a clothCat based on its id
app.del('/DB-Project/Clothing/:id', function(req, res) {
	var id = req.params.id;
		console.log("DELETE clothCat: " + id);

	if ((id < 0) || (id >= clothCatNextId)){
		// not found
		res.statusCode = 404;
		res.send("clothCat not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < clothCatList.length; ++i){
			if (clothCatList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("clothCat not found.");			
		}	
		else {
			clothCatList.splice(target, 1);
  			res.json(true);
  		}		
	}
});

// REST Operation - HTTP POST to add a new a clothCat
app.post('/DB-Project/Clothing', function(req, res) {
	console.log("POST");

  	if(!req.body.hasOwnProperty('name')) {			//<--------------------------------------------------------------------!!!!!!
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for clothCat.');
  	}

  	var newClothCat = new ClothCat(req.body.name);
  	console.log("New clothCat: " + JSON.stringify(newClothCat));
  	newClothCat.id = clothCatNextId++;
  	clothCatList.push(newClothCat);
  	res.json(true);
});


//--------------------------------------Shoes---------------------------------------------------------------//
	

// REST Operations
// Idea: Data is created, read, updated, or deleted through a URL that 
// identifies the resource to be created, read, updated, or deleted.
// The URL and any other input data is sent over standard HTTP requests.
// Mapping of HTTP with REST 
// a) POST - Created a new object. (Database create operation)
// b) GET - Read an individual object, collection of object, or simple values (Database read Operation)
// c) PUT - Update an individual object, or collection  (Database update operation)
// d) DELETE - Remove an individual object, or collection (Database delete operation)

// REST Operation - HTTP GET to read all Shoes
app.get('/DB-Project/Shoes', function(req, res) {
	console.log("GET ALL SHOES SUBCATEGORIES");
	pg.connect(conString, function(err, client, done) {
	client.query('Select * from "bbSubCategory" where "categoryID" = '+5+';', function(err, result) {
  if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The result is: ', rows[i]);
		}*/
	
  var response = {"shoes" : result.rows};
  res.json(response);
});
});
});


// REST Operation - HTTP GET to read a shoeCat based on its id
app.get('/DB-Project/Shoes/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET shoeCat: " + id);
		pg.connect(conString, function(err, client, done) {

	client.query('SELECT * FROM "bbSubCategory" WHERE "subCategoryID" = ' + id, function(err, result){
		if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The solution is: ', rows[i]);
		}*/
	
	
	
	var len =result.rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Category not found.");
	}
	else {	
  		var response = {"shoe" : result.rows[0]};
		//connection.end();
  		res.json(response);
  	}
 });	
});
});

// REST Operation - HTTP PUT to updated a shoeCat based on its id
app.put('/DB-Project/Shoes/:id', function(req, res) {
	var id = req.params.id;
		console.log("PUT shoeCat: " + id);

	if ((id < 0) || (id >= shoeCatNextId)){
		// not found
		res.statusCode = 404;
		res.send("ShoeCat not found.");
	}
	else if(!req.body.hasOwnProperty('name')){			//<-----------------------------------------------------------------------!!!!!!!!
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for shoeCat.');
  	}
	else {
		var target = -1;
		for (var i=0; i < shoeCatList.length; ++i){
			if (shoeCatList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("shoeCat not found.");			
		}	
		else {
			var theShoeCat= shoeCatList[target];
			theShoeCat.name = req.body.name;
			theShoeCat.iconSrc = req.body.iconSrc;
			//theShoeCat.shoeCats = req.body.shoeCats;
			var response = {"shoeCat" : theShoeCat};
  			res.json(response);		
  		}
	}
});

// REST Operation - HTTP DELETE to delete a shoeCat based on its id
app.del('/DB-Project/Shoes/:id', function(req, res) {
	var id = req.params.id;
		console.log("DELETE shoeCat: " + id);

	if ((id < 0) || (id >= shoeCatNextId)){
		// not found
		res.statusCode = 404;
		res.send("shoeCat not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < shoeCatList.length; ++i){
			if (shoeCatList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("shoeCat not found.");			
		}	
		else {
			shoeCatList.splice(target, 1);
  			res.json(true);
  		}		
	}
});

// REST Operation - HTTP POST to add a new a shoeCat
app.post('/DB-Project/Shoes', function(req, res) {
	console.log("POST");

  	if(!req.body.hasOwnProperty('name')) {			//<--------------------------------------------------------------------!!!!!!
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for shoeCat.');
  	}

  	var newShoeCat = new ShoeCat(req.body.name);
  	console.log("New ShoeCat: " + JSON.stringify(newShoeCat));
  	newShoeCat.id = shoeCatNextId++;
  	shoeCatList.push(newShoeCat);
  	res.json(true);
});

//--------------------------------------Sports---------------------------------------------------------------//
	

// REST Operations
// Idea: Data is created, read, updated, or deleted through a URL that 
// identifies the resource to be created, read, updated, or deleted.
// The URL and any other input data is sent over standard HTTP requests.
// Mapping of HTTP with REST 
// a) POST - Created a new object. (Database create operation)
// b) GET - Read an individual object, collection of object, or simple values (Database read Operation)
// c) PUT - Update an individual object, or collection  (Database update operation)
// d) DELETE - Remove an individual object, or collection (Database delete operation)

// REST Operation - HTTP GET to read all Sports
app.get('/DB-Project/Sports', function(req, res) {
	console.log("GET ALL SPORTS SUBCATEGORIES");
	pg.connect(conString, function(err, client, done) {
	client.query('Select * from "bbSubCategory" where "categoryID" = '+6+';', function(err, result) {
  if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The result is: ', rows[i]);
		}*/
	
  var response = {"sports" : result.rows};
  res.json(response);
});
});
});


// REST Operation - HTTP GET to read a sportCat based on its id
app.get('/DB-Project/Sports/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET sportCat: " + id);
		pg.connect(conString, function(err, client, done) {
	client.query('SELECT * FROM "bbSubCategory" WHERE "subCategoryID" = ' + id, function(err, result){
		if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The solution is: ', rows[i]);
		}*/
	
	
	
	var len =result.rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Category not found.");
	}
	else {	
  		var response = {"sport" : result.rows[0]};
		//connection.end();
  		res.json(response);
  	}
 });	
});
});

// REST Operation - HTTP PUT to updated a sportCat based on its id
app.put('/DB-Project/Sports/:id', function(req, res) {
	var id = req.params.id;
		console.log("PUT sportCat: " + id);

	if ((id < 0) || (id >= sportCatNextId)){
		// not found
		res.statusCode = 404;
		res.send("SportCat not found.");
	}
	else if(!req.body.hasOwnProperty('name')){			//<-----------------------------------------------------------------------!!!!!!!!
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for sportCat.');
  	}
	else {
		var target = -1;
		for (var i=0; i < sportCatList.length; ++i){
			if (sportCatList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("sportCat not found.");			
		}	
		else {
			var theSportCat= sportCatList[target];
			theSportCat.name = req.body.name;
			theSportCat.iconSrc = req.body.iconSrc;
			//theSportCat.sportCats = req.body.sportCats;
			var response = {"sportCat" : theSportCat};
  			res.json(response);		
  		}
	}
});

// REST Operation - HTTP DELETE to delete a sportCat based on its id
app.del('/DB-Project/Sports/:id', function(req, res) {
	var id = req.params.id;
		console.log("DELETE sportCat: " + id);

	if ((id < 0) || (id >= sportCatNextId)){
		// not found
		res.statusCode = 404;
		res.send("sportCat not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < sportCatList.length; ++i){
			if (sportCatList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("sportCat not found.");			
		}	
		else {
			sportCatList.splice(target, 1);
  			res.json(true);
  		}		
	}
});

// REST Operation - HTTP POST to add a new a sportCat
app.post('/DB-Project/Sports', function(req, res) {
	console.log("POST");

  	if(!req.body.hasOwnProperty('name')) {			//<--------------------------------------------------------------------!!!!!!
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for sportCat.');
  	}

  	var newSportCat = new SportCat(req.body.name);
  	console.log("New SportCat: " + JSON.stringify(newSportCat));
  	newSportCat.id = sportCatNextId++;
  	sportCatList.push(newSportCat);
  	res.json(true);
});



//-----------------------Regular User------------------------------------------------------


// Gets the user Information
app.get('/DB-Project/accounts/:ids', function(req, res) {
	var ids = req.params.ids;
		console.log("GET account: " + ids);
		pg.connect(conString, function(err, client, done) {

var query = client.query('SELECT * FROM "bbUser" NATURAL JOIN "bbAddress" WHERE "userID" = ' + ids, function(err, result){	
	if (err) throw err;
	
	
	var len =result.rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {	
  		var response = {"account" : result.rows[0]};
		//connection.end();
  		res.json(response);
  	}
 });
  });
});


/*
app.post('/DB-Project/accounts', function (req, res) {
  var post = req.body;
  
  connection.query('SELECT * FROM bbUser', function(err, rows, result) {
  if (err) throw err;
	for (i = 0; i<rows.length; i++){
  		if (post.user == rows[i].userNickname && post.password == rows[i].password) {
    req.session.user_id = rows[i].userNickname;
    res.redirect('../DB-Project/Regular_User.html');
  } else {
    res.send('Bad user/pass');
  }
});*/



//Checks Login
app.get('/DB-Project/accounts/:id/:idp', function(req, res) {
	var id = req.params.id;
	var idp = req.params.idp;
		console.log("GET account: " + id);
		pg.connect(conString, function(err, client, done) {
var query = client.query('SELECT * FROM "bbUser" WHERE "userNickname" = ' + "'" + id  + "'" + ' AND ' +
		'password = ' + "'" + idp + "'", function(err, result){
		if (err) throw err;

	
	
	var len =result.rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {	
  		var response = {"account" : result.rows[0]};
		//connection.end();
  		res.json(response);
  	}
 });
  });
});
// REST Operation - HTTP PUT to updated a car based on its id
app.put('/DB-Project/accounts/:id', function(req, res) {
	var id = req.params.id;
		console.log("PUT account: " + id);

	if ((id < 0) || (id >= accountNextId)){
		// not found
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password') || !req.body.hasOwnProperty('mailingaddress')
		  	|| !req.body.hasOwnProperty('billingaddress') || !req.body.hasOwnProperty('creditcard')) {
		    	res.statusCode = 400;
		    	return res.send('Error: Missing fields for account.');
		  	}
	else {
		var target = -1;
		for (var i=0; i < accountList.length; ++i){
			if (accountList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Account not found.");			
		}	
		else {
			var theAccount= accountList[target];
			theAccount.name = req.body.name;
			theAccount.username = req.body.username;
			theAccount.password = req.body.password;
			theAccount.mailingaddress = req.body.mailingaddress;
			theAccount.billingaddress = req.body.billingaddress;
			theAccount.creditcard = req.body.creditcard;
			var response = {"account" : theAccount};
  			res.json(response);		
  		}
	}
});



//REST Operation - HTTP POST to add a new a user
app.post('/DB-Project/accounts', function(req, res) {
	console.log(req.body.userEmail);
	console.log("POST User");

  	if(!req.body.hasOwnProperty('userName') || !req.body.hasOwnProperty('userNickname') || !req.body.hasOwnProperty('password')
  	|| !req.body.hasOwnProperty('userEmail') || !req.body.hasOwnProperty('addressLine') || !req.body.hasOwnProperty('city')
	|| !req.body.hasOwnProperty('state') || !req.body.hasOwnProperty('country') || !req.body.hasOwnProperty('zipcode')
	|| !req.body.hasOwnProperty('creditCardNumber') || !req.body.hasOwnProperty('creditCardOwner') || !req.body.hasOwnProperty('securityCode')
	|| !req.body.hasOwnProperty('expDate') || !req.body.hasOwnProperty('caddressLine') || !req.body.hasOwnProperty('ccity')
	|| !req.body.hasOwnProperty('cstate') || !req.body.hasOwnProperty('ccountry') || !req.body.hasOwnProperty('czipcode')){
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for account.');
  	}
	
	
	pg.connect(conString, function(err, client, done) {
  	//var newAccount = new Account(req.body.name, req.body.username, req.body.password, req.body.mailingaddress, req.body.billingaddress, req.body.creditcard);
  	var query = client.query('INSERT INTO "bbUser" (`userID`,`userName`,`userNickname`,`userEmail`,`password`,' +
  		'`birthdate`,`gender`,`creditCardID`,`bankAccountID`,`addressID`) VALUES (NULL, "' + req.body.userName + '", "'+ req.body.userNickname + 
  		'", "' + req.body.userEmail + '", "' + req.body.password + '",NULL,NULL,NULL,NULL,NULL)');
  	var getquery = client.query('SET @last_insert_id_in_bbUser = LAST_INSERT_ID()');	
  	

  	var query1 = client.query('INSERT INTO "bbAddress" (`addressID`,`addressLine`,`city`,`state`,`country`,' +
  	  		'`zipcode`) VALUES (NULL, "' + req.body.addressLine + '", "'+ req.body.city + 
  	  		'", "' + req.body.state + '", "' + req.body.country + '", "' + req.body.zipcode + '")');
  	var getquery1 = client.query("SET @last_insert_id_in_bbAddress = LAST_INSERT_ID()");
 
  	var query2 = client.query('INSERT INTO "bbAddress" (`addressID`,`addressLine`,`city`,`state`,`country`,' +
  	  		'`zipcode`) VALUES (NULL, "' + req.body.caddressLine + '", "'+ req.body.ccity + 
  	  		'", "' + req.body.cstate + '", "' + req.body.ccountry + '", "' + req.body.czipcode + '")');
  	var getquery2 = client.query('SET @last_insert_id_in_bbAddress1 = LAST_INSERT_ID()');
  	
	var query3 = client.query('INSERT INTO "bbCreditCard" (`creditCardID`,`creditCardOwner`,`creditCardNumber`,`securityCode`,`expDate`,' +
  	  		'`addressID`) VALUES (NULL, "' + req.body.creditCardOwner + '", "'+ req.body.creditCardNumber + 
  	  		'", "' + req.body.securityCode + '", "' + req.body.expDate + '", @last_insert_id_in_bbAddress1)');
  	var getquery3 = client.query('SET @last_insert_id_in_bbCreditCard = LAST_INSERT_ID()');
  	var query35 = client.query('INSERT INTO "bbBankAccount" ("accountNumber","accountType","accountOwner","bankName")'+
  			'VALUES (' + req.body.accountNumber + ', '+ req.body.accountType + 
  	  		', ' + req.body.accountOwner + ', ' + req.body.bankName + ')');
  	
  	var query4 = client.query('UPDATE "bbUser" SET `addressID`= @last_insert_id_in_bbAddress, `creditCardID`=@last_insert_id_in_bbCreditCard WHERE `userID`=@last_insert_id_in_bbUser');
  	
  	console.log("New Account: ");
  	console.log("New Mailing Address: ");
  	console.log("New Biling Address: " );
  	console.log("New CreditCard:" );
  	res.json(true);
});
});

////try this else variables with ID change to use ""


//-----------------------Administrator------------------------------------------------------


// REST Operations
// Idea: Data is created, read, updated, or deleted through a URL that 
// identifies the resource to be created, read, updated, or deleted.
// The URL and any other input data is sent over standard HTTP requests.
// Mapping of HTTP with REST 
// a) POST - Created a new object. (Database create operation)
// b) GET - Read an individual object, collection of object, or simple values (Database read Operation)
// c) PUT - Update an individual object, or collection  (Database update operation)
// d) DELETE - Remove an individual object, or collection (Database delete operation)

// REST Operation - HTTP GET to read all products
app.get('/DB-Project/accountas', function(req, res) {
	console.log("GET ACCOUNTAS");
	pg.connect(conString, function(err, client, done) {
	client.query('SELECT * FROM "bbAdmin"', function(err, result) {
  if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The result is: ', rows[i]);
		}*/
	
  var response = {"accountas" : result.rows};
  res.json(response);
});
});
});


// REST Operation - HTTP GET to read a product based on its id
app.get('/DB-Project/accountas/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET accounta: " + id);
		pg.connect(conString, function(err, client, done) {

var query = client.query('SELECT * FROM "bbAdmin" WHERE "userID" = ' + id, function(err, result){
		if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The solution is: ', rows[i]);
		}*/
	
	
	
	var len =result.rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {	
  		var response = {"accounta" : result.rows[0]};
		//connection.end();
  		res.json(response);
  	}
 });
  });
  });

// REST Operation - HTTP PUT to updated a car based on its id
app.put('/DB-Project/accountas/:id', function(req, res) {
	var id = req.params.id;
		console.log("PUT accounta: " + id);

	if ((id < 0) || (id >= accountaNextId)){
		// not found
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password') || !req.body.hasOwnProperty('mailingaddress')
		  	|| !req.body.hasOwnProperty('billingaddress') || !req.body.hasOwnProperty('creditcard')) {
		    	res.statusCode = 400;
		    	return res.send('Error: Missing fields for account.');
		  	}
	else {
		var target = -1;
		for (var i=0; i < accountaList.length; ++i){
			if (accountaList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Account not found.");			
		}	
		else {
			var theAccount= accountList[target];
			theAccount.name = req.body.name;
			theAccount.username = req.body.username;
			theAccount.password = req.body.password;
			theAccount.mailingaddress = req.body.mailingaddress;
			theAccount.billingaddress = req.body.billingaddress;
			theAccount.creditcard = req.body.creditcard;
			var response = {"accounta" : theAccount};
  			res.json(response);		
  		}
	}
});

//REST Operation - HTTP POST to add a new a car
app.post('/DB-Project/accountas', function(req, res) {
	console.log("POST");

  	if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')
  	|| !req.body.hasOwnProperty('mailingaddress') || !req.body.hasOwnProperty('billingaddress') || !req.body.hasOwnProperty('creditcard')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for account.');
  	}

  	var newAccount = new Account(req.body.name, req.body.username, req.body.password, req.body.mailingaddress, req.body.billingaddress, req.body.creditcard);
  	console.log("New Account: " + JSON.stringify(newAccount));
  	newAccount.id = accountNextId++;
  	accountList.push(newAccount);
  	res.json(true);
});

//--------------------------------------Credit Card--------------------------------------------------------------------//


//Gets the creditcard info
app.get('/DB-Project/creditcards/:ids', function(req, res) {
	var ids = req.params.ids;
		console.log("GET creditcard: " + ids);
		pg.connect(conString, function(err, client, done) {

var query = client.query('SELECT * from "bbCreditCard" as c ' +
		'inner join "bbAddress" as a on a."addressID" = c."addressID" ' +
		'inner join "bbUser" as u on u."creditCardID" = c."creditCardID" ' +
		'where u."userID" = ' + ids, function(err, result){
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The solution is: ', rows[i]);
	}	*/
	
	if (err) throw err;

	
	
	var len =result.rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {	
  		var response = {"creditcard" : result.rows[0]};
		//client.end();
  		res.json(response);
  	}
 });
  });
});
// REST Operation - HTTP PUT to updated a car based on its id
app.put('/DB-Project/creditcards/:id', function(req, res) {
	var id = req.params.id;
		console.log("PUT creditcard: " + id);

	if ((id < 0) || (id >= creditcardNextId)){
		// not found
		res.statusCode = 404;
		res.send("Creditcard not found.");
	}
	else if(!req.body.hasOwnProperty('number') || !req.body.hasOwnProperty('ownerName') || !req.body.hasOwnProperty('securityCode')
		  	|| !req.body.hasOwnProperty('expDate')) {
		    	res.statusCode = 400;
		    	return res.send('Error: Missing fields for creditcard.');
		  	}
	else {
		var target = -1;
		for (var i=0; i < creditcardList.length; ++i){
			if (creditcardList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Creditcard not found.");			
		}	
		else {
			var theCreditcard = creditcardList[target];
			theCreditcard.number = req.body.number;
			theCreditcard.ownerName = req.body.ownerName;
			theCreditcard.securityCode = req.body.securityCode;
			theCreditcard.expDate = req.body.expDate;
			var response = {"creditcard" : theCreditcard};
  			res.json(response);		
  		}
	}
});

//REST Operation - HTTP POST to add a new a car
app.post('/DB-Project/creditcards', function(req, res) {
	console.log("POST");

  	if(!req.body.hasOwnProperty('number') || !req.body.hasOwnProperty('ownerName') || !req.body.hasOwnProperty('isShipping') || !req.body.hasOwnProperty('securityCode')
		  	|| !req.body.hasOwnProperty('expDate')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for creditcard.');
  	}

  	var newCreditcard = new Creditcard(req.body.number, req.body.ownerName, req.body.isShipping, req.body.securityCode, req.body.expDate);
  	console.log("New Creditcard: " + JSON.stringify(newCreditcard));
  	newCreditcard.id = creditcardNextId++;
  	creditcardList.push(newCreditcard);
  	res.json(true);
});

//--------------------------------------Address-----------------------------------------------------------------//



// REST Operations
// Idea: Data is created, read, updated, or deleted through a URL that 
// identifies the resource to be created, read, updated, or deleted.
// The URL and any other input data is sent over standard HTTP requests.
// Mapping of HTTP with REST 
// a) POST - Created a new object. (Database create operation)
// b) GET - Read an individual object, collection of object, or simple values (Database read Operation)
// c) PUT - Update an individual object, or collection  (Database update operation)
// d) DELETE - Remove an individual object, or collection (Database delete operation)

// REST Operation - HTTP GET to read all cars
app.get('/DB-Project/addressinfos', function(req, res) {
        console.log("GET Address");
        //var tom = {"make" : "Ford", "model" : "Escape", "year" : "2013", "description" : "V4 engine, 30mpg, Gray", "price" : "$18,000"};
        //var tom = new Car("Ford", "Escape", "2013", "V4 engine, 30mpg, Gray", "$18,000");
        //console.log("tom: " + JSON.stringify(tom));
        var response = {"addressinfos" : addressinfoList};
          res.json(response);
});

// REST Operation - HTTP GET to read a car based on its id
app.get('/DB-Project/addressinfos/:id', function(req, res) {
        var id = req.params.id;
                console.log("GET addressinfo: " + id);
pg.connect(conString, function(err, client, done) {
var query = client.query('SELECT * FROM "bbAddress" AS a ' +
		'INNER JOIN "bbUser" AS u on u."addressID" = a."addressID"  ' +
		'WHERE u."addressID" = ' + id, function(err, result){
                if (err) throw err;
        /*
        for (i = 0; i<rows.length; i++){
                        console.log('The solution is: ', rows[i]);
                }*/
        
        
        
        var len =result.rows.length;
        if (len == 0){
                res.statusCode = 404;
                res.send("Address not found.");
        }
        else {        
                  var response = {"addressinfo" : result.rows[0]};
                //client.end();
                  res.json(response);
          }
 });
  });
  });
// REST Operation - HTTP PUT to updated a car based on its id
app.put('/DB-Project/addressinfos/:id', function(req, res) {
        var id = req.params.id;
                console.log("PUT address: " + id);

        if ((id < 0) || (id >= addressinfoNextId)){
                // not found
                res.statusCode = 404;
                res.send("Address not found.");
        }
        else if(!req.body.hasOwnProperty('addressLine1') || !req.body.hasOwnProperty('addressLine2') || !req.body.hasOwnProperty('city') || !req.body.hasOwnProperty('state') 
                        || !req.body.hasOwnProperty('country') || !req.body.hasOwnProperty('zipcode') || !req.body.hasOwnProperty('isBilling')) {
                            res.statusCode = 400;
                            return res.send('Error: Missing fields for address.');
                          }
        else {
                var target = -1;
                for (var i=0; i < addressinfoList.length; ++i){
                        if (addressinfoList[i].id == id){
                                target = i;
                                break;        
                        }
                }
                if (target == -1){
                        res.statusCode = 404;
                        res.send("Address not found.");                        
                }        
                else {
                        var theAddress= addressinfoList[target];
                        theAddress.addressLine1 = req.body.addressLine1;
                        theAddress.addressLine2 = req.body.addressLine2;
                        theAddress.city = req.body.city;
                        theAddress.state = req.body.state;
                        theAddress.country = req.body.country;
                        theAddress.zipcode = req.body.zipcode;
                        theAddress.isBilling = req.body.isBilling;
                        var response = {"addressinfo" : theAddress};
                          res.json(response);                
                  }
        }
});

//REST Operation - HTTP POST to add a new a car
app.post('/DB-Project/addressinfos', function(req, res) {
        console.log("POST");

          if(!req.body.hasOwnProperty('addressLine1') || !req.body.hasOwnProperty('addressLine2') || !req.body.hasOwnProperty('city') || !req.body.hasOwnProperty('state') 
                        || !req.body.hasOwnProperty('country') || !req.body.hasOwnProperty('zipcode') || !req.body.hasOwnProperty('isBilling')) {
            res.statusCode = 400;
            return res.send('Error: Missing fields for address.');
          }

          var newAddress = new Address(req.body.addressLine1, req.body.addressLine2, req.body.city, req.body.state, req.body.country, req.body.zipcode, req.body.isBilling);
          console.log("New Address: " + JSON.stringify(newAddress));
          newAddress.id = addressinfoNextId++;
          addressinfoList.push(newAddress);
          res.json(true);
});



//--------------------------------------Cart-----------------------------------------------------------------//


// REST Operations
// Idea: Data is created, read, updated, or deleted through a URL that 
// identifies the resource to be created, read, updated, or deleted.
// The URL and any other input data is sent over standard HTTP requests.
// Mapping of HTTP with REST 
// a) POST - Created a new object. (Database create operation)
// b) GET - Read an individual object, collection of object, or simple values (Database read Operation)
// c) PUT - Update an individual object, or collection  (Database update operation)
// d) DELETE - Remove an individual object, or collection (Database delete operation)

// REST Operation - HTTP GET to read all cars
app.get('/DB-Project/carts', function(req, res) {
	console.log("GET CARTS");

pg.connect(conString, function(err, client, done) {
	client.query('SELECT * FROM "bbAddtoCart" natural join "bbProduct" natural join "bbBidProduct"', function(err, result) {


  	if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The result is: ', rows[i]);
		}*/
	
  var response = {"carts" : result.rows};
  res.json(response);
});
});
});

// REST Operation - HTTP GET to read a car based on its id
app.get('/DB-Project/carts/:id', function(req, res) {
        var id = req.params.id;
                console.log("GET carts: " + id);

pg.connect(conString, function(err, client, done) {
var query = client.query('SELECT * FROM "bbAddToCart" natural join "bbProduct" natural join "bbBidProduct" WHERE "userID" = ' + id, function(err, result){


                if (err) throw err;
        
     /*
        for (i = 0; i<result.rows.length; i++){
                             console.log('The solution is: ', rows[i]);
                     }*/
     
        
        
        
        var len =result.rows.length;
        if (len == 0){
                res.statusCode = 404;
                res.send("Cart not found.");
        }
        else {        
                  var response = {"cart" : result.rows};
                //client.end();
                  res.json(response);
          }
 });
  });
});
// REST Operation - HTTP PUT to updated a car based on its id
app.put('/DB-Project/addressinfos/:id', function(req, res) {
        var id = req.params.id;
                console.log("PUT address: " + id);

        if ((id < 0) || (id >= addressinfoNextId)){
                // not found
                res.statusCode = 404;
                res.send("Address not found.");
        }
        else if(!req.body.hasOwnProperty('addressLine1') || !req.body.hasOwnProperty('addressLine2') || !req.body.hasOwnProperty('city') || !req.body.hasOwnProperty('state') 
                        || !req.body.hasOwnProperty('country') || !req.body.hasOwnProperty('zipcode') || !req.body.hasOwnProperty('isBilling')) {
                            res.statusCode = 400;
                            return res.send('Error: Missing fields for address.');
                          }
        else {
                var target = -1;
                for (var i=0; i < addressinfoList.length; ++i){
                        if (addressinfoList[i].id == id){
                                target = i;
                                break;        
                        }
                }
                if (target == -1){
                        res.statusCode = 404;
                        res.send("Address not found.");                        
                }        
                else {
                        var theAddress= addressinfoList[target];
                        theAddress.addressLine1 = req.body.addressLine1;
                        theAddress.addressLine2 = req.body.addressLine2;
                        theAddress.city = req.body.city;
                        theAddress.state = req.body.state;
                        theAddress.country = req.body.country;
                        theAddress.zipcode = req.body.zipcode;
                        theAddress.isBilling = req.body.isBilling;
                        var response = {"addressinfo" : theAddress};
                          res.json(response);                
                  }
        }
});

//REST Operation - HTTP POST to add a new a car
app.post('/DB-Project/addressinfos', function(req, res) {
        console.log("POST");

          if(!req.body.hasOwnProperty('addressLine1') || !req.body.hasOwnProperty('addressLine2') || !req.body.hasOwnProperty('city') || !req.body.hasOwnProperty('state') 
                        || !req.body.hasOwnProperty('country') || !req.body.hasOwnProperty('zipcode') || !req.body.hasOwnProperty('isBilling')) {
            res.statusCode = 400;
            return res.send('Error: Missing fields for address.');
          }

          var newAddress = new Address(req.body.addressLine1, req.body.addressLine2, req.body.city, req.body.state, req.body.country, req.body.zipcode, req.body.isBilling);
          console.log("New Address: " + JSON.stringify(newAddress));
          newAddress.id = addressinfoNextId++;
          addressinfoList.push(newAddress);
          res.json(true);
});

//--------------------------------------Sell-----------------------------------------------------------------//


// REST Operation - HTTP GET to read all cars
app.get('/DB-Project/sells/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET sell: " + id);
		pg.connect(conString, function(err, client, done) {


var query = client.query('SELECT * FROM "bbSell" natural join "bbProduct" natural join "bbBidProduct" WHERE "userID" = ' + id, function(err, result){


		if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The solution is: ', rows[i]);
		}*/
	
	
	
	var len =result.rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {	
  		var response = {"sell" : result.rows};
		//client.end();
  		res.json(response);
  	}
 });
  });
});

// REST Operation - HTTP GET to read a car based on its id
app.get('/DB-Project/sells/:id', function(req, res) {
        var id = req.params.id;
                console.log("GET sells: " + id);
pg.connect(conString, function(err, client, done) {
var query = client.query('SELECT * from "bbSell" natural join "bbUser" ' +

		'natural join "bbProduct" natural join "bbBidProduct" ' +


		'where "userID" = ' + id, function(err, result){
                if (err) throw err;
        /*
        for (i = 0; i<rows.length; i++){
                        console.log('The solution is: ', rows[i]);
                }*/
        
        
        
        var len =result.rows.length;
        if (len == 0){
                res.statusCode = 404;
                res.send("Sell not found.");
        }
        else {        
                  var response = {"sell" : result.rows[0]};
                //client.end();
                  res.json(response);
          }
 });
  });
});
  
// REST Operation - HTTP PUT to updated a car based on its id
app.put('/DB-Project/sells/:id', function(req, res) {
        var id = req.params.id;
                console.log("PUT address: " + id);

        if ((id < 0) || (id >= addressinfoNextId)){
                // not found
                res.statusCode = 404;
                res.send("Address not found.");
        }
        else if(!req.body.hasOwnProperty('addressLine1') || !req.body.hasOwnProperty('addressLine2') || !req.body.hasOwnProperty('city') || !req.body.hasOwnProperty('state') 
                        || !req.body.hasOwnProperty('country') || !req.body.hasOwnProperty('zipcode') || !req.body.hasOwnProperty('isBilling')) {
                            res.statusCode = 400;
                            return res.send('Error: Missing fields for address.');
                          }
        else {
                var target = -1;
                for (var i=0; i < addressinfoList.length; ++i){
                        if (addressinfoList[i].id == id){
                                target = i;
                                break;        
                        }
                }
                if (target == -1){
                        res.statusCode = 404;
                        res.send("Address not found.");                        
                }        
                else {
                        var theAddress= addressinfoList[target];
                        theAddress.addressLine1 = req.body.addressLine1;
                        theAddress.addressLine2 = req.body.addressLine2;
                        theAddress.city = req.body.city;
                        theAddress.state = req.body.state;
                        theAddress.country = req.body.country;
                        theAddress.zipcode = req.body.zipcode;
                        theAddress.isBilling = req.body.isBilling;
                        var response = {"addressinfo" : theAddress};
                          res.json(response);                
                  }
        }
});

//REST Operation - HTTP POST to add a new a car
app.post('/DB-Project/sells', function(req, res) {
        console.log("POST");

          if(!req.body.hasOwnProperty('addressLine1') || !req.body.hasOwnProperty('addressLine2') || !req.body.hasOwnProperty('city') || !req.body.hasOwnProperty('state') 
                        || !req.body.hasOwnProperty('country') || !req.body.hasOwnProperty('zipcode') || !req.body.hasOwnProperty('isBilling')) {
            res.statusCode = 400;
            return res.send('Error: Missing fields for address.');
          }

          var newAddress = new Address(req.body.addressLine1, req.body.addressLine2, req.body.city, req.body.state, req.body.country, req.body.zipcode, req.body.isBilling);
          console.log("New Address: " + JSON.stringify(newAddress));
          newAddress.id = addressinfoNextId++;
          addressinfoList.push(newAddress);
          res.json(true);
});

//--------------------------------------Bid-----------------------------------------------------------------//


// REST Operations
// Idea: Data is created, read, updated, or deleted through a URL that 
// identifies the resource to be created, read, updated, or deleted.
// The URL and any other input data is sent over standard HTTP requests.
// Mapping of HTTP with REST 
// a) POST - Created a new object. (Database create operation)
// b) GET - Read an individual object, collection of object, or simple values (Database read Operation)
// c) PUT - Update an individual object, or collection  (Database update operation)
// d) DELETE - Remove an individual object, or collection (Database delete operation)

// REST Operation - HTTP GET to read all cars

app.get('/DB-Project/bids', function(req, res) {
	console.log("GET BIDS");
	
	pg.connect(conString, function(err, client, done) {
	client.query('SELECT * from "bbBidFor" natural join "bbProduct" natural join "bbBidProduct"', function(err, result) {

	

  	if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The result is: ', rows[i]);
		}*/
	
  var response = {"bids" : result.rows};
  res.json(response);
});
});
});

// REST Operation - HTTP GET to read a car based on its id
app.get('/DB-Project/bids/:id', function(req, res) {
        var id = req.params.id;
                console.log("GET bids: " + id);
pg.connect(conString, function(err, client, done) {

var query = client.query('SELECT * FROM "bbBidFor" natural join "bbProduct" natural join "bbBidProduct" WHERE "userID" = ' + id, function(err, result){

                if (err) throw err;
        /*
        for (i = 0; i<rows.length; i++){
                        console.log('The solution is: ', rows[i]);
                }*/
        
        
        
        var len =result.rows.length;
        if (len == 0){
                res.statusCode = 404;
                res.send("Bid not found.");
        }
        else {        
                  var response = {"bid" : result.rows};
                //client.end();
                  res.json(response);
          }
 });
  });
});


app.get('/DB-Project/abids/:ids', function(req, res) {
    var ids = req.params.ids;
            console.log("GET bidproduct: " + ids);
            pg.connect(conString, function(err, client, done) {

var query = client.query('SELECT u."userNickname", b."bidDate", b."bidAmount", r."productPhoto", r."productDesc", r."productName", ' +
		'r.brand, r.model, r.dimensions FROM "bbBidFor" as b inner join "bbUser" as u on b."userID" = u."userID" ' +
		'inner join "bbProduct" as r on b."productID" = r."productID" inner join ' +
		'"bbSell" as s on r."productID" = s."productID" WHERE s."userID"= "'+ ids + '"', function(err, result){
            if (err) throw err;
    
    /*
    for (i = 0; i<rows.length; i++){
                      console.log('The solution is: ', rows[i]);
                }*/
    
         
              var response = {"bidproduct" : result.rows};
            //client.end();
              res.json(response);
      
});
});
});


  
// REST Operation - HTTP PUT to updated a car based on its id
app.put('/DB-Project/bids/:id', function(req, res) {
        var id = req.params.id;
                console.log("PUT address: " + id);

        if ((id < 0) || (id >= addressinfoNextId)){
                // not found
                res.statusCode = 404;
                res.send("Address not found.");
        }
        else if(!req.body.hasOwnProperty('addressLine1') || !req.body.hasOwnProperty('addressLine2') || !req.body.hasOwnProperty('city') || !req.body.hasOwnProperty('state') 
                        || !req.body.hasOwnProperty('country') || !req.body.hasOwnProperty('zipcode') || !req.body.hasOwnProperty('isBilling')) {
                            res.statusCode = 400;
                            return res.send('Error: Missing fields for address.');
                          }
        else {
                var target = -1;
                for (var i=0; i < addressinfoList.length; ++i){
                        if (addressinfoList[i].id == id){
                                target = i;
                                break;        
                        }
                }
                if (target == -1){
                        res.statusCode = 404;
                        res.send("Address not found.");                        
                }        
                else {
                        var theAddress= addressinfoList[target];
                        theAddress.addressLine1 = req.body.addressLine1;
                        theAddress.addressLine2 = req.body.addressLine2;
                        theAddress.city = req.body.city;
                        theAddress.state = req.body.state;
                        theAddress.country = req.body.country;
                        theAddress.zipcode = req.body.zipcode;
                        theAddress.isBilling = req.body.isBilling;
                        var response = {"addressinfo" : theAddress};
                          res.json(response);                
                  }
        }
});


var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var output = d.getFullYear() + '-' +
(month<10 ? '0' : '') + month + '-' +
(day<10 ? '0' : '') + day;

//REST Operation - HTTP POST to add a new a car
app.post('/DB-Project/placebids/:id/:idp/:idb/:sd/:ed', function(req, res) {
	var id = parseFloat(req.params.id);
	var idp = req.params.idp;
	var idb = req.params.idb;
	var sd = req.params.sd;
	var ed = req.params.ed;
	var cb = parseFloat(req.body.bidAmount);
	var count = 0;
        console.log("POST");
        console.log(idb);
        console.log(req.body.bidAmount);
        console.log(id);
        console.log(idp);
        console.log(sd);
        console.log(ed);
        console.log(output);
       pg.connect(conString, function(err, client, done) {
          if(!req.body.hasOwnProperty('bidAmount')) {
        	  console.log("Problem?");
            res.statusCode = 400;
            return res.send('Error: Missing fields for address.');
          }
          
          if(count == 0){
          	
        	  var query2 = client.query('Select * from "bbBidFor" Where "userID" = "' + id + '" AND "productID" = "'+ idp +'"'); 
        	  count = 1;
        	  return res.send('You have already placed a bid!');
          }
          
          console.log("Here");
          if(output >= sd && output <= ed){
        	  console.log("Here1");
        	  console.log("el chikitin: "+idb);
        	  console.log("el grande: "+cb);
          
          if(cb > idb && count == 0){
        	  console.log("Here2");
        	  var query1 = client.query('UPDATE "bbBidProduct" SET `bidStartingPrice`= "'+ req.body.bidAmount + '" WHERE "productID"="'+ idp +'"');
        	  var query = client.query('INSERT INTO "bbBidFor" (`userID`,`productID`,`bidDate`,`bidAmount`) ' +
              		'VALUES ("' + id + '", "' + idp + '", "'+ output + '", "' + cb + '"")');
        	  
        	  res.json(true);
        	  return;
          }
          
          else{
        	  console.log("Here35");
        	  return res.send('The bid amount is less than the bid starting price!');
          }
          console.log("Her4");
          
          }
          console.log("Herein");
		if(output < sd){
			console.log("Here5");
			return res.send('The bid date has not started yet');
		}
		if(output > ed){
			console.log("Here6");
			return res.send('The bid date has passed');
		}


});
});
//--------------------------------------Order-----------------------------------------------------------------//



// REST Operations
// Idea: Data is created, read, updated, or deleted through a URL that 
// identifies the resource to be created, read, updated, or deleted.
// The URL and any other input data is sent over standard HTTP requests.
// Mapping of HTTP with REST 
// a) POST - Created a new object. (Database create operation)
// b) GET - Read an individual object, collection of object, or simple values (Database read Operation)
// c) PUT - Update an individual object, or collection  (Database update operation)
// d) DELETE - Remove an individual object, or collection (Database delete operation)

// REST Operation - HTTP GET to read all cars
app.get('/DB-Project/orders', function(req, res) {
	console.log("GET ORDERS");
	
pg.connect(conString, function(err, client, done) {
	client.query('SELECT * from "bbOrder" natural join "bbProduct" natural join "bbBidProduct"', function(err, result) {

  	if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The result is: ', rows[i]);
	}
  var response = {"bids" : result.rows};
  res.json(response);
});
});
});

// REST Operation - HTTP GET to read a car based on its id
app.get('/DB-Project/orders/:id', function(req, res) {
        var id = req.params.id;
                console.log("GET order: " + id);
                pg.connect(conString, function(err, client, done) {

var query = client.query('SELECT u."userNickname", p."paidDate", r."productPhoto", r."productDesc", r."productName", r."productPrice", ' +
		'r.brand, r.model, r.dimensions FROM "bbOrder" as o inner join "bbPay" as p on ' +
		'o."orderID" = p."orderID" inner join "bbUser" as u on o."userID" = u."userID" inner join "bbContain" ' +

		'as c on o."orderID" = c."orderID" inner join "bbProduct" as r on c."productID" = r."productID" inner join "bbBidProduct" as bp on r."productID" = bp."productID" inner join ' +

		'"bbSell" as s on r."productID" = s."productID" WHERE s."userID"= ' + id, function(err, result){
                if (err) throw err;
        /*
        for (i = 0; i<rows.length; i++){
                        console.log('The solution is: ', rows[i]);
                }*/
        
        
        
        var len =result.rows.length;
        if (len == 0){
                res.statusCode = 404;
                res.send("Order not found.");
        }
        else {        
                  var response = {"order" : result.rows};
                //client.end();
                  res.json(response);
          }
 });
  });
});
// REST Operation - HTTP PUT to updated a car based on its id
app.put('/DB-Project/bids/:id', function(req, res) {
        var id = req.params.id;
                console.log("PUT address: " + id);

        if ((id < 0) || (id >= addressinfoNextId)){
                // not found
                res.statusCode = 404;
                res.send("Address not found.");
        }
        else if(!req.body.hasOwnProperty('addressLine1') || !req.body.hasOwnProperty('addressLine2') || !req.body.hasOwnProperty('city') || !req.body.hasOwnProperty('state') 
                        || !req.body.hasOwnProperty('country') || !req.body.hasOwnProperty('zipcode') || !req.body.hasOwnProperty('isBilling')) {
                            res.statusCode = 400;
                            return res.send('Error: Missing fields for address.');
                          }
        else {
                var target = -1;
                for (var i=0; i < addressinfoList.length; ++i){
                        if (addressinfoList[i].id == id){
                                target = i;
                                break;        
                        }
                }
                if (target == -1){
                        res.statusCode = 404;
                        res.send("Address not found.");                        
                }        
                else {
                        var theAddress= addressinfoList[target];
                        theAddress.addressLine1 = req.body.addressLine1;
                        theAddress.addressLine2 = req.body.addressLine2;
                        theAddress.city = req.body.city;
                        theAddress.state = req.body.state;
                        theAddress.country = req.body.country;
                        theAddress.zipcode = req.body.zipcode;
                        theAddress.isBilling = req.body.isBilling;
                        var response = {"addressinfo" : theAddress};
                          res.json(response);                
                  }
        }
});

//REST Operation - HTTP POST to add a new a car
app.post('/DB-Project/sells', function(req, res) {
        console.log("POST");

          if(!req.body.hasOwnProperty('addressLine1') || !req.body.hasOwnProperty('addressLine2') || !req.body.hasOwnProperty('city') || !req.body.hasOwnProperty('state') 
                        || !req.body.hasOwnProperty('country') || !req.body.hasOwnProperty('zipcode') || !req.body.hasOwnProperty('isBilling')) {
            res.statusCode = 400;
            return res.send('Error: Missing fields for address.');
          }

          var newAddress = new Address(req.body.addressLine1, req.body.addressLine2, req.body.city, req.body.state, req.body.country, req.body.zipcode, req.body.isBilling);
          console.log("New Address: " + JSON.stringify(newAddress));
          newAddress.id = addressinfoNextId++;
          addressinfoList.push(newAddress);
          res.json(true);
});
