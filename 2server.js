// Express is the web framework 
var express = require('express');
var mysql = require('mysql');
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


var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'ADMIN',
	port : 3306,
	database : 'boricuabaydb'


});



// Postgres Database connection string: pg://<username>:<password>@host:port/dbname 

//var conString = "pg://rgogqzpjvbmvuq:8AfsdO0anC3CJQz0BfD67e7fbS@ec2-54-225-103-9.compute-1.amazonaws.com:5432/d3m3opu022njhi";

/*
var connection = new pg.connection(conString);
connection.connect();*/


/*
connection.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }*/
//Test connection within console
/*
pg.connect(conString, function(err, connection, done) {
  connection.query('SELECT * FROM "bbCategory"', function(err, rows, result ) {
    done();
    if(err) return console.error(err);
    console.log(result.rows);
  });
});*/


/*
var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/boricuabay'
  , connection
  , query;

connection = new pg.connection(connectionString);
connection.connect();*/

/*
// Let heroku app know where to start
app.get('/', function(req, res) {
  //res.send('Hello Worldy!');
  res.sendfile(__dirname + '/index.html');
  
});*/



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
	
	connection.query("Select * from bbProduct as p " + 
	"inner join bbBidProduct as b on b.productID = p.productID where productName like '%" + search + "%' order by p.productName;", function(err, rows, result) {

  if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The result is: ', rows[i]);
		}*/
	
  var response = {"productsName" : rows};
  res.json(response);
  
});
});

//PRODUCTS ORDERED BY BRAND
app.get('/DB-Project/productsBrand', function(req, res) {
	console.log("GET PRODUCTS ORDERED BY BRAND");

	
	connection.query("Select * from bbProduct as p " + 
	"inner join bbBidProduct as b on b.productID = p.productID where productName like '%" + search + "%' order by p.brand;", function(err, rows, result) {

  if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The result is: ', rows[i]);
		}*/
	
  var response = {"productsBrand" : rows};
  res.json(response);
  
});
});

//PRODUCTS ORDERED BY PRICE
app.get('/DB-Project/productsPrice', function(req, res) {
	console.log("GET PRODUCTS ORDERED BY PRICE");

	
	connection.query("Select * from bbProduct as p " + 
	"inner join bbBidProduct as b on b.productID = p.productID where productName like '%" + search + "%' order by b.bidStartingPrice;", function(err, rows, result) {

  if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The result is: ', rows[i]);
		}*/
	
  var response = {"productsPrice" : rows};
  res.json(response);
  
});
});


// REST Operation - HTTP GET to read a product based on its id
app.get('/DB-Project/products/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET product: " + id);


var query = connection.query("Select * from bbProduct as p natural join bbBidProduct " + 
							"natural join bbTag " +
							"natural join bbSubCategory " + 
							"natural join bbCategory " + 
							"natural join bbSell " +
							"natural join bbUser " +
							"where p.productID = " + id, function(err, rows, result){
		if (err) throw err;

	/*
	for (i = 0; i<rows.length; i++){
			console.log('The solution is: ', rows[i]);
		}*/
	
	
	

	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Product noty found.");
	}
	else {	
  		var response = {"product" : rows[0]};
		//connection.end();
  		res.json(response);
  	}
 });

});

	
var search;

// REST Operation - HTTP GET to read a product based on its nAME
app.get('/DB-Project/productSearch/:id', function(req, res) {
	var id = req.params.id;
	search = req.params.id;
		console.log("GET product by name: " + id);


var query = connection.query("SELECT * FROM boricuabaydb.bbProduct natural join bbBidProduct where productName like '%" + id + "%';", function(err, rows, result){
		if (err) throw err;

	
	/*
	for (i = 0; i<rows.length; i++){
				console.log('The solution is: ', rows[i]);
			}*/
	
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Product not found.");
	}
	else {	
  		var response = {"productSearch" : rows};
		//connection.end();
  		res.json(response);
  	}
 });	
});



// REST Operation - HTTP GET to read products by tagID
app.get('/DB-Project/productsByTag/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET products with tagID: " + id);


var query = connection.query("Select * from bbProduct natural join bbBidProduct natural join bbTag where tagID = " + id, function(err, rows, result){

		if (err) throw err;

	/*
	for (i = 0; i<rows.length; i++){
			console.log('The solution is: ', rows[i]);
		}*/
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Product not found.");
	}
	else {	
  		var response = {"productsTag" : rows};
		//connection.end();
  		res.json(response);
  	}
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
app.post('/DB-Project/products/:id/:selection', function(req, res) {
	var id = req.params.id;
	var selection = req.params.selection;
	console.log("POST");

  	if(!req.body.hasOwnProperty('productName') || !req.body.hasOwnProperty('brand')
  	|| !req.body.hasOwnProperty('model') || !req.body.hasOwnProperty('bidStartingPrice') || !req.body.hasOwnProperty('productDesc') || !req.body.hasOwnProperty('productPrice') 
  	|| !req.body.hasOwnProperty('dimensions') || !req.body.hasOwnProperty('startDate') || !req.body.hasOwnProperty('endDate') || !req.body.hasOwnProperty('productPhoto')) {
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for product.');
  	}
	
	var query = connection.query("INSERT INTO `bbProduct` (`productID`,`productName`,`productDesc`,`productPhoto`,`productPrice`," +
	  		"`model`,`brand`,`dimensions`,`tagID`) VALUES (NULL, '" + req.body.productName + "', '"+ req.body.productDesc + 
	  		"', '" + req.body.productPhoto + "', '" + req.body.productPrice + "','" + req.body.model + "','" + req.body.brand + "','" + req.body.dimensions + "'," + selection + ")");
	var getquery = connection.query("SET @last_insert_id_in_bbProduct = LAST_INSERT_ID()");	
	var query1 = connection.query("INSERT INTO `bbBidProduct` (`productID`,`bidStartingPrice`,`startDate`,`endDate`) " +
			"VALUES (@last_insert_id_in_bbProduct, '" + req.body.bidStartingPrice + "', '"+ req.body.startDate + 
	  		"', '" + req.body.endDate + "')"); 
	var query2 = connection.query("INSERT INTO `bbSell` (`userID`,`productID`,`sQuantity`) " +
			"VALUES ('"+id+"', @last_insert_id_in_bbProduct, NULL)"); 
	
  	res.json(true);
});

app.post('/DB-Project/insertProducts/:id/:idp', function(req, res) {
	var id = parseFloat(req.params.id);
	var idp = parseFloat(req.params.idp);
        console.log("POST Products in Add");
       //pg.connect(conString, function(err, connection, done) {
        	  var query = connection.query('INSERT INTO bbAddToCart (productID,userID,aQuantity) ' +
              		'VALUES (' + id + ', ' + idp + ', null)');
        	  
        	  res.json(true);
        	  return;

//done();
//});
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

	connection.query('SELECT * FROM bbCategory;', function(err, rows, result) {

  if (err) throw err;
	
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

// REST Operation - HTTP PUT to update a category on its id
app.put('/DB-Project/categoryUpdate/:id/:id2', function(req, res) {
	var id = req.params.id;
	var radio =req.params.id2;
	console.log("PUT Category ID: " + id);

  	if(req.body.name.length == 0){
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for account.');
  	}
	console.log(radio);
  	
  	 var query = connection.query("UPDATE `bbCategory` SET `categoryName` = '" + req.body.name + "', " +
  			 "`categoryDesc` = '../DB-Project/css/icons/" + radio + "' where categoryID= '"+id+"'");	
  
  	res.json(true);
});

// REST Operation - HTTP DELETE to delete a category based on its id
app.del('/DB-Project/categoryDel/:ids', function(req, res) {
	var ids = req.params.ids;
		console.log("DELETE Category with id: " + ids);

	connection.query("SELECT * FROM bbsubcategory WHERE categoryID = " + ids, 
		function(err, rows, result){
			if (err) throw err;
			var len = rows.length;
			
		if (len == 0){
			res.statusCode = 404;
			res.send("Account not found.");
		}
		
		for (i = 0; i<len; i++){
			connection.query("SELECT * FROM bbtag WHERE subCategoryID = " + rows[i].subCategoryID +	";", 
			getCallBackFn(i));
		}
		//console.log("out of main for");

		
		function getCallBackFn(index){
			return function(err2, rows2, results2){
				//console.log("SubCatID = " +rows[index].subCategoryID);
				
				//console.log("AAAAAAAAAA");
	
				if (err2) throw err;
				
				var len2 = rows2.length;
				//console.log("Initial subcat length: " +len2);
				var tempRow = rows2[0].subCategoryID;
				for (j = 0; j<len2; j++){
					//console.log("TagID = " +rows2[j].tagID);
					connection.query("DELETE from bbTag where tagID = '" 
					+rows2[j].tagID+"';", getCallBackFn2(j));
					res.json(true);
				}
				//console.log("SubCatID4 = " +tempRow);
				connection.query("DELETE from bbSubCategory where subCategoryID = '" 
						+tempRow+"';", function(err6, rows6, result6){
							if (err6) throw err;
							res.json(true);
				});
				var len3 = rows2.length;
			
				if(index == len-1){
					connection.query("DELETE from bbCategory where categoryID = '" +ids+"';", function(err, rows, result){
	
						if (err) throw err;
						//console.log("CatID2 = " +ids);
						var len = rows.length;
						if (len == 0){
							res.statusCode = 404;
							res.send("Category not found.");
						}
						res.json(true);
					});
				}
				
			};
		}
		
		function getCallBackFn2(index2){
			return function(err5, rows5, results5){
				if (err5) throw err;
				//console.log("Deleted Tag");
				res.json(true);
			};
		}
	});

});

// REST Operation - HTTP POST to add a new a category
app.post('/DB-Project/newCategory/:id', function(req, res) {
	console.log("POST");
	var radio = req.params.id;
  	if(req.body.name.length == 0) {			//<--------------------------------------------------------------------!!!!!!
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for category.');
  	}
  	
  	connection.query("INSERT INTO bbcategory (categoryID, categoryName, categoryDesc) " +
  	"VALUES (NULL, '" + req.body.name + "', '../DB-Project/css/icons/" + radio + "');" , function(err, rows, result){

		if (err) throw err;
  	res.json(true);
});
});

// ---------------------------------------------SUBCATEGORIES--------------------------------------------
// REST Operations
// Idea: Data is created, read, updated, or deleted through a URL that 
// identifies the resource to be created, read, updated, or deleted.
// The URL and any other input data is sent over standard HTTP requests.
// Mapping of HTTP with REST 
// a) POST - Created a new object. (Database create operation)
// b) GET - Read an individual object, collection of object, or simple values (Database read Operation)
// c) PUT - Update an individual object, or collection  (Database update operation)
// d) DELETE - Remove an individual object, or collection (Database delete operation)

// ADD NEW SUBCATEGORY
app.post('/DB-Project/newSubCategory/:id/:id2', function(req, res) {
	console.log("POST SUB-CATEGORY");
	var radio = req.params.id;
	var id = req.params.id2;
  	if(req.body.name.length == 0) {			//<--------------------------------------------------------------------!!!!!!
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for category.');
  	}
  	
  	connection.query("INSERT INTO bbsubcategory (subCategoryID, subCategoryName, subCategoryDesc, categoryID) " +
  	"VALUES (NULL, '" + req.body.name + "', '../DB-Project/css/icons/" + radio + "', '" + id + "');" , function(err, rows, result){

		if (err) throw err;
  		res.json(true);
	});

	connection.query("SET @last_insert_id_in_bbsubsategory = LAST_INSERT_ID()");
		
	connection.query("INSERT INTO bbtag (tagID, tagName, subCategoryID, tagIcon) " +
	  	"VALUES (NULL, NULL, @last_insert_id_in_bbsubsategory, NULL);" , function(err, rows, result){
	
			if (err) throw err;
	  		res.json(true);
	});
});

//GET SUBCATEGORIES BASED ON ID FROM PARENT CATEGORY
app.get('/DB-Project/subCategoriesParent/:id', function(req, res) {
	var got = req.params.id;
	console.log("GET SubCategory with Parent Category ID: " + got);
  	  	
  	connection.query("SELECT * FROM bbsubcategory WHERE categoryID = " + got, function(err, rows, result){

		if (err) throw err;
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Category not found.");
	}
	else {	
  		var response = {"subCategories" : rows};
		//connection.end();
  		res.json(response);
  	}
 });	
});

//GET SUBCATEGORY BASED ON ID
app.get('/DB-Project/subCategory/:id', function(req, res) {
	var got = req.params.id;
	console.log("GET SubCategory with ID: " + got);
  	  	
  	connection.query("SELECT * FROM bbsubcategory WHERE subCategoryID = " + got, function(err, rows, result){

		if (err) throw err;
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Category not found.");
	}
	else {	
  		var response = {"subCategory" : rows[0]};
		//connection.end();
  		res.json(response);
  	}
 });	
});

// REST Operation - HTTP PUT to update a subcategory on its id
app.put('/DB-Project/subCategoryUpdate/:id/:id2', function(req, res) {
	var id = req.params.id;
	var radio =req.params.id2;
	console.log("PUT Subcategory ID: " + id);

  	if(req.body.name.length == 0){
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for account.');
  	}
	console.log(radio);
  	
  	 var query = connection.query("UPDATE `bbSubCategory` SET `subCategoryName` = '" + req.body.name + "', " +
  			 "`subCategoryDesc` = '../DB-Project/css/icons/" + radio + "' where subCategoryID= '"+id+"'");	
  
  	res.json(true);
});

app.del('/DB-Project/subCategoryDel/:ids', function(req, res) {
	var ids = req.params.ids;
		console.log("DELETE Sub-Category with id: " + ids);

			connection.query("SELECT * FROM bbtag WHERE subCategoryID = " + ids + ";", 
			function(err2, rows2, results2){
					
				if (err2) throw err;
				
				var len2 = rows2.length;
				//console.log("Initial subcat length: " +len2);
				
				for (j = 0; j<len2; j++){
					//console.log("TagID = " +rows2[j].tagID);
					connection.query("DELETE from bbTag where tagID = '" 
					+rows2[j].tagID+"';", function(err5, rows5, results5){
						if (err5) throw err5;
						//console.log("Deleted Tag");
						res.json(true);
				});
				}
				//console.log("SubCatID4 = " +ids);
				connection.query("DELETE from bbSubCategory where subCategoryID = '" 
						+ids+"';", function(err6, rows6, result6){
							if (err6) throw err;
							res.json(true);
				});
			});
});

// ---------------------------------------------TAGS-----------------------------------------------------
// REST Operations
// Idea: Data is created, read, updated, or deleted through a URL that 
// identifies the resource to be created, read, updated, or deleted.
// The URL and any other input data is sent over standard HTTP requests.
// Mapping of HTTP with REST 
// a) POST - Created a new object. (Database create operation)
// b) GET - Read an individual object, collection of object, or simple values (Database read Operation)
// c) PUT - Update an individual object, or collection  (Database update operation)
// d) DELETE - Remove an individual object, or collection (Database delete operation)


//GET TAGS BASED ON ID FROM PARENT CATEGORY
app.get('/DB-Project/tagsParent/:id', function(req, res) {
	var got = req.params.id;
	console.log("GET Tag with Parent Sub-Category ID: " + got);
  	  	
  	connection.query("SELECT * FROM bbtag WHERE subCategoryID = " + got + " and tagName is not null;", function(err, rows, result){

		if (err) throw err;
	
	var len = rows.length;
	if (len == 0){
		connection.query("SELECT * FROM bbtag WHERE subCategoryID = " + got + ";", function(err2, rows2, result2){
			if (err2) throw err;
			var len2 = rows2.length;
			if (len2 == 0){
				res.statusCode = 404;
				res.send("Tags not found.");
			}
			else {	
		  		var response = {"tags" : rows2};
				//connection.end();
		  		res.json(response);
  			}
  		});
	}
	else {	
  		var response = {"tags" : rows};
		//connection.end();
  		res.json(response);
  	}
 });	
});

//GET TAG BASED ON ID
app.get('/DB-Project/tag/:id', function(req, res) {
	var got = req.params.id;
	console.log("GET Tag with ID: " + got);
  	  	
  	connection.query("SELECT * FROM bbtag WHERE tagID = " + got, function(err, rows, result){

		if (err) throw err;
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Tag not found.");
	}
	else {	
  		var response = {"tag" : rows[0]};
		//connection.end();
  		res.json(response);
  	}
 });	
});

// ADD NEW SUBCATEGORY
app.post('/DB-Project/newTag/:id/:id2', function(req, res) {
	console.log("POST TAG");
	var radio = req.params.id;
	var id = req.params.id2;
  	if(req.body.name.length == 0) {			//<--------------------------------------------------------------------!!!!!!
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for tag.');
  	}
  	
  	connection.query("INSERT INTO bbtag (tagID, tagName, subCategoryID, tagIcon) " +
  	"VALUES (NULL, '" + req.body.name + "', '" + id + "', '../DB-Project/css/icons/" + radio + "');" , function(err, rows, result){

		if (err) throw err;
  	res.json(true);
});
});

// REST Operation - HTTP PUT to update a subcategory on its id
app.put('/DB-Project/tagUpdate/:id/:id2', function(req, res) {
	var id = req.params.id;
	var radio =req.params.id2;
	console.log("PUT Tag ID: " + id);

  	if(req.body.name.length == 0){
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for account.');
  	}
	console.log(radio);
  	
  	 var query = connection.query("UPDATE `bbTag` SET `tagName` = '" + req.body.name + "', " +
  			 "`tagIcon` = '../DB-Project/css/icons/" + radio + "' where tagID= '"+id+"'");	
  
  	res.json(true);
});

app.del('/DB-Project/tagDel/:ids', function(req, res) {
	var ids = req.params.ids;
	console.log("DELETE Tag with id: " + ids);
	connection.query("DELETE from bbTag where tagID = '" 
			+ids+"';", function(err5, rows5, results5){
				if (err5) throw err5;
				//console.log("Deleted Tag");
				res.json(true);
	});
});
				

//-----------------------Regular User------------------------------------------------------

// Gets the user Information by userName
app.get('/DB-Project/users/:idu', function(req, res) {
	var idu = req.params.idu;
	console.log("GET account with names containing: " + idu);


var query = connection.query("SELECT * FROM bbUser WHERE userName like '%" + idu + "%';", function(err, rows, result){	

	if (err) throw err;
	
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {	
  		var response = {"accountByName" : rows};
		//connection.end();
  		res.json(response);
  	}
 });
  });



// Gets the user Information by userID
app.get('/DB-Project/accounts/:ids', function(req, res) {
	var ids = req.params.ids;
		console.log("GET account: " + ids);


var query = connection.query("SELECT * FROM bbUser as u inner join bbaddress " +  
		"as a inner join bbcreditcard as c WHERE u.userID = '" + ids  + "'" + 
		" AND u.creditCardID = c.creditCardID " +
		"AND u.addressID = a.addressID;", function(err, rows, result){	

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
	console.log("here0?");
	var id = req.params.id;
	var idp = req.params.idp;
		console.log("GET account: " + id);

console.log("here?");
var query = connection.query("SELECT * FROM bbUser as u inner join bbaddress " +  
		"as a inner join bbcreditcard as c WHERE u.userNickname = '" + id  + "'" + " AND " +
		"u.password = '" + idp  + "'" + " AND u.creditCardID = c.creditCardID " +
		"AND u.addressID = a.addressID;", function(err, rows, result){
	console.log("here1?");
		if (err) throw err;
		console.log("here2?");
	
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {	
  		var response = {"accountLogin" : rows[0]};
		//connection.end();
  		res.json(response);
  	}
 });
  });
// REST Operation - HTTP PUT to updated a car based on its id
app.put('/DB-Project/accountsUpdate/:id/:idc/:ida', function(req, res) {
	var id = req.params.id;
	var idc = req.params.idc;
	var ida = req.params.ida;
	console.log("PUT User ID: " + id);

  	if(!req.body.hasOwnProperty('userName') || !req.body.hasOwnProperty('userNickname') || !req.body.hasOwnProperty('password')
  	|| !req.body.hasOwnProperty('userEmail') || !req.body.hasOwnProperty('addressLine') || !req.body.hasOwnProperty('city')
	|| !req.body.hasOwnProperty('state') || !req.body.hasOwnProperty('country') || !req.body.hasOwnProperty('zipcode')
	|| !req.body.hasOwnProperty('creditCardNumber') || !req.body.hasOwnProperty('creditCardOwner') || !req.body.hasOwnProperty('securityCode')
	|| !req.body.hasOwnProperty('expDate') || !req.body.hasOwnProperty('caddressLine') || !req.body.hasOwnProperty('ccity')
	|| !req.body.hasOwnProperty('cstate') || !req.body.hasOwnProperty('ccountry') || !req.body.hasOwnProperty('czipcode')){
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for account.');
  	}
	
	

  	//var newAccount = new Account(req.body.name, req.body.username, req.body.password, req.body.mailingaddress, req.body.billingaddress, req.body.creditcard);
  	var query = connection.query("UPDATE `bbUser` SET `userName` = '" + req.body.userName + "', `userNickname` =  '"+ req.body.userNickname + "'," +
  			"`userEmail` = '" + req.body.userEmail + "',`password` = '" + req.body.password + "' where userID= '"+id+"'");	
  	
 
  	var query1 = connection.query("UPDATE `bbAddress` SET `addressLine` = '" + req.body.addressLine + "',`city` = '"+ req.body.city + 
  	  		"',`state` =  '" + req.body.state + "',`country` = '" + req.body.country + "'," +
  	  		"`zipcode`= '" + req.body.zipcode + "' where addressID = '"+ida+"'");
 
  	var query2 = connection.query("UPDATE `bbAddress` natural join `bbCreditCard` SET `addressLine` = '" + req.body.caddressLine + "'," +
  			"`city` = '"+ req.body.ccity + "',`state` = '" + req.body.cstate + "',`country` = '" + req.body.ccountry + "'," +
  	  		"`zipcode` = '" + req.body.czipcode + "' where creditCardID = '" + idc + "'");
  	
  	
	var query3 = connection.query("UPDATE `bbCreditCard` SET `creditCardOwner` = '" + req.body.creditCardOwner + "',`creditCardNumber` = '"+ req.body.creditCardNumber + "'," +
			"`securityCode` = '" + req.body.securityCode + "',`expDate` = '" + req.body.expDate + "' where creditCardID = '" + idc +"'");
  
  	
  	console.log("Update Account of: " + req.body.userNickname);
  	console.log("Update Mailing Address with ID: " + ida);
  	console.log("Update Billing Address with ID: " + idc );
  	res.json(true);
});



//REST Operation - HTTP POST to add a new a user
app.post('/DB-Project/accounts', function(req, res) {
	//console.log(req.body.userEmail);
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
	
	

  	//var newAccount = new Account(req.body.name, req.body.username, req.body.password, req.body.mailingaddress, req.body.billingaddress, req.body.creditcard);
  	var query = connection.query("INSERT INTO `bbUser` (`userID`,`userName`,`userNickname`,`userEmail`,`password`," +
  		"`creditCardID`,`bankAccountID`,`addressID`) VALUES (NULL, '" + req.body.userName + "', '"+ req.body.userNickname + 
  		"', '" + req.body.userEmail + "', '" + req.body.password + "',NULL,NULL,NULL)");
  	var getquery = connection.query("SET @last_insert_id_in_bbUser = LAST_INSERT_ID()");	
  	
 
  	var query1 = connection.query("INSERT INTO `bbAddress` (`addressID`,`addressLine`,`city`,`state`,`country`," +
  	  		"`zipcode`) VALUES (NULL, '" + req.body.addressLine + "', '"+ req.body.city + 
  	  		"', '" + req.body.state + "', '" + req.body.country + "', '" + req.body.zipcode + "')");
  	var getquery1 = connection.query("SET @last_insert_id_in_bbAddress = LAST_INSERT_ID()");
 
  	var query2 = connection.query("INSERT INTO `bbAddress` (`addressID`,`addressLine`,`city`,`state`,`country`," +
  	  		"`zipcode`) VALUES (NULL, '" + req.body.caddressLine + "', '"+ req.body.ccity + 
  	  		"', '" + req.body.cstate + "', '" + req.body.ccountry + "', '" + req.body.czipcode + "')");
  	var getquery2 = connection.query("SET @last_insert_id_in_bbAddress1 = LAST_INSERT_ID()");
  	
	var query3 = connection.query("INSERT INTO `bbCreditCard` (`creditCardID`,`creditCardOwner`,`creditCardNumber`,`securityCode`,`expDate`," +
  	  		"`addressID`) VALUES (NULL, '" + req.body.creditCardOwner + "', '"+ req.body.creditCardNumber + 
  	  		"', '" + req.body.securityCode + "', '" + req.body.expDate + "', @last_insert_id_in_bbAddress1)");
  	var getquery3 = connection.query("SET @last_insert_id_in_bbCreditCard = LAST_INSERT_ID()");
  	
  	var query3 = connection.query("INSERT INTO `bbBankAccount` (`bankAccountID`,`accountNumber`,`accountType`,`accountOwner`,`bankName`)" +
  	  		" VALUES (NULL, '" + req.body.accountNumber + "', '"+ req.body.accountType + 
  	  		"', '" + req.body.accountOwner + "', '" + req.body.bankName + "')");
  	var getquery4 = connection.query("SET @last_insert_id_in_bbBankAccount = LAST_INSERT_ID()");
  	
  	var query4 = connection.query("UPDATE `bbUser` SET `addressID`= @last_insert_id_in_bbAddress, `creditCardID`=@last_insert_id_in_bbCreditCard, `bankAccountID`=@last_insert_id_in_bbBankAccount WHERE `userID`=@last_insert_id_in_bbUser");
  	
  	console.log("New Account: " + req.body.userNickname);
  	res.json(true);
});

// REST Operation - HTTP DELETE to delete a user based on its id
app.del('/DB-Project/accountsDel/:ids', function(req, res) {
	var ids = req.params.ids;
		console.log("DELETE User with id: " + ids);

	
	var query = connection.query("DELETE from bbUser " +   
					"where userID = '" +ids+"';", function(err, rows, result){

		if (err) throw err;
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Account not found.");
	}
	res.json(true);
});
});


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

// See all admins
// REST Operation - HTTP GET to read a product based on its id
app.get('/DB-Project/accountAdmin', function(req, res) {
	
		console.log("GET all admin");


var query = connection.query("SELECT * FROM bbAdmin", function(err, rows, result){

		if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The solution is: ', rows[i]);
		}*/
			
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {	
  		var response = {"accountAdminAll" : rows};
		//connection.end();
  		res.json(response);
  	}
 });
  });
  
  // Gets the admin Information by adminUserName
app.get('/DB-Project/accountAdminName/:ida', function(req, res) {
	var ida = req.params.ida;
	console.log("GET admin account with names containing: " + ida);


var query = connection.query("SELECT * FROM bbAdmin WHERE adminUserName like '%" + ida + "%';", function(err, rows, result){	

	if (err) throw err;
	
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {	
  		var response = {"adminAccountByName" : rows};
		//connection.end();
  		res.json(response);
  	}
 });
  });
  
  
//Verifies Login For Admin
app.get('/DB-Project/accountAdmin/:id/:idp', function(req, res) {
	var id = req.params.id;
	var idp = req.params.idp;
	console.log("GET ADMIN account: " + id);

var query = connection.query("SELECT * FROM bbAdmin WHERE adminUserName = '" + id  + "'" + " AND " +
		"adminPassword = '" + idp + "'", function(err, rows, result){

		if (err) throw err;

	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {	
  		var response = {"accountAdmin" : rows[0]};
		//connection.end();
  		res.json(response);
  	}
 });
  });

// REST Operation - HTTP GET to read an admin based on its id
app.get('/DB-Project/accountAdminID/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET admin: " + id);


var query = connection.query("SELECT * FROM bbAdmin WHERE adminID = " + id, function(err, rows, result){

		if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The solution is: ', rows[i]);
		}*/
	
	
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {	
  		var response = {"accountAdmin2" : rows[0]};
		//connection.end();
  		res.json(response);
  	}
 });
  });

// REST Operation - HTTP PUT to updated a car based on its id
app.put('/DB-Project/adminUpdate/:id', function(req, res) {
	var id = req.params.id;
	console.log("PUT Admin ID: " + id);

  	if(!req.body.hasOwnProperty('adminUserName') || !req.body.hasOwnProperty('adminPassword')){
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for account.');
  	}
	
  	
  	 var query = connection.query("UPDATE `bbAdmin` SET `adminUserName` = '" + req.body.adminUserName + "', " +
  			 "`adminPassword` = '" + req.body.adminPassword + "' where adminID= '"+id+"'");	
  	  	
  	console.log("Update Account of: " + req.body.adminUserName);
  	res.json(true);
});

//REST Operation - HTTP POST to add a new a user
app.post('/DB-Project/newAdmin', function(req, res) {
	console.log("POST Admin");

  	if(!req.body.hasOwnProperty('userName') || !req.body.hasOwnProperty('password')){
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for account.');
  	}	

	var query = connection.query("INSERT INTO `bbAdmin` (`adminID`,`adminUserName`,`adminPassword`)" +
	" VALUES (NULL, '" + req.body.userName + "', '" + req.body.password + "')");	
  	
  	console.log("New Admin Account: " + req.body.userName);
  	res.json(true);
});

// REST Operation - HTTP DELETE to delete an admin based on its id
app.del('/DB-Project/adminDel/:ids', function(req, res) {
	var ids = req.params.ids;
		console.log("DELETE Administrator with id: " + ids);

	
	var query = connection.query("DELETE from bbAdmin " +   
					"where adminID = '" +ids+"';", function(err, rows, result){

		if (err) throw err;
	
	var len = rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Account not found.");
	}
	res.json(true);
});
});

//--------------------------------------Credit Card--------------------------------------------------------------------//


//Gets the creditcard info
app.get('/DB-Project/creditcards/:ids', function(req, res) {
	var ids = req.params.ids;
		console.log("GET creditcard: " + ids);


var query = connection.query("SELECT * from bbCreditCard as c " +
		"inner join bbAddress as a on a.addressID = c.addressID " +
		"inner join bbUser as u on u.creditCardID = c.creditCardID " +
		"where u.userID = '" + ids  + "'", function(err, rows, result){

	/*
	for (i = 0; i<rows.length; i++){
			console.log('The solution is: ', rows[i]);
	}	*/
	
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
        /*
        for (i = 0; i<rows.length; i++){
                        console.log('The solution is: ', rows[i]);
                }*/
        
        
        
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

//pg.connect(conString, function(err, connection, done) {
	connection.query("SELECT * FROM bbAddToCart natural join bbProduct natural join bbBidProduct", function(err, rows, result ) {


  	if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The result is: ', rows[i]);
		}*/
	
  var response = {"carts" : rows};
  res.json(response);
  //done();
});
//});
});

// REST Operation - HTTP GET to read a car based on its id
app.get('/DB-Project/carts/:id', function(req, res) {
        var id = req.params.id;
                console.log("GET carts: " + id);

//pg.connect(conString, function(err, connection, done) {
                var query = connection.query("SELECT * FROM bbAddToCart natural join bbProduct natural join bbBidProduct WHERE userID = " + id, function(err, rows, result ){


                if (err) throw err;
        
     /*
        for (i = 0; i<result.rows.length; i++){
                             console.log('The solution is: ', rows[i]);
                     }*/
     
        
        
        
        var len =rows.length;
        if (len == 0){
                res.statusCode = 404;
                res.send("Cart not found.");
        }
        else {        
                  var response = {"cart" : rows};
                //connection.end();
                  res.json(response);
          }
        //  done();
 });
//  });
});

app.get('/DB-Project/notuserCarts/:id', function(req, res) {
    var id = req.params.id;
            console.log("GET carts: " + id);

//pg.connect(conString, function(err, connection, done) {
var query = connection.query("SELECT * FROM bbProduct natural join bbBidProduct WHERE productID = " + id, function(err, rows, result ){


            if (err) throw err;
    /*
    for (i = 0; i<rows.length; i++){
                    console.log('The solution is: ', rows[i]);
            }*/
    
    
    
    var len =result.rows.length;
    if (len == 0){
            res.statusCode = 404;
            res.send("Cart not found.");
    }
    else {        
              var response = {"cart" : rows};
            //connection.end();
              res.json(response);
      }
     // done();
});
//});
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
		//pg.connect(conString, function(err, connection, done) {


var query = connection.query("SELECT * FROM bbSell natural join bbProduct natural join bbBidProduct WHERE userID = " + id, function(err, rows, result ){


		if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The solution is: ', rows[i]);
		}*/
	
	
	
	var len =rows.length;
	if (len == 0){
		res.statusCode = 404;
		res.send("Account not found.");
	}
	else {	
  		var response = {"sell" : rows};
		//connection.end();
  		res.json(response);
  	}
  	//done();
 });
  //});
});

// REST Operation - HTTP GET to read a car based on its id
app.get('/DB-Project/sells/:id', function(req, res) {
        var id = req.params.id;
                console.log("GET sells: " + id);
//pg.connect(conString, function(err, connection, done) {
var query = connection.query("SELECT * from bbSell natural join bbUser " +

		"natural join bbProduct natural join bbBidProduct " +


		"where userID = " + id, function(err, rows, result ){
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
                  var response = {"sell" : rows[0]};
                //connection.end();
                  res.json(response);
          }
         // done();
 });
 // });
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
	
	//pg.connect(conString, function(err, connection, done) {
	connection.query("SELECT * from bbBidFor natural join bbProduct natural join bbBidProduct", function(err, rows, result ) {

	

  	if (err) throw err;
	/*
	for (i = 0; i<rows.length; i++){
			console.log('The result is: ', rows[i]);
		}*/
	
  var response = {"bids" : rows};
  res.json(response);
  //done();
});
//});
});

// REST Operation - HTTP GET to read a car based on its id
app.get('/DB-Project/wbids/:id', function(req, res) {
	console.log(req.params.id);
        var id = req.params.id;
                console.log("GET bids: " + id);
//pg.connect(conString, function(err, connection, done) {

var query = connection.query("SELECT * FROM bbBidFor natural join bbProduct natural join bbBidProduct WHERE userID = " + id, function(err, rows, result ){

                if (err) throw err;
        /*
        for (i = 0; i<rows.length; i++){
                        console.log('The solution is: ', rows[i]);
                }*/
        
        
        
        var len =rows.length;
        if (len == 0){
                res.statusCode = 404;
                res.send("Bid not found.");
        }
        else {        
                  var response = {"bid" : rows};
                //connection.end();
                  res.json(response);
          }
         // done();
 });
 // });
});


app.get('/DB-Project/abids/:ids', function(req, res) {
    var ids = req.params.ids;
            console.log("GET bidproduct: " + ids);
            //pg.connect(conString, function(err, connection, done) {

            	var query = connection.query("SELECT u.userNickname, b.bidDate, b.bidAmount, r.productPhoto, r.productDesc, r.productName, " +
            			"r.brand, r.model, r.dimensions, r.productID FROM bbBidFor as b inner join bbUser as u on b.userID = u.userID " +
            			" inner join bbProduct as r on b.productID = r.productID inner join " +
            			" bbSell as s on r.productID = s.productID WHERE s.userID= "+ ids, function(err, rows, result){
            if (err) throw err;
    
    /*
    for (i = 0; i<rows.length; i++){
                      console.log('The solution is: ', rows[i]);
                }*/
    
         
              var response = {"bidproduct" : rows};
            //connection.end();
              res.json(response);
      //done();
});
//});
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
      // pg.connect(conString, function(err, connection, done) {
          
          console.log("Hereo");
          if(count == 0){
          	
        	  var query2 = connection.query("Select * from bbBidFor Where userID = '" + id + "' AND productID = '"+ idp +"'", function(err, rows, result){ 
        	  var len = rows.length;
        	  if(len == 0){
        	  count = 1;
        	  res.writeHead(200, {'Content-Type': 'text/plain'});
        	  res.statusCode = 404;
        	  res.end('_testbid(\'{"message": "You have already placed a bid!"}\')');
        	  }
        	  });
          
          console.log("Here");
          if(output >= sd && output <= ed){
        	  console.log("Here1");
        	  console.log("el chikitin: "+idb);
        	  console.log("el grande: "+cb);
          
          if(cb > idb && count == 0){
        	  console.log("Here2");
        	  var query1 = connection.query("UPDATE `bbBidProduct` SET `bidStartingPrice`= '" + req.body.bidAmount + "' WHERE `productID`='"+ idp +"'");
        	  var query = connection.query("INSERT INTO `bbBidFor` (`userID`,`productID`,`bidDate`,`bidAmount`) " +
              		"VALUES ('" + id + "', '" + idp + "', '"+ output + "', '" + cb + "')",
                  if (err) throw err;
        	  
        	  res.json(true);
        	  return;
          }
          
          else{
        	  console.log("Here35");
        	  res.writeHead(200, {'Content-Type': 'text/plain'});
        	  res.statusCode = 404;
        	  res.end('_testbid(\'{"message": "The bid amount is less than the bid starting price!"}\')');
          }
          console.log("Her4");
          
          }
          console.log("Herein");
		if(output < sd){
			console.log("Here5");
			res.writeHead(200, {'Content-Type': 'text/plain'});
      	  res.statusCode = 404;
      	  res.end('_testbid(\'{"message": "The bid date has not started yet!"}\')');
		}
		if(output > ed){
			console.log("Here6");
			res.writeHead(200, {'Content-Type': 'text/plain'});
	      	  res.statusCode = 404;
	      	  res.end('_testbid(\'{"message": "The bid date has passed!"}\')');
			
		}
//done();

//});
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
	
//pg.connect(conString, function(err, connection, done) {
	connection.query("SELECT * from bbOrder natural join bbProduct natural join bbBidProduct", function(err, rows, result ){

  	if (err) throw err;
	for (i = 0; i<rows.length; i++){
		console.log('The result is: ', rows[i]);
	}
  var response = {"bids" : rows};
  res.json(response);
  //done();
});
//});
});

var orders;
// REST Operation - HTTP GET to read a car based on its id
app.get('/DB-Project/orders/:id', function(req, res) {
        var id = req.params.id;
        orders = req.params.id;
                console.log("GET order: " + id);
                //pg.connect(conString, function(err, connection, done) {

var query = connection.query("SELECT u.userNickname, p.paidDate, r.productPhoto, r.productDesc, r.productName, r.productPrice, " + 
		"r.brand, r.model, r.dimensions, r.productID FROM bbOrder as o inner join bbPay as p on" + 
		" o.orderID = p.orderID inner join bbUser as u on o.userID = u.userID inner join bbContain" +
		" as c on o.orderID = c.orderID inner join bbProduct as r on c.productID = r.productID inner join " + 
		"bbBidProduct as bp on r.productID = bp.productID inner join" + 
		" bbSell as s on r.productID = s.productID WHERE s.userID = " + id, function(err, rows, result ){
                if (err) throw err;
        /*
        for (i = 0; i<rows.length; i++){
                        console.log('The solution is: ', rows[i]);
                }*/
        
        
        
        var len =rows.length;
        if (len == 0){
                res.statusCode = 404;
                res.send("Order not found.");
        }
        else {        
                  var response = {"order" : rows};
                //connection.end();
                  res.json(response);
          }
         // done();
 });
  //});
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
app.get('/DB-Project/placeOrder/:id/:idc/:idb', function(req, res) {
	var id = req.params.id;
	var idc = req.params.idc;
	var idb = req.params.idb;
        console.log("POST Place Order " + id);

        	  var query = connection.query("INSERT INTO bbOrder (userID) " +
              		"VALUES (' + id + ')");
        	  var getquery = connection.query("SET @last_insert_id_in_bbOrder = LAST_INSERT_ID()");
        	  var query1 = connection.query("INSERT INTO bbPay (creditCardID,bankAccountID,paidAmount,paidDate,orderID) " +
                		"VALUES ('" + idc + "', '"+ idb +"', null, '"+output+"', @last_insert_id_in_bbOrder)");
        	  var query2 = connection.query("Select orderID, paidDate from bbPay natural join bbOrder where userID= "+id, function(err, rows, result ){

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
        		  		var response = {"order" : rows};
        				//connection.end();
        		  		res.json(response);
        		  	}
        		 });
});

//------------------------------------------------------Reports---------------------------------------------------------
// REST Operation - HTTP GET to read sales days
app.get('/DB-Project/salesDays/', function(req, res) {
	//var id = req.params.id;
	//search = req.params.id;
		console.log("GET days" );


var query = connection.query("SELECT paidDate, DAY(paidDate) as day, MONTH(paidDate) as month, YEAR(paidDate) as year FROM boricuabaydb.bbpay Group by paidDate;", function(err, rows, result){
		if (err) throw err;

	
	/*
	for (i = 0; i<rows.length; i++){
				console.log('The solution is: ', rows[i]);
			}*/
	
	
	var len = rows.length;
	if (len == 0){
		console.log("No hay dias" ); 
		res.statusCode = 404;
		res.send("Days not found.");
	}
	else {	
  		var response = {"salesDays" : rows};
  		console.log("hay dias"); 
		//connection.end();
  		res.json(response);
  	}
 });	
});

// REST Operation - HTTP GET to read sales weeks
app.get('/DB-Project/salesWeeks/', function(req, res) { 
		console.log("GET weeks" );
 
var query = connection.query("SELECT paidDate, DAY(paidDate) as sDay, MONTH(paidDate) as sMonth, YEAR(paidDate) as sYear,"+
					"date_add(paidDate, INTERVAL 7 DAY) as end, DAY(date_add(paidDate, INTERVAL 7 DAY) ) as eDay,"+
					" MONTH(date_add(paidDate, INTERVAL 7 DAY)) as eMonth, YEAR(date_add(paidDate, INTERVAL 7 DAY)) as eYear "+
					" FROM boricuabaydb.bbpay Group by paidDate;", function(err, rows, result){
		if (err) throw err;
 
	var len = rows.length;
	if (len == 0){
		console.log("No hay semanas" ); 
		res.statusCode = 404;
		res.send("Days not found.");
	}
	else {	
  		var response = {"salesWeeks" : rows};
  		console.log("hay semanas"); 
		//connection.end();
  		res.json(response);
  	}
 });	
});

// REST Operation - HTTP GET to read sales months
app.get('/DB-Project/salesMonths/', function(req, res) { 
		console.log("GET months" );
 
var query = connection.query("SELECT MONTH(paidDate) as month, YEAR(paidDate) as year FROM boricuabaydb.bbpay Group by MONTH(paidDate), YEAR(paidDate);", function(err, rows, result){
		if (err) throw err;
 
	var len = rows.length;
	if (len == 0){
		console.log("No hay meses" ); 
		res.statusCode = 404;
		res.send("Days not found.");
	}
	else {	
  		var response = {"salesMonths" : rows};
  		console.log("hay meses"); 
		//connection.end();
  		res.json(response);
  	}
 });	
});

// REST Operation - HTTP GET to read sales years
app.get('/DB-Project/salesYears/', function(req, res) { 
		console.log("GET years" );
 
var query = connection.query("SELECT YEAR(paidDate) as year FROM boricuabaydb.bbpay Group by YEAR(paidDate);", function(err, rows, result){
		if (err) throw err;
 
	var len = rows.length;
	if (len == 0){
		console.log("No hay years" ); 
		res.statusCode = 404;
		res.send("Days not found.");
	}
	else {	
  		var response = {"salesYears" : rows};
  		console.log("hay years"); 
		//connection.end();
  		res.json(response);
  	}
 });	
});

// REST Operation - HTTP GET to read sales WEEKs
app.get('/DB-Project/saleWeekProduct/:id', function(req, res) { 
		var id = req.params.id;
		console.log("GET product weekly sales "+ id );
 
var query = connection.query("SELECT ProductName as name,  bidStartingPrice as start, MAX(bidAmount) as amount "+
			"FROM boricuabaydb.bbProduct as p "+
			"inner join boricuabaydb.bbBidProduct as bp on bp.productID = p.productID "+
			"inner join boricuabaydb.bbBidFor as bf on bf.productID = bp.productID "+ 
			"where p.productID in ( "+
									"Select productID "+
									"FROM boricuabaydb.bbContain as c "+
									"inner join boricuabaydb.bbOrder as o on o.orderID = c.orderID "+
									"inner join boricuabaydb.bbPay as p on p.orderID = o.orderID "+
									"where paidDate between DATE('"+id+"') and date_add(DATE('"+id+"'), INTERVAL 8 DAY) "+
									") "+
			"Group by ProductName;", function(err, rows, result){
		if (err) throw err;
 
	var len = rows.length;
	if (len == 0){
		console.log("No hay sales" ); 
		res.statusCode = 404;
		res.send("Days not found.");
	}
	else {	
  		var response = {"products" : rows};
  		console.log("hay sales"); 
		//connection.end();
  		res.json(response);
  	}
 });	
});

// REST Operation - HTTP GET to read sales DAYs
app.get('/DB-Project/saleDayProduct/:id', function(req, res) { 
		var id = req.params.id;
		console.log("GET product dayly sales "+ id );
 
var query = connection.query("SELECT ProductName as name,  bidStartingPrice as start, MAX(bidAmount) as amount "+
			"FROM boricuabaydb.bbProduct as p "+
			"inner join boricuabaydb.bbBidProduct as bp on bp.productID = p.productID "+
			"inner join boricuabaydb.bbBidFor as bf on bf.productID = bp.productID "+ 
			"where p.productID in ( "+
									"Select productID "+
									"FROM boricuabaydb.bbContain as c "+
									"inner join boricuabaydb.bbOrder as o on o.orderID = c.orderID "+
									"inner join boricuabaydb.bbPay as p on p.orderID = o.orderID "+
									"where paidDate = DATE('"+id+"')"+
									") "+
			"Group by ProductName;", function(err, rows, result){
		if (err) throw err;
 
	var len = rows.length;
	if (len == 0){
		console.log("No hay sales" ); 
		res.statusCode = 404;
		res.send("Days not found.");
	}
	else {	
  		var response = {"products" : rows};
  		console.log("hay sales"); 
		//connection.end();
  		res.json(response);
  	}
 });	
});

// REST Operation - HTTP GET to read sales months
app.get('/DB-Project/saleMonthProduct/:id', function(req, res) { 
		var id = req.params.id;
		var monthYear = id.split(' ');
		console.log("GET product monthly sales "+ id );
		console.log(" month  "+ monthYear[0] );
		console.log(" year  "+ monthYear[1] );
 
var query = connection.query("SELECT ProductName as name,  bidStartingPrice as start, MAX(bidAmount) as amount "+
			"FROM boricuabaydb.bbProduct as p "+
			"inner join boricuabaydb.bbBidProduct as bp on bp.productID = p.productID "+
			"inner join boricuabaydb.bbBidFor as bf on bf.productID = bp.productID "+ 
			"where p.productID in ( "+
									"Select productID "+
									"FROM boricuabaydb.bbContain as c "+
									"inner join boricuabaydb.bbOrder as o on o.orderID = c.orderID "+
									"inner join boricuabaydb.bbPay as p on p.orderID = o.orderID "+
									"where Month(paidDate) = '"+monthYear[0]+"' and YEAR(paidDate) = '"+monthYear[1]+"' "+
									") "+
			"Group by ProductName;", function(err, rows, result){
		if (err) throw err;
 
	var len = rows.length;
	if (len == 0){
		console.log("No hay sales" ); 
		res.statusCode = 404;
		res.send("Days not found.");
	}
	else {	
  		var response = {"products" : rows};
  		console.log("hay sales"); 
		//connection.end();
  		res.json(response);
  	}
 });	
});

// REST Operation - HTTP GET to read sales years
app.get('/DB-Project/saleYearProduct/:id', function(req, res) { 
		var id = req.params.id;
		console.log("GET product yearly sales "+ id );
 
var query = connection.query("SELECT ProductName as name,  bidStartingPrice as start, MAX(bidAmount) as amount "+
			"FROM boricuabaydb.bbProduct as p "+
			"inner join boricuabaydb.bbBidProduct as bp on bp.productID = p.productID "+
			"inner join boricuabaydb.bbBidFor as bf on bf.productID = bp.productID "+ 
			"where p.productID in ( "+
									"Select productID "+
									"FROM boricuabaydb.bbContain as c "+
									"inner join boricuabaydb.bbOrder as o on o.orderID = c.orderID "+
									"inner join boricuabaydb.bbPay as p on p.orderID = o.orderID "+
									"where YEAR(paidDate) =  '"+id+"' "+
									") "+
			"Group by ProductName;", function(err, rows, result){
		if (err) throw err;
 
	var len = rows.length;
	if (len == 0){
		console.log("No hay sales" ); 
		res.statusCode = 404;
		res.send("Days not found.");
	}
	else {	
  		var response = {"products" : rows};
  		console.log("hay sales"); 
		//connection.end();
  		res.json(response);
  	}
 });	
});

// REST Operation - HTTP GET to read revenues WEEKs
app.get('/DB-Project/revenueWeekProduct/:id', function(req, res) { 
		var id = req.params.id;
		console.log("GET product weekly revenues "+ id );
 
var query = connection.query("SELECT ProductName as name,  (MAX(bidAmount) - bidStartingPrice) as amount "+
			"FROM boricuabaydb.bbProduct as p "+
			"inner join boricuabaydb.bbBidProduct as bp on bp.productID = p.productID "+
			"inner join boricuabaydb.bbBidFor as bf on bf.productID = bp.productID "+ 
			"where p.productID in ( "+
									"Select productID "+
									"FROM boricuabaydb.bbContain as c "+
									"inner join boricuabaydb.bbOrder as o on o.orderID = c.orderID "+
									"inner join boricuabaydb.bbPay as p on p.orderID = o.orderID "+
									"where paidDate between DATE('"+id+"') and date_add(DATE('"+id+"'), INTERVAL 8 DAY) "+
									") "+
			"Group by ProductName;", function(err, rows, result){
		if (err) throw err;
 
	var len = rows.length;
	if (len == 0){
		console.log("No hay revenue" ); 
		res.statusCode = 404;
		res.send("Days not found.");
	}
	else {	
  		var response = {"products" : rows};
  		console.log("hay revenue"); 
		//connection.end();
  		res.json(response);
  	}
 });	
});

// REST Operation - HTTP GET to read revenues DAYs
app.get('/DB-Project/revenueDayProduct/:id', function(req, res) { 
		var id = req.params.id;
		console.log("GET product dayly revenues "+ id );
 
var query = connection.query("SELECT ProductName as name,  (MAX(bidAmount) - bidStartingPrice)  as amount "+
			"FROM boricuabaydb.bbProduct as p "+
			"inner join boricuabaydb.bbBidProduct as bp on bp.productID = p.productID "+
			"inner join boricuabaydb.bbBidFor as bf on bf.productID = bp.productID "+ 
			"where p.productID in ( "+
									"Select productID "+
									"FROM boricuabaydb.bbContain as c "+
									"inner join boricuabaydb.bbOrder as o on o.orderID = c.orderID "+
									"inner join boricuabaydb.bbPay as p on p.orderID = o.orderID "+
									"where paidDate = DATE('"+id+"')"+
									") "+
			"Group by ProductName;", function(err, rows, result){
		if (err) throw err;
 
	var len = rows.length;
	if (len == 0){
		console.log("No hay revenues" ); 
		res.statusCode = 404;
		res.send("Days not found.");
	}
	else {	
  		var response = {"products" : rows};
  		console.log("hay revenue"); 
		//connection.end();
  		res.json(response);
  	}
 });	
});

// REST Operation - HTTP GET to read revenues months
app.get('/DB-Project/revenueMonthProduct/:id', function(req, res) { 
		var id = req.params.id;
		var monthYear = id.split(' ');
		console.log("GET product monthly revenues "+ id );
		console.log(" month  "+ monthYear[0] );
		console.log(" year  "+ monthYear[1] );
 
var query = connection.query("SELECT ProductName as name,  (MAX(bidAmount) - bidStartingPrice)  as amount "+
			"FROM boricuabaydb.bbProduct as p "+
			"inner join boricuabaydb.bbBidProduct as bp on bp.productID = p.productID "+
			"inner join boricuabaydb.bbBidFor as bf on bf.productID = bp.productID "+ 
			"where p.productID in ( "+
									"Select productID "+
									"FROM boricuabaydb.bbContain as c "+
									"inner join boricuabaydb.bbOrder as o on o.orderID = c.orderID "+
									"inner join boricuabaydb.bbPay as p on p.orderID = o.orderID "+
									"where Month(paidDate) = '"+monthYear[0]+"' and YEAR(paidDate) = '"+monthYear[1]+"' "+
									") "+
			"Group by ProductName;", function(err, rows, result){
		if (err) throw err;
 
	var len = rows.length;
	if (len == 0){
		console.log("No hay revenues" ); 
		res.statusCode = 404;
		res.send("Days not found.");
	}
	else {	
  		var response = {"products" : rows};
  		console.log("hay revenue"); 
		//connection.end();
  		res.json(response);
  	}
 });	
});

// REST Operation - HTTP GET to read revenues years
app.get('/DB-Project/revenueYearProduct/:id', function(req, res) { 
		var id = req.params.id;
		console.log("GET product yearly revenues "+ id );
 
var query = connection.query("SELECT ProductName as name,  (MAX(bidAmount) - bidStartingPrice)  as amount "+
			"FROM boricuabaydb.bbProduct as p "+
			"inner join boricuabaydb.bbBidProduct as bp on bp.productID = p.productID "+
			"inner join boricuabaydb.bbBidFor as bf on bf.productID = bp.productID "+ 
			"where p.productID in ( "+
									"Select productID "+
									"FROM boricuabaydb.bbContain as c "+
									"inner join boricuabaydb.bbOrder as o on o.orderID = c.orderID "+
									"inner join boricuabaydb.bbPay as p on p.orderID = o.orderID "+
									"where YEAR(paidDate) =  '"+id+"' "+
									") "+
			"Group by ProductName;", function(err, rows, result){
		if (err) throw err;
 
	var len = rows.length;
	if (len == 0){
		console.log("No hay revenue" ); 
		res.statusCode = 404;
		res.send("Days not found.");
	}
	else {	
  		var response = {"products" : rows};
  		console.log("hay revenue"); 
		//connection.end();
  		res.json(response);
  	}
 });	
});


// REST Operation - HTTP GET to read sales by WEEKs
app.get('/DB-Project/saleWeek/', function(req, res) { 
		//var id = req.params.id;
		console.log("GET weekly sales " );
 
var query = connection.query( "Select WEEK(paidDate) as name,  SUM(am) as amount "+
			"from ( SELECT paidDate, productName, MAX(bidAmount) as am "+
				"FROM boricuabaydb.bbProduct as p "+
				"inner join boricuabaydb.bbBidProduct as bp on bp.productID = p.productID "+
				"inner join boricuabaydb.bbBidFor as bf on bf.productID = bp.productID "+ 
				"inner join boricuabaydb.bbContain as c on c.productID = p.productID "+ 
				"inner join boricuabaydb.bbOrder as o on o.orderID = c.orderID "+
				"inner join boricuabaydb.bbPay as pa on pa.orderID = o.orderID "+ 
				"Group by paidDate, productName ) as prod "+ 
			"group by week(paidDate);", function(err, rows, result){
		if (err) throw err;
 
	var len = rows.length;
	if (len == 0){
		console.log("No hay sales" ); 
		res.statusCode = 404;
		res.send("Week not found.");
	}
	else {	
  		var response = {"products" : rows};
  		console.log("hay sales"); 
		//connection.end();
  		res.json(response);
  	}
 });	
});

// REST Operation - HTTP GET to read sales by DAYs
app.get('/DB-Project/saleDay/', function(req, res) { 
		//var id = req.params.id;
		console.log("GET dayly sales " );
 
var query = connection.query("Select paidDate as name,  SUM(am) as amount "+
			"from ( SELECT paidDate, productName, MAX(bidAmount) as am "+
				"FROM boricuabaydb.bbProduct as p "+
				"inner join boricuabaydb.bbBidProduct as bp on bp.productID = p.productID "+
				"inner join boricuabaydb.bbBidFor as bf on bf.productID = bp.productID "+ 
				"inner join boricuabaydb.bbContain as c on c.productID = p.productID "+ 
				"inner join boricuabaydb.bbOrder as o on o.orderID = c.orderID "+
				"inner join boricuabaydb.bbPay as pa on pa.orderID = o.orderID "+ 
				"Group by paidDate, productName ) as prod "+ 
			"group by paidDate ;", function(err, rows, result){
		if (err) throw err;
 
	var len = rows.length;
	if (len == 0){
		console.log("No hay sales" ); 
		res.statusCode = 404;
		res.send("Days not found.");
	}
	else {	
  		var response = {"products" : rows};
  		console.log("hay sales"); 
		//connection.end();
  		res.json(response);
  	}
 });	
});

// REST Operation - HTTP GET to read sales by months
app.get('/DB-Project/saleMonth/', function(req, res) {  
		console.log("GET monthly sales " ); 
		
var query = connection.query("Select MONTH(paidDate) as name,  SUM(am) as amount "+
			"from ( SELECT paidDate, productName, MAX(bidAmount) as am "+
				"FROM boricuabaydb.bbProduct as p "+
				"inner join boricuabaydb.bbBidProduct as bp on bp.productID = p.productID "+
				"inner join boricuabaydb.bbBidFor as bf on bf.productID = bp.productID "+ 
				"inner join boricuabaydb.bbContain as c on c.productID = p.productID "+ 
				"inner join boricuabaydb.bbOrder as o on o.orderID = c.orderID "+
				"inner join boricuabaydb.bbPay as pa on pa.orderID = o.orderID "+ 
				"Group by paidDate, productName ) as prod "+ 
			"group by MONTH(paidDate);", function(err, rows, result){
		if (err) throw err;
 
	var len = rows.length;
	if (len == 0){
		console.log("No hay sales" ); 
		res.statusCode = 404;
		res.send("Month not found.");
	}
	else {	
  		var response = {"products" : rows};
  		console.log("hay sales"); 
		//connection.end();
  		res.json(response);
  	}
 });	
});

// REST Operation - HTTP GET to read sales by years
app.get('/DB-Project/saleYear/', function(req, res) {  
		console.log("GET yearly sales " );
 
var query = connection.query("Select YEAR(paidDate) as name,  SUM(am) as amount "+
			"from ( SELECT paidDate, productName, MAX(bidAmount) as am "+
				"FROM boricuabaydb.bbProduct as p "+
				"inner join boricuabaydb.bbBidProduct as bp on bp.productID = p.productID "+
				"inner join boricuabaydb.bbBidFor as bf on bf.productID = bp.productID "+ 
				"inner join boricuabaydb.bbContain as c on c.productID = p.productID "+ 
				"inner join boricuabaydb.bbOrder as o on o.orderID = c.orderID "+
				"inner join boricuabaydb.bbPay as pa on pa.orderID = o.orderID "+ 
				"Group by paidDate, productName ) as prod " + 
			"group by YEAR(paidDate);", function(err, rows, result){
		if (err) throw err;
 
	var len = rows.length;
	if (len == 0){
		console.log("No hay sales" ); 
		res.statusCode = 404;
		res.send("Year not found.");
	}
	else {	
  		var response = {"products" : rows};
  		console.log("hay sales"); 
		//connection.end();
  		res.json(response);
  	}
 });	
});


