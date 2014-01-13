


///////////////////////////////////////////START SORTING///////////////////////////////////////////
$(document).on('pagebeforeshow', "#productSortName", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsName",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.productsName;
			var len = productList.length;
			var list = $("#PSNList");
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

					"<p><i><b><font color='red'>" + product.productName +  "</font></b></i></p>" +
					"<p>_</p>" +
					"<p> Brand: " + product.brand  + "</p>" +
					"<p> Model: " + product.model + "</p>" + 
					"<p> Dimensions: " + product.dimensions + "</p>" +
					"<p> Description: " + product.productDesc + "</p>" +
					"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.productPrice) + "</p>" +		
					"<p class=\"ui-li-aside\">" + "_" + "</p>" +
					"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidStartingPrice) + "</p>" +		//CHECK BID PRODUCT TABLE
					"</a></li>");
				
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			Popup("Data not found!");
		}
	});
});

$(document).on('pagebeforeshow', "#productSortBrand", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsBrand",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.productsBrand;
			var len = productList.length;
			var list = $("#PSBList");
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

					"<p><i><b>" + product.productName +  "</b></i></p>" +
					"<p>_</p>" +
					"<p><font color='red'><b> Brand: " + product.brand  + "</b></font></p>" +
					"<p> Model: " + product.model + "</p>" + 
					"<p> Dimensions: " + product.dimensions + "</p>" +
					"<p> Description: " + product.productDesc + "</p>" +
					"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.productPrice) + "</p>" +		
					"<p class=\"ui-li-aside\">" + "_" + "</p>" +
					"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidStartingPrice) + "</p>" +		//CHECK BID PRODUCT TABLE
					"</a></li>");
				
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			Popup("Data not found!");
		}
	});
});

$(document).on('pagebeforeshow', "#productSortPrice", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsPrice",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.productsPrice;
			var len = productList.length;
			var list = $("#PSPList");
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			

					"<p><i><b>" + product.productName +  "</b></i></p>" +
					"<p>_</p>" +
					"<p> Brand: " + product.brand  + "</p>" +
					"<p> Model: " + product.model + "</p>" + 
					"<p> Dimensions: " + product.dimensions + "</p>" +
					"<p> Description: " + product.productDesc + "</p>" +
					"<p class=\"ui-li-aside\"> Instant Price: " + 
					accounting.formatMoney(product.productPrice) + "</p>" +		
					"<p class=\"ui-li-aside\">" + "_" + "</p>" +
					"<p class=\"ui-li-aside\"><font color='red'><b> Bid Price: " + 
					accounting.formatMoney(product.bidStartingPrice) + "</b></font></p>" +		
					"</a></li>");
				
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			Popup("Data not found!");
		}
	});
});

/////////////////////////END SORTING//////////////////////////////////////////////////


$(document).on('pagebeforeshow', "#products", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/productSearch/" + $('#search').val(),
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.productSearch;
			var len = productList.length;
			var list = $("#products-list");
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
				list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +  "'" + product.productPhoto + "'" +"/>" +			// imgSrc ---- productPhoto

					"<p><i><b>" + product.productName +  "</b></i></p>" +
					"<p>_</p>" +
					"<p> Brand: " + product.brand  + "</p>" +
					"<p> Model: " + product.model + "</p>" + 
					"<p> Dimensions: " + product.dimensions + "</p>" +
					"<p> Description: " + product.productDesc + "</p>" +
					"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.productPrice) + "</p>" +		
					"<p class=\"ui-li-aside\">" + "_" + "</p>" +
					"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidStartingPrice) + "</p>" +		//CHECK BID PRODUCT TABLE
					"</a></li>");
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.navigate("#home");
			Popup("Item doesn't exist!");
			
		}
	});
});

$(document).on('pagebeforeshow', "#product-view", function( event, ui ) {
	// currentProduct has been set at this point

	
	//document.getElementById("currPid").innerHTML = currentProduct.id;
	//var brandName = currentProduct.brand + " " + currentProduct.name;
	var productName = currentProduct.productName;
	var startPrice = "Bid Price: " + accounting.formatMoney(currentProduct.bidStartingPrice);		//START PRICE HAS TO BE FROM BID PRODUCT TABLE
	var instPrice = "Buy it Now: " + accounting.formatMoney(currentProduct.productPrice);
	var modelNo = "Model: " + currentProduct.model;
	var dims = "Dimensions: " + currentProduct.dimensions;
	var pid = "Product id: " + currentProduct.productID;
	var brand = "Brand: " + currentProduct.brand;
	var user = "Seller: " + currentProduct.userNickname;

	var myDate = currentProduct.startDate;
	var newDate=myDate.substring(0, 10); 
	var myDate2 = currentProduct.endDate;
	var newDate2=myDate2.substring(0, 10);
	var startTime = "Starting Date: " + newDate;
	var endTime = "Ending Date: " + newDate2;
	
	//document.getElementById("currBrand-Name").innerHTML = brandName;
	document.getElementById("currName").innerHTML = productName;
	//document.getElementById("currImgSrc").src = currentProduct.imgSrc;
	document.getElementById("currImgSrc").src = currentProduct.productPhoto; 
	document.getElementById("currBidPrice").innerHTML = startPrice;
	document.getElementById("currInstPrice").innerHTML = instPrice;
	document.getElementById("currDescription").innerHTML = currentProduct.productDesc;
	document.getElementById("currModel").innerHTML = modelNo;
	document.getElementById("currDimensions").innerHTML = dims;
	document.getElementById("currId").innerHTML = pid;
	document.getElementById("currBrand").innerHTML = brand;
	document.getElementById("currSeller").innerHTML = user;

	document.getElementById("currStartDate").innerHTML = startTime;
	document.getElementById("currEndDate").innerHTML = endTime;


	

	//document.getElementById("currTagID").innerHTML = currentProduct.tagID;
	
	
});

$(document).on('pagebeforeshow', "#productRegular-view", function( event, ui ) {
	// currentProduct has been set at this point

	
	//document.getElementById("currPid").innerHTML = currentProduct.id;
	//var brandName = currentProduct.brand + " " + currentProduct.name;
	var productName = currentProduct.productName;
	var startPrice = "Bid Price: " + accounting.formatMoney(currentProduct.bidStartingPrice);		//START PRICE HAS TO BE FROM BID PRODUCT TABLE
	var instPrice = "Buy it Now: " + accounting.formatMoney(currentProduct.productPrice);
	var modelNo = "Model: " + currentProduct.model;
	var dims = "Dimensions: " + currentProduct.dimensions;
	var pid = "Product id: " + currentProduct.productID;
	var brand = "Brand: " + currentProduct.brand;
	var user = "Seller: " + currentProduct.userNickname;

	var myDate = currentProduct.startDate;
	var newDate=myDate.substring(0, 10); 
	var myDate2 = currentProduct.endDate;
	var newDate2=myDate2.substring(0, 10);
	var startTime = "Starting Date: " + newDate;
	var endTime = "Ending Date: " + newDate2;
	

	//document.getElementById("currBrand-Name").innerHTML = brandName;
	document.getElementById("rcurrName").innerHTML = productName;
	//document.getElementById("currImgSrc").src = currentProduct.imgSrc;
	document.getElementById("rcurrImgSrc").src = currentProduct.productPhoto; 
	document.getElementById("rcurrBidPrice").innerHTML = startPrice;
	document.getElementById("rcurrInstPrice").innerHTML = instPrice;
	document.getElementById("rcurrDescription").innerHTML = currentProduct.productDesc;
	document.getElementById("rcurrModel").innerHTML = modelNo;
	document.getElementById("rcurrDimensions").innerHTML = dims;
	document.getElementById("rcurrId").innerHTML = pid;
	document.getElementById("rcurrBrand").innerHTML = brand;
	document.getElementById("rcurrSeller").innerHTML = user;

	document.getElementById("rcurrStartDate").innerHTML = startTime;
	document.getElementById("rcurrEndDate").innerHTML = endTime;


	

	//document.getElementById("currTagID").innerHTML = currentProduct.tagID;
	
	
});
////////////////////////////////////////////////////////////////////////////////////////////////
/// Functions Called Directly from Buttons ///////////////////////

function ConverToJSON(formData){
	var result = {};
	$.each(formData, 
		function(i, o){
			result[o.name] = o.value;
	});
	return result;
}

function convert(dbModel){
	var cliModel = {};
	
	cliModel.productName = dbModel.productName;
	cliModel.productDesc = dbModel.productDesc;		
	cliModel.productPhoto = dbModel.productPhoto;
	cliModel.productPrice = dbModel.productPrice;
	cliModel.model = dbModel.model;
	cliModel.brand = dbModel.brand;
	cliModel.dimensions = dbModel.dimensions;
	//cliModel.tagID = dbModel.tagID;
	
	return cliModel;
}

var currentTag;
function GetProductsByTag(id){
	$.mobile.loading("show");
		$.ajax({
		url : "http://localhost:3412/DB-Project/productsByTag/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentTag = id;
			$.mobile.loading("hide");
			$.mobile.navigate("#productsInCategory");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				Popup("No products found.");
				$.mobile.navigate("#subCategories");
			}
			else {
				Popup("Internal Server Error.");
			}
		}
		});
}

$(document).on('pagebeforeshow', "#productsInCategory", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsByTag/" + currentTag,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.productsTag;
			var len = productList.length;
			var list = $("#products-list-category");
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
				list.append("<li><a onclick=GetProductInCategory(" + product.productID + ")>" + 

					"<img src= " +  "'" + product.productPhoto + "'" +"/>" +			// imgSrc ---- productPhoto

					"<p><i><b>" + product.productName +  "</b></i></p>" +
					"<p>_</p>" +
					"<p> Brand: " + product.brand  + "</p>" +
					"<p> Model: " + product.model + "</p>" + 
					"<p> Dimensions: " + product.dimensions + "</p>" +
					"<p> Description: " + product.productDesc + "</p>" +
					"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.productPrice) + "</p>" +		
					"<p class=\"ui-li-aside\">" + "_" + "</p>" +
					"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidStartingPrice) + "</p>" +		//CHECK BID PRODUCT TABLE
					"</a></li>");
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.navigate("#home");
			Popup("Item doesn't exist!");
			
		}
	});
});

function GetProductInCategory(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/DB-Project/products/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
		
			currentProduct = data.product;
			bidProductID = id;
			bidstartingPrice = currentProduct.bidStartingPrice;
			startdate = currentProduct.startDate;
			enddate = currentProduct.endDate;
			$.mobile.loading("hide");
			$.mobile.navigate("#product-view-category");
			
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				Popup("Producto not found.");
			}
			else {
				Popup("Internal Server Error.");
			}
		}
	});
}

$(document).on('pagebeforeshow', "#product-view-category", function( event, ui ) {
	// currentProduct has been set at this point
	var productName = currentProduct.productName;
	var startPrice = "Bid Price: " + accounting.formatMoney(currentProduct.bidStartingPrice);		
	var instPrice = "Buy it Now: " + accounting.formatMoney(currentProduct.productPrice);
	var modelNo = "Model: " + currentProduct.model;
	var dims = "Dimensions: " + currentProduct.dimensions;
	var pid = "Product id: " + currentProduct.productID;
	var brand = "Brand: " + currentProduct.brand;
	var user = "Seller: " + currentProduct.userNickname;

	var myDate = currentProduct.startDate;
	var newDate=myDate.substring(0, 10); 
	var myDate2 = currentProduct.endDate;
	var newDate2=myDate2.substring(0, 10);
	var startTime = "Starting Date: " + newDate;
	var endTime = "Ending Date: " + newDate2;

	document.getElementById("currName2").innerHTML = productName;
	document.getElementById("currImgSrc2").src = currentProduct.productPhoto; 
	document.getElementById("currBidPrice2").innerHTML = startPrice;
	document.getElementById("currInstPrice2").innerHTML = instPrice;
	document.getElementById("currDescription2").innerHTML = currentProduct.productDesc;
	document.getElementById("currModel2").innerHTML = modelNo;
	document.getElementById("currDimensions2").innerHTML = dims;
	document.getElementById("currId2").innerHTML = pid;
	document.getElementById("currBrand2").innerHTML = brand;
	document.getElementById("currSeller2").innerHTML = user;
	document.getElementById("currStartDate2").innerHTML = startTime;
	document.getElementById("currEndDate2").innerHTML = endTime;
	
});


function SaveProduct(){
	$.mobile.loading("show");
	var form = $("#product-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newProduct = ConverToJSON(formData);
	console.log("New Product: " + JSON.stringify(newProduct));
	var newProductJSON = JSON.stringify(newProduct);
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		method: 'post',
		data : newProductJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#productsInCategory");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			Popup("Data could not be added!");
		}
	});


}

var currentProduct = {};
var bidProductID;
var bidstartingPrice;
var startdate;
var enddate;
function GetProduct(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/DB-Project/products/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			//Popup("herher");
			currentProduct = data.product;
			bidProductID = id;
			bidstartingPrice = currentProduct.bidStartingPrice;
			startdate = currentProduct.startDate;
			enddate = currentProduct.endDate;
			$.mobile.loading("hide");
			$.mobile.navigate("#product-view");
			
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				Popup("Producto not found.");
			}
			else {
				Popup("Internal Server Error.");
			}
		}
	});
}

function GetProductR(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/DB-Project/products/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			//Popup("herher");
			currentProduct = data.product;
			bidProductID = id;
			bidstartingPrice = currentProduct.bidStartingPrice;
			startdate = currentProduct.startDate;
			enddate = currentProduct.endDate;
			$.mobile.loading("hide");
			$.mobile.navigate("#productRegular-view");
			
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				Popup("Producto not found.");
			}
			else {
				Popup("Internal Server Error.");
			}
		}
	});
}




function UpdateProduct(){
	$.mobile.loading("show");
	var form = $("#product-view-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var updProduct = ConverToJSON(formData);
	updProduct.id = currentProduct.id;
	console.log("Updated Product: " + JSON.stringify(updProduct));
	var updProductJSON = JSON.stringify(updProduct);
	$.ajax({
		url : "http://localhost:3412/DB-Project/products/" + updProduct.id,
		method: 'put',
		data : updProductJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#products");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				Popup("Data could not be updated!");
			}
			else {
				Popup("Internal Error.");		
			}
		}
	});
}

function DeleteProduct(){
	$.mobile.loading("show");
	var id = currentProduct.id;
	$.ajax({
		url : "http://localhost:3412/DB-Project/products/" + id,
		method: 'delete',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#products");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				Popup("product not found.");
			}
			else {
				Popup("Internal Server Error.");
			}
		}
	});
}