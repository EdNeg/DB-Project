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
	console.log("GET PRODUCTS");
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
  	|| !req.body.hasOwnProperty('model') || !req.body.hasOwnProperty('description') || !req.body.hasOwnProperty('dimensions') || !req.body.hasOwnProperty('bidPrice') 
  	|| !req.body.hasOwnProperty('instPrice') || !req.body.hasOwnProperty('imgSrc')) {
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
	new Category("Clothing", "../DB-Project/css/icons/tshirt.png"),
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
	console.log("GET ALL CATEGORIES");
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
	var response = {"Books" : subCatList};
  	res.json(response);
});


// REST Operation - HTTP GET to read a subCat based on its id
app.get('/DB-Project/Books/:id', function(req, res) {
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

//-----------------------Regular User------------------------------------------------------

var account = require("./appjs/account.js");
var Account = account.Account;

var accountList = new Array(
	new Account("Frances", "Acevedo", "frenchie916", "ivc", "frances.acevedo2@upr.edu")
);
 var accountNextId = 0;
 
for (var i=0; i < accountList.length;++i){
	accountList[i].id = accountNextId++;
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
app.get('/DB-Project/accounts', function(req, res) {
	console.log("GET Account");
	//var tom = {"make" : "Ford", "model" : "Escape", "year" : "2013", "description" : "V4 engine, 30mpg, Gray", "price" : "$18,000"};
	//var tom = new Car("Ford", "Escape", "2013", "V4 engine, 30mpg, Gray", "$18,000");
	//console.log("tom: " + JSON.stringify(tom));
	var response = {"accounts" : accountList};
  	res.json(response);
});

// REST Operation - HTTP GET to read a car based on its id
app.get('/DB-Project/accounts/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET account: " + id);

	if ((id < 0) || (id >= accountNextId)){
		// not found
		res.statusCode = 404;
		res.send("Account not found.");
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
			var response = {"account" : accountList[target]};
  			res.json(response);	
  		}	
	}
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
	else if(!req.body.hasOwnProperty('firstname') || !req.body.hasOwnProperty('lastname') || !req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password') 
			|| !req.body.hasOwnProperty('email')) {
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
			theAccount.firstname = req.body.firstname;
			theAccount.lastname = req.body.lastname;
			theAccount.username = req.body.username;
			theAccount.password = req.body.password;
			theAccount.email = req.body.email;
			var response = {"account" : theAccount};
  			res.json(response);		
  		}
	}
});

//REST Operation - HTTP POST to add a new a car
app.post('/DB-Project/accounts', function(req, res) {
	console.log("POST");

  	if(!req.body.hasOwnProperty('firstname') || !req.body.hasOwnProperty('lastname') || !req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password') 
			|| !req.body.hasOwnProperty('email')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for account.');
  	}

  	var newAccount = new Account(req.body.firstname, req.body.lastname, req.body.username, req.body.password, req.body.email);
  	console.log("New Account: " + JSON.stringify(newAccount));
  	newAccount.id = accountNextId++;
  	accountList.push(newAccount);
  	res.json(true);
});

//--------------------------------------Address-----------------------------------------------------------------//

var addr = require("./appjs/addr.js");
var Addr = addr.Addr;

var addrList = new Array(
	new Addr("Urb.Villas del Palmar Sur", "Calle Palma de Sombrero #2", 
			"Carolina", "Puerto Rico", "United States", "00979", "1"),
			("Urb.Villas del Palmar Sur", "Calle Palma de Sombrero #2", 
			"Carolina", "Puerto Rico", "United States", "00979", "0")
			
);
 var addrNextId = 0;
 
for (var i=0; i < addrList.length;++i){
	addrList[i].id = addrNextId++;
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
app.get('/DB-Project/addrs', function(req, res) {
	console.log("GET Address");
	
	var response = {"addrs" : addrList};
  	res.json(response);
});

// REST Operation - HTTP GET to read a car based on its id
app.get('/DB-Project/addrs/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET address: " + id);

	if ((id < 0) || (id >= addrNextId)){
		// not found
		res.statusCode = 404;
		res.send("Address not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < addrList.length; ++i){
			if (addrList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Address not found.");
		}
		else {
			var response = {"addrs" : addrList[target]};
  			res.json(response);	
  		}	
	}
});

// REST Operation - HTTP PUT to updated a car based on its id
app.put('/DB-Project/addrs/:id', function(req, res) {
	var id = req.params.id;
		console.log("PUT address: " + id);

	if ((id < 0) || (id >= addrNextId)){
		// not found
		res.statusCode = 404;
		res.send("Address not found.");
	}
	else if(!req.body.hasOwnProperty('addressLine1') || !req.body.hasOwnProperty('addressLine2') || !req.body.hasOwnProperty('city') || !req.body.hasOwnProperty('state')
		  	|| !req.body.hasOwnProperty('country') || !req.body.hasOwnProperty('zipcode')) {
		    	res.statusCode = 400;
		    	return res.send('Error: Missing fields for address.');
		  	}
	else {
		var target = -1;
		for (var i=0; i < addrList.length; ++i){
			if (addrList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Address not found.");			
		}	
		else {
			var theAddress = addrList[target];
			theAddress.addressLine1 = req.body.addressLine1;
			theAddress.addressLine2 = req.body.addressLine2;
			theAddress.city = req.body.city;
			theAddress.state = req.body.state;
			theAddress.country = req.body.country;
			theAddress.zipcode = req.body.zipcode;
			var response = {"addrs" : theAddress};
  			res.json(response);		
  		}
	}
});

//REST Operation - HTTP POST to add a new a car
app.post('/DB-Project/addrs', function(req, res) {
	console.log("POST");

  	if(!req.body.hasOwnProperty('addressLine1') || !req.body.hasOwnProperty('addressLine2') || !req.body.hasOwnProperty('city') || !req.body.hasOwnProperty('state')
		  	|| !req.body.hasOwnProperty('country') || !req.body.hasOwnProperty('zipcode')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for address.');
  	}

  	var newAddress = new Addr(req.body.addressLine1, req.body.addressLine2, req.body.city, req.body.state, req.body.country, req.body.zipcode);
  	console.log("New Address: " + JSON.stringify(newAddress));
  	newAddress.id = addrNextId++;
  	addrList.push(newAddress);
  	res.json(true);
});

//--------------------------------------Credit Card--------------------------------------------------------------------//

var creditcard = require("./appjs/creditcard.js");
var Creditcard = creditcard.Creditcard;

var creditcardList = new Array(
	new Creditcard("123456789", "Frances Acevedo", "0", "1234", "09/2018")
			
);

 var creditcardNextId = 0;
 
for (var i=0; i < creditcardList.length;++i){
	creditcardList[i].id = creditcardNextId++;
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
app.get('/DB-Project/creditcards', function(req, res) {
	console.log("GET Creditcard");

	var response = {"creditcards" : creditcardList};
  	res.json(response);
});

// REST Operation - HTTP GET to read a car based on its id
app.get('/DB-Project/creditcards/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET creditcard: " + id);

	if ((id < 0) || (id >= creditcardNextId)){
		// not found
		res.statusCode = 404;
		res.send("Creditcard not found.");
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
			var response = {"creditcard" : creditcardList[target]};
  			res.json(response);	
  		}	
	}
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
	else if(!req.body.hasOwnProperty('number') || !req.body.hasOwnProperty('ownerName') || !req.body.hasOwnProperty('isShipping') || !req.body.hasOwnProperty('securityCode')
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
			theCreditcard.isShipping = req.body.isShipping;
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
	var response = {"Computers" : compCatList};
  	res.json(response);
});


// REST Operation - HTTP GET to read a compCat based on its id
app.get('/DB-Project/Computers/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET compCat: " + id);

	if ((id < 0) || (id >= compCatNextId)){
		// not found
		res.statusCode = 404;
		res.send("CompCat not found.");
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
			res.send("CompCat not found.");
		}
		else {
			var response = {"compCat" : compCatList[target]};
  			res.json(response);	
  		}	
	}
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
	var response = {"Clothing" : clothCatList};
  	res.json(response);
});


// REST Operation - HTTP GET to read a clothCat based on its id
app.get('/DB-Project/Clothing/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET clothCat: " + id);

	if ((id < 0) || (id >= clothCatNextId)){
		// not found
		res.statusCode = 404;
		res.send("ClothCat not found.");
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
			var response = {"clothCat" : clothCatList[target]};
  			res.json(response);	
  		}	
	}
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
	var response = {"Electronics" : electCatList};
  	res.json(response);
});


// REST Operation - HTTP GET to read a electCat based on its id
app.get('/DB-Project/Electronics/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET electCat: " + id);

	if ((id < 0) || (id >= electCatNextId)){
		// not found
		res.statusCode = 404;
		res.send("ElectCat not found.");
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
			res.send("ElectCat not found.");
		}
		else {
			var response = {"electCat" : electCatList[target]};
  			res.json(response);	
  		}	
	}
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
	var response = {"Shoes" : shoeCatList};
  	res.json(response);
});


// REST Operation - HTTP GET to read a shoeCat based on its id
app.get('/DB-Project/Shoes/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET shoeCat: " + id);

	if ((id < 0) || (id >= shoeCatNextId)){
		// not found
		res.statusCode = 404;
		res.send("ShoeCat not found.");
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
			res.send("ShoeCat not found.");
		}
		else {
			var response = {"shoeCat" : shoeCatList[target]};
  			res.json(response);	
  		}	
	}
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
	var response = {"Sports" : sportCatList};
  	res.json(response);
});


// REST Operation - HTTP GET to read a sportCat based on its id
app.get('/DB-Project/Sports/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET sportCat: " + id);

	if ((id < 0) || (id >= sportCatNextId)){
		// not found
		res.statusCode = 404;
		res.send("SportCat not found.");
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
			res.send("SportCat not found.");
		}
		else {
			var response = {"sportCat" : sportCatList[target]};
  			res.json(response);	
  		}	
	}
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
