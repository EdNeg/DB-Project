// Express is the web framework 
var express = require('express');
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
	new Product("Ipad", "Apple", "APPL2455", "Red Cover, 32GB, Black", "10 X 4", "199", "300", "../DB-Project/css/img/ipad-normal.jpg"),
	new Product("Air", "Nike", "NK31", "Green Laces, Blue, Size 10 1/2", "10 X 4", "75", "125", "../DB-Project/css/img/nike.jpg"),
	new Product("Polo", "Nautica", "NAU421", "White with blue stripes, Medium", "10 X 4", "20", "50", "../DB-Project/css/img/naut.jpg"),
	new Product("Ultrabook", "Samsung", "SMSG2775", "Gray, 128GB SSD, 13.6 Screen", "13.6 X 7", "399", "500", "../DB-Project/css/img/samsung.jpg")
);
 var productNextId = 0;
 
for (var i=0; i < productList.length;++i){
	productList[i].id = productNextId++;
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
app.get('/DB-Project/products', function(req, res) {
	console.log("GET");
	var response = {"products" : productList};
  	res.json(response);
});

// REST Operation - HTTP GET sorted by name
app.get('/DB-Project/products', function(req, res) {
  req.collection.find({},{limit:10, sort: [['name',-1]]}).toArray(function(e, results){
    if (e) return next(e);
    res.send(results);
  });
});

// REST Operation - HTTP GET to read a product based on its id
app.get('/DB-Project/products/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET product: " + id);

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
	}
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
	new Category("Books", "../DB-Project/css/glyphish-icons/96-book.png"),
	new Category("Computers", "../DB-Project/css/glyphish-icons/107-widescreen.png"),
	new Category("Clothing", "../DB-Project/css/glyphish-icons/67-tshirt.png"),
	new Category("Electronics" , "../DB-Project/css/glyphish-icons/31-ipod.png"),
	new Category("Shoes", "../DB-Project/css/glyphish-icons/44-shoebox.png"),
	new Category("Sports", "../DB-Project/css/glyphish-icons/129-golf.png")


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
	console.log("GET");
	var response = {"categories" : categoryList};
  	res.json(response);
});


// REST Operation - HTTP GET to read a category based on its id
app.get('/DB-Project/categories/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET category: " + id);

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
			var response = {"category" : categoryList[target]};
  			res.json(response);	
  		}	
	}
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
			theCategory.subCats = req.body.subCats;
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

//--------------------------------------SubCategory---------------------------------------------------------------//
	
	
var subCat = require("./appjs/subCat.js");
var SubCat = subCat.SubCat;


var subCatList = new Array(
	new SubCat("Children", "../DB-Project/css/glyphish-icons/96-book.png"),
	new SubCat("Fiction", "../DB-Project/css/glyphish-icons/107-widescreen.png"),
	new SubCat("Technology", "../DB-Project/css/glyphish-icons/67-tshirt.png"),
	new SubCat("Business" , "../DB-Project/css/glyphish-icons/31-ipod.png")


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

// REST Operation - HTTP GET to read all subCats
app.get('/DB-Project/subCats', function(req, res) {
	console.log("GET");
	var response = {"subCats" : subCatList};
  	res.json(response);
});


// REST Operation - HTTP GET to read a subCat based on its id
app.get('/DB-Project/subCats/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET subCat: " + id);

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
			var response = {"subCat" : subCatList[target]};
  			res.json(response);	
  		}	
	}
});

// REST Operation - HTTP PUT to updated a subCat based on its id
app.put('/DB-Project/subCats/:id', function(req, res) {
	var id = req.params.id;
		console.log("PUT subCat: " + id);

	if ((id < 0) || (id >= subCatNextId)){
		// not found
		res.statusCode = 404;
		res.send("SubCat not found.");
	}
	else if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('iconSrc')){			//<-----------------------------------------------------------------------!!!!!!!!
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
			theSubCat.iconSrc = req.body.iconSrc;
			theSubCat.subCats = req.body.subCats;
			var response = {"subCat" : theSubCat};
  			res.json(response);		
  		}
	}
});

// REST Operation - HTTP DELETE to delete a subCat based on its id
app.del('/DB-Project/subCats/:id', function(req, res) {
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
app.post('/DB-Project/subCats', function(req, res) {
	console.log("POST");

  	if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('iconSrc')) {			//<--------------------------------------------------------------------!!!!!!
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for subCat.');
  	}

  	var newSubCat = new SubCat(req.body.name);
  	console.log("New SubCat: " + JSON.stringify(newSubCat));
  	newSubCat.id = subCatNextId++;
  	subCatList.push(newSubCat);
  	res.json(true);
});
