

//----------------------*******************************************************************************************************-->
//----------------------********************************SUBCATEGORIES START****************************************************-->
//----------------------*******************************************************************************************************-->


//////////////////////////////////////***************BOOKS******************///////////////////////////////////////////////////////////////////////

$(document).on('pagebeforeshow', "#childrenB", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 1,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#BCList");
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});

///////////////////////////////////////////START SORTING///////////////////////////////////////////
$(document).on('pagebeforeshow', "#childrenBName", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsName",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.productsName;
			var len = productList.length;
			var list = $("#BCNList");
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});

$(document).on('pagebeforeshow', "#childrenBBrand", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsBrand",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.productsBrand;
			var len = productList.length;
			var list = $("#BCBList");
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});

$(document).on('pagebeforeshow', "#childrenBPrice", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsPrice",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.productsPrice;
			var len = productList.length;
			var list = $("#BCPList");
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});

/////////////////////////END SORTING//////////////////////////////////////////////////

$(document).on('pagebeforeshow', "#fiction", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 2,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#BFList");
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});


$(document).on('pagebeforeshow', "#technology", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 3,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#BTList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});


$(document).on('pagebeforeshow', "#business", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 4,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#BBList");///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});


///////////////////////************************ELECTRONICS**************************//////////////////////////////////////////////



$(document).on('pagebeforeshow', "#tv", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 5,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#ETList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});



$(document).on('pagebeforeshow', "#audio", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 6,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#EAList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});

$(document).on('pagebeforeshow', "#phones", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 7,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#EPList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});


$(document).on('pagebeforeshow', "#cameras", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 8,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#ECList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});

$(document).on('pagebeforeshow', "#video", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 9,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#EVList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});



///////////////////////************************COMPUTERS**************************//////////////////////////////////////////////



$(document).on('pagebeforeshow', "#laptops", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 10,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#CLList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});



$(document).on('pagebeforeshow', "#desktops", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 11,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#CDList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});

$(document).on('pagebeforeshow', "#tablets", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 12,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#CTList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});


$(document).on('pagebeforeshow', "#printers", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 13,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#CPList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});


///////////////////////************************CLOTHING**************************//////////////////////////////////////////////

$(document).on('pagebeforeshow', "#childrenC", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 14,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#CCList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});


$(document).on('pagebeforeshow', "#menShirts", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 16,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#CMSList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});


$(document).on('pagebeforeshow', "#menPants", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 17,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#CMPList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});


$(document).on('pagebeforeshow', "#menSocks", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 18,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#CMSkList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});



$(document).on('pagebeforeshow', "#womenShirts", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 20,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#CWSList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});


$(document).on('pagebeforeshow', "#womenPants", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 21,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#CWPList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});


$(document).on('pagebeforeshow', "#womenDresses", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 22,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#CWDList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});




///////////////////////************************SHOES**************************//////////////////////////////////////////////



$(document).on('pagebeforeshow', "#childrenS", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 23,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#SCList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});



$(document).on('pagebeforeshow', "#womenS", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 24,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#SWList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});

$(document).on('pagebeforeshow', "#menS", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 25,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#SMList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});



///////////////////////************************SPORTS**************************//////////////////////////////////////////////



$(document).on('pagebeforeshow', "#bicycleFrames", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 27,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#SBFList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});


$(document).on('pagebeforeshow', "#bicyclesWheels", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 28,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#SBWList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});


$(document).on('pagebeforeshow', "#bicyclesHelmets", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 29,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#SBHList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});


$(document).on('pagebeforeshow', "#bicyclesParts", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 30,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#SBPList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});

$(document).on('pagebeforeshow', "#fishing", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 31,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#SFList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});

$(document).on('pagebeforeshow', "#baseball", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 32,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#SBsBList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});

$(document).on('pagebeforeshow', "#golf", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 33,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#SGList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});

$(document).on('pagebeforeshow', "#basketball", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/productsTag/" + 34,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.tag;
			var len = productList.length;
			var list = $("#SBkBList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				
					list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 

					"<img src= " +   "'" + product.productPhoto + "'" + "/>" +			// imgSrc ---- productPhoto

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
			alert("Data not found!");
		}
	});
});


//----------------------*******************************************************************************************************-->
//----------------------********************************SUBCATEGORIES END****************************************************-->
//----------------------*******************************************************************************************************-->




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
			alert("Item doesn't exist!");
		}
	});
});

$(document).on('pagebeforeshow', "#product-view", function( event, ui ) {
	// currentProduct has been set at this point

	
	//document.getElementById("currPid").innerHTML = currentProduct.id;
	//var brandName = currentProduct.brand + " " + currentProduct.name;
	var productName = currentProduct.productName;
	var startPrice = "Starting Price: " + accounting.formatMoney(currentProduct.bidStartingPrice);		//START PRICE HAS TO BE FROM BID PRODUCT TABLE
	var instPrice = "Buy it Now: " + accounting.formatMoney(currentProduct.productPrice);
	var modelNo = "Model: " + currentProduct.model;
	var dims = "Dimensions: " + currentProduct.dimensions;
	var pid = "Product id: " + currentProduct.productID;
	var brand = "Brand: " + currentProduct.brand;
	var user = "Seller: " + currentProduct.userNickname;

	var startTime = "Starting Date: " + currentProduct.startDate;
	var endTime = "Ending Date: " + currentProduct.endDate;

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
			$.mobile.navigate("#products");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
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
			//alert("herher");
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
				alert("Producto not found.");
			}
			else {
				alter("Internal Server Error.");
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
				alert("Data could not be updated!");
			}
			else {
				alert("Internal Error.");		
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
				alert("product not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}