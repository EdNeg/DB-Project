// Express is the web framework 
var express = require('express');
var mysql = require('mysql');

var app = express();
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
  app.use(allowCrossDomain);
});


app.use(express.bodyParser());

var product = require("./appjs/product.js");
var Product = product.Product;

var productList = new Array(
	new Product("Ipad", "Apple", "APPL2455", "Red Cover, 32GB, Black", "10 X 4", "199", "300", "../DB-Project/css/img/ipad-normal.jpg", "Computers", "Tablets"), //REMEMBER TO CHANGE BACK TO COMPUTERS, TABLETS
	new Product("Air", "Nike", "NK31", "Green Laces, Blue, Size 10 1/2", "10 X 4", "75", "125", "../DB-Project/css/img/nike.jpg", "Shoes", "Men"),		//REMEMBER TO CHANGE BACK TO SHOES, MEN
	new Product("Polo", "Nautica", "NAU421", "White with blue stripes, Medium", "10 X 4", "20", "50", "../DB-Project/css/img/naut.jpg", "Clothing", "Men", "Shirt"),
	new Product("Ultrabook", "Samsung", "SMSG2775", "Gray, 128GB SSD, 13.6 Screen", "13.6 X 7", "399", "500", "../DB-Project/css/img/samsung.jpg", "Computers", "Laptops")
);
 var productNextId = 0;
 
for (var i=0; i < productList.length;++i){
	productList[i].id = productNextId++;
}

// Database connection string: pg://<username>:<password>@host:port/dbname 
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'ADMIN',
	port : 3306,
	database : 'boricuabaydb'

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
app.get('/DB-Project/products', function(req, res) {
	console.log("GET PRODUCTS");
	
	connection.query("Select * from bbProduct as p " + 
	"inner join bbBidProduct as b on b.productID = p.productID;", function(err, rows, result) {
  if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The result is: ', rows[i]);
	}
  var response = {"products" : rows};
  res.json(response);
  
});
});

app.get('/DB-Project/productsName', function(req, res) {
	console.log("GET PRODUCTS ORDERED BY NAME");
	
	connection.query("Select * from bbProduct as p " + 
	"inner join bbBidProduct as b on b.productID = p.productID order by p.productName;", function(err, rows, result) {
  if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The result is: ', rows[i]);
	}
  var response = {"productsName" : rows};
  res.json(response);
  
});
});

app.get('/DB-Project/productsBrand', function(req, res) {
	console.log("GET PRODUCTS ORDERED BY BRAND");
	
	connection.query("Select * from bbProduct as p " + 
	"inner join bbBidProduct as b on b.productID = p.productID order by p.brand;", function(err, rows, result) {
  if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The result is: ', rows[i]);
	}
  var response = {"productsBrand" : rows};
  res.json(response);
  
});
});

app.get('/DB-Project/productsPrice', function(req, res) {
	console.log("GET PRODUCTS ORDERED BY PRICE");
	
	connection.query("Select * from bbProduct as p " + 
	"inner join bbBidProduct as b on b.productID = p.productID order by b.bidStartingPrice;", function(err, rows, result) {
  if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The result is: ', rows[i]);
	}
  var response = {"productsPrice" : rows};
  res.json(response);
  
});
});



// REST Operation - HTTP GET to read a product based on its id
app.get('/DB-Project/products/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET product: " + id);

var query = connection.query("Select * from bbProduct as p inner join bbBidProduct " + 
							"as b on b.productID = p.productID inner join bbSubCategory " + 
							"as s inner join bbCategory " + 
							"as c on s.categoryID =c.categoryID where p.productID = " + id, function(err, rows, result){
		if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The solution is: ', rows[i]);
	}
	
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Product not found.");
	}
	else {	
  		var response = {"product" : rows[0]};
		//connection.end();
  		res.json(response);
  	}
 });	

	/*
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
				var response = {"product" : productList[target]};
				  res.json(response);	
			  }	
		}*/
	
});

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
});

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
app.post('/DB-Project/products', function(req, res) {
	console.log("POST");

  	if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('brand')
  	|| !req.body.hasOwnProperty('model') || !req.body.hasOwnProperty('bidPrice') || !req.body.hasOwnProperty('description') || !req.body.hasOwnProperty('insstPrice') 
  	|| !req.body.hasOwnProperty('dimensions') || !req.body.hasOwnProperty('imgSrc')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for product.');
  	}

  	var newProduct = new Product(req.body.name, req.body.brand, req.body.model, req.body.description, req.body.dimensions, req.body.bidPrice, req.body.instPrice, req.body.imgSrc);
  	console.log("New Product: " + JSON.stringify(newProduct));
  	newProduct.id = productNextId++;
  	productList.push(newProduct);
  	res.json(true);
});


// Server starts running when listen is called.
app.listen(process.env.PORT || 3412);
console.log("server listening");




//--------------------------------------Category---------------------------------------------------------------//
	
	
var category = require("./appjs/category.js");
var Category = category.Category;


var categoryList = new Array(
	new Category("Books", "../DB-Project/css/glyphish-icons/book.png"),
	new Category("Computers", "../DB-Project/css/glyphish-icons/widescreen.png"),
	new Category("Clothing", "../DB-Project/css/glyphish-icons/tshirt.png"),
	new Category("Electronics" , "../DB-Project/css/glyphish-icons/ipod.png"),
	new Category("Shoes", "../DB-Project/css/glyphish-icons/shoebox.png"),
	new Category("Sports", "../DB-Project/css/glyphish-icons/golf.png")


);
 var categoryNextId = 0;
 
for (var i=0; i < categoryList.length;++i){
	categoryList[i].id = categoryNextId++;
}




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
	connection.query('SELECT * FROM bbCategory;', function(err, rows, result) {
  if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The result is: ', rows[i]);
	}
  var response = {"categories" : rows};
  res.json(response);
});
});


// REST Operation - HTTP GET to read a category based on its id
app.get('/DB-Project/categories/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET category: " + id);

	connection.query("SELECT * FROM bbCategory WHERE categoryID = " + id, function(err, rows, result){
		if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The solution is: ', rows[i]);
	}
	
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Category not found.");
	}
	else {	
  		var response = {"category" : rows[0]};
		//connection.end();
  		res.json(response);
  	}
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
	
	
var subCat = require("./appjs/subCat.js");
var SubCat = subCat.SubCat;


var subCatList = new Array(
	new SubCat("Children"),
	new SubCat("Fiction"),
	new SubCat("Technology"),
	new SubCat("Business")


);


 var subCatNextId = 0;
 
for (var i=0; i < subCatList.length;++i){
	subCatList[i].id = subCatNextId++;
}




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
	connection.query("Select * from bbSubCategory where categoryID = "+1+";", function(err, rows, result) {
  if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The result is: ', rows[i]);
	}
  var response = {"books" : rows};
  res.json(response);
});
});


// REST Operation - HTTP GET to read a subCat based on its id
app.get('/DB-Project/Books/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET subCat: " + id);

	var query = connection.query("SELECT * FROM bbSubCategory WHERE subCategoryID = " + id, function(err, rows, result){
		if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The solution is: ', rows[i]);
	}
	
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Category not found.");
	}
	else {	
  		var response = {"book" : rows[0]};
		//connection.end();
  		res.json(response);
  	}
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
	
	
var electCat = require("./appjs/subCat.js");
var ElectCat = electCat.ElectCat;


var electCatList = new Array(
	new SubCat("TV"),
	new SubCat("Audio"),
	new SubCat("Phones"),
	new SubCat("Cameras"),
	new SubCat("Video")
	
);


 var electCatNextId = 0;
 
for (var i=0; i < electCatList.length;++i){
	electCatList[i].id = electCatNextId++;
}




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
	connection.query("Select * from bbSubCategory where categoryID = "+2+";", function(err, rows, result) {
  if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The result is: ', rows[i]);
	}
  var response = {"electronics" : rows};
  res.json(response);
});
});


// REST Operation - HTTP GET to read a subCat based on its id
app.get('/DB-Project/Electronics/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET subCat: " + id);

	connection.query("SELECT * FROM bbSubCategory WHERE subCategoryID = " + id, function(err, rows, result){
		if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The solution is: ', rows[i]);
	}
	
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Category not found.");
	}
	else {	
  		var response = {"electronic" : rows[0]};
		//connection.end();
  		res.json(response);
  	}
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
	
	
var compCat = require("./appjs/subCat.js");
var CompCat = compCat.CompCat;


var compCatList = new Array(
	new SubCat("Laptops"),
	new SubCat("Desktops"),
	new SubCat("Tablets"),
	new SubCat("Printers")
);


 var compCatNextId = 0;
 
for (var i=0; i < compCatList.length;++i){
	compCatList[i].id = compCatNextId++;
}




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
	connection.query("Select * from bbSubCategory where categoryID = "+3+";", function(err, rows, result) {
  if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The result is: ', rows[i]);
	}
  var response = {"computers" : rows};
  res.json(response);
});
});


// REST Operation - HTTP GET to read a compCat based on its id
app.get('/DB-Project/Computers/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET compCat: " + id);

	connection.query("SELECT * FROM bbSubCategory WHERE subCategoryID = " + id, function(err, rows, result){
		if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The solution is: ', rows[i]);
	}
	
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Category not found.");
	}
	else {	
  		var response = {"computer" : rows[0]};
		//connection.end();
  		res.json(response);
  	}
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
	
	
var clothCat = require("./appjs/subCat.js");
var ClothCat = clothCat.ClothCat;


var clothCatList = new Array(
	new SubCat("Children"),
	new SubCat("Men"),
	new SubCat("Women")

);


 var clothCatNextId = 0;
 
for (var i=0; i < clothCatList.length;++i){
	clothCatList[i].id = clothCatNextId++;
}




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
	connection.query("Select * from bbSubCategory where categoryID = "+4+";", function(err, rows, result) {
  if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The result is: ', rows[i]);
	}
  var response = {"clothing" : rows};
  res.json(response);
});
});


// REST Operation - HTTP GET to read a clothCat based on its id
app.get('/DB-Project/Clothing/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET clothCat: " + id);

	connection.query("SELECT * FROM bbSubCategory WHERE subCategoryID = " + id, function(err, rows, result){
		if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The solution is: ', rows[i]);
	}
	
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Category not found.");
	}
	else {	
  		var response = {"clothing" : rows[0]};
		//connection.end();
  		res.json(response);
  	}
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
	
	
var shoeCat = require("./appjs/subCat.js");
var ShoeCat = shoeCat.ShoeCat;


var shoeCatList = new Array(
	new SubCat("Children"),
	new SubCat("Women"),
	new SubCat("Men")
	
	
);


 var shoeCatNextId = 0;
 
for (var i=0; i < shoeCatList.length;++i){
	shoeCatList[i].id = shoeCatNextId++;
}




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
	connection.query("Select * from bbSubCategory where categoryID = "+5+";", function(err, rows, result) {
  if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The result is: ', rows[i]);
	}
  var response = {"shoes" : rows};
  res.json(response);
});
});


// REST Operation - HTTP GET to read a shoeCat based on its id
app.get('/DB-Project/Shoes/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET shoeCat: " + id);

	connection.query("SELECT * FROM bbSubCategory WHERE subCategoryID = " + id, function(err, rows, result){
		if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The solution is: ', rows[i]);
	}
	
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Category not found.");
	}
	else {	
  		var response = {"shoe" : rows[0]};
		//connection.end();
  		res.json(response);
  	}
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
	
	
var sportCat = require("./appjs/subCat.js");
var SportCat = sportCat.SportCat;


var sportCatList = new Array(
	new SubCat("Bicycles"),
	new SubCat("Fishing"),
	new SubCat("Baseball"),
	new SubCat("Golf"),
	new SubCat("Basketball")
	
	
);


 var sportCatNextId = 0;
 
for (var i=0; i < sportCatList.length;++i){
	sportCatList[i].id = sportCatNextId++;
}




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
	connection.query("Select * from bbSubCategory where categoryID = "+6+";", function(err, rows, result) {
  if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The result is: ', rows[i]);
	}
  var response = {"sports" : rows};
  res.json(response);
});
});


// REST Operation - HTTP GET to read a sportCat based on its id
app.get('/DB-Project/Sports/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET sportCat: " + id);

	connection.query("SELECT * FROM bbSubCategory WHERE subCategoryID = " + id, function(err, rows, result){
		if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The solution is: ', rows[i]);
	}
	
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Category not found.");
	}
	else {	
  		var response = {"sport" : rows[0]};
		//connection.end();
  		res.json(response);
  	}
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

var account = require("./appjs/account.js");
var Account = account.Account;

// Gets the user Information
app.get('/DB-Project/accounts/:ids', function(req, res) {
	var ids = req.params.ids;
		console.log("GET account: " + ids);

var query = connection.query("SELECT * FROM bbUser NATURAL JOIN bbAddress WHERE userID = '" + ids  + "'", function(err, rows, result){	
	if (err) throw err;
	
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {	
  		var response = {"account" : rows[0]};
		//connection.end();
  		res.json(response);
  	}
 });
  });


//Checks Login
app.get('/DB-Project/accounts/:id/:idp', function(req, res) {
	var id = req.params.id;
	var idp = req.params.idp;
		console.log("GET account: " + id);

var query = connection.query("SELECT userID FROM bbUser WHERE userNickname = '" + id  + "'" + " AND " +
		"password = '" + idp + "'", function(err, rows, result){
		if (err) throw err;
	
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {	
  		var response = {"account" : rows[0]};
		//connection.end();
  		res.json(response);
  	}
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

//REST Operation - HTTP POST to add a new a car
app.post('/DB-Project/accounts', function(req, res) {
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


//-----------------------Administrator------------------------------------------------------

var accounta = require("./appjs/account.js");
var Accounta = accounta.Accounta;

var accountaList = new Array(
	new Account("Lara Croft", "LC1", "ivc", "Grey House of Doom, Brazil", "Grey House of Doom, Brazil", "00000023445")
);
 var accountaNextId = 0;
 
for (var i=0; i < accountaList.length;++i){
	accountaList[i].id = accountaNextId++;
}
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
	
	connection.query('SELECT * FROM bbAdmin', function(err, rows, result) {
  if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The result is: ', rows[i]);
	}
  var response = {"accountas" : rows};
  res.json(response);
});
});


// REST Operation - HTTP GET to read a product based on its id
app.get('/DB-Project/accountas/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET accounta: " + id);

var query = connection.query("SELECT * FROM bbAdmin WHERE userID = " + id, function(err, rows, result){
		if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The solution is: ', rows[i]);
	}
	
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {	
  		var response = {"accounta" : rows[0]};
		//connection.end();
  		res.json(response);
  	}
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

var creditcard = require("./appjs/creditcard.js");
var Creditcard = creditcard.Creditcard;

//Gets the creditcard info
app.get('/DB-Project/creditcards/:ids', function(req, res) {
	var ids = req.params.ids;
		console.log("GET creditcard: " + ids);

var query = connection.query("SELECT * from bbCreditCard as c " +
		"inner join bbAddress as a on a.addressID = c.addressID " +
		"inner join bbUser as u on u.creditCardID = c.creditCardID " +
		"where u.userID = '" + ids  + "'", function(err, rows, result){
	for (i = 0; i<rows.length; i++){
        console.log('The solution is: ', rows[i]);
}	
	if (err) throw err;
	
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {	
  		var response = {"creditcard" : rows[0]};
		//connection.end();
  		res.json(response);
  	}
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


var addressinfo = require("./appjs/addressinfo.js");
var Addressinfo = addressinfo.Addressinfo;

var addressinfoList = new Array(
        new Addressinfo("Urb. Villas del Palmar Sur", "Calle Palma de Sombrero #2", 
                        "Carolina", "Puerto Rico", "Estados Unidos", "00979", "0"),
        new Addressinfo("Urb. Villas del Palmar Oeste", "Calle Palma Real #3", 
                                        "Ponce", "PR", "US", "00679", "1")
                        
);
 var addressinfoNextId = 0;
 
for (var i=0; i < addressinfoList.length;++i){
        addressinfoList[i].id = addressinfoNextId++;
}
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

var query = connection.query("SELECT * FROM bbAddress AS a " +
		"INNER JOIN bbUser AS u on u.addressID = a.addressID  " +
		"WHERE u.addressID = " + id, function(err, rows, result){
                if (err) throw err;
        for (i = 0; i<rows.length; i++){
                console.log('The solution is: ', rows[i]);
        }
        
        
        var len = rows.length;
        if (len == 0){
                res.statusCode = 404;
                res.send("Address not found.");
        }
        else {        
                  var response = {"addressinfo" : rows[0]};
                //connection.end();
                  res.json(response);
          }
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


var cart = require("./appjs/cart.js");
var Cart = cart.Cart;


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
	
	connection.query('SELECT * FROM bbAddtoCart natural join bbProduct', function(err, rows, result) {
  	if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The result is: ', rows[i]);
	}
  var response = {"carts" : rows};
  res.json(response);
});
});

// REST Operation - HTTP GET to read a car based on its id
app.get('/DB-Project/carts/:id', function(req, res) {
        var id = req.params.id;
                console.log("GET carts: " + id);

var query = connection.query("SELECT * from bbProduct as p " +
		"inner join bbBidProduct as b on b.productID = p.productID " +
		"inner join bbAddToCart as a on a.productID = p.productID " +
		"where a.userID = " + id, function(err, rows, result){
                if (err) throw err;
        for (i = 0; i<rows.length; i++){
                console.log('The solution is: ', rows[i]);
        }
        
        
        var len = rows.length;
        if (len == 0){
                res.statusCode = 404;
                res.send("Cart not found.");
        }
        else {        
                  var response = {"cart" : rows[0]};
                //connection.end();
                  res.json(response);
          }
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


var sell = require("./appjs/sell.js");
var Sell = sell.Sell;


// REST Operation - HTTP GET to read all cars
app.get('/DB-Project/sells/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET sell: " + id);

var query = connection.query("SELECT * FROM bbSell natural join bbProduct WHERE userID = '" + id + "'", function(err, rows, result){
		if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The solution is: ', rows[i]);
	}
	
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {	
  		var response = {"sell" : rows[0]};
		//connection.end();
  		res.json(response);
  	}
 });
  });

// REST Operation - HTTP GET to read a car based on its id
app.get('/DB-Project/sells/:id', function(req, res) {
        var id = req.params.id;
                console.log("GET sells: " + id);

var query = connection.query("SELECT * from bbSell natural join bbUser " +
		"natural join bbProduct " +
		"where userID = " + id, function(err, rows, result){
                if (err) throw err;
        for (i = 0; i<rows.length; i++){
                console.log('The solution is: ', rows[i]);
        }
        
        
        var len = rows.length;
        if (len == 0){
                res.statusCode = 404;
                res.send("Sell not found.");
        }
        else {        
                  var response = {"sell" : rows[0]};
                //connection.end();
                  res.json(response);
          }
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


var bid = require("./appjs/bid.js");
var Bid = bid.Bid;


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
	
	connection.query('SELECT * from bbBidFor natural join bbProduct', function(err, rows, result) {
  	if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The result is: ', rows[i]);
	}
  var response = {"bids" : rows};
  res.json(response);
});
});

// REST Operation - HTTP GET to read a car based on its id
app.get('/DB-Project/bids/:id', function(req, res) {
        var id = req.params.id;
                console.log("GET bids: " + id);

var query = connection.query("SELECT * from bbBidFor natural join bbUser " +
		"natural join bbProduct " +
		"where userID = " + id, function(err, rows, result){
                if (err) throw err;
        for (i = 0; i<rows.length; i++){
                console.log('The solution is: ', rows[i]);
        }
        
        
        var len = rows.length;
        if (len == 0){
                res.statusCode = 404;
                res.send("Bid not found.");
        }
        else {        
                  var response = {"bid" : rows[0]};
                //connection.end();
                  res.json(response);
          }
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
